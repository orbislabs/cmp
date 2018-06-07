require('dotenv').config()
//process.env.NODE_ENV = 'production'
// load node server modules
const os = require('os');
// setup express 
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')

const PORT = process.env.PORT_PRODUCTION;
const cmp = require('./routes/cmp');
// setup the routes
app.use(cookieParser())
app.use('/cmp', cmp);
app.use(express.static('dist'));

// fire up the server
app.listen(PORT, () => { 
    console.log(`CMP++ :: ExpressServer --> Mode : ${process.env.NODE_ENV}`);
    console.log(`CMP++ :: ExpressServer --> NodeV :  ${process.version}`); // node v9.8.0 -> needs to be updated
    console.log(`CMP++ :: ExpressServer --> Port : ${PORT}`);
});
