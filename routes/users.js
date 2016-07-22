const express     = require('express');
const users         = express.Router();

const tokenService      = require('../service/tokenService')


/* get the database middleware */
const userService = require('../models/user')

const sendError = (err,req,res,next)=>res.status(500).json(err)


users.post('/',
    userService.createUser,
    (req,res) => res.status(201).json({data: 'success'}).end()
)

users.use( tokenService.validateToken )

users.get('/', userService.listUsers, (req,res)=>
  res.json( res.users.map( user=>{
      /*only pull out the username and the id*/
      const {user_id,name} = user;
      return {user_id,name}
    })
  )
)
module.exports = users;
