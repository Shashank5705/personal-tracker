import React from "react";

import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import Button from "@mui/material/Button";

import Quest from "../components/Quest";
import { QUERY_QUEST } from "../utils/queries";
import QuestList from "../components/QuestList";
// import { Quest } from "../../../server/models";
import { createTheme } from "@mui/material/styles";

import Auth from "../utils/auth";

const Profile = () => {
  const { profileId } = useParams();

  // If there is no `profileId` in the URL as a parameter, execute the `QUERY_ME` query instead for the logged in user's information
  const { loading, data } = useQuery(QUERY_QUEST);

  if (loading) {
    return <div>Loading...</div>;
  }

  const isLoggedIn = Auth.loggedIn();

  if (!isLoggedIn) {
    return (
      <div className="logged-warning-div">
        <h4 className="logged-warning">
          You need to be logged in to see your profile page. Use the navigation
          links above to sign up or log in!
        </h4>
      </div>
    );
  }

  return (
    <div className="quest-page-wrapper">
      <h2 className="card-header mt-4 quest-page-header">Daily Quests</h2>
      <div className="quest-page-button-wrapper">
        {/* <Button className="quest-page-button" variant="contained" size="small">
          Generate Today's Quests
        </Button> */}
      </div>
      <div className="quest-page-wrapper">
        <QuestList />
      </div>
    </div>
  );
};

export default Profile;
