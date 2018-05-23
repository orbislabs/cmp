// load node server modules
const os = require('os');
// setup express 
const express = require('express');
const app = express();

// config based on DEV or PROD profiles
/* const host = os.networkInterfaces().lo0[0].address;
let HOST;

if (host == '127.0.0.1') {
    PORT = 3999;
    HOST = 'localhost';
    process.env.NODE_ENV = 'development';
} else {
    PORT = 3999;
    HOST = host;
    process.env.NODE_ENV = 'production';
} */

const profile = process.argv[2];
let PORT;
if (profile == 'dev') {
    PORT = 5000;
} else {
    PORT = process.env.PORT || 80;
}

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
//console.log(`Server IP:  ${host}`);
//console.log(`Env:  ${JSON.stringify(process.env.NODE_ENV)}`);