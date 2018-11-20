require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Event = require("../models/Event");

const bcryptSalt = 10;

const salt = bcrypt.genSaltSync(bcryptSalt);
const hashPass = bcrypt.hashSync("1234", salt);

mongoose
  .connect(process.env.DBURL)
  .then(() =>
    User.create({
      username: "juan",
      password: hashPass,
      email: "juan@juan.com",
      imgPath: "",
      fullName: "Juan SM",
      confirmationCode: "",
      isActive: true,
      isAdmin: true
    })
  )
  .then(user => 
    Event.create({
      title: 'Evento de prueba',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis suscipit earum quibusdam eos quasi explicabo quaerat qui, illum aspernatur natus optio fugit incidunt ullam repellendus ipsa, nostrum voluptate alias commodi.',
      date: Date.now(),
      address: 'Paseo de la chopera 14 Madrid',
      location: {
        type: 'Point',
        coordinates: [40.3936522802915, -3.696081019708497]
      },
      author: user._id,
      imagePath: ''
    })
  )
  .then(() => mongoose.disconnect())
  .catch(err => console.log(`MONGO ERROR: ${err}`));
