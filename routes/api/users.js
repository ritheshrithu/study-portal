const express = require("express");
const app = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const upload = multer();

const User = require("../../models/User");

app.post("/signup", upload.none(), (req, res) => {
  const { name, email, password, empid, role } = req.body;
  if (!name) {
    return res.status(400).json({ msg: "Please enter name" });
  }
  if (!email) {
    return res.status(400).json({ msg: "Please enter email" });
  }
  if (!password) {
    return res.status(400).json({ msg: "Please enter password" });
  }
  if (!empid) {
    return res.status(400).json({ msg: "Please enter empid" });
  }
  if (!role) {
    return res.status(400).json({ msg: "Please enter role" });
  }

  User.findOne({ empid }).then(user => {
    if (user) return res.status(400).json({ msg: "User already exists" });

    const newUser = new User({
      name,
      email,
      password,
      empid,
      role
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then(user => {
          jwt.sign(
            {
              id: user.id,
              name: user.name,
              email: user.email,
              empid: user.empid,
              role: user.role,
              date: new Date()
            },
            config.get("jwtSecret"),
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email,
                  empid: user.empid,
                  role: user.role
                }
              });
            }
          );
        });
      });
    });
  });
});

app.get("/getusers", (req, res) => {
  User.find(function(err, users) {
    if (err) {
      console.log(err);
    } else {
      res.json(users);
    }
  });
});

/*app.get("/editUser", (req, res) => {
  User.find(function(err, users) {
    if (err) {
      console.log(err);
    } else {
      res.json(users);
    }
  });
});*/

/*app.get("/deleteUser", (req, res) => {
  User.find(function(err, users) {
    if (err) {
      console.log(err);
    } else {
      res.json(users);
    }
  });
});
*/

module.exports = app;
