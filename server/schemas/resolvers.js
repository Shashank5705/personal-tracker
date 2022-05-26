const { AuthenticationError } = require("apollo-server-express");
const { Profile, Quest } = require("../models");
const { signToken } = require("../utils/auth");
const { GraphQLDateTime } = require("graphql-iso-date");
const CompletedQuest = require("../models/CompletedQuest");
const dayjs = require("dayjs");
const customScalarResolver = {
  Date: GraphQLDateTime,
};

const resolvers = {
  Query: {
    profiles: async () => {
      return Profile.find();
    },

    quests: async () => {
      return Quest.find();
    },

    todaysQuests: async (parent, {}, context) => {
      if (!context.user) {
        throw new AuthenticationError();
      }

      //! BUG:  QUESTS COMPLETE FOR ALL USERS WHEN THEY SHOULD BE PERSONAL

      // get the current logged user quest,
      //! BUG:  AGGREGATE LOADS MORE QUESTS EVERY REFRESH AND DOESN'T KEEP THE SAME QUESTS FOR THE DAY
      // can use await Quest.aggregate
      const quests = await Quest.find(
        {}
        //     [
        //   { $sample: { size: 4 } },
        //     { $out: { db: "tech-friends", coll: "todays-quest-collection" } },
        //     ]
      );

      const midnightToday = dayjs().startOf("date");
      const midnightTomorrow = midnightToday.add(1, "day");
      const completedQuestsForToday = await CompletedQuest.find({
        userId: context.user._id,
        completedAt: { $gte: midnightToday, $lte: midnightTomorrow },
      });

      const completedQuestIdsForToday = completedQuestsForToday.map(
        (completed) => completed.questId.toString()
      );

      // filter out completed quest
      // send back
      return quests.filter((quest) => {
        // exclude if quest._id matches with com
        return !completedQuestIdsForToday.includes(quest._id.toString());
      });
    },

    profile: async (parent, { profileId }) => {
      return Profile.findOne({ _id: profileId });
    },
    // By adding context to our query, we can retrieve the logged in user without specifically searching for them
    me: async (parent, args, context) => {
      if (context.user) {
        return Profile.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },

  Mutation: {
    addProfile: async (parent, { name, email, password }) => {
      const profile = await Profile.create({ name, email, password });
      const token = signToken(profile);

      return { token, profile };
    },
    login: async (parent, { email, password }) => {
      const profile = await Profile.findOne({ email });

      if (!profile) {
        throw new AuthenticationError("No profile with this email found!");
      }

      const correctPw = await profile.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect password!");
      }

      const token = signToken(profile);
      return { token, profile };
    },

    incrementDaysSober: async (parent, {}, context) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }

      return Profile.findOneAndUpdate(
        { _id: context.user._id },
        { $inc: { daysSober: 1, daysFromStart: 1 } },
        { new: true }
      );
    },

    incrementTimesRelapsed: async (parent, {}, context) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }

      return Profile.findOneAndUpdate(
        { _id: context.user._id },
        { $inc: { timesRelapsed: 1, daysFromStart: 1 } },
        { new: true }
      );
    },

    completeQuest: async (parent, { questId }, context) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }

      // create a new quest completed entry
      await CompletedQuest.create({
        questId: questId,
        profileId: context.user._id,
        completedAt: new Date(),
      });

      return await Profile.findOneAndUpdate(
        { _id: context.user._id },
        { $inc: { questsCompleted: 1 } },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;
