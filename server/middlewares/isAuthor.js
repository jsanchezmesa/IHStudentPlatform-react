module.exports = (author) => (req, res, next) => {
  if(req.user && req.user._id == author) {
    next();
  } else {
    return res.status(403).json({message: "Not author"});
  }
}