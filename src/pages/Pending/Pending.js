import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import 'firebase/firestore';

import { Link, withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import '../Supermatch/supermatch.scss';


function Pending({ match, history }) {
  const user = useSelector((state) => state.user);

  return (
    <>
      <div className="pending-page">
        <Header />
        <div className="pending">
          <div className="pending_content">
            <img src="https://media.giphy.com/media/Lnjqt0t2UUZGw/source.gif" />
            <div className="pending_content_title">
              <span ihref="#" className="brand-logo">Waiting...</span>
            </div>
            <div className="pending_content_text">
    Seems that your neighbour hasn´t seen you on their dashboard yet. Why not contact them by email?
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

export default Pending;
