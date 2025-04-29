const express = require("express");
const router = express.Router();
const User = require("../models/user.js");

// form render route
router.get("/signup", (req, res) => {
  //   res.send("Hellos");
  res.render("users/signup.ejs");
});

// post route to add user
router.post("/signup", async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const newUser = await new User(username, email);
    newUser.register(newUser, password);
    console.log(newUser);
    res.send("User is beign added");
  } catch (er) {
    console.log(er);
  }
});

module.exports = router;
