'use strict'

const express     = require('express');
const logger      = require('morgan');
const path        = require('path');

const app         = express();
const PORT        = process.argv[2] || process.env.port || 3009;

const taskRoutes  = require('./routes/tasks');

// set up some logging
app.use( logger( 'dev') );

app.use( '/tasks', taskRoutes );

// Let's go!
app.listen(PORT , ()=>
  console.log(`server here! listening on`, PORT )
)




app.get('/', (req,res)=>{
  res.send('home')
})
