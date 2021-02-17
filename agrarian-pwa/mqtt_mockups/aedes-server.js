const aedes = require('aedes')()
const httpServer = require('http').createServer();
const ws = require('websocket-stream');
const port = process.env.PORT || 9100;

ws.createServer({ server: httpServer }, aedes.handle);

aedes.on('clientReady', (client) => {
    console.log(`Client ${client.id} is connected`);
});

httpServer.listen(port, function () {
  console.log('websocket server listening on port ', port);
})

