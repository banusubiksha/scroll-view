const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 8080 });

server.on('connection', (ws) => {
  console.log('Client connected');

  // Function to send updates
  const sendUpdate = (update) => {
    ws.send(JSON.stringify(update));
  };

  // Send a welcome message as JSON
  sendUpdate({
    timestamp: new Date().toISOString(),
    content: ["Welcome!"],
  });

  // Simulate sending updates (for testing purposes)
  setInterval(() => {
    const update = {
      timestamp: new Date().toISOString(),
      content: [
        "Today is nice",
        "Happy morning",
        "Hi, how are you?",
      ],
    };
    sendUpdate(update);
  }, 5000); // Sends an update every 5 seconds

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});
