const home = require('express').Router();

home.get('/', (req, res) => res.json('homepage'))

module.exports = home;
