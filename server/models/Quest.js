const { Schema, model } = require("mongoose");

const questSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  questLevel: {
    type: Number,
    default: 1,
  },
});

const Quest = model("Quest", questSchema);

module.exports = Quest;
