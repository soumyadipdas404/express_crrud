// controllers/websocketController.js
const WebSocket = require('ws');

let wss;

const initializeWebSocket = (server) => {
    wss = new WebSocket.Server({ noServer: true });

    wss.on('connection', (ws) => {
        console.log('WebSocket Client connected');

        ws.on('message', (message) => {
            console.log('Received:', message);

            // Broadcast the received message to all connected clients
            wss.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(message);
                }
            });
        });

        ws.on('close', () => {
            console.log('WebSocket Client disconnected');
        });
    });
};

const handleUpgrade = (request, socket, head) => {
    if (request.url === '/ws') {
        wss.handleUpgrade(request, socket, head, (ws) => {
            wss.emit('connection', ws, request);
        });
    } else {
        socket.destroy();
    }
};

module.exports = {
    initializeWebSocket,
    handleUpgrade,
};
