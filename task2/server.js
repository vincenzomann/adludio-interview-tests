const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose"); // connect to mongoDB
//route handler files
const permutationsRouter = require("./permsRouter");

// configures env vars to be accessed from .env file
require("dotenv").config();

// create express server
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json()); // be able to parse JSON when sending and recieving req/res

// connect to mongoDB
// the database uri from mongodb Atlas dashboard is stored as env var
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});
// once the mongoose connection is open, display message
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

//go to appropriate route handler according to url
app.use("/permutation-index", permutationsRouter);

// start listening for the server which is on a certain port
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
