'use strict'

const express     = require('express');
const logger      = require('morgan');
const path        = require('path');

const app         = express();
const PORT        = process.argv[2] || process.env.port || 3009;


// set up some logging
app.use( logger( 'dev') );

// Let's go!
app.listen(PORT , ()=>
  console.log(`server here! listening on`, PORT )
)

app.route('/tasks/:id')
  .get((req,res)=>res.send(`showed task ${req.params.id}`))
  .put((req,res)=>res.send(`edited task ${req.params.id}`))
  .delete((req,res)=>res.send(`deleted task ${req.params.id}`))

app.route('/tasks')
  .get((req,res)=>res.send('show tasks'))
  .post((req,res)=>res.send('posted new task'))


app.get('/', (req,res)=>{
  res.send('home')
})
