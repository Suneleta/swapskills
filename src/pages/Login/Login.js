import React,{ useState } from 'react';

import FormInput from '../../components/FormInput';
import Layout from '../../components/Layout';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

import { login } from '../../services/auth';
import { useDispatch } from 'react-redux';
import { 
  setUser
} from '../../redux/actions/userActions';

import '../Signup/Signup.scss';

const Login = ({ history }) => {
  const [formData, setFormData] = useState({ email: '', password: ''});
  const [error, setError] = useState('');
  const dispatch = useDispatch();


  const handleSubmitForm = async (event) => {
    event.preventDefault();
    setError('');

    const { email, password } = formData;

    if (!email || !password) {
      setError('Todos los campos son obligatorios');
    } else {
      const result = await login(email, password);
      if (result) {
        const userToRedux = {
          name: formData.name,
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
              <button className="signup" onClick={handleSubmitForm}>Login</button>
            </form>
  </div>
  <Footer />
  </>
  );
}
 
export default Login;