const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listings.js");

const MONGOURL = "mongodb://127.0.0.1:27017/wonderlust";

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

const initDB = async () => {
  await Listing.deleteMany({});

  initData.data = initData.data.map((obj) => {
    return {
      ...obj,
      owner: "68111f6b14b3e5d8a07c4dde",
    };
  });

  await Listing.insertMany(initData.data);
  console.log("Data was initialized successfully!");
};

initDB();
