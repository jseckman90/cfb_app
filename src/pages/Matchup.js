import React, { useEffect, useState } from "react";

export const Matchup = () => {
  const [team1, setTeam1] = useState("");
  const [team2, setTeam2] = useState("");
  const [formData, setFormData] = useState({
    firstTeam: "",
    secondTeam: "",
  });
  const [matchups, setMatchups] = useState([]);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setTeam1(formData.firstTeam);
    setTeam2(formData.secondTeam);
  };

  useEffect(() => {
    const getMatchups = async () => {
      const response = await fetch(
        `https://api.collegefootballdata.com/teams/matchup?team1=${team1}&team2=${team2}`
      );
      const data = await response.json();
      console.log(data);
      setMatchups(data);
    };
    getMatchups();
  }, [team1, team2]);

  const loaded = () => {
    return (
      <div>
        {matchups.games.map((game) => {
          return (
            <>
              <p>{game.season}</p>
              <p>
                {game.homeTeam} - {game.homeScore}
              </p>
              <p>
                {game.awayTeam} - {game.awayScore}
              </p>
            </>
          );
        })}
      </div>
    );
  };

  return (
    <div>
      <div className="min-h-0 flex items-start justify-center bg-gray-50 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <input
                  type="text"
                  name="firstTeam"
                  value={formData.firstTeam}
                  onChange={handleChange}
                  placeholder="Team 1"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                />
                <input
                  type="text"
                  name="secondTeam"
                  value={formData.secondTeam}
                  onChange={handleChange}
                  placeholder="Team 2"
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
      <div className="flex flex-col">
        <h1>OVERALL SERIES</h1>
        <h2>
          {matchups.team1} {matchups.team1Wins} - {matchups.team2Wins}{" "}
          {matchups.team2}
        </h2>
        <br />
        {matchups.team1 && matchups.team2 ? loaded() : <p>Choose teams</p>}
      </div>
    </div>
  );
};

export default Matchup;
