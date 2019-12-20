import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import 'firebase/firestore';

import { Link, withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import './supermatch.scss';

function Supermatch({ match, history }) {
  const user = useSelector((state) => state.user);


  return (
    <>
      <div className="supermatch-page">
        <Header />
        <div className="supermatch">
          <div className="supermatch_content">
            <img src="https://media.giphy.com/media/3oEjHV0z8S7WM4MwnK/source.gif" />
            <div className="supermatch_content_title">
              <span ihref="#" className="brand-logo">Supermatch</span>
            </div>
            <div className="supermatch_content_text">
            Turns out you´ve been already picked by your neighbour! Make sure to contact them by the email you´ll find in their profiles and keep growing this community.
            </div>
            <div className="links-container">
              <br />
              <Link to="/skills">Go to skills page</Link>
              <br />
              <Link to="/interests">Go to interests page</Link>
              <br />
              <Link to="/profile">Back to profile</Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Supermatch;
