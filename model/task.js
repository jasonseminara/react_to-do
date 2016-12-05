const pg = require('pg-promise')({/* OPTIONAL Initialization Options */});

const config = {
  host:       process.env.DB_HOST,
  port:       process.env.DB_PORT,
  database:   process.env.DB_NAME,
  user:       process.env.DB_USER,
  password:   process.env.DB_PASS,
};

const db = pg(config);

module.exports = {

  /* GET /tasks */
  getTasks(req, res, next) {
    db.any('SELECT * from task;')
      .then((tasks) => {
        res.rows = tasks;
        next();
      })
      .catch(error => next(error));
  },

  /* POST /tasks */
  /* creates a new task, returns the newly created record */
  addTask(req, res, next) {
    console.log('===addTask===',req.body);
    db.one(`
      INSERT INTO task (name, description)
      VALUES ($/name/, $/desc/) returning *;
      `, req.body
      )

      .then((task) => {
        console.log('ADDED TASK SUCCESSFUL');
        res.rows = task;
        next();
      })
      .catch(error => next(error));
  },

  /* PUT /tasks/:taskID */
  toggleField(req, res, next) {
    // tID is invented here
    req.body.tID = Number.parseInt(req.params.taskID);

    db.one(`
      UPDATE task SET
      $/field:name/ = NOT $/field:name/
      WHERE id = $/tID/
      returning *;
      `, req.body)

      .then((task) => {
        console.log(`UPDATED ${req.body.field} SUCCESSFULLY`);
        res.rows = task;
        next();
      })
      .catch(error => next(error));
  },

  /* PUT /tasks/:taskID */
  updateTask(req, res, next) {
    // tID is invented here
    req.body.tID = Number.parseInt(req.params.taskID);

    // coerce into boolean
    req.body.completed = !!req.body.completed;

    db.one(`
      UPDATE task SET
      name = $/name/,
      description = $/description/,
      completed = $/completed/,
      WHERE id = $/tID/
      returning *;
      `, req.body)

      .then((task) => {
        console.log('ADDED UPDATED SUCCESSFULLY');
        res.rows = task;
        next();
      })
      .catch(error => next(error));
  },

  /* DELETE /tasks/:id */
  deleteTask(req, res, next) {
    const tID = Number.parseInt(req.params.taskID, 10);

    db.none(`
      DELETE FROM task
      WHERE id = $1
      `, tID)

    .then(() => {
      console.log('DELETE COMPLETED');
      next();
    })
    .catch(error => next(error));
  },
}
