// WebSocketService.js

import { useState } from 'react';

const useWebSocket = (url) => {
  const [ws, setWs] = useState(null);

  const connect = () => {
    const websocket = new WebSocket(url);
    websocket.onopen = () => {
      console.log('WebSocket connection established.');
    };
    setWs(websocket);
  };

  const disconnect = () => {
    if (ws) {
      ws.close();
    }
  };

  const sendMessage = (message) => {
    if (ws) {
      ws.send(message);
    }
  };

  const onMessage = (callback) => {
    if (ws) {
      ws.onmessage = (event) => {

        callback(event.data);
        // const message = JSON.parse(event.data);
        console.log("Test Callback", callback)
      };
    }
  };

  return {
    connect,
    disconnect,
    sendMessage,
    onMessage,
  };
};

export default useWebSocket;
