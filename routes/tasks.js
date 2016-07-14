const express     = require('express');
const tasks       = express.Router();

let taskData = [];
//const sendString = (req,res)=>res.send(`showed task ${req.params.id}`)

tasks.route('/:id')
  .get((req,res)=>res.send(`showed task ${req.params.id}`))
  .put((req,res)=>res.send(`edited task ${req.params.id}`))
  .delete((req,res)=>res.send(`deleted task ${req.params.id}`))

tasks.route('/')
  .get((req,res)=>res.send('show tasks'))
  .post((req,res)=>res.send('posted new task'))


module.exports = tasks;
