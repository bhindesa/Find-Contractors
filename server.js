const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();
require('./api/config/database');

const customersRouter = require('./api/routes/customer')
const contractorsRouter = require('./api/routes/contractor');
// const contractorsRouter = require('./api/routes/contractor')

const app = express();
app.use(cors())
app.use(logger('dev'));
app.use(express.json());

// Configure both serve-favicon & static middlewares
// to serve from the production 'build' folder


// app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

/* 
API route goes here.
*/

app.use('/api/customers', customersRouter);
app.use('/api/contractors', contractorsRouter);

// Put API routes here, before the "catch all" route
// The following "catch all" route (note the *)is necessary
// for a SPA's client-side routing to properly work
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
  

// Configure to use port 3001 instead of 3000 during
// development to avoid collision with React's dev server
const port = process.env.PORT || 3001;

app.listen(port, function() {
  console.log(`Express app running on port ${port}`)
});
