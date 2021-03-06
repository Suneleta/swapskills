import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import 'firebase/firestore';

import { Link, withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import './profile.scss';


function Profile({ match, history }) {
  const user = useSelector((state) => state.user);

  const [servicesGiven, setServicesGiven] = useState([]);
  const [servicesReceived, setServicesReceived] = useState([]);


  if (!user) return <div className="loading">Loading...</div>;
  const fileStyle = {
    backgroundImage: `url(${user.file})`,
    WebkitTransition: 'all', // note the capital 'W' here
    msTransition: 'all', // 'ms' is the only lowercase vendor prefix
  };


  return (
    <>
      <div className="profile-page">
        <Header />
        <div className="profile">
          <div className="frame" style={fileStyle} />
          <div className="content">
            <div>
Name:&nbsp;
              {user.name}
            </div>
            <div>
Contact email:&nbsp;
              {user.email}
            </div>
            <div>
Neighbourhood:&nbsp;
              {user.district}
            </div>
            <div>
Interested in:&nbsp;
              {user.interest}
            </div>
            <div>
Willing to offer:&nbsp;
              {user.skill}
            </div>
          </div>
          <div className="links-container">
            <Link to="/editprofile" className="editprofile">Edit profile</Link>
            <br />
            <Link to="/skills">Go to skills page</Link>
            <br />
            <Link to="/interests">Go to interests page</Link>
            <br />
            <Link to="/matches">Check your match statistics</Link>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Profile;
