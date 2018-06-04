// setup express routing
const express = require('express');
const router = express.Router();
const path = require('path');
const rootPath = path.join(__dirname, '../dist');
const public = path.join(__dirname, '../public');

const geo = require('./countries');

// countries
//const euCountries = require('./countries.js');
const euCountries = [
  'GB',
  'AT',
  'BE',
  'BG',
  'HR',
  'CY',
  'CZ',
  'DK',
  'EE',
  'FI',
  'FR',
  'DE',
  'GR',
  'HU',
  'IE',
  'IT',
  'LV',
  'LT',
  'LU',
  'MT',
  'NL',
  'PL',
  'PT',
  'RO',
  'SK',
  'SI',
  'ES',
  'SE',
  'JP' // added for dev
];
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
  if(req.hostname !== 'localhost') {
    if (euCountries.indexOf(req.get('X-Request-Country')) >= 0) {
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
  console.log('called');
  res.send('<body><script src="http://pluto-cmp.com/cmp"></script></body>');
});

module.exports = router;