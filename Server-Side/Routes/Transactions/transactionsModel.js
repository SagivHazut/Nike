const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 256,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 256,
  },
  address: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 256,
  },
  country: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 1024,
  },
  email: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 255,
  },
  state: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 1024,
  },
  zip: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 8,
  },
  cardName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 256,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  cardNumber: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 12,
  },
  expiration: {
    type: String,
    required: true,
  },
  cvv: {
    type: String,
    minlength: 3,
    maxlength: 3,
    required: true,
  },
  cartItems: {
    type: Array,
  },
  bizNumber: {
    type: String,
    required: true,
    minlength: 7,
    maxlength: 7,
    unique: true,
  },
});

const Transactions = mongoose.model("Transactions", cardSchema);
exports.Transactions = Transactions;
