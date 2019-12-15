import React, { useState, useEffect } from "react";

import firebase from 'firebase';
import 'firebase/firestore';

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { getItem } from "../../services/database";


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
      const perfil = await getItem("users", detailsId);
      setDetails(perfil);
    };
    fetchDetails();
    console.log("TCL: Profile -> profileId", detailsId);

    const db = getDbInstance();

    let detailsDoc = db.collection('users').doc(detailsId);
    let getDoc = detailsDoc.get()
    .then(doc => {
        if (!doc.exists) {
        console.log('No such document!');
        } else {
        console.log('Document data:', doc.data());
        const data = doc.data();
        const name = data.name;
        const email = data.email;
        const file = data.file;
        setEmail(email);
        setName(name);
        setFile(file);
        }
    })
    .catch(err => {
        console.log('Error getting document', err);
    });

  }, []);
  return (
    <>
      <Header />
      <div>Name:{name}</div>
      <div>Email:{email}</div>
      <img src={file}></img>
      <Footer />
    </>
  );
}

export default Details;
