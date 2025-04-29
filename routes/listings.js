const express = require("express");
const router = express.Router();
const Listing = require("../models/listings.js");
const { listingSchema } = require("../schema.js");
// importing wrapAsync function to handle asynchronous errors
const wrapAsync = require("../util/wrapAsync.js");
// importing ExpressError to handle custom errors
const ExpressError = require("../util/ExpressError.js");

const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

// Index route
router.get("/", async (req, res) => {
  const allListings = await Listing.find({});
  // console.log(allListings);
  res.render("listings/index.ejs", { allListings });
});

// Add New Route
router.get("/new", (req, res) => {
  // res.send("Working");
  res.render("listings/new.ejs");
});

// Post Listings
router.post(
  "/",
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
    req.flash("success", "Listing added Successfully");
    res.redirect("/listings");
  })
);

// Show route
router.get(
  "/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    // await Listing.findById(id).then((res) => {
    //   console.log(res);
    // });
    const listing = await Listing.findById(id).populate("reviews");

    if (!listing) {
      req.flash("error", "Listing you are trying to view does'nt Exits");
      res.redirect("/listings");
    } else {
      res.render("listings/show.ejs", { listing });
    }
  })
);

// Edit Listing
router.get(
  "/:id/edit",
  wrapAsync(async (req, res) => {
    // res.send("Working");
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
  })
);

// Post changes
router.put(
  "/:id",
  validateListing,
  wrapAsync(async (req, res) => {
    // res.send("Working");
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success", "Listing is Updated Successfully");
    res.redirect(`/listings/${id}`);
  })
);

// Delete Post
router.delete(
  "/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id).populate("reviews");
    req.flash("success", "Listing is Deleted Successfully");
    res.redirect("/listings");
    // res.send("Working ");
  })
);

module.exports = router;
