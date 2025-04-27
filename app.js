const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 2025;
const Listing = require("./models/listings.js");
const Review = require("./models/review.js");
const path = require("path");
const MONGOURL = "mongodb://127.0.0.1:27017/wonderlust";
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const { listingSchema, reviewSchema } = require("./schema.js");
// importing wrapAsync function to handle asynchronous errors
const wrapAsync = require("./util/wrapAsync.js");
// importing ExpressError to handle custom errors
const ExpressError = require("./util/ExpressError.js");
app.use(methodOverride("_method"));

// ejs setup
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
  // res.send("Root Directory");
  res.render("sample.ejs");
});

app.get("/review", (req, res) => {
  console.log(Review);

  res.send("reive");
});

const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};
const validateReviews = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

// Index route
app.get("/listings", async (req, res) => {
  const allListings = await Listing.find({});
  // console.log(allListings);
  res.render("listings/index.ejs", { allListings });
});

// Add New Route
app.get("/listings/new", (req, res) => {
  // res.send("Working");
  res.render("listings/new.ejs");
});

// Post Listings
app.post(
  "/listings",
  validateListing,
  wrapAsync(async (req, res, next) => {
    // res.send("Working");
    let result = listingSchema.validate(req.body);
    console.log(result);
    if (!req.body.listing) {
      throw new ExpressError(400, "Send valid Data ");
    }
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
  })
);

// Show route
app.get(
  "/listings/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    // await Listing.findById(id).then((res) => {
    //   console.log(res);
    // });
    const listing = await Listing.findById(id).populate("reviews");
    res.render("listings/show.ejs", { listing });
  })
);

// Edit Listing
app.get(
  "/listings/:id/edit",
  wrapAsync(async (req, res) => {
    // res.send("Working");
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
  })
);

// Post changes
app.put(
  "/listings/:id",
  validateListing,
  wrapAsync(async (req, res) => {
    // res.send("Working");
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings/${id}`);
  })
);

// Delete Post
app.delete(
  "/listings/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id).populate("reviews");

    res.redirect("/listings");
    // res.send("Working ");
  })
);

// Adding  Review
app.post(
  "/listings/:id/review",
  validateReviews,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    let newReview = new Review(req.body.review);
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    console.log(newReview);
    // res.send("REview Posted");
    res.redirect(`/listings/${listing._id}/`);
  })
);

app.delete("/listings/:id/reviews/:reviewId", async (req, res) => {
  let { id, reviewId } = req.params;
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  res.redirect(`/listings/${id}`);
});

// app.all("*", (req, res, next) => {
//   next(new ExpressError(404, "Page Not Found"));
// });
// creating a Middleware to  handle  async errors

// app.all("*", (err, req, res, next) => {
//   // let { statusCode, message } = err;
//   // res.status(statusCode).message(message);
//   // throw new ExpressError(404, "Page Not Found");
//   res.send("Page not Found");
// });
// Catch-all route for undefined paths
// app.all("*", (req, res, next) => {
//   next(new ExpressError(404, "Page Not Found"));
// });
// app.all("*", (req, res) => {
//   res.redirect("/error");
// });

app.use("/404PageNotFound", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

// Error handler middleware
app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render("error.ejs", { message });
});

app.use(function (req, res) {
  // res.type("text/plain");
  // res.status(404);
  // res.send("404 Page Not Found");
  res.redirect("/404PageNotFound");
});
// Starting the Server
app.listen(PORT, () => {
  console.log(`App is listening at http://localhost:${PORT}/`);
});
