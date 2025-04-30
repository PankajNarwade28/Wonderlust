const Listing = require("../models/listings.js");
const Review = require("../models/review.js");
const { reviewSchema } = require("../schema.js");

module.exports.createReview = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  let newReview = new Review(req.body.review);
  listing.reviews.push(newReview);
  newReview.author = req.user._id;
  console.log(newReview);
  await newReview.save();
  await listing.save();
  console.log(newReview);
  req.flash("success", "Review is Created Successfully");
  res.redirect(`/listings/${listing._id}/`);
};

module.exports.destroyReview = async (req, res) => {
  let { id, reviewId } = req.params;
  console.log(reviewId);
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Review is Deleted Successfully");
  res.redirect(`/listings/${id}`);
};
