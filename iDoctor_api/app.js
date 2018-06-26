const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/db');
const path = require('path');

const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

const server = require('http').Server(app);
server.listen(80);

app.use(cors());

const io = require('socket.io')(server);

// Controllers

mongoose.connect(config.database);
let db = mongoose.connection;

app.use(express.static(path.join(__dirname, 'public')));

db.once('open', function() {
    console.log('Connected to MongoDB');
});

db.on('error', function(err) {
    console.log(err);
});

const routes = require('./routes/index');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use('/', routes);

io.on('connection', socket => {
    socket.on('new', data => {
        console.log(data);
    });
});

app.listen(3000, function() {
    console.log("Server started on port 3000....");
});