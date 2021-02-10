import React, { useState, useEffect } from "react";
import Game from "../components/Game";

const TeamPage = () => {
  const [teams, setTeams] = useState([]);
  const [teamName, setTeamName] = useState(null);
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

  useEffect(() => {
    const getTeams = async () => {
      const response = await fetch(`https://api.collegefootballdata.com/teams`);
      const data = await response.json();
      setTeams(data);
    };
    getTeams();
  }, [teams]);

  return (
    <div>
      <div className="min-h-0 flex items-start justify-center bg-gray-50 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <input
                  type="text"
                  name="search"
                  value={formData.search}
                  onChange={handleChange}
                  placeholder="Search Teams"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                />
              </div>
            </div>

            <>
              <button
                type="submit"
                value="Search"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Search
              </button>
            </>
          </form>
        </div>
      </div>

      {teams.map((team) => {
        if (team.school === teamName) {
          return (
            <div className="min-h-0 flex flex-row items-center justify-center bg-gray-50 py-4 px-4 sm:px-6 lg:px-8">
              <div>
                <img
                  src={team.logos[0]}
                  style={{ height: "200px" }}
                  alt="team-logo"
                />
              </div>
              <div>
                <p className="text-2xl font-light">
                  <span className="font-extrabold">{team.school}</span>
                  {team.mascot}
                </p>
                <p className="text-xl font-thin">
                  <span className="font-bold">{team.conference}</span> (
                  {team.division})
                </p>
              </div>
            </div>
          );
        } else {
          return <h3>No info Available</h3>;
        }
      })}
      <Game team={teamName} />
    </div>
  );
};

export default TeamPage;
