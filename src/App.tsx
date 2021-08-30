import { useEffect, useState } from 'react';
import { Menu } from './components/Menu';
import { Home } from './pages/Home';
import { Discord } from './pages/Discord';
import { Route, Switch } from 'react-router-dom';
import { Logs } from './pages/Logs';
import { Labmaker } from './utils/APIHandler';
import { Spinner } from './components/Spinner';
import { useDispatch } from 'react-redux';
import { updateUser } from './utils/slices/userSlice';
function App() {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    Labmaker.refreshAccesToken().then((result) => {
      console.log(result.accessToken);
      if (!result.ok) {
        setLoggedIn(false);
      } else {
        Labmaker.User.getUser().then((userDetails) => {
          dispatch(updateUser(userDetails));
          setLoading(false);
        });
      }
    });
  }, [dispatch]);

  if (!loggedIn) {
    window.location.href = Labmaker.loginURL();
  }

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
