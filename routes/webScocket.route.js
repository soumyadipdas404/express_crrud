// routes/websocketRoutes.js
const express = require('express');
const router = express.Router();

// Optional route for WebSocket connection testing
router.get('/ws', (req, res) => {
  res.send('WebSocket route is active.');
});

module.exports = router;
