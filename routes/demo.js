// setup express routing
const express = require('express');
const router = express.Router();
const path = require('path');
const rootPath = path.join(__dirname, '../demo' );
const distPath = path.join(__dirname, '../dist' );

// middleware logging a request to this route
router.use(function timeLog (req, res, next) {
    console.log('GET /demo @ Time : ', Date.now());
    next();
});

router.get('/', (req,res) => {
    res.sendFile('index.html', { root : rootPath });
});
router.get('/logic', (req,res) => {
    res.sendFile('demo.bundle.js', { root : distPath });
});

module.exports = router;