var fs = require('fs');
var path = require('path');
var serveStatic = require('serve-static');
var cors = require('cors');

module.exports = function(RED) {
    "use strict"

    // get RED variables
    var app = RED.httpNode;
    var server = RED.server;
    var settings = RED.settings;

    var paths = [];

    // add static folders
    app.use('/', serveStatic(path.join(__dirname, "css")));
    app.use('/', serveStatic(path.join(__dirname, "images")));
    app.use('/', serveStatic(path.join(__dirname, "js")));
    app.use('/', serveStatic(path.join(__dirname, "templates")));

    // ExpressJS and node path API
    function initPaths() {
        paths.forEach(function(path) {
            path.active = false;
        });
    }

    function resumePaths() {
        paths.forEach(function(path) {
            if (path.active == false)
                removePath(path.id);
        });
    }

    function getPath(id) {
        return paths.find(path => path.id === id)
    }

    function updatePath(node, path) {
        var item = getPath(node.id);

        if (item !== undefined) {
            removeRoute(item.path);

            addRoute('/' + path, node.corsHandler, node.callback, node.errorHandler);

            item.path = path;
        } else {
            addRoute('/' + path, node.corsHandler, node.callback, node.errorHandler);
            
            addPath(node.id, path);
        }

        return item;
    }
    
    function removePath(id) {
        var index = paths.findIndex(path => path.id == id);

        if (index !== -1)
            paths.splice(index, 1);
                
        return index;
    }

    function addPath(id, path) {
        var item = {id: id, path: path, active: true};

        paths.push(item);

        return item;
    }

    function removeRoute(path) {
        var index = app._router.stack.findIndex(item => item.route !== undefined && item.route.path == '/' + path);

        if (index !== -1)
            app._router.stack.splice(index, 1);
                
        return index;
    }

    function addRoute(path, corsHandler, callback, errorHandler) {
        app.get(path, corsHandler, callback, errorHandler);
    }

    function maps(config) {
        RED.nodes.createNode(this, config);

        var node = this;
        var conf = config;

        var globalContext = node.context().global;

        var io;

        // configure socket.io server
        if (globalContext.io)
            io = globalContext.io;
        else {
            io = require('socket.io')(server);
            globalContext.io = io; 
        }

        io.on('connection', function(socket) {
            // get topic from client conenction
            var topic = socket.handshake.query.topic;

            if (conf.path == topic) {
                console.log('a socket connection with id: ' + socket.conn.id + ' from host: ' + socket.conn.remoteAddress + ' and topic: ' + topic + ' is created at ' + new Date());

                // publish chart configurations        
                var config = {title: conf.charttitle, xaxis: conf.xaxis, yaxis : conf.yaxis};
                var red = {config: config};

                var item = getPath(node.id);
                io.emit(item.path, red);

                socket.on('disconnect', function() {
                    console.log('a socket disconnection is created at ' + new Date());
                });
            }
        });

        // load default template
        var template = fs.readFileSync(__dirname + '/templates/map-template.html', 'utf8');

        // configure chart node-red path
        if (RED.settings.httpNodeRoot !== false) {
            node.errorHandler = function(err, req, res, next) {
                node.warn(err);

                res.send(500);
            };

            node.callback = function(req, res) {
                res.end(template);
            } 

            node.corsHandler = function(req, res, next) { 
                next(); 
            }               
        }  

        // update expressJS route and update node path
        updatePath(node, config.path);

        // trigger on flow input
        node.on('input', function(msg) {   
            var item = getPath(node.id);

            // publish chart input message
            var red = {msg: msg};

            io.emit(item.path, red);

            // return payload
            node.send(msg);
        });
    } 

    RED.nodes.registerType('maps', maps); 
};