var express = require("express");
var router = express.Router();
const fetch = require('node-fetch');
var pry = require("pryjs");
require("dotenv").config();
var Location = require('../../../models').Location;
var User = require('../../../models').User;
var UserLocation = require('../../../models').UserLocation;

router.post("/", function(req, res, next) {
  if (req.body.api_key) {
    User.findAll(
      {
        where: {
          api_key: req.body.api_key
        }
      }
    )
      .then(user => {
        if (user.length === 0) {
          res.setHeader("Content-Type", "application/json");
          res.status(401).send("Unauthorized access")
        } else {
          Location.findAll(
            {
              where: {
                location: req.body.location
              }
            }
          )
            .then(location => {
              var favorite;
              if (location.length === 0) {
                var geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${req.body.location}&key=${process.env.GEOCODING_KEY}`
                fetch(geocodingUrl)
                  .then(response => response.json())
                  .then(result => {
                    Location.create(
                      {
                        location: result.results[0].formatted_address,
                        lat: result.results[0].geometry.location.lat,
                        lng: result.results[0].geometry.location.lng
                      }
                    )
                      .then(new_location => {
                        favorite = new_location.dataValues;
                      })
                  })
              } else {
                favorite = location[0].dataValues;
              }
              UserLocation.create(
                {
                  UserId: user[0].dataValues.id,
                  LocationId: favorite.id,
                }
              )
                .then(userLocation => {
                    res.setHeader("Content-Type", "application/json");
                    res.status(200).send(JSON.stringify({message: `${favorite.location} has been added to your favorites`}));
                })
                .catch(error => {
                  res.setHeader("Content-Type", "application/json");
                  res.status(500).send({ error });
                });
            })
        }
      })
  } else {
    res.setHeader("Content-Type", "application/json");
    res.status(401).send("An authentic API key must be provided")
  }
});

router.get("/", function(req, res, next) {
  if (req.body.api_key) {
    User.findAll(
      {
        where: {
          api_key: req.body.api_key
        }
      }
    )
      .then(user => {
        if (user.length === 0) {
          res.setHeader("Content-Type", "application/json");
          res.status(401).send("Unauthorized access")
        } else {
          
        }
      })
  } else {
    res.setHeader("Content-Type", "application/json");
    res.status(401).send("An authentic API key must be provided")
  }
});

module.exports = router;
