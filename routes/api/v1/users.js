var express = require("express");
var router = express.Router();
var bcrypt = require("bcrypt");
var crypto = require("crypto");
const saltRounds = 10;
var User = require('../../../models').User;

router.post("/", function(req, res, next) {
  if (req.body.password === req.body.password_confirmation) {
    var api_key = api_key();
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
      User.create(
        {
          email: req.body.email,
          password_digest: hash,
          api_key: api_key
        }
      )
        .then(user => {
          res.setHeader("Content-Type", "application/json");
          res.status(201).send(JSON.stringify({api_key}))
        })
        .catch(error => {
          res.setHeader("Content-Type", "application/json");
          res.status(500).send({ error });
        });
      });
  } else {
    res.setHeader("Content-Type", "application/json");
    res.status(401).send({"Passwords do not match."})
  }
});

function api_key() {
  // do {
    var api_key = crypto.randomBytes(20).toString('hex');
  // }
  // while (User.findOne({ where: {api_key: api_key} }) !== null);
  return api_key
};

module.exports = router;
