import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import TeamPage from "./pages/TeamPage";

function App() {
  return (
    <div>
      <Nav />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/teampage" component={TeamPage} />
      </Switch>
    </div>
  );
}

export default App;
