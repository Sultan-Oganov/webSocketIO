const express = require('express');
const app = express();
const PORT = 5000;

const http = require('http').Server(app);
const cors = require('cors');
const socketIO = require('socket.io')(http, {
    cors: {
        origin: 'http://localhost:5173'
    }
});

app.get('api', (req, res) => {
    res.json({
        message: 'Hello'
    })
});

let users = [];

socketIO.on('connection', (socket) => {
    console.log(`${socket.id} user connected`);

    socket.on('message', (data) => {
        socketIO.emit('response', data);
    });

    socket.on('newUser', (data) => {
        users.push(data);
        socketIO.emit('responseNewUser', users);
    });

    socket.on('typing', (data) => socket.broadcast.emit('responseTyping', data));

    socket.on('logout', (data) => {
        users = users.filter(el => el.user !== data.user);
        socketIO.emit('responseNewUser', users);
    });

    socket.on('disconnect', () => {
        console.log(`${socket.id} disconnected`);
    });
});


http.listen(PORT, () => {
    console.log('Server working')
});