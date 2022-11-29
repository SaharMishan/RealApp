const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  bizName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 25,
  },
  bizDescription: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 100,
  },
  bizImage: {
    type: String,
  },
  bizPhone: {
    type: String,
    required: true,
    minlength: 9,
    maxlength: 10,
  },
  bizAddress: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 50,
  },
  userID: {
    type: String,
    required: true,
  },
});

const Card = mongoose.model("Card", cardSchema);

module.exports = Card;
