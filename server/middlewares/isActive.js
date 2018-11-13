module.exports = () => (req, res, next) => {
  if(req.user && req.user.isActive) {
    next();
  } else {
    return res.status(403).json({message: "Active your account"});
  }
}