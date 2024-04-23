import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { resetLink } from '../../actions/auth';

import Alert from '../layouts/Alert';

const Forgot = ({ resetLink, sent }) => {
  const [email, setEmail] = useState('');
  const hist = useHistory();

  const onSubmit = (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);
    resetLink({ email }).then(() => {
      setTimeout(() => {
        hist.push('/account');
      }, 3000);
    });
  };
  return (
    <div className='card  login-card mx-3 mx-md-0 rounded-0 '>
      <div className='card-body  w-75 mx-auto d-flex align-items-center'>
        {/* <Loading color='main' size='lg' />*/}
        {sent ? (
          <div className='text-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='32'
              height='32'
              fill='currentColor'
              class='bi bi-envelope'
              viewBox='0 0 16 16'
            >
              <path d='M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z' />
            </svg>
            <h5 className='mt-4'>
              A Reset Link was sent to your email successfully
            </h5>
            <div className='mb-4'>
              <Link className='text-muted ' to='/account'>
                Log in
              </Link>
            </div>
          </div>
        ) : (
          <div className=''>
            <img
              src={process.env.PUBLIC_URL + `/images/logo.png`}
              alt=''
              className='w-100 mb-5 auth-img'
            />
            <Alert />
            <h4 className='mb-4'>Forgot/Change Password</h4>
            <form onSubmit={(e) => onSubmit(e)}>
              <div className='form-inline  mb-4'>
                <label htmlFor='email'> Email</label>
                <input
                  type='email'
                  className={`form-control  w-100`}
                  id='email'
                  aria-describedby='emailHelp'
                  placeholder='Enter a email...'
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className='d-flex align-items-center mb-4'>
                <button
                  type='submit'
                  className={`button-primary btn-block w-100 btn
              `}
                >
                  Search
                </button>
              </div>{' '}
              <div className='mb-4'>
                <Link className='text-muted ' to='/account'>
                  Have an account ? Login
                </Link>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

Forgot.propTypes = {
  resetLink: PropTypes.func.isRequired,
  sent: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  sent: state.auth.sent,
});

export default connect(mapStateToProps, { resetLink })(Forgot);
