// setup express routing
const express = require('express');
const router = express.Router();
const path = require('path');
const rootPath = path.join(__dirname, '../dist');
const public = path.join(__dirname, '../public');

// countries
const euCountries = require('./countries.js');

// middleware logging a request to this route
router.use(function timeLog(req, res, next) {
  //TODO : remove logging in prod.
  console.log('GET /cmp @ Time : ', Date.now());
  console.log(req.get('X-Request-Country'));
  if (euCountries.indexOf(req.get('X-Request-Country')) < 0) {
    console.log('non-eu');
  }
  next();
});

router.get('/', (req, res) => {
  if (euCountries.indexOf(req.get('X-Request-Country')) >= 0) {
    res.sendFile('cmp.bundle.js', {
      root : rootPath
    });
  } else {
    res.sendFile('gtmConsent.js', {
      root : public
    });
  }
});

router.get('/dev', (req, res) => {
  console.log('called');
  res.send('<body><script src="http://pluto-cmp.com/cmp"></script></body>');
});

module.exports = router;