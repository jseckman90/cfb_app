import React, { useState, useEffect } from "react";
import Season from "../components/Season";

const TeamPage = () => {
  const [teams, setTeams] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [teamName, setTeamName] = useState(null);
  const [error, setError] = useState(null);
  const [formData, setFormData] = React.useState({
    search: "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData.search);
    setTeamName(formData.search);
    console.log(teamName);
  };

  useEffect(async () => {
    const response = await fetch(`https://api.collegefootballdata.com/teams`);
    const data = await response.json();
    setTeams(data);
  }, [teams]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="search"
          value={formData.search}
          onChange={handleChange}
          placeholder="Search Teams"
        />
        <input type="submit"></input>
      </form>
      {teams.map((team) => {
        if (team.school == teamName) {
          return (
            <>
              <img src={team.logos[0]} style={{ height: "200px" }} />
              <p>
                {team.school} {team.mascot}
              </p>
              <p>{team.conference}</p>
            </>
          );
        }
      })}
    </div>
  );
};

export default TeamPage;
