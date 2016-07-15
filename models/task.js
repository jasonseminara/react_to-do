'use strict'
const pg = require('pg-promise')({
// Initialization Options
});

const config = {
  host:       process.env.DB_HOST,
  port:       process.env.DB_PORT,
  database:   process.env.DB_NAME,
  user:       process.env.DB_USER,
  password:   process.env.DB_PASS,
};

const _db = pg(config);

module.exports = {

  /* GET /tasks */
  getTasks(req, res, next) {
    _db.any("SELECT * from tasks;")
      .then( tasks=>{
        res.rows = tasks;
        next()
      })
      .catch( error=>{

        console.error('Error ', error);
        throw error;
      })
  },

  /* POST /tasks */
  /* creates a new task, returns the newly created record */
  addTask(req, res, next) {
    console.log('===addTask===',req.body)
    _db.any(
      `INSERT INTO tasks (task_name, task_desc) VALUES ($1, $2) returning *;` ,
      [ req.body.name , req.body.desc ]
      )
      .then( task=>{
        console.log('ADDED TASK SUCCESSFUL');
        res.rows = task;
        next();
      })
      .catch(error=>{
        console.error('ERROR in ADDING TASK!', error);
        throw error;
      })
  },
  /* PUT /tasks/:taskID */
  updateTask(req, res, next) {

    // tID is invented here
    req.body.tID = Number.parseInt(req.params.taskID);



    req.body.completed = !!req.body.completed;

    _db.one(
      `UPDATE tasks SET
      task_name = $/task_name/,
      task_desc = $/task_desc/,
      completed = $/completed/,
      task_time_start = $/task_time_start/,
      task_time_end = $/task_time_end/

      WHERE task_id = $/tID/
      returning *;  `,
      req.body)

      .then( task=>{
          console.log('ADDED UPDATED SUCCESSFULLY');
          res.rows = task;
          next();
        })
        .catch(error=>{
          console.error('ERROR in UPDATING TASK!', error);
          throw error;
        })
  },

  /* DELETE /tasks/:id */
  deleteTask(req, res, next) {
    const tID = Number.parseInt(req.params.taskID);

    _db.none(`
      DELETE FROM tasks
      WHERE task_id = $1
      `, [tID])

     .then( ()=>{
        console.log('DELETE COMPLETED');
        next();
      })
      .catch(error=>{
        console.error('ERROR in DELETING TASK!', error);
        throw error;
      })
  },
}












