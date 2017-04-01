const TaskDB = require('../model/task');

const tasks = require('express').Router();
const TaskSerializer = require('../serializers/task');

/* convenience method for sending */
const sendJSONresp = (req, res) => res.json(TaskSerializer.serialize(res.rows));

tasks.route('/:taskID/toggle')
  .patch(TaskDB.toggleField, sendJSONresp);

// tasks/:taskID
// this is more specific than the /tasks, so it goes first

tasks.route('/:taskID')
  .put(TaskDB.updateTask, sendJSONresp)
  .delete(TaskDB.deleteTask, (req, res) => res.send(req.params.taskID));

// tasks
// this is the most general route, so it goes last
tasks.route('/')
  .get(TaskDB.getTasks, sendJSONresp)
  .post(TaskDB.addTask, sendJSONresp);

// export this so it is available to server.js
module.exports = tasks;
