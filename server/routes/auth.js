const express = require("express");
const passport = require('passport');
const authRoutes = express.Router();
const User = require("../models/User");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

authRoutes.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/auth/login",
  failureFlash: true,
  passReqToCallback: true
}));

authRoutes.post("/signup", (req, res, next) => {
  const {username, password, email} = req.body;
  if (username === "" || password === "" || email === "") {
    return res.status(500).json({ message: "Indicate username, password and email" });
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      return res.status(500).json({ message: "The username already exists" });
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);
    const confirmationCode = encodeURIComponent(bcrypt.hashSync(username, salt));

    const newUser = new User({
      username,
      password: hashPass,
      email,
      confirmationCode
    });

    newUser.save((err, user) => {
      if (err) {
        return res.status(500).json({message: "Something went wrong"});
      } else {
        return res.status(200).json(user);
      }
    });
  });
});

authRoutes.get("/logout", (req, res) => {
  req.logout();
  return res.status(200).json({message: "Logout successful"});
});

authRoutes.get("/loggedin", (req, res) => {
  if(req.user) {
    return res.status(200).json(req.user);
  } else {
    return res.status(403).json({message: "Not loggedin user"});
  }
})

module.exports = authRoutes;
