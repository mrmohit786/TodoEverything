const express = require("express");
const { check, validationResult } = require("express-validator");
const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const Auth = require("./middleware");
const router = express.Router();

//@route  POST api/register
router.post(
  "/api/register",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please add a valid Email").isEmail(),
    check(
      "password",
      "Please enter password with minimum 6 characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) return res.status(404).json("User already exist");

      user = new User({ name, email, password });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();
      res.json(user);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server error");
    }
  }
);

//@route  POST api/login
router.post(
  "/api/login",
  [
    check("email", "Please add a valid Email").isEmail(),
    check(
      "password",
      "Please enter password with minimum 6 characters"
    ).exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) return res.status(404).json("Invalid Credentials");

      const matchPassword = await bcrypt.compare(password, user.password);

      if (!matchPassword) {
        return res.status(400).json("Invalid Credentials");
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("secret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) {
            throw err;
          }
          return res.send({ token });
        }
      );
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server error");
    }
  }
);

//@route  GET  api/profile
router.get("/api/profile", Auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json("User not found");
    }

    res.json(user);

    res.send;
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Internal Server Error");
  }
});

//@route  DELETE  api/profile
router.delete("/api/profile", Auth, async (req, res) => {
  const user = await User.findByIdAndDelete(req.user.id);
  if (!user) {
    return res.status(404).json("User not found");
  }

  res.json("User Deleted");
});

//@route PUT api/profile
router.put(
  "/api/profile",
  [
    Auth,
    [
      check("name", "Name is required").not().isEmpty(),
      check("email", "Please add a valid Email").isEmail(),
      check(
        "password",
        "Please enter password with minimum 6 characters"
      ).isLength({ min: 6 }),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { name, password } = req.body;

    try {
      let user = await User.findById(req.user.id);

      if (!user) {
        return res.status(404).json("user not found");
      }

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      user.name = name;

      user = await user.save();

      res.json(user);
    } catch (error) {
      console.log(error.message);
      res.status(500).json("Internal Server Error");
    }
  }
);

module.exports = router;
