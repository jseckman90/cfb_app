import React from "react";
import "./App.css";
import Header from "./components/Header";
import Nav from "./components/Nav";
import TeamPage from "./pages/TeamPage";

function App() {
  return (
    <div>
      <Header />
      <div class="py-12 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="lg:text-center">
            <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Know more about your team
            </p>
          </div>

          <div class="mt-10">
            <dl class="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <div class="flex">
                <div class="flex-shrink-0">
                  <div class="flex items-center justify-center h-12 w-12 ">
                    {/* <!-- Heroicon name: globe-alt --> */}
                    <img src="icons8-trophy-90.png" />
                  </div>
                </div>
                <div class="ml-4">
                  <dt class="text-lg leading-6 font-medium text-gray-900">
                    Season-By-Season Results
                  </dt>
                  <dd class="mt-2 text-base text-gray-500">
                    Research team data per season. Data can be filtered to
                    include W-L records, team passing, team rushing, penalty
                    yards, time-of-posession and much more.
                  </dd>
                </div>
              </div>

              <div class="flex">
                <div class="flex-shrink-0">
                  <div class="flex items-center justify-center h-12 w-12 ">
                    {/* <!-- Heroicon name: scale --> */}
                    <img src="icons8-sport-helmet-90.png" />
                  </div>
                </div>
                <div class="ml-4">
                  <dt class="text-lg leading-6 font-medium text-gray-900">
                    Team Talent Rankings
                  </dt>
                  <dd class="mt-2 text-base text-gray-500">
                    Team Talent Composite is a measure of a team’s baseline
                    talent level calculated by how a roster’s players ranked as
                    recruits. The metric accounts for transfers and other moves
                    and provides a window into each program’s overall talent.
                  </dd>
                </div>
              </div>

              <div class="flex">
                <div class="flex-shrink-0">
                  <div class="flex items-center justify-center h-12 w-12 ">
                    {/* <!-- Heroicon name: lightning-bolt --> */}
                    <img src="icons8-history-book-100.png" />
                  </div>
                </div>
                <div class="ml-4">
                  <dt class="text-lg leading-6 font-medium text-gray-900">
                    Team History
                  </dt>
                  <dd class="mt-2 text-base text-gray-500">
                    Dive into the rich history of your favorite College Football
                    Program. Learn about head coaches, stadiums, and player
                    history.
                  </dd>
                </div>
              </div>

              <div class="flex">
                <div class="flex-shrink-0">
                  <div class="flex items-center justify-center h-12 w-12 ">
                    {/* <!-- Heroicon name: annotation --> */}
                    <img src="icons8-combo-chart-96.png" />
                  </div>
                </div>
                <div class="ml-4">
                  <dt class="text-lg leading-6 font-medium text-gray-900">
                    Advanced Statistics
                  </dt>
                  <dd class="mt-2 text-base text-gray-500">
                    Research stats such as PPA (Predicted Points Added), EPA
                    (Expected Points Added), Line yards, Win Probabilities and
                    much more.
                  </dd>
                </div>
              </div>
            </dl>
          </div>
        </div>
      </div>
      <TeamPage />
    </div>
  );
}

export default App;
