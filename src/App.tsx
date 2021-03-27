import React from "react";
import { Menu } from "./components/Menu";
import { Home } from "./pages/Home";
import { Route, Switch } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Menu />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/discord">
          <h1>Test</h1>
        </Route>
        <Route path="/discord">
          <h1>Test</h1>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
