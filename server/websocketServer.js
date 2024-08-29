const WebSocket = require('ws');
const Order = require('./db/models/Order');

const wss = new WebSocket.Server({ port: 8080 });
const clients = new Set();

wss.on('connection', ws => {
    console.log('Client connected');
    clients.add(ws);

    const pipeline = [
        {
            $match: {
                'updateDescription.updatedFields.paymentStatus': { $exists: true }
            }
        }
    ];

    const changeStream = Order.watch(pipeline);
    
    changeStream.on('change', (change) => {
        console.log('Зміна:', change);
        clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(change));
            }
        });
        // ws.send(JSON.stringify(change));
    });

    ws.on('close', () => {
        console.log('Client disconnected');
        clients.delete(ws);
        changeStream.close();
    });
});

console.log('WebSocket server running on ws://localhost:8080');
