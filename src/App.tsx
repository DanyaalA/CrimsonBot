import React from "react";
import { Menu } from "./components/Menu";
import { Home } from "./pages/Home";
import { Discord } from "./pages/Discord";
import { Route, Switch } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Menu />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/discord">
          <Discord />
        </Route>
        <Route path="/discord">
          <h1>Test</h1>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
