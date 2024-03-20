import React from 'react';
import { connect } from 'react-redux';
import { useLocation, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

// Components
import Login from './Login';
import Forgot from './Forgot';
import Reset from './Reset';

const Auth = ({ match, user }) => {
  const location = useLocation();
  if (user !== null && user.UserTypeID >= 3) {
    return <Redirect to='/admin/dashboard' />;
  }
  if (user !== null && user.UserTypeID === 1) {
    return <Redirect to='/admin/result' />;
  }

  return (
    <div
      className='bg-login d-flex align-items-center justify-content-center justify-content-lg-end h-100'
    >
      <img src={process.env.PUBLIC_URL + `/images/Login-Hero.jpg`} className='w-80 h-100'/>
      {location.pathname === '/' && <Login />}
      {location.pathname === '/account' && <Login />}
      {location.pathname === '/account/forgot' && <Forgot />}
      {location.pathname.includes('/account/reset') && (
        <Reset token={match.params.token} />
      )}
    </div>
  );
};

Auth.propTypes = {
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, {})(Auth);
