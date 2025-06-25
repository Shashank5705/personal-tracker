// import React from "react";
import { useQuery } from "@apollo/client";
import * as React from "react";

const Home = () => {
  //   const { loading, data } = useQuery(QUERY_PROFILES);
  //  const profiles = data?.profiles || [];

  return (
    <main>
      <div className="home-container">
        <div className="home-left">
          <img
            src="https://64.media.tumblr.com/3a539a9764e7716a763aa99cd027273d/88ab624ab643e0a5-2d/s540x810/442f798132ca6930ac9199d8e84c1bb9b40752b8.png"
            alt=""
            className="home-img"
          ></img>
        </div>
        <div className="home-right">
          <div className="home-text-div">
            <p className="home-text">
              Games show our progression as we play through them in an extremely
              satisfying and clear way through levels, quests and achievements.
              <p />
              <p className="home-text">Real life progression isn’t so clear.</p>
              <p className="home-text">
                'This web application' aims to give you some direction to improve your
                physical and mental health through tracking and encouraging your
                growth.
              </p>
            </p>
            <p className="home-text">
              Check in every day to stay on This web application, and complete quests to
              increase your level, to get harder quests.
            </p>
            <p className="home-text">
              Whether you're somebody recovering from addiction, mental illness,
              or just someone who wants to start forming healthier habits,
              you're welcome to walk This web application.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
