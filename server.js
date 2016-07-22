'use strict'

// This tests to see if we have an environment.
// Only load the dotenv if we need it.
const env         = process.env.NODE_ENV || 'development';
const DEV         = env==='development';
const dotenv      = DEV && require('dotenv').config();

// regular stuff
const express     = require('express');
const bodyParser  = require('body-parser');
const logger      = require('morgan');
const path        = require('path');

const app         = express();
const PORT        = process.argv[2] || process.env.PORT || 3000;
// must be first!
app.use(require('compression')())

app.set('superSecret', 'my super secret word')

// set up some logging
app.use( logger( DEV ? 'dev' : 'common') );

// we're only going to accept json
app.use(bodyParser.json());

// bring in the  routes
app.use( '/api',        require('./routes/api')   );
app.use( '/api/users',  require('./routes/users') );
app.use( '/tasks',      require('./routes/tasks') );

app.use( express.static(path.join(__dirname, 'dist')))


// Let's go!
app.listen(PORT , ()=> console.log(`server here! listening on`, PORT ) )

app.get('*', (req, res)=>
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
)
