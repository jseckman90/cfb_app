import React, { useEffect, useState } from "react";

export const Game = (props) => {
  const { team } = props;

  const [gameInfo, setGameInfo] = useState();
  const [year, setYear] = useState(null);
  const [formData, setFormData] = useState({
    year: "",
  });

  const getGames = async () => {
    const response = await fetch(
      `https://api.collegefootballdata.com/games?year=${year}&seasonType=regular&team=${team}`
    );
    const data = await response.json();
    console.log(data);
    setGameInfo(data);
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setYear(formData.year);
    console.log(year);
    getGames();
  };

  useEffect(() => {
    getGames();
  }, []);

  const loaded = () => {
    if (gameInfo.length > 0) {
      {
        gameInfo.map((game) => {
          return (
            <>
              <h3>{game.week}</h3>
            </>
          );
        });
      }
    } else {
      <h3> loading...</h3>;
    }
  };
  return (
    <div>
      <h1>Game Page</h1>
      <div class="min-h-0 flex items-start justify-center bg-gray-50 py-4 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-8">
          <form class="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div class="rounded-md shadow-sm -space-y-px">
              <div>
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  placeholder="Year"
                  class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
      {loaded()}
    </div>
  );
};

export default Game;
