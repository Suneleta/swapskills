import React from 'react';
import './profile.scss';
import { Link, withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Header from '../../components/Header';
import Footer from '../../components/Footer';


function Profile () {
    const user = useSelector((state) => state.user);
    const {name, email, district, interest, skill, file } = user;


return (
    <>
<Header />
<Link to="/edit" className="editprofile">Edit profile</Link>
    <div className="profile">
        <div className="container">
            <div>{name}</div>
            <div>{email}</div>
            <div>{district}</div>
            <div>{interest}</div>
            <div>{skill}</div>
            <img src={file}></img>
        </div>
    </div>
<Footer />
    </>
);
}

export default Profile;