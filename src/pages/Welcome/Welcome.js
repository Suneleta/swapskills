import React from 'react';
import { Link } from 'react-router-dom';

import Signup from '../Signup';
import Login from '../Login';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

import './welcome.scss';


function Welcome() {
    return (
        <>
      <Header />
      <div className="welcome">
        <div className="welcome_hero">
          <div className="welcome_hero_title">
            Right around the corner leaves the person who needs you more and right across the street you will find the help you´re looking for. Look around, we are in this community together!
          </div>
        </div>
        <div className="welcome_buttons">
           <Link to="/login" className="login">Login</Link>
           <Link to="/signup" className="signup">Signup</Link>
      </div>
    </div>
    <Footer />
x    </>
    );
  }

export default Welcome;