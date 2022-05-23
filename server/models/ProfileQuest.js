const { Schema, model } = require("mongoose");

const profileQuestSchema = new Schema({
  userId: {
    type: Number,
    required: true,
  },
  questId: {
    type: Number,
    required: true,
  },
  isFinished: [
    {
      type: Boolean,
    },
  ],
  dateFinished: {
    type: Date,
  },
});

const ProfileQuest = model("ProfileQuest", profileQuestSchema);

module.exports = ProfileQuest;
