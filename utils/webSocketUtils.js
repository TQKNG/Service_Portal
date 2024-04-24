const WebSocket = require("ws");

let wss;

function initWebSocket(server, options) {
  const { port } = options || {};

  if (port) {
    // If port is provided, create WebSocket server using port
    const wss = new WebSocket.Server({ port });

    wss.on("connection", (ws) => {
      console.log("New WebSocket Connection");
    });
  } else {
    // If port is not provided, use existing HTTP server
    const wss = new WebSocket.Server({ server });

    wss.on("connection", (ws) => {
      console.log("New WebSocket Connection");
    });
  }
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
