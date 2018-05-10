// setup express routing
const express = require('express');
const router = express.Router();
const path = require('path');
const rootPath = path.join(__dirname, '../dist' );

// middleware logging a request to this route
router.use(function timeLog (req, res, next) {
    console.log('GET /modal @ Time : ', Date.now());
    next();
});

router.get('/', (req,res) => {
    res.sendFile('ui.bundle.js', { root : rootPath });
});

router.get('/dev', (req,res) => {
    res.send('<script src="//localhost:3999/modal" type="module" async></script>');
});

module.exports = router;