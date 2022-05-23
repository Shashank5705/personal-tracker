import { gql } from "@apollo/client";

export const QUERY_PROFILES = gql`
  query allProfiles {
    profiles {
      _id
      name
      skills
    }
  }
`;

export const QUERY_SINGLE_PROFILE = gql`
  query singleProfile($profileId: ID!) {
    profile(profileId: $profileId) {
      _id
      name
      skills
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      name
      email
      userLevel
      lastLoggedIn
      lastCounterUpdate
      daysFromStart
      daysSober
      timesRelapsed
      questsCompleted
    }
  }
`;

export const QUERY_QUEST = gql`
  query quests {
    quests {
      _id
      name
      description
      questLevel
    }
  }
`;

export const QUERY_TODAYS_QUESTS = gql`
  query todaysQuests {
    todaysQuests {
      _id
      name
      description
      questLevel
    }
  }
`;
