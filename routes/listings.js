const express = require("express");
const router = express.Router();
const Listing = require("../models/listings.js");
const { listingSchema } = require("../schema.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
// importing wrapAsync function to handle asynchronous errors
const wrapAsync = require("../util/wrapAsync.js");
// importing ExpressError to handle custom errors
const ExpressError = require("../util/ExpressError.js");

// Index route
router.get("/", async (req, res) => {
  const allListings = await Listing.find({});
  // console.log(allListings);
  res.render("listings/index.ejs", { allListings });
});

// Add New Route
router.get("/new", isLoggedIn, (req, res) => {
  // res.send("Working");
  console.log(req.user);

  res.render("listings/new.ejs");
});

// Post Listings
router.post(
  "/",
  isLoggedIn,
  validateListing,
  wrapAsync(async (req, res, next) => {
    // res.send("Working");
    let result = listingSchema.validate(req.body);
    console.log(result);
    if (!req.body.listing) {
      throw new ExpressError(400, "Send valid Data ");
    }
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
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
    const listing = await Listing.findById(id)
      .populate("reviews")
      .populate("owner");

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
  isLoggedIn,
  isOwner,
  wrapAsync(async (req, res) => {
    // res.send("Working");
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
  })
);

// Post changes Updates
router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  validateListing,

  wrapAsync(async (req, res) => {
    // res.send("Working");
    let { id } = req.params;
    // let listing = await Listing.findById(id);
    // console.log(listing);
    // if (!listing.owner.equals(res.locals.currUser._id)) {
    //   req.flash("error", "You don't have permission to changes");
    //   return res.redirect(`/listings/${id}`);
    // }
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success", "Listing is Updated Successfully");
    res.redirect(`/listings/${id}`);
  })
);

// Delete Post
router.delete(
  "/:id",
  isLoggedIn,
  isOwner,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id).populate("reviews");
    req.flash("success", "Listing is Deleted Successfully");
    res.redirect("/listings");
    // res.send("Working ");
  })
);

module.exports = router;
