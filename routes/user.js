const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const passport = require("passport");
const wrapAsync = require("../util/wrapAsync.js");
const { saveRedirectUrl } = require("../middleware.js");

// form render route
router.get("/signup", (req, res) => {
  //   res.send("Hellos");
  res.render("users/signup.ejs");
});

// post route to add user
router.post(
  "/signup",
  wrapAsync(async (req, res) => {
    try {
      let { username, email, password } = req.body;
      const newUser = new User({ email, username });
      const regUser = await User.register(newUser, password);
      req.login(regUser, (err) => {
        if (err) {
          return next(err);
        }
        req.flash("success", "Welcome to Wonderlust");
        res.redirect("/listings");
      });
    } catch (er) {
      req.flash("error", er.message);
      res.redirect("/signup");
    }
  })
);

router.get("/login", (req, res) => {
  res.render("users/login.ejs");
});

router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  async (req, res) => {
    req.flash("success", "Welcome Back! You are Logged in...");
    // res.send("use login success");
    let redirectUrlsave = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrlsave);
  }
);

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You are Logged Out from Wonderlust");
    res.redirect("/listings");
  });
});

module.exports = router;
