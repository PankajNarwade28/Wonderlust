const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("connect-flash");
const PORT = 2025;
const path = require("path");
const MONGOURL = "mongodb://127.0.0.1:27017/wonderlust";
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const ExpressError = require("./util/ExpressError.js");
// setting up session
const sessionOption = {
  secret: "secretsuperkey",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};
app.use(session(sessionOption));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.successMsg = req.flash("success");
  res.locals.errorMsg = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

const listingsRouter = require("./routes/listings.js");
const reviewsRouter = require("./routes/reviews.js");
const userRouter = require("./routes/user.js");

app.use(methodOverride("_method"));

// ejs setup and setting up views folder path
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// to access web data into express
app.use(express.urlencoded({ extended: true }));

// to serve static css and js files
app.use(express.static(path.join(__dirname, "public")));

// Ejs mate engine setup
app.engine("ejs", ejsMate);

async function main() {
  await mongoose.connect(MONGOURL);
}

main()
  .then((res) => {
    console.log("Connection Succeed With MongoDB");
  })
  .catch((er) => {
    console.log("Error while Connecting with MongoDB");
  });

app.get("/", (req, res) => {
  res.render("sample.ejs");
});

// to create a demo usre using passport with hashed password and salt
app.get("/demouser", async (req, res) => {
  let fakeuser = new User({
    email: "pankaj@gmail.com",
    username: "PankajPatil",
  });

  let result = await User.register(fakeuser, "helloworld");
  res.send(result);
});

// listings routes
app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews", reviewsRouter);
app.use("/", userRouter);

app.use("/404PageNotFound", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

// Error handler middleware
app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render("error.ejs", { message });
});

app.use(function (req, res) {
  res.redirect("/404PageNotFound");
});

// Starting the Server
app.listen(PORT, () => {
  console.log(`App is listening at http://localhost:${PORT}/`);
});
