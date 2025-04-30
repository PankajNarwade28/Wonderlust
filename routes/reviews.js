const express = require("express");
const router = express.Router({ mergeParams: true });
const { validateReviews, isLoggedIn, isAuthor } = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");
// importing wrapAsync function to handle asynchronous errors
const wrapAsync = require("../util/wrapAsync.js");
// importing ExpressError to handle custom errors
const ExpressError = require("../util/ExpressError.js");

// Adding  Review
router.post(
  "/",
  isLoggedIn,
  validateReviews,
  wrapAsync(reviewController.createReview)
);

router.delete(
  "/:reviewId",
  isLoggedIn,
  isAuthor,
  wrapAsync(reviewController.destroyReview)
);

module.exports = router;
