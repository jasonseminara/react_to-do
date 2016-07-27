# Create a User Model

###Learning Objectives
 - [ ] Use Bcrypt to hash passwords for additional security
 - [ ] Differentiate server sessions and **token-based authentication**
 - [ ] Compare hashing an encryption

## What we'll be doing

We'll create a users database in order to store our user data. Since we should _never_ store passwords in the clear, we'll be using a library called `BCrypt` to hash our passwords. We'll also 
be leaving the world of server sessions and into the stateless world of the web and authentication tokens. 



## Hashing vs Encryption
Hashing is one-directional and cannot be undone. This is in contrast to encryption which is reversable and can be decrypted with the same key. 

>Since a string cannot be unhashed how can we use it?

Easy! We hash another string using the same method, and compare them to see if it's the same result.

## Why Tokens?
Our application is no longer rendered on the back-end, and we no longer have a concept of "pages" and "page refreshes". Instead we have an untethered front-end application whose state we're not aware of from the server. The best we can do is authorize access to our resources on the server upon request. 

What this means is that we'll generate and send a unique token when the user is authenticated. When the user returns, they'll present to us the time-sensitive token. This token will have encrypted within it, a secret that we set. Once decrypted, we'll be able to read the information about this user and decide whether or not to deliver the requested content/data.   

## Exercises
### Step 1 Create a User Database

We'll need to be able to store user information in our db, so let's create a new table in `taskdb` to do just that. 

```
\c taskdb
```

add to your `/db/schema.sql`:
```
DROP TABLE IF EXISTS users;
CREATE TABLE users (
  user_id serial unique primary key,
  name VARCHAR(50) unique,
  email VARCHAR(255) unique not null,
  password_digest TEXT not null,
  user_created timestamp not null default now()
);
CREATE INDEX on users (username) ;
CREATE INDEX on users (email) ;
```
**Note:** the password will be stored as a hashed string, since we'll _**never**_ store clear-text passwords.

We won't be able to manually insert data into users since we don't know how to hash, so we'll do it through the application. Let's get a library to do this for us: `npm i -S bcrypt`

### Step 2. User Model + User Routes

1. Create `/models/user.js` to interface with the database. Notice that this file will be almost identical to `/models/tasks.js`. 
2. Node is not going to like two connections to the database, so let's move the connection info into another file called `/models/connection.js` and `require` it in both `/models/tasks.js` and `/models/user.js`
3. `/models/user.js` will simply export an object with methods that are middleware `(req,res,next)`. We'll need the following methods
    1. `getUserByUsername` : When the user tries to log in, we'll search by the username and then compare passwords
    2. `createUser` : When the user creates an account
    3. `listUsers` : shows all users in the db; we'll use this during testing, and disable it in production
4. We'll need some new routing. We'll split this into two different files, so we don't get lost. The first two go in: `/routes/api.js`, and the other two go in `/routes/users.js`
    1. `GET /api` : a dumb message just in case
    2. `POST /api/authenticate` : post login creds here
    3. `POST /api/users` : creates a user 
    4. `GET /api/users` : lists all users (in the future, only admins can do this)
5. Wire up the routes:
    1. Make sure to bring into your `server.js` these two new routers as `/api` and `/api/users`, respectively.
    2. Both routers need access to our user model. Put this in each of them:
        1. `const userService = require('../models/user')`
    3. Don't forget to export the router within each router file:


###Step 3. Creating Users

The top of `models/user.js` should look like this:
```
const _db     = require('./connection'); // use the db connection to taskdb
const bcrypt  = require('bcrypt');       // get the bcrypt library for hashing
const salt    = bcrypt.genSaltSync(10);  // create a string that has been hashed 10x over
```

We'll need a function to actually hash our passwords (this function should not be exported; it will live outside the `export` statments):

```
const createSecure = (password)=>
  new Promise( (resolve,reject)=>
    bcrypt.genSalt( (err, salt)=>
      bcrypt.hash(password, salt, (err, hash)=>
        resolve(hash)
      )
    )
  )

```

The `createUser` routine is a bit complicated because it's wrapped in a promise so we can make pretty code

```
createUser(req, res, next) {
    // hash the password
    createSecure(req.body.email, req.body.password, saveUser);

    function saveUser(email, hash) {

