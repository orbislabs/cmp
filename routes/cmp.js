// setup express routing
const express = require('express');
const router = express.Router();
const path = require('path');
const rootPath = path.join(__dirname, '../dist');

// middleware logging a request to this route
router.use(function timeLog(req, res, next) {
  console.log('GET /cmp @ Time : ', Date.now());
  console.log(req.get('X-Request-Country'));
  next();
});

router.get('/', (req, res) => {
  res.sendFile('cmp.bundle.js', {
    root: rootPath
  });
});

router.get('/dev', (req, res) => {
  console.log('called');
  res.send('<body><script src="http://pluto-cmp.com/cmp"></script></body>');
});

module.exports = router;