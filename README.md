# React To Do

A multi-day code-a-long to build a fully-functional CRUD application with React. 

## Note
This project uses a custom implementation of [Webpack](https://webpack.js.org/) (not [create-react-app](https://github.com/facebookincubator/create-react-app)). As such, it may be constructed differently than what you've seen until now. 

We've also created lots of scripts to keep help you do develop and deploy:
  
  - `"dev": "nodemon server.js"`,
  - `"start": "node server.js"`,
  - `"debug": "nodemon --inspect-brk server.js"`,
  - `"test": "NODE_ENV=test PORT=3333 mocha --recursive --reporter spec"`,
  - `"build": "webpack -p"`,
  - `"build-dev": "webpack -d --progress"`,
  - `"build-watch": "webpack -d --progress --watch"`,
  - `"clean": "rm -rf dist && rm -rf node_modules"`,
  - `"heroku-prebuild": "scripts/deployment_react.sh"`,
  - `"heroku-postbuild": "scripts/deployment_cleanup.sh"`

## Technologies used and concepts covered

 - EcmaScript 6/2015
 - Node.js / Express.js
 - RESTful routing
 - BodyParser and data handling
 - Persistent data
 - Relational database concepts (postgres)
 - RDBMS relations (SQL joins)
 - React Basics
 - React application flow
 - React Router
 - Authentication (JWT)


## System Description

The application will allow the user to create, modify and delete a to-do item. The items will be persisted in a relational database.

### User Stories

 1. As a User, I should be able to add a to-do item into a list.
 2. As a User, I should be able to edit the text of a task after it has been created, **but not once it's been deleted**. 	
 2. As a User, I should be able to mark a task as complete.
 3. As a User, I should be able to mark as completed task as incomplete. 
 4. As a User, I expect the tasks should be sorted by complete/incomplete, and always be sorted by date/time, descending.
 5. As a User, I should be able to delete any completed tasks.
 5. As a User, my tasks should persist, such that my previous tasks should display upon each visit.

## How to Get Started
1. Fork this repo.
2. Clone your new repo
3. Add a new remote to receive updates: `git remote add upstream git@github.com:ga-wdi-exercises/react_to-do.git`


## Licensing
 1. All content is licensed under a CC­BY­NC­SA 4.0 license.
 2. All software code is licensed under GNU GPLv3. For commercial use or alternative licensing, please contact legal@ga.co.
