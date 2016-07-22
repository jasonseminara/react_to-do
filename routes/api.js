const express     = require('express');
const api         = express.Router();

const tokenService      = require('../service/tokenService')


/* get the database middleware */
const userService = require('../models/user')

const sendError = (err,req,res,next)=>res.status(500).json(err)

/* This is whre the user logs in */
api.post('/authenticate',
            userService.getUserByUsername,
            tokenService.createToken,
            sendError)

api.get('/', (req, res)=>
  res.json({ message: 'Welcome to the coolest API on earth!' })
)

module.exports = api;
