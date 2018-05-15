// setup express routing
const express = require('express');
const router = express.Router();
const path = require('path');
const rootPath = path.join(__dirname, '../demo' );

// middleware logging a request to this route
router.use(function timeLog (req, res, next) {
    console.log('GET /demo @ Time : ', Date.now());
    next();
});

router.get('/', (req,res) => {
    res.sendFile('index.html', { root : rootPath });
});

module.exports = router;