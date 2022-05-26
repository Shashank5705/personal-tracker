import { useQuery } from "@apollo/client";
import React from "react";
import { QUERY_TODAYS_QUESTS } from "../../utils/queries";
import Quest from "../Quest";
import "./questList.css";

export default function QuestList() {
  const {
    data,
    loading,
    refetch: fetchTodaysQuest,
  } = useQuery(QUERY_TODAYS_QUESTS); // todays quest

  return (
    <div className="quest-list-wrapper">
      {data?.todaysQuests && (
        <div className="quest-list-wrapper">
          {data.todaysQuests.map((quest) => {
            return (
              <Quest
                key={quest._id}
                fetchTodaysQuest={fetchTodaysQuest}
                quest={quest}
              ></Quest>
            );
          })}
        </div>
      )}
    </div>
  );
}
