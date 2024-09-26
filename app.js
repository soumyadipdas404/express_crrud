'use strict'
const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const config = require('./config/config');
const userRoutes  = require('./routes/user.route');

// route init


// App init
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/user", userRoutes.userRoutes);
mongoose.connect(config.dburi)
    .then(() => {
        console.log("db connected");
        app.listen(config.port, () => console.log(`app running on url http://localhost:`+config.port));
    })
    .catch(err => {
        console.log(err);
    })