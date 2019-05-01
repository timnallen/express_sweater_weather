var express = require("express");
var router = express.Router();
var bcrypt = require("bcrypt");
var crypto = require("crypto");
var pry = require("pryjs");
var User = require('../../../models').User;

router.post("/", function(req, res, next) {
  if (req.body.password === req.body.password_confirmation) {
    var apiKey = apiKeyGenerator();
    User.create(
      {
        email: req.body.email,
        password_digest: bcrypt.hashSync(req.body.password, 10),
        api_key: apiKey
      }
    )
      .then(user => {
        res.setHeader("Content-Type", "application/json");
        res.status(201).send(JSON.stringify({api_key: user.api_key}));
      })
      .catch(error => {
        res.setHeader("Content-Type", "application/json");
        res.status(500).send({ error });
      });
  } else {
    res.setHeader("Content-Type", "application/json");
    res.status(401).send("Passwords do not match")
  }
});

function apiKeyGenerator() {
  return crypto.randomBytes(20).toString('hex');
};

module.exports = router;
