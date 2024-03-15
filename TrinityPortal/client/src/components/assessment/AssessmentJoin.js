import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAssessmentByCode } from '../../actions/assessment';
import PropTypes from 'prop-types';

const AssessmentJoin = ({ getAssessmentByCode, accessCode, alerts }) => {
  const [first, setFirst] = useState(0);
  const [second, setSecond] = useState(0);
  const [third, setThird] = useState(0);
  const [fourth, setFourth] = useState(0);
  const [fifth, setFifth] = useState(0);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(parseInt(first + second + third + fourth + fifth));
    getAssessmentByCode(parseInt(first + second + third + fourth + fifth));
  };

  if (accessCode !== null) {
    return <Redirect to={'/assessment/' + accessCode} />;
  }

  return (
    <div
      className='d-flex h-100 position-relative '
      style={{ paddingTop: '80px' }}
    >
      <div className='container card shadow border-0 w-100 my-5'>
        <div className='card-body d-flex mt-5'>
          <div className=' w-100 d-flex flex-column align-items-center '>
            {alerts !== null && alerts.length > 0 ? (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='60'
                height='60'
                fill='currentColor'
                class='bi bi-emoji-frown mb-4 mt-5 text-danger'
                viewBox='0 0 16 16'
              >
                <path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z' />
                <path d='M4.285 12.433a.5.5 0 0 0 .683-.183A3.498 3.498 0 0 1 8 10.5c1.295 0 2.426.703 3.032 1.75a.5.5 0 0 0 .866-.5A4.498 4.498 0 0 0 8 9.5a4.5 4.5 0 0 0-3.898 2.25.5.5 0 0 0 .183.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z' />
              </svg>
            ) : (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='60'
                height='60'
                fill='currentColor'
                class='bi bi-book mb-4 mt-5 txt-primary'
                viewBox='0 0 16 16'
              >
                <path d='M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z' />
              </svg>
            )}

            {alerts !== null && alerts.length > 0 ? (
              <h5 className='text-danger'>Hmm, these numbers didn't work.</h5>
            ) : (
              <h4>Enter your 5-digit Number</h4>
            )}
            <div className='d-flex mt-3 '>
              <input
                type='number'
                required
                max-length='1'
                min='0'
                max='9'
                className={`assessment-number mx-3 rounded border border-2 border-${
                  alerts !== null && alerts.length > 0 ? 'danger' : 'primary'
                } `}
                value={first}
                onChange={(e) => {
                  setFirst(e.target.value[e.target.value.length - 1]);
                }}
              />
              <input
                type='text'
                required
                max-length='1'
                className={`assessment-number mx-3 rounded border border-2 border-${
                  alerts !== null && alerts.length > 0 ? 'danger' : 'primary'
                } `}
                value={second}
                onChange={(e) => {
                  setSecond(e.target.value[e.target.value.length - 1]);
                }}
              />
              <input
                type='text'
                required
                max-length='1'
                className={`assessment-number mx-3 rounded border border-2 border-${
                  alerts !== null && alerts.length > 0 ? 'danger' : 'primary'
                } `}
                value={third}
                onChange={(e) => {
                  setThird(e.target.value[e.target.value.length - 1]);
                }}
              />
              <input
                type='text'
                required
                max-length='1'
                className={`assessment-number mx-3 rounded border border-2 border-${
                  alerts !== null && alerts.length > 0 ? 'danger' : 'primary'
                } `}
                value={fourth}
                onChange={(e) => {
                  setFourth(e.target.value[e.target.value.length - 1]);
                }}
              />
              <input
                type='text'
                required
                max-length='1'
                className={`assessment-number mx-3 rounded border border-2 border-${
                  alerts !== null && alerts.length > 0 ? 'danger' : 'primary'
                } `}
                value={fifth}
                onChange={(e) => {
                  setFifth(e.target.value[e.target.value.length - 1]);
                }}
              />
            </div>

            <button
              type='button'
              className='btn button-primary mt-4 px-5 py-1'
              onClick={(e) => {
                onSubmit(e);
              }}
            >
              Enter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

AssessmentJoin.propTypes = {
  assessmentResults: PropTypes.object,
};
const mapStateToProps = (state) => ({
  assessmentResults: state.assessment.assessmentResults,

  accessCode: state.assessment.accessCode,
  alerts: state.alerts,
});

export default connect(mapStateToProps, {
  getAssessmentByCode,
})(AssessmentJoin);
