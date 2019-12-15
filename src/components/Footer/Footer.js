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

          ? <div className="footer_content"><Link to="/profile">{user.name}</Link><a onClick={handleLogout}>Logout</a></div>
          : (
              <>
                <span><Link to="/">Home</Link></span>
                <a href="https://suneleta.github.io/Portfolio/index.html" className="powered">Powered by Skylab Coder Eleni Taki</a>
              </>
            )
        }

    </div>
  );
}
 
export default withRouter(Footer);