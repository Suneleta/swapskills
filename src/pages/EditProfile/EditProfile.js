/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import 'firebase/firestore';

import { Link, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  setUser,
} from '../../redux/actions/userActions';

import FormSelectDistrict from '../../components/FormSelectDistrict';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

let db;
function getDbInstance() {
  if (!db || db._isTerminated) {
    db = firebase.firestore();
  }
  return db;
}

function EditProfile({ history }) {
  const user = useSelector((state) => state.user);
  const {
    id, name, password, email, district, interest, skill, file,
  } = user;
  const [formData, setFormData] = useState({
    district: '', interest: '', skill: '', file: '',
  });
  const [fileUploadPercent, setFileUploadPercent] = useState('');
  const dispatch = useDispatch();

  const UpdateData = async (event) => {
    event.preventDefault();
    const db = getDbInstance();
    await db.collection('users').doc(id).update({
      id,
      district: document.getElementById('district').value || district,
      skill: document.getElementById('skill').value || skill,
      interest: document.getElementById('interest').value || interest,
      name,
      email,
      password,
      file,
    });
    const userToRedux = {
      id,
      district: document.getElementById('district').value || district,
      skill: document.getElementById('skill').value || skill,
      interest: document.getElementById('interest').value || interest,
      name,
      email,
      password,
      file,
    };
    dispatch(setUser(userToRedux));
    history.push('/profile');
  };
  console.log(user);


  return (
    <>
      <Header />
      <div className="edit-profile">
        <div className="container">
          <form onSubmit={UpdateData}>
            <div className="question">Changed location?</div>
            <div className="select">
              <select id="district">
                <option value="Eixample">Eixample</option>
                <option value="Ciutat Vella">Ciutat Vella</option>
                <option value="Sants-Montjuic">Sants-Montjuic</option>
                <option value="Sarrià - Sant Gervasi">Sarrià - Sant Gervasi</option>
                <option value="Gràcia">Gràcia</option>
                <option value="Horta - Guinardó">Horta - Guinardó</option>
                <option value="Nou Barris">Nou Barris</option>
                <option value="Sant Andreu">Sant Andreu</option>
                <option value="Sant Martí">Sant Martí</option>
              </select>
            </div>
            <div className="question">Someting new you can offer to the community?</div>

            <div className="select">
              <select id="skill">
                <option value="Sewing">Sewing</option>
                <option value="Woodwork">Woodwork</option>
                <option value="German classes">German classes</option>
                <option value="Babysitting">Babysitting</option>
                <option value="Helping with schoolwork">Helping with schoolwork</option>
                <option value="Repairs">Repairs</option>
                <option value="English classes">English classes</option>
                <option value="Dogwalking">Dogwalking</option>
                <option value="Household">Household</option>
              </select>
            </div>
            <div className="question">What else can your neighbours help you with?</div>

            <div className="select">
              <select id="interest">
                <option value="Sewing">Sewing</option>
                <option value="Woodwork">Woodwork</option>
                <option value="German classes">German classes</option>
                <option value="Babysitting">Babysitting</option>
                <option value="Helping with schoolwork">Helping with schoolwork</option>
                <option value="Repairs">Repairs</option>
                <option value="English classes">English classes</option>
                <option value="Dogwalking">Dogwalking</option>
                <option value="Household">Household</option>
              </select>
            </div>
            <button>Edit Profile</button>
          </form>
        </div>

      </div>
      <Footer />
    </>
  );
}

export default EditProfile;
