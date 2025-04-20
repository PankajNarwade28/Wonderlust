const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 2025;
const Listing = require("./models/listings.js");
const path = require("path");
const MONGOURL = "mongodb://127.0.0.1:27017/wonderlust";
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
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
app.post("/listings", (req, res) => {
  // res.send("Working");
  let listings = req.body.listing;
  const newListing = new Listing(listings);
  newListing.save().then(() => {
    console.log("New Listing saved successfully!");
  });
  // console.log(listings);
  res.redirect("/listings");
});

// Show route
app.get("/listings/:id/", async (req, res) => {
  let { id } = req.params;
  // await Listing.findById(id).then((res) => {
  //   console.log(res);
  // });
  const listing = await Listing.findById(id);
  res.render("listings/show.ejs", { listing });
});

// Edit Listing
app.get("/listings/:id/edit", async (req, res) => {
  // res.send("Working");
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs", { listing });
});

// Post changes
app.put("/listings/:id", async (req, res) => {
  // res.send("Working");
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  res.redirect(`/listings/${id}`);
});

// Delete Post
app.delete("/listings/:id", async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  res.redirect("/listings");
  // res.send("Working ");
});

// Starting the Server
app.listen(PORT, () => {
  console.log(`App is listening at http://localhost:${PORT}/`);
});
