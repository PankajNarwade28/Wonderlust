const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 2025;

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

app.get("/", (req, res) => {
  res.send("Root Directory");
});

app.listen(PORT, () => {
  console.log(`App is listening at http://localhost:${PORT}/`);
});
