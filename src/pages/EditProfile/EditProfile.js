/* eslint-disable react/jsx-filename-extension */
import React,{ useState, useEffect } from 'react';
import firebase from 'firebase';
import "firebase/firestore";
import { 
  setUser
} from '../../redux/actions/userActions';

import { Link, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

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

function Profile ({ history }) {
  const user = useSelector((state) => state.user);
  const {id, name, password, email, district, interest, skill, file } = user;
  const [formData, setFormData] = useState({ district: '', interest: '', skill: '', file: '' });
  const [fileUploadPercent, setFileUploadPercent] = useState('');
  const dispatch = useDispatch();
 
  const UpdateData = async (event) => {
    event.preventDefault();
    const db = getDbInstance();
    await db.collection("users").doc(id).update({
      district: document.getElementById("district").value || district,
      skill: document.getElementById("skill").value || skill,
      interest: document.getElementById("interest").value || interest,
      name,
      email,
      password,
      file
    });
    const userToRedux={
      district: document.getElementById("district").value || district,
      skill: document.getElementById("skill").value || skill,
      interest: document.getElementById("interest").value || interest,
      name,
      email,
      password,
      file
    }
    dispatch(setUser(userToRedux));
    history.push('/profile')
  }
  console.log(user)

      



  return (
    <>
<Header />
<Link to="/editprofile" className="editprofile">Edit profile</Link>
    <div className="profile">
        <div className="container">
            <form onSubmit={UpdateData}>
                <input placeholder={id} disabled></input>
                <input placeholder={name} disabled></input>
                <input placeholder={password} type="password" disabled></input>
                <input placeholder={email} disabled></input>
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
                <input placeholder={skill} id="skill"></input>
                <input placeholder={interest} id="interest"></input>
                
                <button>Edit Profile</button>
            </form>
        </div>

    </div>
<Footer />
    </>
  );
}

export default Profile;