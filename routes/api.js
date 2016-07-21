const express     = require('express');
const api         = express.Router();

const tokenService      = require('../service/tokenService')


/* get the database middleware */
const userService = require('../models/user')

const sendError = (err,req,res,next)=>res.status(500).json(err)

api.post('/authenticate',
            userService.getUserByUsername,
            tokenService.createToken,
            sendError)

api.get('/', (req, res)=>
  res.json({ message: 'Welcome to the coolest API on earth!' })
)

api.post('/users',
    userService.createUser,
    (req,res) => res.status(201).json({data: 'success'}).end()
)

api.use( tokenService.validateToken )

api.get('/users', userService.listUsers, (req,res)=>
  res.json( res.users.map( user=>{
      /*only pull out the username and the id*/
      const {user_id,name} = user;
      return {user_id,name}
    })
  )
)
module.exports = api;
