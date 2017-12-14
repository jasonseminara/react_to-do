# Handling Users, Generating Tokens

### Learning Objectives
 - [ ] 
 - [ ] 
 - [ ] 

## What we'll be doing

What happens when a new user is created? What should we do when that user comes back? How will we know if the user is allowed to come back?

## Exercises
### Step 1: Create Users

The top of `models/user.js` should look like this:
```
const _db     = require('./connection'); // use the db connection to taskdb
const bcrypt  = require('bcrypt');       // get the bcrypt library for hashing
const salt    = bcrypt.genSaltSync(10);  // create a string that has been hashed 10x over
```

We'll need a function to actually hash our 


 - promote the AjaxHandler to a TaskAjaxService
