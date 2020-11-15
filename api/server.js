const express = require('express');
const helmet = require('helmet');

const carRouter = require('../cars/car-router.js');

const server = express();

server.use(helmet());
server.use(express.json());

server.use('/api/cars', carRouter)

server.get('/', (req, res) => {
    res.send(`<h2>Hello! It works!!!</h2>`);
  });

module.exports = server;