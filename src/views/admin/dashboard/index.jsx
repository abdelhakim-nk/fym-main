import { useDocumentTitle, useScrollTop } from 'hooks';
import React from 'react';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  useDocumentTitle('Welcome | Admin Dashboard');
  useScrollTop();

  const { profile, isAuthenticating } = useSelector((state) => ({
    profile: state.profile,
    isAuthenticating: state.app.isAuthenticating
  }));

  return (
    <div className="loader">
      <h2>
        Bienvenue  Admin
        {' '}
        {profile.fullname && profile.fullname.split(' ')[0]}
      </h2>
    </div>
  );
};

export default Dashboard;
