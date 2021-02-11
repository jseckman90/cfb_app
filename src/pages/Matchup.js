import React, { useEffect, useState } from "react";

export const Matchup = () => {
  const [team1, setTeam1] = useState("");
  const [team2, setTeam2] = useState("");
  const [formData, setFormData] = useState({
    firstTeam: "",
    secondTeam: "",
  });
  const [team1Logo, setTeam1Logo] = useState("");
  const [team2Logo, setTeam2Logo] = useState("");
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
      setMatchups(data);
    };
    getMatchups();

    const getLogos = async () => {
      const response = await fetch("https://api.collegefootballdata.com/teams");
      const data = await response.json();
      console.log(data);
      data.map((team) => {
        if (team.school === team1) {
          setTeam1Logo(team.logos[0]);
        } else if (team.school === team2) {
          setTeam2Logo(team.logos[0]);
        } else {
          <p>No Logo Available for {team.school}</p>;
        }
      });
      console.log(team1Logo);
      console.log(team2Logo);
    };
    getLogos();
  }, [team1, team2]);

  const loaded = () => {
    return (
      <>
        {matchups.games.map((game) => {
          return (
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900 text-xl">
                      <img src={team1Logo} className="h-32" />
                    </div>
                  </div>
                </div>
              </td>

              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{game.season}</div>
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 text-2xl">
                  {game.homeTeam === team1 ? game.homeScore : game.awayScore} -{" "}
                  {game.awayTeam === team2 ? game.awayScore : game.homeScore}
                </span>
              </td>

              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900 text-xl">
                      <img src={team2Logo} className="h-32" />
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          );
        })}
      </>
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
        <div className="flex flex-col">
          <h1>OVERALL SERIES</h1>
          <h2>
            {matchups.team1} {matchups.team1Wins} - {matchups.team2Wins}{" "}
            {matchups.team2}
          </h2>
          <br />
        </div>
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Team 1
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Score
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      team 2
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {matchups.team1 && matchups.team2 ? (
                    loaded()
                  ) : (
                    <p>Choose teams</p>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Matchup;
