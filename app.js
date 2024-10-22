'use strict'
const cors = require('cors');
const express = require('express');
const config = require('./config/config');
const { default: mongoose } = require('mongoose');
const logRoute = require('./middleware/logger');
const http = require('http');
const path = require('path');
const { initializeWebSocket, handleUpgrade } = require('./controller/webScocket.controller');

// route init
const userRoutes = require('./routes/user.route');
const indexRouter = require('./routes/index.route');
const itemRoutes = require('./routes/item.route');
const categoryRoutes = require('./routes/category.route');
const websocketRoutes = require('./routes/webScocket.route');


// App init
const app = express();
const server = http.createServer(app);
// Initialize WebSocket server
initializeWebSocket(server);
// Serve static files (like the mobile QR scanner page)
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cors());
app.use(logRoute)

app.use("/api/user", userRoutes.userRoutes);
app.use("/", indexRouter.indexRouter);
app.use('/socket', websocketRoutes);
app.use("/api/item", itemRoutes.itemRoutes);
app.use("/api/category", categoryRoutes.categoryRoutes);

server.on('upgrade', (request, socket, head) => {
    handleUpgrade(request, socket, head);
});

// Db connect
mongoose.connect(config.dburi)
    .then(() => {
        console.log("db connected");
        app.listen(config.port, () => console.log(`app running on url http://localhost:` + config.port));
    })
    .catch(err => {
        console.log(err);
    })