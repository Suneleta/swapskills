import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { connect } from 'react-redux';

import { setUser } from './redux/actions/userActions';
import { registerAuthObserver } from './services/auth';
import { getItem } from './services/database';

import Welcome from './pages/Welcome';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import Login from './pages/Login';
import AddSkills from './pages/AddSkills';
import AddInterests from './pages/AddInterests';
import EditProfile from './pages/EditProfile';

function App({ setUserRedux }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const cancelObserver = registerAuthObserver(async (user) => {
      console.log("TCL: cancelObserver -> user", user)
      if (user) {
        const usuario = await getItem('users', user.uid);
        console.log("TCL: cancelObserver -> usuario", usuario)
        if (usuario) {
          setUserRedux(usuario);
        } else {
          console.log("todavía se está registrando");
        }
      } else {
        setUserRedux(null);
      }
      setIsLoading(false);
    })

    return () => {
      cancelObserver();
    }
  }, []);
  if (isLoading) return <div>Loading...</div>

  return (
    <>
      <Router>
        <Switch>
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/profile" component={Profile} />
          <Route path="/addskills" component={AddSkills} />
          <Route path="/addinterests" component={AddInterests} />
          <Route path="/editprofile" component={EditProfile} />
          <Route path="/" component={Welcome} />
        </Switch>
      </Router>
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUserRedux: (user) => dispatch(setUser(user))
  }
}

export default connect(null, mapDispatchToProps)(App);
