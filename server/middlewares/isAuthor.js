const Event = require("../models/Event");

module.exports = () => (req, res, next) => {
  if(req.user) {
    Event.findById(req.params.id) 
    .then(event => {
      if(req.user._id.toString() == event.author.toString()) {
        next();
      } else {
        return res.status(403).json({message: "Not author"});
      }
    })
  } else {
    return res.status(403).json({message: "Not loggedin user"});
  }
}