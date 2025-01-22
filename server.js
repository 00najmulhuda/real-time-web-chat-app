const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const os = require('os');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')));


io.on('connection', (socket) => {
    console.log('A user connected');

    
    socket.on('new user', (username) => {
        console.log(`${username} has joined the chat`);
        io.emit('chat message', { username: 'System', message: `${username} has joined the chat` });
    });

    
    socket.on('chat message', (data) => {
        io.emit('chat message', data);
    });

    
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});


const PORT = process.env.PORT || 3002;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

