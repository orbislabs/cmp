// setup express routing
const express = require('express');
const router = express.Router();
const path = require('path');
const rootPath = path.join(__dirname, '../public' );

// middleware logging a request to this route
router.use(function timeLog (req, res, next) {
    console.log('GET /script @ Time : ', Date.now());
    next();
});

router.get('/', (req,res) => {
    res.sendFile('cmp.js', { root : rootPath });
});

router.get('/dev', (req,res) => {
    res.send('<script src="//localhost:3999/script" type="module" async></script>');
});

module.exports = router;