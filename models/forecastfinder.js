"use strict";
const fetch = require('node-fetch');

var pry = require("pryjs");
require("dotenv").config();

class ForecastFinder {
  constructor(location, res) {
    this.res = res,
    this.location = location,
    this.geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${process.env.GEOCODING_KEY}`
  }

  findForecast() {
    var forecast;
    var locationFormatted;
    fetch(this.geocodingUrl)
      .then(response => response.json())
      .then(result => {
        let coordinates = result.results[0].geometry.location;
        locationFormatted = result.results[0].formatted_address;
        let darkSkyUrl = `https://api.darksky.net/forecast/${process.env.DARKSKY_KEY}/${coordinates.lat},${coordinates.lng}`;
        return fetch(darkSkyUrl)
      })
      .then(response => response.json())
      .then(result => {
        forecast = {
          location: locationFormatted,
          currently: result.currently,
          hourly: result.hourly,
          daily: result.daily
        }
          this.res.setHeader("Content-Type", "application/json");
          this.res.status(201).send(JSON.stringify(forecast));
      })
      .catch(error => {
        this.res.setHeader("Content-Type", "application/json");
        this.res.status(500).send({ error });
      });
  };
};

module.exports = function() {
  return ForecastFinder
}
