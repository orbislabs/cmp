// load node server modules
const os = require('os');
// setup express 
const express = require('express');
const app = express();

const PORT = 5000;
const cmp = require('./routes/cmp');
// setup the routes
app.use('/cmp', cmp);
app.use(express.static('dist'));

// fire up the server
app.listen(PORT, () => { 
    console.log(`CMP++ :: ExpressServer --> Running on: ${PORT}`);
});

// check node v9.8.0
console.log(`CMP++ :: ExpressServer --> NodeV:  ${process.version}`);
console.log(`CMP++ :: ExpressServer --> Port: ${PORT}`);