'use strict'
const cors = require('cors');
const express = require('express');
const { exec } = require('child_process');
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
app.use(logRoute); //test

app.use("/api/user", userRoutes.userRoutes);
app.use("/", indexRouter.indexRouter);
app.use("/api/item", itemRoutes.itemRoutes);
app.use("/api/category", categoryRoutes.categoryRoutes);
// Webhook endpoint
app.post('/webhook', (req, res) => {
    const payload = req.body;

    // Only trigger deployment on master branch
    if (payload.ref === 'refs/heads/master') {
        console.log('Push to master detected, triggering deployment...');

        // Execute the deploy.sh script with PM2
        exec('pm2 start ecosystem.config.js', (err, stdout, stderr) => {
            if (err) {
                console.error(`Error: ${stderr}`);
                return res.status(500).send('Deployment failed');
            }

            console.log(stdout);
            return res.status(200).send('Deployment triggered successfully');
        });
    } else {
        console.log('Push to non-master branch detected, skipping deployment.');
        return res.status(200).send('No deployment triggered');
    }
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