import React from 'react';
import { useIdleTimer } from 'react-idle-timer';
import { useHistory } from 'react-router';

const SESSION_IDEL_MINUTES = 15;

const IdleTimer = ({ logout }) => {
  const history = useHistory();

  const handleOnIdle = (event) => {
    console.log('user is idle', event);
    console.log('last active', getLastActiveTime());
    logout();
    history.push('/');
  };

  const { getLastActiveTime } = useIdleTimer({
    timeout: 1000 * 60 * SESSION_IDEL_MINUTES,
    onIdle: handleOnIdle,
    debounce: 500,
  });

  return (
    <div>
      {/*<div
        class='modal fade show'
        id='idleModal'
        data-bs-backdrop='static'
        data-bs-keyboard='false'
        tabindex='-1'
        aria-labelledby='idleModalLabel'
        aria-hidden='true'
        data-show='true'
      >
        <div class='modal-dialog'>
          <div class='modal-content'>
            <div class='modal-header'>
              <h5 class='modal-title' id='idleModalLabel'>
                Warning
              </h5>
              <button
                type='button'
                class='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div class='modal-body'>Session Expire due to Inactivity</div>
            <div class='modal-footer'>
              <button
                type='button'
                class='btn btn-secondary'
                data-bs-dismiss='modal'
              >
                Close
              </button>
              <button type='button' class='btn btn-primary'>
                Understood
              </button>
            </div>
          </div>
        </div>
     </div>*/}
    </div>
  );
};

export default IdleTimer;
