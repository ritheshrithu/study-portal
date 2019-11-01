const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");
const multer = require("multer");
const upload = multer();

// User Model
const User = require("../../models/User");

// @route   POST api/auth
// @desc    Auth user
// @access  Public
router.post("/login", upload.none(), (req, res) => {
  const { empid, password } = req.body;

  // Simple validation
  if (!empid) {
    return res.status(400).json({ empid: "Please enter empid" });
  } else if (!password) {
    return res.status(400).json({ password: "Please enter password" });
  }

  // Check for existing user
  User.findOne({ empid }).then(user => {
    if (!user) return res.status(400).json({ empid: "User Does not exist" });

    // Validate password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch)
        return res.status(400).json({ password: "Invalid credentials" });
      const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
        empid: user.empid,
        role: user.role,
        date: new Date()
      };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({ token, user });
        }
      );
    });
  });
});

// @route   GET api/auth/user
// @desc    Get user data
// @access  Private
router.get("/user", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then(user => res.json(user));
});

module.exports = router;
