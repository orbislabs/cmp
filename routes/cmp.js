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
  console.log('###########    START OF REQUEST     ##########');
  console.log('--------------------------------------------------------------------------------------------');
  console.log(`CMP++ :: ExpressServer --> ${req.method} From ${req.originalUrl} @ Time : ${Date.now()}`);
  console.log(`CMP++ :: ExpressServer --> Referer : ${req.get('referer')} & Fresh : ${req.fresh}`);
  console.log(`CMP++ :: ExpressServer --> User Country:  ${req.get('X-Request-Country')}`);
  console.log('express-cookies: ', req.cookies);
  console.log('nginx-cookies', req.get('X-Cookie-Euconsent'));
  console.log('--------------------------------------------------------------------------------------------');
  console.log('all-headers', req.headers)
  console.log('--------------------------------------------------------------------------------------------');
  console.log('######        END OF REQUEST        ############');
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
  res.set({
    'Access-Control-Allow-Origin': req.get('Origin'),
    //'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    'Access-Control-Allow-Credentials': 'true'
  });
  res.cookie(req.query.n, req.query.c, { maxAge: 33696000, domain: '.consensu.org' });
  res.end();
});

module.exports = router;