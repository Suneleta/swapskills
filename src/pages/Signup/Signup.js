/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { 
  setUser
} from '../../redux/actions/userActions';

import FormInput from '../../components/FormInput';
import FormInputFile from '../../components/FormInputFile';
import FormSelectDistrict from '../../components/FormSelectDistrict';

import { signup, registerAuthObserver } from '../../services/auth';
import { addItemWithId, getItem, addItem } from '../../services/database';
import uploadFile from '../../services/storage';

import './Signup.scss';
import Header from '../../components/Header';
import Footer from '../../components/Footer';


let cancelObserver;


const Signup = ({ history }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', district: '', interest: '', skill: '', file: '' });
  const [error, setError] = useState('');
  const [fileUploadPercent, setFileUploadPercent] = useState('');
  const dispatch = useDispatch();


  useEffect(() => {
    if (cancelObserver) cancelObserver();
    cancelObserver = registerAuthObserver(async (user) => {
      if (!'users') return <div>Loading...</div>; 

      if (user) {
        const profile = await getItem('users', user.uid);
        if (!profile) {
          const result = await addItemWithId('users', 
            { name: formData.name,
              email: formData.email,
              password: formData.password,
              district: formData.district || 'Eixample',
              interest: formData.interest,
              skill: formData.skill,
              file: formData.file
             },
            user.uid
          );
          if (result) {
            const userToRedux = {
              name:formData.name,
              email: formData.email,
              password: formData.password,
              district: formData.district || 'Eixample',
              interest: formData.interest,
              skill: formData.skill,
              file: formData.file || 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'

            }
            dispatch(setUser(userToRedux));
            history.push('/profile');
          }
        }
      }
    })

    return () => {
      cancelObserver();
    }
  }, [formData.name, formData.email, formData.password, formData.district,formData.interest, formData.skill, formData.file])
  
  const handleSubmitForm = (event) => {
    event.preventDefault();
    setError('');

    if (!formData.name || !formData.email || !formData.password) {
      setError('Todos los campos son obligatorios');
    } else {
      signup(formData.email, formData.password);
    }
  }
  const handleUploadFile = async (event) => {
    const file = event.target.files[0];

    const downloadURL = await uploadFile(file, setFileUploadPercent);

    
  //  console.log('result: ',downloadURL);
    if (downloadURL) {
      setFileUploadPercent('');
      setFormData({ ...formData, file: downloadURL })
    }
  };

  return(
    <>
    <body>
    <Header />
    <div className="signup">
            <form onSubmit={handleSubmitForm}>
              <FormInput label="Name" 
                  value={formData.name} 
                  onChange={value => setFormData({ ...formData, name: value })} 
                />
              <FormInput 
                label="Email" 
                value={formData.email} 
                onChange={value => setFormData({ ...formData, email: value })} 
              />
              <FormInput 
                type="password"
                label="Password" 
                value={formData.password} 
                onChange={value => setFormData({ ...formData, password: value })} 
              />
              <FormSelectDistrict 
                value={formData.district} 
                onChange={value => setFormData({ ...formData, district: value })} 
              />
              
             <div>How can you help your neighbours?</div>

             <FormInput 
                type="text"
                value={formData.skill} 
                onChange={value => setFormData({ ...formData, skill: value })} 
              />
              <div>What can your neighbours help you with?</div>
              <FormInput
                type="text"
                value={formData.interest} 
                onChange={value => setFormData({ ...formData, interest: value })} 
              />
              <div>Add a profile pic?</div>
              <input type="file"  onChange={handleUploadFile}/>
              <div>{fileUploadPercent}</div>
              <button className="signup">Signup</button>
            </form>
          </div>
        <Footer />
        </body>
      </>
  );
}

export default Signup;