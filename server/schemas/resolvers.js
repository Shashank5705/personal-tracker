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

      // TODO test this

      // get the current logged user quest,
      const quests = await Quest.find({});

      const midnightToday = dayjs().startOf("date");
      const midnightTomorrow = midnightToday.add(1, "day");
      const completedQuestsForToday = await CompletedQuest.find({
        userId: context.user._id,
        completedAt: { $gte: midnightToday, $lte: midnightTomorrow },
      });

      const completedQuestIdsForToday = completedQuestsForToday.map(
        (completed) => completed.questId.toString()
      );
      console.log("quests", quests);
      console.log("completedQuestIdsForToday", completedQuestIdsForToday);

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

    // Add a third argument to the resolver to access data in our `context`
    addSkill: async (parent, { profileId, skill }, context) => {
      // If context has a `user` property, that means the user executing this mutation has a valid JWT and is logged in
      if (context.user) {
        return Profile.findOneAndUpdate(
          { _id: profileId },
          {
            $addToSet: { skills: skill },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      // If user attempts to execute this mutation and isn't logged in, throw an error
      throw new AuthenticationError("You need to be logged in!");
    },
    // Set up mutation so a logged in user can only remove their profile and no one else's
    removeProfile: async (parent, args, context) => {
      if (context.user) {
        return Profile.findOneAndDelete({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    // Make it so a logged in user can only remove a skill from their own profile
    removeSkill: async (parent, { skill }, context) => {
      if (context.user) {
        return Profile.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { skills: skill } },
          { new: true }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
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

      console.log("DANIELLLLLLLL");

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
