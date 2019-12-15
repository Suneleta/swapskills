import React,{ useState, useEffect } from 'react';
import './profile.scss';
import { Link, withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

function Profile ({ match, history} ) {
  const user = useSelector((state) => state.user);
  const {id, name, email, district, interest, skill, file } = user;

  if (!user) return <div className="loading">Loading...</div>;

  return (
    <>
<Header />

    <div className="profile">
        <div className="container">
            <img src={file}></img>
            <div>{name}</div>
            <div>{email}</div>
            <div>{district}</div>
            <div>{interest}</div>
            <div>{skill}</div>
        </div>
        <Link to="/editprofile" className="editprofile">Edit profile</Link>
          <br />
        <Link to="/skills" >Go to skills page</Link><br/>
        <Link to="/interests">Go to interests page</Link>
    </div>
<Footer />
    </>
  );
}

export default Profile;