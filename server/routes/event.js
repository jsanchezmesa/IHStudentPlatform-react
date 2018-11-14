const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const isActive = require("../middlewares/isActive");
const isAuthor = require("../middlewares/isAuthor");
const googleMapsClient = require("@google/maps").createClient({
  key: process.env.MAPSAPI,
  Promise: Promise
});

router.get("/", (req, res, next) => {
  Event.find()
    .then(events => res.status(200).json(events))
    .catch(err => res.status(500).json(err));
});

router.post("/new", isActive(), (req, res, next) => {
  const author = req.user._id;
  const { title, description, address, date } = req.body;

  googleMapsClient
    .geocode({ address })
    .asPromise()
    .then(data => {
      let lat = data.json.results[0].geometry.viewport.northeast.lat;
      let lng = data.json.results[0].geometry.viewport.northeast.lng;

      const location = {
        type: "Point",
        coordinates: [lat, lng]
      };

      Event.create({ title, description, date, author, location, address })
        .then(event => res.status(200).json(event))
        .catch(err => res.status(500).json(err));
    })
    .catch(err => res.status(500).json(err));
});

router.post("/edit/:id", isAuthor(), (req, res, next) => {
  const { title, description, address, date } = req.body;
  const id = req.params.id;
  const updates = {};

  if(title) { updates['title'] = title; }
  if(description) { updates['description'] = description; }
  if(date) { updates['date'] = date; }

  if(address) {

    googleMapsClient
      .geocode({ address })
      .asPromise()
      .then(data => {
        let lat = data.json.results[0].geometry.viewport.northeast.lat;
        let lng = data.json.results[0].geometry.viewport.northeast.lng;
  
        const location = {
          type: "Point",
          coordinates: [lat, lng]
        };

        updates['location'] = location;
  
        Event.findByIdAndUpdate(id, updates, {new: true})
        .then(event => res.status(200).json(event))
        .catch(err => res.status(500).json(err));
      });
  } else {
    console.log(updates);
    Event.findByIdAndUpdate(id, updates, {new: true})
    .then(event => res.status(200).json(event))
    .catch(err => res.status(500).json(err));
  }

});

router.get("/delete/:id", isAuthor(), (req, res, next) => {
  Event.findByIdAndRemove(req.params.id)
  .then(event => res.status(200).json({message: "Event removed"}))
  .catch(err => res.status(500).json(err));
})

module.exports = router;
