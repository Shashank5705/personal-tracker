import React from "react";

const Stats = () => {
  return (
    <div className="w-100 mt-auto p-4">
      {/* This is meant to load quests from database
      {quests && quests.map((quest) => <div key={quest}></div>)} */}
      <div className="container text-center mb-5">
        <h1>Stats Title</h1>
        <p>Stats Description</p>
      </div>
    </div>
  );
};

export default Stats;
