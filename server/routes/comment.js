const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment");
const isActive = require("../middlewares/isActive");
const isAuthor = require("../middlewares/isAuthor");

router.get("/user/:id", (req, res, next) => {
  Comment.find({user: req.params.id})
  .then(comments => res.status(200).json(comments))
  .catch(err => res.status(500).json({message: err}));
})

router.get("/event/:id", (req, res, next) => {
  Comment.find({event: req.params.id})
  .then(comments => res.status(200).json(comments))
  .catch(err => res.status(500).json({message: err}));
})

router.post("/new", isActive(), (req, res, next) => {
  const user = req.user._id;
  const {event, content} = req.body;
  const date = new Date();

  Comment.create({content, date, user, event})
  .then(comment => res.status(200).json(comment))
  .catch(err => res.status(500).json({message: err}));
})

router.post("/edit/:id", isAuthor(), (req, res, next) => {
  const {content} = req.body;

  Comment.findByIdAndUpdate(req.params.id, {content}, {new: true})
  .then(comment => res.status(200).json(comment))
  .catch(err => res.status(500).json({message: err}));
})

router.get("/delete/:id", isAuthor(), (req, res, next) => {
  Comment.findByIdAndRemove(req.params.id)
  .then(() => res.status(200).json({message: "Comment removed"}))
  .catch(err => res.status(500).json({message: err}));
})

module.exports = router;