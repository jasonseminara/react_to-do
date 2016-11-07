const tasks = require('express').Router();
const db = require('../model/task');

/* convenience method for sending */
const sendJSONresp = (req, res) => res.json(res.rows);

// tasks/:id
// this is more specific than the /tasks, so it goes above
tasks.route('/:taskID')
  .put((req, res) => res.json(`put tasks/${req.params.taskID}`))
  .delete((req, res) => res.json(`delete tasks/${req.params.taskID}`));

// tasks
// this is the most general route, so it goes last
tasks.route('/')
  .get(db.getTasks, sendJSONresp)
  .post(db.addTask, sendJSONresp);

// export this so it is available to server.js
module.exports = tasks;
