const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const favoriteSchema = mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  phone: {
    type: String,
  },
  image1: {
    type: String,
  },
  image2: {
    type: String,
  },
  image3: {
    type: String,
  },
  image: {
    type: String,
  },
  userID: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  bizNumber: {
    type: String,
  },
  MenCollation: {
    type: String,
  },
  WomenCollation: {
    type: String,
  },
});
const Favorite = mongoose.model("Favorite", favoriteSchema);

module.exports = { Favorite };
