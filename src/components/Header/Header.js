import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { logout } from '../../services/auth';
import './header.scss';

const Header = ({ history }) => {
  const user = useSelector(state => state.user);


  return (
    <div className="header">
      <div className="header_logo">
        <Link to="/">SwapSkills</Link>
       </div>
    </div>
  );
}
 
export default withRouter(Header);