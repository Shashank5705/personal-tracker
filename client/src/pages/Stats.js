import React from "react";
import Modal from "react-modal";

import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import {
  INCREMENT_COUNTER_SOBER,
  INCREMENT_TIMES_RELAPSED,
} from "../utils/mutations";
import { gql, useMutation } from "@apollo/client";

const Profile = () => {
  const { profileId } = useParams();

  // If there is no `profileId` in the URL as a parameter, execute the `QUERY_ME` query instead for the logged in user's information
  const { loading, data } = useQuery(QUERY_ME);

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

  // NEED CONDITION STATEMENT IF USER IS NOT LOGGED IN TO SEND THEM TO LOGIN PAGE

  //   THIS DOESNT WORK!!
  //   if (!data.me.name) {
  //     return (
  //       <h4>
  //         You need to be logged in to see your profile page. Use the navigation
  //         links above to sign up or log in!
  //       </h4>
  //     );
  //   }

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
          <h3>Level {data.me.userLevel}</h3>
          <h3>{data.me.daysFromStart} Days From Start</h3>
          <h3>{data.me.daysSober} Days Walked the Path </h3>
          <h3>{data.me.timesRelapsed} Days Strayed from the Path</h3>
          <h3>{data.me.questsCompleted} Quests Completed </h3>
        </div>
        <button onClick={openModal}>Check In</button>
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
              I walked the path today
            </button>
            <button
              onClick={increaseRelapsedCount}
              className="stats-page-modal-button"
            >
              I strayed from the path today
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Profile;
