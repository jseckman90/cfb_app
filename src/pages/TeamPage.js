import React, { useState, useEffect } from "react";
import Season from "../components/Season";

const TeamPage = () => {
  const [teams, setTeams] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  let teamName = "michigan";

  useEffect(async () => {
    const response = await fetch(
      `https://api.collegefootballdata.com/records?year=2016&team=${teamName}`
    );
    const data = await response.json();
    setTeams(data);
  }, []);
  return (
    <div>
      {teams.map((team) => {
        return (
          <>
            <p>{team.team}</p>
            <p>{team.year}</p>
            <p>
              Record: {team.total.wins} - {team.total.losses}
            </p>
          </>
        );
      })}
    </div>
  );
};

export default TeamPage;
