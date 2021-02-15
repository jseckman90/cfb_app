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
    const formatTeam = (string) => {
      const team = string.split(" ");
      for (let i = 0; i < team.length; i++) {
        team[i] = team[i][0].toUpperCase() + team[i].substr(1);
      }
      return team.join(" ");
    };
    const team1 = formatTeam(formData.firstTeam);
    const team2 = formatTeam(formData.secondTeam);
    setTeam1(team1);
    setTeam2(team2);
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

      data.map((team) => {
        if (team.school === team1) {
          setTeam1Logo(team.logos[0]);
        } else if (team.school === team2) {
          setTeam2Logo(team.logos[0]);
        } else {
          <p>No Logo Available for {team.school}</p>;
        }
      });
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
                <div className="flex items-center justify-center">
                  <img src={team1Logo} className="h-32" />
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center justify-center">
                  {(game.homeTeam === team1 &&
                    game.homeScore > game.awayScore) ||
                  (game.homeTeam === team2 &&
                    game.awayScore > game.homeScore) ? (
                    <img src="icons8-sport-50.png" className="h-8" />
                  ) : (
                    <p></p>
                  )}
                </div>
              </td>

              <td className="flex-col px-6 py-4 whitespace-nowrap justify-center">
                <div className="flex text-sm text-gray-500 justify-center">
                  {game.season}
                </div>
                <div className=" flex px-2  text-xs font-semibold rounded-full bg-gray-100  text-2xl justify-center">
                  {game.homeTeam === team1 ? game.homeScore : game.awayScore} -{" "}
                  {game.awayTeam === team2 ? game.awayScore : game.homeScore}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center justify-center">
                  {(game.homeTeam === team2 &&
                    game.homeScore > game.awayScore) ||
                  (game.homeTeam === team1 &&
                    game.awayScore > game.homeScore) ? (
                    <img src="icons8-sport-50.png" className="h-8" />
                  ) : (
                    <p></p>
                  )}
                </div>
              </td>

              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center justify-center">
                  <img src={team2Logo} className="h-32" />
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
          <h1 className="text-4xl" style={{ textAlign: "center" }}>
            OVERALL SERIES
          </h1>
          <h2 className="text-3xl" style={{ textAlign: "center" }}>
            {matchups.team1} {matchups.team1Wins} - {matchups.team2Wins}{" "}
            {matchups.team2}
          </h2>
          <br />
        </div>
        <div className="flex justify-center -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-max sm:px-6 lg:px-8 mx-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      style={{ textAlign: "center" }}>
                      Team 1
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      style={{ textAlign: "center" }}>
                      {" "}
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      style={{ textAlign: "center" }}>
                      Score
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      style={{ textAlign: "center" }}>
                      {" "}
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      style={{ textAlign: "center" }}>
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
