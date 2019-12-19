/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import 'firebase/firestore';

import { Link, withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { addItem, deleteItem } from '../../services/database';

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
  const [matchedResultIds, setMatchedResultIds] = useState([]);
  const [specificMatchId, setSpecificMatchId] = useState('');
  const [stateGiver, setStateGiver] = useState('pending');
  const [stateReceiver, setStateReceiver] = useState('pending');
  const [idReceiver, setStateIdReceiver] = useState(id);
  const [idGiver, setStateIdGiver] = useState('');


  const enterProfile = (id) => {
    history.push(`/details/${id}`);
  };

  useEffect(() => {
    console.log(idReceiver);
    console.log(id);
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
        }
        const matchedResults = [];
        snapshot.forEach((doc) => {
          matchedResults.push({
            id: doc.id,
            ...doc.data(),
          });
          matchedResultIds.push({
            id: doc.id,
          });
        });

        setMatchedResults(matchedResults);
        setMatchedResultIds(matchedResultIds);
        console.log(matchedResultIds);
      })
      .catch((err) => {
        console.log('Error getting documents', err);
      });
  }, []);


  const handleAccept = async (idGiver, stateReceiver, specificMatchId) => {
    if (!matchedResults) {
      const result = await addItem(
        'matches',
        {
          id, idReceiver, interest, stateGiver, stateReceiver,
        },
      );
      if (result) {
        setStateGiver(stateGiver);
        setStateReceiver(stateReceiver);
        console.log(stateReceiver);
        setStateIdGiver(idGiver);
      }
    } else {
      console.log('id:', id);
      console.log('idReciever', idReceiver);
      console.log('idGiver', idGiver);
      const db = getDbInstance();

      db.collection('matches')
        .where('id', '==', idGiver)
        .where('idReceiver', '==', id)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, ' => ', doc.data());
            const specificMatchId = doc.id;
          });
          console.log(specificMatchId);
          setSpecificMatchId(specificMatchId);
          db.collection('matches').doc(specificMatchId).update({
            stateReceiver: 'accepted',
          });
        })
        .catch((error) => {
          console.log('Error getting documents: ', error);
        });

      console.log(specificMatchId);
      /*
      const db = getDbInstance();
      await db.collection('matches').doc(specificMatchId).update({
        stateReceiver: 'accepted',
      });
      console.log(stateReceiver);
      document.getElementById('toggle').classList.add('block');
      document.getElementById('accept').classList.add('hidden');
      document.getElementById('deny').classList.add('hidden');
      document.getElementById('result').classList.add('match'); */
    }
  };

  const handleDeny = async (idReceiver) => {
    const result = await deleteItem(
      'users',
      {
        id, idReceiver, interest, stateGiver, stateReceiver,
      },
    );
    const newResult = await deleteItem(
      'matches',
      {
        id, idReceiver, interest, stateGiver, stateReceiver,
      },
    );
    if (result || newResult) {
      history.push('/interests');
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
