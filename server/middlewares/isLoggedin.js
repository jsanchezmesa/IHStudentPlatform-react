module.exports = () => (req, res, next) => {
  if(req.user) {
    next();
  } else {
    return res.status(403).json({message: "Not loggedin user"})
  }
}