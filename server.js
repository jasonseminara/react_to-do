'use strict';

// regular stuff
const express     = require('express');
const bodyParser  = require('body-parser');
const logger      = require('morgan');
const path        = require('path');

// This tests to see if we have NODE_ENV in our environment.
// Only load the dotenv if we need it.
const isDev = !('NODE_ENV' in process.env) && require('dotenv').config() && true;

const app    = express();
const PORT   = process.argv[2] || process.env.port || 3001;

// set up some logging
app.use(logger(isDev ? 'dev' : 'common'));

// we're only going to accept json
app.use(bodyParser.json());

// bring in the task routes
app.use('/tasks', require('./routes/tasks'));

// generic error handler
app.use((err, req, res, next) => {
  console.error(err, next);
  res.status(500).send('Something broke!');
});

app.use(express.static(path.join(__dirname, 'dist')));

// Let's go!
app.listen(PORT);
// app.listen(PORT, () => console.log(Object.keys(process.env).sort(), isDev));
