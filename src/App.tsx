import React from 'react';
import { Menu } from './components/Menu';
import { Home } from './pages/Home';
import { Discord } from './pages/Discord';
import { Route, Switch } from 'react-router-dom';
import { Logs } from './pages/Logs';
function App() {
  return (
    <div className="App">
      <Menu />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/discord">
          <Discord />
        </Route>
        <Route path="/logs">
          <Logs />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
