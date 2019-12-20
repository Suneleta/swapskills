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
  const [messagePending, setMessagePending] = useState('pending');
  const [messageSuccess, setMessageSuccess] = useState('supermatch');


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
    const db = getDbInstance();
    const shared = interest;
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
          setMessageSuccess(messageSuccess);
          console.log(messageSuccess);
          history.push('/supermatch');
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
            setMessagePending(messagePending);
            console.log(messagePending);
            history.push('/pending');
          }
        }
      })
      .catch((err) => {
        console.log('Error getting documents', err);
      });
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
                  <a onClick={() => enterProfile(result.id)} key={i.id}>
                    {result.name}
                  </a>
                  <button type="button" onClick={() => handleAccept(result.id, 'accepted', result.match)} key={i.id}>Yes</button>
                  <button type="button" onClick={() => handleDeny(result.id, result.match)}>No</button>
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
