import React,{ useState } from 'react';

import FormInput from '../../components/FormInput';
import Layout from '../../components/Layout';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

import { login } from '../../services/auth';

import '../Signup/Signup.scss';


const Login = ({ history }) => {
  const [formData, setFormData] = useState({ email: '', password: ''});
  const [error, setError] = useState('');

  const handleSubmitForm = async (event) => {
    event.preventDefault();
    setError('');

    const { email, password } = formData;

    if (!email || !password) {
      setError('Todos los campos son obligatorios');
    } else {
      const result = await login(email, password);
      if (result) {
        alert("welcome back sunshine")
         history.push('/profile')
      } else {
        alert("first time I ever see you dude")
      }
    }
  }

  return (
    <>
    <Header />
    <div className="login">
            {error && <div className="form-error">{error}</div>}
            <form onSubmit={handleSubmitForm}>
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
              <a className="signup" onClick={handleSubmitForm}>Login</a>
            </form>
  </div>
  <Footer />
  </>
  );
}
 
export default Login;