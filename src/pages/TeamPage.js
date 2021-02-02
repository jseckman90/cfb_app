import React, { useState, useEffect } from "react";
import Game from "../components/Game";

const TeamPage = () => {
  const [teams, setTeams] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [teamName, setTeamName] = useState(null);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
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
      <div class="min-h-0 flex items-start justify-center bg-gray-50 py-4 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-8">
          <form class="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div class="rounded-md shadow-sm -space-y-px">
              <div>
                <input
                  type="text"
                  name="search"
                  value={formData.search}
                  onChange={handleChange}
                  placeholder="Search Teams"
                  class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Search Teams"
                />
              </div>
            </div>

            <>
              <button
                type="submit"
                value="Search"
                class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Search
              </button>
            </>
          </form>
        </div>
      </div>

      {teams.map((team) => {
        if (team.school == teamName) {
          return (
            <div class="min-h-0 flex flex-row items-center justify-center bg-gray-50 py-4 px-4 sm:px-6 lg:px-8">
              <div>
                <img src={team.logos[0]} style={{ height: "200px" }} />
              </div>
              <div>
                <p class="text-2xl font-light">
                  <span class="font-extrabold">{team.school}</span>
                  {team.mascot}
                </p>
                <p class="text-xl font-thin">
                  <span class="font-bold">{team.conference}</span> (
                  {team.division})
                </p>
              </div>
            </div>
          );
        }
      })}
      <Game team={teamName} />
    </div>
  );
};

export default TeamPage;
