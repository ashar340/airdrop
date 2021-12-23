var websocket = require("websocket-stream");
var ws = websocket("ws://localhost:6000/abc");
process.stdin.pipe(ws);
//ws.pipe(process.stdout)
ws.socket.on("message", (msg) => {
  console.log(msg, "CLIENT GOT A MESSAGE");
});
