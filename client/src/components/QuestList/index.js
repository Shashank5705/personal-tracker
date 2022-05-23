import { useQuery } from "@apollo/client";
import React from "react";
import { QUERY_TODAYS_QUESTS } from "../../utils/queries";
import Quest from "../Quest";

export default function QuestList() {
  const {
    data,
    loading,
    refetch: fetchTodaysQuest,
  } = useQuery(QUERY_TODAYS_QUESTS); // todays quest

  return (
    <div>
      {data?.todaysQuests && (
        <>
          {data.todaysQuests.map((quest) => {
            return (
              <Quest
                key={quest._id}
                fetchTodaysQuest={fetchTodaysQuest}
                quest={quest}
              ></Quest>
            );
          })}
        </>
      )}
    </div>
  );
}
