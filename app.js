'use strict'
const cors = require('cors');
const express = require('express');
const config = require('./config/config');
const { default: mongoose } = require('mongoose');
const logRoute = require('./middleware/logger');

// route init
const userRoutes = require('./routes/user.route');
const indexRouter = require('./routes/index.route');
const itemRoutes = require('./routes/item.route');
const categoryRoutes = require('./routes/category.route');

// App init
const app = express();
app.use(express.json());
app.use(cors());
app.use(logRoute); //test ggggg

app.use("/api/user", userRoutes.userRoutes);
app.use("/", indexRouter.indexRouter);
app.use("/api/item", itemRoutes.itemRoutes);
app.use("/api/category", categoryRoutes.categoryRoutes);
app.post('/webhook', (req, res) => {
    console.log('Received webhook:', req.body); // Log the received 
    res.status(200).send('Webhook received successfully');
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