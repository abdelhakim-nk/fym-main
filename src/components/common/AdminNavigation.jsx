import {ADMIN_DASHBOARD, HOME_ADMIN} from 'constants/routes';
import logo from 'images/logo-full.png';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import UserAvatar from 'views/account/components/UserAvatar';
import * as ROUTE from '../../constants/routes';

const AdminNavigation = () => {
  const { isAuthenticating, profile } = useSelector((state) => ({
    isAuthenticating: state.app.isAuthenticating,
    profile: state.profile
  }));

  return (
    <nav className="navigation navigation-admin">
      <div className="logo">
        <Link to={ADMIN_DASHBOARD} style={{ display: 'flex', alignItems: 'center' }}>
          <img alt="Logo" src={logo} />
          <h3>ADMIN PANEL</h3>
          <ul className="navigation-menu-main">
            <li><NavLink activeClassName="navigation-menu-active" exact to={ROUTE.HOME_ADMIN}>Home</NavLink></li>
            <li><NavLink activeClassName="navigation-menu-active" to={ROUTE.SHOP}>Shop</NavLink></li>
            <li><NavLink activeClassName="navigation-menu-active" to={ROUTE.FEATURED_PRODUCTS}>Homme</NavLink></li>
            <li><NavLink activeClassName="navigation-menu-active" to={ROUTE.RECOMMENDED_PRODUCTS}>Femme</NavLink></li>
          </ul>
        </Link>
      </div>
      <ul className="navigation-menu">
        <li className="navigation-menu-item">
          <UserAvatar
            isAuthenticating={isAuthenticating}
            profile={profile}
          />
        </li>
      </ul>
    </nav>
  );
};

export default AdminNavigation;
