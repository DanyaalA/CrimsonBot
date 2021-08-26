import React, { useEffect, useState } from 'react';
import { Menu } from './components/Menu';
import { Home } from './pages/Home';
import { Discord } from './pages/Discord';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Logs } from './pages/Logs';
import { Labmaker } from './utils/APIHandler';
import { Spinner } from './components/Spinner';
import { faTimes, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
function App() {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(true);

  useEffect(() => {
    Labmaker.refreshAccesToken().then((result) => {
      if (!result.ok) {
        console.log('RESULT IS FALSe');
        setLoggedIn(false);
      } else setLoading(false);
    });
  }, []);

  if (!loggedIn) window.location.href = Labmaker.loginURL();

  if (loading)
    return (
      <div>
        <Spinner loading={loading} message={'Logging In...'} />
      </div>
    );

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
