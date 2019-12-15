/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import 'firebase/firestore';

import { Link, withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { addItem } from '../../services/database';

import '../Skills/skills.scss';
import Header from '../../components/Header';
import Footer from '../../components/Footer';


let db;
function getDbInstance() {
  if (!db || db._isTerminated) {
    db = firebase.firestore();
  }
  return db;
}

const Interest = ({ history }) => {
  const user = useSelector((state) => state.user);
  const {
    id, district, interest, skill,
  } = user;
  const [results, setResults] = useState([]);
  const [matchedResults, setMatchedResults] = useState([]);
  const [stateGiver, setStateGiver] = useState('pending');
  const [stateReceiver, setStateReceiver] = useState('pending');
  const [idReceiver, setStateIdReceiver] = useState([]);


  const enterProfile = (id) => {
    history.push(`/details/${id}`);
  };

  useEffect(() => {
    
    /*  getAllFiltered({
      collection: 'users',
      filterDistrict: { field: 'district', condition: '==', value: district },
      filterSkill: { field: 'skill', condition: '==', value: interest },
      order: 'timestamp',
      callback: (collectionData) => {
        const newResults = [];
        collectionData.forEach((document) => {
          const data = document.data();
          const userDate = new Date(data.timestamp);
          data.date = userDate.toLocaleDateString();
          data.time = userDate.toLocaleTimeString();
          newResults.push(data);
        });
        setResults(newResults);
        console.log(newResults);
      },
    });

  */
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

        setResults(newResults);
      })
      .catch((err) => {
        console.log('Error getting documents', err);
      });

    const matchesRef = db.collection('matches');
    const queryM = matchesRef
      .where('idReceiver', '==', id)
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          console.log('No matching documents.');
          return;
        }
        const matchedResults = [];
        snapshot.forEach((doc) => {
          matchedResults.push({
            id: doc.id,
            ...doc.data(),
          });
        });
  
        setMatchedResults(matchedResults);
        console.log(matchedResults);

      })
      .catch((err) => {
        console.log('Error getting documents', err);
      });
  }, []);


  
  const idGiver = id;
  
  const handleAccept = async (idReceiver, stateReceiver) => {
    if (!matchedResults) {
      const result = await addItem(
        'matches',
        {
          idGiver, idReceiver, interest, stateGiver, stateReceiver,
        },
      );
      if (result) {
        setStateGiver(stateGiver);
        setStateReceiver(stateReceiver);
        console.log(stateReceiver);
        setStateIdReceiver(idReceiver);
      }
    } else {
      const db = getDbInstance();
      await db.collection("matches").doc('a04G6SH0pG2eQCRdGjcx').update({
        stateReceiver: 'accepted',
      });
      console.log(stateReceiver);
      document.getElementById('toggle').classList.add("block");
      document.getElementById('accept').classList.add("hidden");
      document.getElementById('deny').classList.add("hidden");
      document.getElementById('result').classList.add("match");
    }
    
  };

  const handleDeny = async () => {
    const result = await deleteItem(
      'matches',
      {
        idGiver, idReceiver, interest, stateGiver, stateReceiver,
      },
    );
    if (result) {
    }
  };
  return (
    <>
      <Header />
      <Link to="/">Home</Link>
      <div className="skill-container">
        <div>{interest}</div>
      </div>
      <div>The following neighbours are in need of your help:</div>
      <div id="petitions-list">
        {results.map((result, i) => (
          <div key={i}>
            <div>
              <a id="result" onClick={() => enterProfile(result.id)} key={i.id}>
                {result.name}
              </a>
              <button id="accept" onClick={() => handleAccept(result.id, 'accepted')}>Yes</button>
              <button id="toggle" className='hidden' >Complete</button>
              <button id="deny" onClick={(handleDeny)}>No</button>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default Interest;
