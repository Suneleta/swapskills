/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import 'firebase/firestore';

import { Link, withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { addItem, deleteItem, getDbInstance } from '../../services/database';
import { registerAuthObserver } from '../../services/auth';


import '../Skills/skills.scss';
import Header from '../../components/Header';
import Footer from '../../components/Footer';


const Interest = ({ history }) => {
  const user = useSelector((state) => state.user);
  const {
    id, district, interest, skill,
  } = user;
  const [results, setResults] = useState([]);
  const [stateGiver, setStateGiver] = useState('pending');
  const [stateReceiver, setStateReceiver] = useState('pending');
  const [specificMatchId, setSpecificMatchId] = useState('');
  const [idReceiver, setStateIdReceiver] = useState(id);
  const [idGiver, setIdGiver] = useState('');
  const [setMessageWaiting, messageWaiting] = useState('');
  const [setMessageSuccess, messageSuccess] = useState('');


  const enterProfile = (id) => {
    history.push(`/details/${id}`);
  };

  useEffect(() => {
    if (!'users') return <div className="loading">Loading...</div>;

    if (user) {
      const db = getDbInstance();
      const usersRef = db.collection('users');
      const query = usersRef
        .where('district', '==', district)
        .where('skill', '==', interest)
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


  const handleAccept = async (idGiver, stateReceiver, specificMatchId) => {
    //* **** GET MATCH BTWN THIS GIVER AND THIS RECEIVER --- ITS ID */
    const shared = interest;
    const db = getDbInstance();
    const matchesRef = db.collection('matches');
    const queryM = matchesRef
      .where('idGiver', '==', idGiver)
      .where('idReceiver', '==', id)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          console.log(doc.id, ' => ', doc.data());
          specificMatchId = doc.id;
          console.log(specificMatchId);
        });
        setSpecificMatchId(specificMatchId);
        console.log(specificMatchId);
        if (specificMatchId) {
          db.collection('matches').doc(specificMatchId).update({ // Update state of giver to accepted
            stateReceiver: 'accepted',
          });
        } else {
          const result = addItem(
            'matches',
            {
              idGiver, idReceiver, shared, stateGiver, stateReceiver,
            },
          );
          if (result) {
            setStateGiver(stateGiver);
            setStateReceiver(stateReceiver);
            setIdGiver(idGiver);
          }
        }
      })
      .catch((err) => {
        console.log('Error getting documents', err);
      });

    //* IF THERE´S MATCH BTWN THIS GIVER AND RECEIVER UPDATE STATE*/

    /* if (specificMatchId) {
      console.log(specificMatchId);
      db.collection('matches').doc(specificMatchId).update({
        stateReceiver: 'accepted',
      });
      setSpecificMatchId(specificMatchId);
      console.log(specificMatchId);
    }

    //* IF THERE´S NO MATCH BTWN THIS GIVER AND RECEIVER CREATE ONE */

    /* else {
      const result = await addItem(
        'matches',
        {
          idGiver, idReceiver, shared, stateGiver, stateReceiver,
        },
      );
      if (result) {
        setStateGiver(stateGiver);
        setStateReceiver(stateReceiver);
        console.log(stateReceiver);
        setIdGiver(idGiver);
        console.log('idGiver: ', idGiver);
      }
    } */
  };

  const handleDeny = async () => {
    if (specificMatchId) {
      const result = await deleteItem('matches', specificMatchId);
      if (result) {
        history.push('/interests');
      }
    }
  };

  return (
    <>
      <Header />
      <div className="interests-page">
        <div className="interest-container">
        You are currently interested in:
          <div className="interest">{interest}</div>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#D2386A" fillOpacity="1" d="M0,192L48,186.7C96,181,192,171,288,186.7C384,203,480,245,576,234.7C672,224,768,160,864,138.7C960,117,1056,139,1152,149.3C1248,160,1344,160,1392,160L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" />
        </svg>
        <div className="petitions-container">
          <div>These neighbours can help you with this:</div>
          <div id="petitions-list">
            {results.map((result, i) => (
              <div key={i}>
                <div className="petitions-list-item">
                  <a id="result" onClick={() => enterProfile(result.id)} key={i.id}>
                    {result.name}
                  </a>
                  <button id="accept" onClick={() => handleAccept(result.id, 'accepted', result.match)}>Yes</button>
                  <button id="deny" onClick={() => handleDeny(result.id)}>No</button>
                  <button id="toggle" className="hidden">Complete</button>
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

export default Interest;
