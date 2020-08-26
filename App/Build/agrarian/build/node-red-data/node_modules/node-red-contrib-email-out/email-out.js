
/**
 * POP3 protocol - RFC1939 - https://www.ietf.org/rfc/rfc1939.txt
 *
 * Dependencies:
 * * poplib     - https://www.npmjs.com/package/poplib
 * * nodemailer - https://www.npmjs.com/package/nodemailer
 * * imap       - https://www.npmjs.com/package/imap
 * * mailparser - https://www.npmjs.com/package/mailparser
 */

module.exports = function(RED) {
    "use strict";
    var nodemailer = require("nodemailer");
    var Imap = require('imap');
    var POP3Client = require("poplib");
    var MailParser = require("mailparser").MailParser;
    var util = require("util");

    try {
        var globalkeys = RED.settings.email || require(process.env.NODE_RED_HOME+"/../emailkeys.js");
    }
    catch(err) {
    }

    function EmailOutNode(n) {
        RED.nodes.createNode(this,n);
        this.topic = n.topic;
        this.name = n.name;
        this.outserver = n.server;
        this.outport = n.port;
        this.secure = n.secure;
        var flag = false;
        if (this.credentials && this.credentials.hasOwnProperty("userid")) {
            this.userid = this.credentials.userid;
        } else {
            if (globalkeys) {
                this.userid = globalkeys.user;
                flag = true;
            }
        }
        if (this.credentials && this.credentials.hasOwnProperty("password")) {
            this.password = this.credentials.password;
        } else {
            if (globalkeys) {
                this.password = globalkeys.pass;
                flag = true;
            }
        }
        if (flag) {
            RED.nodes.addCredentials(n.id,{userid:this.userid, password:this.password, global:true});
        }
        var node = this;

        var smtpOptions = {
            host: node.outserver,
            port: node.outport,
            secure: node.secure
        }

        if (this.userid && this.password) {
            smtpOptions.auth = {
                user: node.userid,
                pass: node.password
            };
        }
        var smtpTransport = nodemailer.createTransport(smtpOptions);

        this.on("input", function(msg) {
            if (msg.hasOwnProperty("payload")) {
                if (smtpTransport) {
                    node.status({fill:"blue",shape:"dot",text:"email.status.sending"});
                    if (msg.to && node.name && (msg.to !== node.name)) {
                        node.warn(RED._("node-red:common.errors.nooverride"));
                    }
                    var sendopts = { from: ((msg.from) ? msg.from : node.userid) };   // sender address
                    sendopts.to = node.name || msg.to; // comma separated list of addressees
                    if (node.name === "") {
                        sendopts.cc = msg.cc;
                        sendopts.bcc = msg.bcc;
                    }
                    sendopts.subject = msg.topic || msg.title || "Message from Node-RED"; // subject line
                    if (msg.hasOwnProperty("envelope")) { sendopts.envelope = msg.envelope; }

                    // send attachments as array of msg.attachments
                    /*if (Buffer.isBuffer(msg.payload)) { // if it's a buffer in the payload then auto create an attachment instead
                        if (!msg.filename) {
                            var fe = "bin";
                            if ((msg.payload[0] === 0xFF)&&(msg.payload[1] === 0xD8)) { fe = "jpg"; }
                            if ((msg.payload[0] === 0x47)&&(msg.payload[1] === 0x49)) { fe = "gif"; } //46
                            if ((msg.payload[0] === 0x42)&&(msg.payload[1] === 0x4D)) { fe = "bmp"; }
                            if ((msg.payload[0] === 0x89)&&(msg.payload[1] === 0x50)) { fe = "png"; } //4E
                            msg.filename = "attachment."+fe;
                        }
                        var fname = msg.filename.replace(/^.*[\\\/]/, '') || "file.bin";
                        sendopts.attachments = [ { content:msg.payload, filename:fname } ];
                        if (msg.hasOwnProperty("headers") && msg.headers.hasOwnProperty("content-type")) {
                            sendopts.attachments[0].contentType = msg.headers["content-type"];
                        }
                        // Create some body text..
                        sendopts.text = RED._("email.default-message",{filename:fname, description:(msg.description||"")});
                    }*/

                    var text = RED.util.ensureString(msg.body || msg.text);
                    sendopts.text = text; // plaintext body
                    if (/<[a-z][\s\S]*>/i.test(msg.body || msg.html)) { sendopts.html = (msg.body || msg.html); } // html body
                    if (msg.attachments) { sendopts.attachments = msg.attachments; } // add attachments

                    smtpTransport.sendMail(sendopts, function(error, info) {
                        if (error) {
                            node.error(error,msg);
                            node.status({fill:"red",shape:"ring",text:"email.status.sendfail"});
                        } else {
                            node.log(RED._("email.status.messagesent",{response:info.response}));
                            node.status({});
                            msg.status = info;
                            node.send(msg);
                        }
                    });
                }
                else { node.warn(RED._("email.errors.nosmtptransport")); }
            }
            else { node.warn(RED._("email.errors.nopayload")); }
        });
    }
    RED.nodes.registerType("e-mail out",EmailOutNode,{
        credentials: {
            userid: {type:"text"},
            password: {type: "password"},
            global: { type:"boolean"}
        }
    });

};