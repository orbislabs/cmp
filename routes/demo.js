// setup express routing
const express = require('express');
const router = express.Router();
const path = require('path');
const rootPath = path.join(__dirname, '../demo' );
const distPath = path.join(__dirname, '../dist' );

// middleware logging a request to this route
router.use(function timeLog (req, res, next) {
    console.log('GET /demo @ Time : ', Date.now());
    next();
});

// The below route serves the static html for the demo page.
router.get('/', (req,res) => {
    res.sendFile('index.html', { root : rootPath });
});
// This sends the JS for the functionality of the page
router.get('/logic', (req,res) => {
    res.sendFile('demo.bundle.js', { root : distPath });
});

// This is sending a page which has only an iframe pointing to
// dist/index.html -> serving app inside iFrame
router.get('/frame', (req,res) => {
    res.sendFile('frame.html', { root : rootPath });
});

// This is sending a page which has a GTM tag
router.get('/gtm', (req,res) => {
  res.sendFile('gtm.html', { root : rootPath });
});
router.get('/gtm2', (req,res) => {
  res.sendFile('gtm2.html', { root : rootPath });
});

module.exports = router;