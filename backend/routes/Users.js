const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { check, validationResult } = require("express-validator/check");
router.get("/test", (req, res) => {
  res.send("Test route : Users");
});

//@route :  "/"
//@access: public
//@desc  : Get all the users from the database
router.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0) {
      return res
        .status(404)
        .json({ msg: "No user is not present in the database" });
    }
    return res.json({ users });
  } catch (error) {
    return res.status(500).json({ msg: "Server error" });
  }
});

//@route :  "/add"
//@access: public
//@desc  : create new user and save it to database
router.post(
  "/add",
  [check("username", "Please Enter the username").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { username } = req.body;
      const user = new User({ username });
      await user.save();
      console.log("Use added");
      return res.json({ user, msg: "User Added" });
    } catch (error) {
      return res.status(500).json({ msg: "Server error" });
    }
  }
);
module.exports = router;
