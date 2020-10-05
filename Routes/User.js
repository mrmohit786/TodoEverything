const express = require("express");
const { check } = require("express-validator");

const router = express.Router();

//@route  POST api/signup
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please add a valid Email").isEmail(),
    check(
      "password",
      "Please enter password with minimum 6 characters"
    ).isLength({ min: 6 }),
  ],
  signup
);
module.exports = router;
