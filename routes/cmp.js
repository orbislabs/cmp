// setup express routing
const express = require('express');
const router = express.Router();
const path = require('path');
const rootPath = path.join(__dirname, '../dist');
const public = path.join(__dirname, '../public');

// using this to geo is user is in EU
const geo = require('./countries');

// middleware logging a request to this route
router.use(function timeLog(req, res, next) {
  console.log(`CMP++ :: ExpressServer --> GET /cmp @ Time : ${Date.now()}`);
  console.log(`CMP++ :: ExpressServer --> User Country:  ${req.get('X-Request-Country')}`);
  next();
});

router.get('/', (req, res) => {
  if(req.hostname !== 'localhost' && req.get('X-Request-Country')) {
    if (geo.isUserEu(req.get('X-Request-Country'))) {
      res.sendFile('cmp.bundle.js', {
        root : rootPath
      });
    } else {
      res.sendFile('gtmConsent.js', {
        root : public
      });
    }
  } else {
    res.sendFile('cmp.bundle.js', {
      root : rootPath
    });
  }
});

router.get('/dev', (req, res) => {
  res.send('<body><script src="/cmp"></script></body>');
});

router.get('/cookie', (req, res) => {
  res.cookie('exp', req.query.c, { domain: '.pluto-cmp.com' });
  res.end();
});

module.exports = router;