// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files for the frontend
app.use(express.static(path.join(__dirname, '../public'))); // Ensure your HTML file is in the "public" folder

// Handle incoming socket connections
io.on('connection', (socket) => {
    console.log('A user connected');

    // Listen for 'chat message' event
    socket.on('chat message', (msg) => {
        console.log('Message received: ' + msg);
        // Broadcast the message to all clients
        io.emit('chat message', msg);  // Emit the message to all clients
    });

    // Handle disconnect
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
