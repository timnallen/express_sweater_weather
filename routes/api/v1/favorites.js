var express = require("express");
var router = express.Router();
var pry = require("pryjs");
var Location = require('../../../models').Location;

router.post("/", function(req, res, next) {
  Location.findAll({
    where: {
      location: req.body.location
    }
  })
    .then(location => {
      if (location.length === 0) {
        
      }
    })
})

module.exports = router;
