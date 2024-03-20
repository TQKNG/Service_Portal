const WebSocket = require("ws");

let wss;

function initWebSocket(server) {
  wss = new WebSocket.Server({ server }); // Separate WebSocket server

  wss.on("connection", (ws) => {
    console.log("New WebSocket Connection");
  });
}

function sendWebSocketMessage(message) {
  if (wss) {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(message));
      }
    });
  }
}

module.exports = { initWebSocket, sendWebSocketMessage };
