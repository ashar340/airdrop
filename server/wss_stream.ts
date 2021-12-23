const createWsServer = (port) => {
  var websocket = require("websocket-stream");
  websocket.createServer;
};

const express = require("express");
const fs = require("fs");
const expressWebSocket = require("express-ws");
const websocketStream = require("websocket-stream/stream");
const app = express();

// extend express app with app.ws()
expressWebSocket(app, null, {
  // ws options here
  perMessageDeflate: false,
});

app.ws("/bigdata.json", function (ws, req) {
  // convert ws instance to stream
  const stream = websocketStream(ws, {
    // websocket-stream options here
    binary: true,
  });

  fs.createReadStream("bigdata.json").pipe(stream);
});

app.listen(3000);
