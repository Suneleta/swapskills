/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import 'firebase/firestore';

import { Link, withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { addItem } from '../../services/database';

import './skills.scss';
import Header from '../../components/Header';
import Footer from '../../components/Footer';


let db;
function getDbInstance() {
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
  const [stateGiver, setStateGiver] = useState('pending');
  const [stateReceiver, setStateReceiver] = useState('pending');
  const [idReceiver, setStateIdReceiver] = useState('');


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
  }, []);

  const idGiver = id;
  const handleAccept = async (idReceiver, stateGiver) => {
    const result = await addItem(
      'matches',
      {
        idGiver, idReceiver, skill, stateGiver, stateReceiver,
      },
    );
    if (result) {
      setStateGiver(stateGiver);
      setStateReceiver(stateReceiver);
      setStateIdReceiver(idReceiver);
     
    }
  
  };
  const handleDeny = async (idReceiver) => {
    const result = await addItem(
      'matches',
      {
        idGiver, idReceiver, skill, stateGiver, stateReceiver,
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
        <div>{skill}</div>
      </div>
      <div>The following neighbours are in need of your help:</div>
      <div id="petitions-list">
        {results.map((result, i) => (
          <div key={i}>
            <div>
              <a onClick={() => enterProfile(result.id)} key={i.id}>
                {result.name}
              </a>
              <button onClick={() => handleAccept(result.id,'accepted')}>Yes</button>
              <button onClick={(handleDeny)}>No</button>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default Skill;
