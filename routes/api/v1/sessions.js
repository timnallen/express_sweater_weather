var express = require("express");
var router = express.Router();
var bcrypt = require("bcrypt");
var User = require('../../../models').User;

router.post("/", function(req, res, next) {
  User.findOne(
    {
      email: req.body.email
    }
  )
    .then(user => {
      if (bcrypt.compareSync(req.body.password, user.password_digest)) {
        res.setHeader("Content-Type", "application/json");
        res.status(201).send(JSON.stringify({api_key: user.api_key}));
      } else {
      res.status(401).send(JSON.stringify("Unauthorized access"));
      }
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({ error });
    });
});

module.exports = router;
