const db = require("../config/connection");
const { Profile } = require("../models");
const Quest = require("../models/Quest");
const profileSeeds = require("./profileSeeds.json");
const questSeeds = require("./questSeeds.json");

db.once("open", async () => {
  try {
    await Profile.deleteMany({});
    await Profile.create(profileSeeds);

    await Quest.deleteMany({});
    await Quest.create(questSeeds);

    console.log("all done!");
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
