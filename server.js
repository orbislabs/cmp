// check node v9.8.0
console.log(`Node:  ${process.version}`);

// setup express
const express = require('express');
const app = express();

// self rolled modules imported here
const script = require('./routes/script');

// setup the routes
app.use('/script', script);
app.use(express.static('public'))

// fire up the server
app.listen(3999, () => { 
    console.log('CMP++ :: ExpressServer --> listening on PORT : 3999');
});