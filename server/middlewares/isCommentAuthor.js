const Comment = require("../models/Comment");

module.exports = () => (req, res, next) => {
  if(req.user) {
    Comment.findById(req.params.id) 
    .then(comment => {
      if(req.user._id.toString() == comment.user.toString()) {
        next();
      } else {
        return res.status(403).json({message: "Not author"});
      }
    })
  } else {
    return res.status(403).json({message: "Not loggedin user"});
  }
}