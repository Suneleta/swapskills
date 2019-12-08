import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { logout } from '../../services/auth';
import './footer.scss';


const Footer = ({ history }) => {
  const user = useSelector((state) => state.user);

  const handleLogout = () => {
    logout();
    history.push('/');
  }

  return (
    <div className="footer">
        {user 
          ? <span>{user.name} <button onClick={handleLogout}>Logout</button></span>
          : (
              <>
                <span><Link to="/">Home</Link></span>
              </>
            )
        }

    </div>
  );
}
 
export default withRouter(Footer);