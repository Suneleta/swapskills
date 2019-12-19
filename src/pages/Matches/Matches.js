import React, { useState, useEffect } from 'react';
import firebase from 'firebase';

import { Link, withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Header from '../../components/Header';
import Footer from '../../components/Footer';


let db;
function getDbInstance() {
  if (!db || db._isTerminated) {
    db = firebase.firestore();
  }
  return db;
}

function Profile({ match, history }) {
  const user = useSelector((state) => state.user);
  const {
    id, name, email, district, interest, skill, file,
  } = user;
  const [servicesGiven, setServicesGiven] = useState([]);
  const [servicesReceived, setServicesReceived] = useState([]);


  useEffect(() => {
    if (!user) {
      return <div className="loading">Loading...</div>;
    }

    const db = getDbInstance();
    console.log(id);
    db.collection('matches')
      .where('id', '==', id)
      .where('stateGiver', '==', 'accepted')
      .where('stateReceiver', '==', 'accepted')
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.empty) {
          console.log('No matching documents.');
        }
        querySnapshot.forEach((doc) => {
          servicesGiven.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        console.log(servicesGiven.length);
        setServicesGiven(servicesGiven.length);
      })
      .catch((error) => {
        console.log('Error getting documents: ', error);
      });

    console.log(id);

    db.collection('matches')

      .where('id', '==', id)
      .where('stateGiver', '==', 'accepted')
      .where('stateReceiver', '==', 'accepted')
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.empty) {
          console.log('No matching documents.');
        }
        querySnapshot.forEach((doc) => {
          servicesReceived.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        console.log(servicesReceived.length);
        setServicesReceived(servicesReceived.length);
      })
      .catch((error) => {
        console.log('Error getting documents: ', error);
      });
  }, []);


  if (!user) return <div className="loading">Loading...</div>;


  return (
    <>
      <div className="profile-page">
        <Header />
        <div className="profile">
          <div className="content">
            <div>
Matches to offer services:&nbsp;
              {servicesGiven}
            </div>
            <div>
Matches to receive services:&nbsp;
              {servicesReceived}
            </div>
          </div>
          <div className="links-container">
            <Link to="/skills">Go to skills page</Link>
            <br />
            <Link to="/interests">Go to interests page</Link>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Profile;
