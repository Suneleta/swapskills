/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import 'firebase/firestore';

import { Link, withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { addItem } from '../../services/database';
import { registerAuthObserver } from '../../services/auth';


import './skills.scss';
import Header from '../../components/Header';
import Footer from '../../components/Footer';


function parseDoc(doc) {
  return {
    id: doc.id,
    ...doc.data(),
  };
}


function getDbInstance() {
  let db;
  if (!db || db._isTerminated) {
    db = firebase.firestore();
  }
  return db;
}

const Skill = ({ history }) => {
  const user = useSelector((state) => state.user);
  const {
    id, district, interest, skill,
  } = user;
  const [results, setResults] = useState([]);
  const [matchedResults, setMatchedResults] = useState([]);
  const [stateGiver, setStateGiver] = useState('pending');
  const [stateReceiver, setStateReceiver] = useState('pending');
  const [specificMatchId, setSpecificMatchId] = useState('');
  const [idGiver, setIdGiver] = useState(id);
  const [idReceiver, setIdReceiver] = useState('');


  const enterProfile = (id) => {
    history.push(`/details/${id}`);
  };

  useEffect(() => {
    if (!'users') return <div className="loading">Loading...</div>;

    if (user) {
      console.log(skill);
      const db = getDbInstance();
      const usersRef = db.collection('users');
      const query = usersRef
        .where('district', '==', district)
        .where('interest', '==', skill)
        .get()
        .then((snapshot) => {
          if (snapshot.empty) {
            console.log('No matching documents.');
            return;
          }
          const newResults = [];
          snapshot.forEach((doc) => {
            newResults.push({
              id: doc.id,
              ...doc.data(),
            });
          });

          console.log(newResults);
          setResults(newResults);
        })
        .catch((err) => {
          console.log('Error getting documents', err);
        });
    }


    return () => {
    };
  }, []);
  const db = getDbInstance();

  const matchesRef = db.collection('matches');
  const queryM = matchesRef
    .where('id', '==', id)
    .where('idReceiver', '==', idReceiver)
    .get()
    .then((snapshot) => {
      if (snapshot.empty) {
        console.log('No matching documents.');
        return;
      }
      snapshot.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data());
        const specificMatchId = doc.id;
      });
      console.log(specificMatchId);
      setSpecificMatchId(specificMatchId);
      db.collection('matches').doc(specificMatchId).update({ // Update state of giver to accepted
        stateReceiver: 'accepted',
      });
    })
    .catch((err) => {
      console.log('Error getting documents', err);
    });
  const handleAccept = async (idReceiver, stateGiver) => {
    //* Process to create, check matches and update them */
    //* Step 1 Getting the match of this giver and this receiver together */

    const matchesRef = db.collection('matches');
    const queryM = matchesRef
      .where('id', '==', id)
      .where('idReceiver', '==', idReceiver)
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          console.log('No matching documents.');
          return;
        }
        snapshot.forEach((doc) => {
          console.log(doc.id, ' => ', doc.data());
          const specificMatchId = doc.id;
          setSpecificMatchId(specificMatchId);
          console.log(specificMatchId);
        });
        console.log(specificMatchId);
        db.collection('matches').doc(specificMatchId).update({ // Update state of giver to accepted
          stateReceiver: 'accepted',
        });
      })
      .catch((err) => {
        console.log('Error getting documents', err);
      });
    //* Step 2 If there is no previous match with this giver and receiver create one  */

    if (!matchedResults) {
      const result = await addItem(
        'matches',
        {
          id, idReceiver, skill, stateGiver, stateReceiver,
        },
      );
      if (result) {
        setStateGiver(stateGiver);
        setStateReceiver(stateReceiver);
        setIdReceiver(idReceiver);
      }
    } else {
      console.log(specificMatchId);
      db.collection('matches').doc('XfWac63yH41A8P7hYtLK').update({
        stateReceiver: 'accepted',
      });
      setSpecificMatchId(specificMatchId);
      console.log(specificMatchId);
    }
    //* END OF Process to create, check matches and update them */
  };

  const handleDeny = async (idReceiver) => {


  };
  return (
    <>
      <Header />
      <div className="skills-page">
        <div className="skill-container">
        Your special skill is:
          <div className="skill">{skill}</div>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#e0ffff" fillOpacity="1" d="M0,192L48,186.7C96,181,192,171,288,186.7C384,203,480,245,576,234.7C672,224,768,160,864,138.7C960,117,1056,139,1152,149.3C1248,160,1344,160,1392,160L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" />
        </svg>
        <div className="petitions-container">
          <div>The following neighbours are in need of your help:</div>
          <div id="petitions-list">
            {results.map((result, i) => (
              <div key={i}>
                <div className="petitions-list-item">
                  <a onClick={() => enterProfile(result.id)} key={i.id}>
                    {result.name}
                  </a>
                  <button id="yes" onClick={() => handleAccept(result.id, 'accepted')}>Yes</button>
                  <button className="hidden" id="pending">Pending</button>
                  <button id="no" onClick={(handleDeny)}>No</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Skill;
