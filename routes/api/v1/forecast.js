var express = require("express");
var router = express.Router();
const fetch = require('node-fetch');
var pry = require("pryjs");
require("dotenv").config();
var User = require('../../../models').User;
var ForecastFinder = require('../../../models').ForecastFinder;

router.get("/", function(req, res, next) {
  if (req.body.api_key !== undefined) {
    User.findOne({ where: {api_key: req.body.api_key} })
      .then(user => {
        if (user !== null) {
          var forecastFinder = new ForecastFinder(req.query.location, res);
          forecastFinder.findForecast();
        } else {
          res.setHeader("Content-Type", "application/json");
          res.status(401).send(JSON.stringify("Unauthorized access"));
        }
      })
      .catch(error => {
        res.setHeader("Content-Type", "application/json");
        res.status(500).send({ error });
      });
  } else {
    res.status(401).send(JSON.stringify("Unauthorized access"));
  };
});

module.exports = router;
