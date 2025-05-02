const ExpressError = require("../util/ExpressError.js");
const Listing = require("../models/listings.js");
const { listingSchema } = require("../schema.js");

module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};

module.exports.RenderNewForm = (req, res) => {
  console.log(req.user);
  res.render("listings/new.ejs");
};

module.exports.createListing = async (req, res, next) => {
  let url = req.file.path;
  let filename = req.file.filename;

  // console.log(url + " " + filename);
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };
  await newListing.save();
  req.flash("success", "Listing added Successfully");
  res.redirect("/listings");
};

module.exports.showListings = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");

  if (!listing) {
    req.flash("error", "Listing you are trying to view does'nt Exits");
    res.redirect("/listings");
  } else {
    res.render("listings/show.ejs", { listing });
  }
};

module.exports.editListings = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);

  if (!listing) {
    req.flash("error", "Listing you are trying to view does'nt Exits");
    res.redirect("/listings");
  } else {
    let OriginalUrl = listing.image.url;
    console.log(OriginalUrl);
    OriginalUrl = OriginalUrl.replace("/upload", "/upload/w_400,h_200");

    console.log(OriginalUrl);
    res.render("listings/edit.ejs", { listing, OriginalUrl });
  }
};

module.exports.updateListings = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }
  req.flash("success", "Listing is Updated Successfully");
  res.redirect(`/listings/${id}`);
};

module.exports.deleteListings = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id).populate("reviews");
  req.flash("success", "Listing is Deleted Successfully");
  res.redirect("/listings");
};
