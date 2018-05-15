// check node v9.8.0
console.log(`Node:  ${process.version}`);

// setup express
const express = require('express');
const app = express();

// self rolled modules imported here
const cmp = require('./routes/cmp');
const demo = require('./routes/demo');

// setup the routes
app.use('/cmp', cmp);
app.use('/demo', demo);

app.use(express.static('dist'));
app.use(express.static('/node_modules/uikit/dist/css/')); // TODO: try to remove

// fire up the server
app.listen(3999, () => { 
    console.log('CMP++ :: ExpressServer --> listening on PORT : 3999');
});