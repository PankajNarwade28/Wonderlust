const express = require("express");
const router = express.Router();
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");

// importing wrapAsync function to handle asynchronous errors
const wrapAsync = require("../util/wrapAsync.js");
// importing ExpressError to handle custom errors
const ExpressError = require("../util/ExpressError.js");

// Index route
router.get("/", wrapAsync(listingController.index));

// Add New Route
router.get("/new", isLoggedIn, listingController.RenderNewForm);

// Post Listings
router.post(
  "/",
  isLoggedIn,
  validateListing,
  wrapAsync(listingController.PostNewListings)
);

// Show route
router.get("/:id", wrapAsync(listingController.showListings));

// Edit Listing
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.editListings)
);

// Post changes Updates
router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  validateListing,
  wrapAsync(listingController.updateListings)
);

// Delete Post
router.delete(
  "/:id",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.deleteListings)
);

module.exports = router;
