const { Schema, model } = require("mongoose");

const completedQuestSchema = new Schema({
  questId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  profileId: {
    type: Schema.Types.ObjectId,
    ref: "Profile",
  },
  completedAt: {
    type: Date,
  },
  //   issuedAt: {
  //     type: Date,
  //     default: new Date(),
  //   },
});

const CompletedQuest = model("CompletedQuest", completedQuestSchema);

module.exports = CompletedQuest;
