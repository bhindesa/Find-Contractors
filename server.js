const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();
require('./api/config/database');
const methodOverride = require('method-override');


const customersRouter = require('./api/routes/customer')
const contractorsRouter = require('./api/routes/contractor');
const servicesRouter = require('./api/routes/service')

const app = express();
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));
app.use(methodOverride('_method'));

app.use('/api/customers', customersRouter);
app.use('/api/contractors', contractorsRouter);
app.use('/api/services', servicesRouter)

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });

const port = process.env.PORT || 3001;

app.listen(port, function() {
  console.log(`Express app running on port ${port}`)
});
