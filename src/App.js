import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { connect } from 'react-redux';

import { setUser } from './redux/actions/userActions';
import { registerAuthObserver } from './services/auth';
import { getItem } from './services/database';

import Welcome from './pages/Welcome';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Skills from './pages/Skills';
import Interests from './pages/Interests';
import EditProfile from './pages/EditProfile';
import Details from './pages/Details';
import Matches from './pages/Matches';
import Pending from './pages/Pending';
import Supermatch from './pages/Supermatch';


function App({ setUserRedux }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const cancelObserver = registerAuthObserver(async (user) => {
      if (user) {
        const usuario = await getItem('users', user.uid);
        if (usuario) {
          setUserRedux(usuario);
        } else {
          console.log('todavía se está registrando');
        }
      } else {
        setUserRedux(null);
      }
      setIsLoading(false);
    });

    return () => {
      cancelObserver();
    };
  }, [setUserRedux]);
  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <Router>
        <Switch>
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/profile" component={Profile} />
          <Route path="/skills" component={Skills} />
          <Route path="/interests" component={Interests} />
          <Route path="/matches" component={Matches} />
          <Route path="/supermatch" component={Supermatch} />
          <Route path="/pending" component={Pending} />
          <Route path="/editprofile" component={EditProfile} />
          <Route path="/details/:id" component={Details} />
          <Route path="/" component={Welcome} />
        </Switch>
      </Router>
    </>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setUserRedux: (user) => dispatch(setUser(user)),
});

export default connect(null, mapDispatchToProps)(App);
