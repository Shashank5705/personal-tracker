import { gql } from "@apollo/client";

export const ADD_PROFILE = gql`
  mutation addProfile($name: String!, $email: String!, $password: String!) {
    addProfile(name: $name, email: $email, password: $password) {
      token
      profile {
        _id
        name
      }
    }
  }
`;

export const ADD_SKILL = gql`
  mutation addSkill($profileId: ID!, $skill: String!) {
    addSkill(profileId: $profileId, skill: $skill) {
      _id
      name
      skills
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      profile {
        _id
        name
      }
    }
  }
`;

export const REMOVE_SKILL = gql`
  mutation removeSkill($skill: String!) {
    removeSkill(skill: $skill) {
      _id
      name
      skills
    }
  }
`;

export const INCREMENT_COUNTER_SOBER = gql`
  mutation incrementDaysSober {
    incrementDaysSober {
      _id
      name
      email
      userLevel
      daysFromStart
      daysSober
      timesRelapsed
      questsCompleted
    }
  }
`;

export const INCREMENT_TIMES_RELAPSED = gql`
  mutation incrementTimesRelapsed {
    incrementTimesRelapsed {
      _id
      name
      email
      userLevel
      daysFromStart
      daysSober
      timesRelapsed
      questsCompleted
    }
  }
`;

export const COMPLETE_QUEST = gql`
  mutation CompleteQuest($questId: ID!) {
    completeQuest(questId: $questId) {
      _id
      name
      email
      userLevel
      daysFromStart
      daysSober
      timesRelapsed
      questsCompleted
    }
  }
`;
