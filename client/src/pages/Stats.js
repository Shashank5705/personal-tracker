import React from "react";
import Modal from "react-modal";
import Button from "@mui/material/Button";

import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import {
  INCREMENT_COUNTER_SOBER,
  INCREMENT_TIMES_RELAPSED,
} from "../utils/mutations";
import { gql, useMutation } from "@apollo/client";
import { createTheme } from "@mui/material/styles";

import Auth from "../utils/auth";

const Profile = () => {
  const { loading, data } = useQuery(QUERY_ME);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#1b5e20",
      },
      secondary: {
        main: "#4caf50",
      },
    },
    Button: {
      "&hover": {
        background: "#1b5e20",
      },
    },
  });

  /*==================== MODAL ====================*/
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  /*==================== COUNTERS ====================*/

  const [incrementSober] = useMutation(INCREMENT_COUNTER_SOBER);

  function increaseSoberCount() {
    incrementSober({
      variables: {},
    });
  }

  const [incrementTimesRelapsed] = useMutation(INCREMENT_TIMES_RELAPSED);

  function increaseRelapsedCount() {
    incrementTimesRelapsed({
      variables: {},
    });
  }

  /*==================== LOGGED IN CONDITION ====================*/

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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="stats-page-wrapper">
        <h2 className="card-header mt-4 stats-page-header">
          {data.me.name}'s Statistics
        </h2>

        <div className="stats-page-data">
          <h3 className="stats-page-text">Level {data.me.userLevel}</h3>
          <h3 className="stats-page-text">
            {data.me.daysFromStart} Days From Start
          </h3>
          <h3 className="stats-page-text">
            {data.me.daysSober} Days Completed the routine{" "}
          </h3>
          <h3 className="stats-page-text">
            {data.me.timesRelapsed} Days Strayed from the routine
          </h3>
          <h3 className="stats-page-text">
            {data.me.questsCompleted} Quests Completed{" "}
          </h3>
        </div>
        <Button
          onClick={openModal}
          variant="contained"
          className="stats-page-open-modal-button"
          sx={{
            bgcolor: "#4ad66d",
            "&:hover": {
              bgcolor: "success.main",
            },
          }}
        >
          Check In
        </Button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          className="stats-page-modal"
          overlayClassName="stats-page-modal-overlay "
          contentLabel="Modal"
        >
          <div className="stats-page-modal-content">
            <button onClick={closeModal} className="stats-page-modal-button">
              Close
            </button>
            <button
              onClick={increaseSoberCount}
              className="stats-page-modal-button"
            >
              I completed the routine today
            </button>
            <button
              onClick={increaseRelapsedCount}
              className="stats-page-modal-button"
            >
              I strayed from the routine today
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Profile;
