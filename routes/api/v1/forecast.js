var express = require("express");
var router = express.Router();
const fetch = require('node-fetch');
var pry = require("pryjs");
require("dotenv").config();
var User = require('../../../models').User;

router.get("/", function(req, res, next) {
  if (req.body.api_key !== undefined) {
    User.findOne({ where: {api_key: req.body.api_key} })
      .then(user => {
        if (user !== null) {
          var geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${req.query.location}&key=${process.env.GEOCODING_KEY}`
          var locationName;
          fetch(geocodingUrl)
            .then(response => response.json())
            .then(result => {
              let location = result.results[0].geometry.location
              locationName = result.results[0].formatted_address
              let darkSkyUrl = `https://api.darksky.net/forecast/${process.env.DARKSKY_KEY}/${location.lat},${location.lng}`
              return fetch(darkSkyUrl)
            })
            .then(response => response.json())
            .then(result => {
              let forecast = {
                location: locationName,
                currently: result.currently,
                hourly: result.hourly,
                daily: result.daily
              }
              res.setHeader("Content-Type", "application/json");
              res.status(201).send(JSON.stringify(forecast));
            })
            .catch(error => {
              res.setHeader("Content-Type", "application/json");
              res.status(500).send({ error });
            });
        } else {
          res.status(401).send(JSON.stringify("Unauthorized access"));
        }
      });
  } else {
    res.status(401).send(JSON.stringify("Unauthorized access"));
  };
});

module.exports = router;
