process.env.NODE_ENV = process.env.NODE_ENV || 'production';
require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const cmp = require('./routes/cmp');
const api = require('./routes/api');

if (process.env.NODE_ENV === 'production') {
  process.env.PORT = process.env.PORT_PRODUCTION || 5000;
} else if (process.env.NODE_ENV === 'staging') {
  process.env.PORT = process.env.PORT_STAGING || 6000;
} else {
  process.env.PORT = process.env.PORT_DEVELOPMENT || 5000;
}

const app = express();

app.use(cookieParser());
app.use('/cmp', cmp);
app.use('/api', api);
app.use(express.static('../dist'));
app.use(express.static('../public'));

// fire up the server
app.listen(process.env.PORT, () => {
  console.log(`CMP++ :: ExpressServer --> Mode : ${process.env.NODE_ENV}`);
  console.log(`CMP++ :: ExpressServer --> NodeV :  ${process.version}`); // TODO: node v9.8.0 -> needs to be updated
  console.log(`CMP++ :: ExpressServer --> Port : ${process.env.PORT}`);
});
