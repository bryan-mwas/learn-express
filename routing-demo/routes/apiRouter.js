const express = require("express");
const allowedIps = ["::1"];

const api = express.Router();

// I can create router level middleware and routes in a router instance.

api.use((req, res, next) => {
  let userIsAllowed = allowedIps.indexOf(req.ip) !== -1;
  console.log(req.ip);
  if (!userIsAllowed) {
    res.status(403).send("Not authorized");
  } else {
    next();
  }
});

api.get('/users', (req, res) => {
    res.send('Users page');
});

module.exports = api;