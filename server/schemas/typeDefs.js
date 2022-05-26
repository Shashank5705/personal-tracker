const { gql } = require("apollo-server-express");

const typeDefs = gql`
  scalar Date

  type Profile {
    _id: ID
    name: String
    email: String
    password: String
    userLevel: Int
    lastLoggedIn: Date
    lastCounterUpdate: Date
    daysFromStart: Int
    daysSober: Int
    timesRelapsed: Int
    questsCompleted: Int
  }

  type Quest {
    _id: ID
    name: String
    description: String
    questLevel: Int
  }

  type Auth {
    token: ID!
    profile: Profile
  }

  type Query {
    profiles: [Profile]!
    profile(profileId: ID!): Profile
    # Because we have the context functionality in place to check a JWT and decode its data, we can use a query that will always find and return the logged in user's data
    me: Profile
    quests: [Quest]!
    todaysQuests: [Quest]!
  }

  type Mutation {
    addProfile(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    incrementDaysSober: Profile
    incrementTimesRelapsed: Profile
    completeQuest(questId: ID!): Profile
  }
`;

module.exports = typeDefs;
