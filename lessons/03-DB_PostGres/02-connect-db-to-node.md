# 4. Exercise 4 

## Connect to the DB
 1. Create a `/models/task.js` file. This file will encapsulate all of your db interactions.
 3. The top of your `/models/task.js` file should look like this:

```
const pg = require('pg-promise')({
    // Initialization Options
});

const config = process.env.DATABASE_URL ||{
    host:       process.env.DB_HOST,
    port:       process.env.DB_PORT,
    database:   process.env.DB_NAME,
    user:       process.env.DB_USER,
    password:   process.env.DB_PASS,
  };

const _db = pg(config);
```
 5. Create `.env` file in the root of your server directory with the following contents 
    
```
DB_HOST=localhost
DB_USER=jseminara
DB_NAME=taskdb
DB_PORT=5432
NODE_ENV=development
```

 6. At the top of your `server.js`, add the following:
 
```
  require('dotenv').config();
  const env         = process.env.NODE_ENV || 'development';
  const DEV         = env === 'development';
```


## The part where the queries comes in.
  1. Back in `/models/task.js`, export an unnamed object with methods that will serve as middleware.
    1. `module.exports = {}`
  3. In `/routes/`, import your middleware from `/models/task.js`; name it `db`. 
  4. Build out your middleware with methods to interact with the database. Any results should be set to `res.rows`. (hint: CRUD)
  5. In your `/routes/tasks.js`, insert your new middleware in each of the corresponding routes.
  6. Your database methods are now updated and useable. 

## Test away!
  7. Your new API ONLY accepts `application/json`. Try creating some records. What happens if you delete something?

