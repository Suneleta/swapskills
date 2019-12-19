import React, { useState, useEffect } from 'react';

import firebase from 'firebase';
import 'firebase/firestore';
import { Link, withRouter } from 'react-router-dom';


import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { getItem } from '../../services/database';

import '../Profile/profile.scss';


let db;
function getDbInstance() {
  if (!db || db._isTerminated) {
    db = firebase.firestore();
  }
  return db;
}

function Details({ match, history }) {
  const detailsId = match.params.id;
  const [details, setDetails] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      const perfil = await getItem('users', detailsId);
      setDetails(perfil);
    };
    fetchDetails();
    console.log('TCL: Profile -> profileId', detailsId);

    const db = getDbInstance();

    const detailsDoc = db.collection('users').doc(detailsId);
    const getDoc = detailsDoc.get()
      .then((doc) => {
        if (!doc.exists) {
          console.log('No such document!');
        } else {
          console.log('Document data:', doc.data());
          const data = doc.data();
          const { name } = data;
          const { email } = data;
          const { file } = data;
          setEmail(email);
          setName(name);
          setFile(file);
        }
      })
      .catch((err) => {
        console.log('Error getting document', err);
      });
  }, []);
  const fileStyle = {
    backgroundImage: `url(${file})`,
    WebkitTransition: 'all', // note the capital 'W' here
    msTransition: 'all', // 'ms' is the only lowercase vendor prefix
  };
  return (
    <>
      <Header />
      <div className="details-page">
        <div className="profile-pic">
          <div className="frame" style={fileStyle} />
          <div className="content">

            <div>
Name:&nbsp;
              {name}
            </div>
            <div>
Email:&nbsp;
              {email}
            </div>
          </div>
        </div>
        <div className="links-container">
          <Link to="/skills">Go back to your skills page</Link>
          <br />
          <Link to="/interests">Go back to your interests page</Link>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Details;
