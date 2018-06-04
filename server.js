// load node server modules
const os = require('os');
// setup express 
const express = require('express');
const app = express();

const PORT = 5000;

// self rolled modules imported here
const cmp = require('./routes/cmp');
const demo = require('./routes/demo');

// setup the routes
app.use('/cmp', cmp);
app.use('/demo', demo);

app.use(express.static('dist'));
app.use(express.static('/node_modules/uikit/dist/css/')); // TODO: try to remove

// fire up the server
app.listen(PORT, () => { 
    console.log(`CMP++ :: ExpressServer --> Running on: ${PORT}`);
});

// check node v9.8.0
console.log(`CMP++ :: ExpressServer --> NodeV:  ${process.version}`);
console.log(`CMP++ :: ExpressServer --> Arguments: ${process.argv[2]}`);