const mongoose = require("mongoose");

// create schema that will define the shape of the data object requirements
const Schema = mongoose.Schema;
const permsShema = new Schema({
  perms: { type: [String], required: true }
});

// use schema to create the model
const Permutation = mongoose.model("Permutation", permsShema);

module.exports = Permutation;
