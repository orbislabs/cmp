// setup express routing
const express = require('express');
const path = require('path');

const router = express.Router();

const rootPath = path.join(__dirname, '../../dist');
const publicPath = path.join(__dirname, '../../public');

// using this to geo is user is in EU
const geo = require('../utils/isUserEu');
const logger = require('../logging/index');

router.use(logger);

router.get('/', (req, res) => {
  if (req.hostname !== 'localhost' && req.get('X-Request-Country')) {
    if (geo.isUserEu(req.get('X-Request-Country'))) {
      res.sendFile('cmp.bundle.js', {
        root: rootPath,
      });
    } else {
      res.sendFile('gtmConsent.js', {
        root: publicPath,
      });
    }
  } else {
    res.sendFile('cmp.bundle.js', {
      root: rootPath,
    });
  }
});

router.get('/dev', (req, res) => {
  res.send('<body><script src="/cmp"></script></body>');
});

module.exports = router;
