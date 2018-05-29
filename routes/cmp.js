// setup express routing
const express = require('express');
const router = express.Router();
const path = require('path');
const rootPath = path.join(__dirname, '../dist');

// middleware logging a request to this route
router.use(function timeLog(req, res, next) {
  console.log('GET /cmp @ Time : ', Date.now());
  next();
});

router.get('/', (req, res) => {
  res.sendFile('cmp.bundle.js', {
    root: rootPath
  });
});

router.get('/dev', (req, res) => {
  res.send('<script src="//localhost:5000/cmp" async></script>');
});

module.exports = router;