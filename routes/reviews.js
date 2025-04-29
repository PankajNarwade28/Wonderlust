const express = require("express");
const router = express.Router({ mergeParams: true });
const Listing = require("../models/listings.js");
const { reviewSchema } = require("../schema.js");
const Review = require("../models/review.js");
// importing wrapAsync function to handle asynchronous errors
const wrapAsync = require("../util/wrapAsync.js");
// importing ExpressError to handle custom errors
const ExpressError = require("../util/ExpressError.js");

const validateReviews = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

// Adding  Review
router.post(
  "/",
  validateReviews,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    let newReview = new Review(req.body.review);
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    console.log(newReview);
    req.flash("success", "Review is Created Successfully");
    res.redirect(`/listings/${listing._id}/`);
  })
);

router.delete("/:reviewId", async (req, res) => {
  let { id, reviewId } = req.params;
  console.log(reviewId);
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Review is Deleted Successfully");
  res.redirect(`/listings/${id}`);
});

module.exports = router;
