import React, { useState } from "react";
import Button from "@mui/material/Button";
import "./quest.css";
import { useMutation } from "@apollo/client";
import { COMPLETE_QUEST } from "../../utils/mutations";
import { QUERY_TODAYS_QUESTS } from "../../utils/queries";

// import { quests } from "../data";
// import { QUERY_QUEST } from "../../utils/queries";

function Quest({ quest, fetchTodaysQuest }) {
  const [completeQuest, { error }] = useMutation(COMPLETE_QUEST, {
    variables: {
      questId: quest._id,
    },
    refetchQueries: [
      QUERY_TODAYS_QUESTS, // DocumentNode object parsed with gql
      "todaysQuests", // Query name
    ],
  });

  const handleClick = async () => {
    // call the complete quest mutation
    await completeQuest();
    // then call refetch
    //  refetch({ questId: questId });
    fetchTodaysQuest();
  };

  return (
    <div className="quest-component-wrapper">
      <h3 className="quest-component-title">{quest.name}</h3>
      <div>
        <h5 className="quest-component-description">{quest.description}</h5>
      </div>
      <Button
        className="quest-component-button"
        variant="contained"
        size="small"
        sx={{
          bgcolor: "#4ad66d",

          "&:hover": {
            bgcolor: "success.main",
          },
        }}
        onClick={handleClick}
      >
        Complete Quest
      </Button>
    </div>
  );
}
export default Quest;
