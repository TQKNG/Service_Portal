import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { connect, useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { Fragment } from 'react';

import Loading from '../layouts/Loading';
import AssessmentLetters from './AssessmentLetters';
import AssessmentReading from './AssessmentReading';
import AssessmentSilly from './AssessmentSilly';
import AssessmentBreakUpWord from './AssessmentBreakUpWord';
import AssessmentFirstSound from './AssessmentFirstSound';
import { getAssessmentInstructionByCategoryID, getResult, deleteResult,clearResult } from '../../actions/admin';
import {
  getAssessmentByCode,
  updateAssessmentResult,
  getAssessmentById,
  clearAssessmentResult,
} from '../../actions/assessment';

// your forceUpdate hook
const useForceUpdate = () => {
  const [value, setValue] = useState(0); // integer state
  return () => setValue((value) => value + 1); // update the state to force render
};

const Assessment = ({
  match,
  isAuthenticated,
  assessment,
  assessmentResults,
  assessmentResultLoading,
  getAssessmentByCode,
  updateAssessmentResult,
  getAssessmentById,
  deleteResult,
  clearResult,
  clearAssessmentResult,
  user,
}) => {
  const hist = useHistory();
  const location = useLocation();
  const forceUpdate = useForceUpdate();
  const [play, setPlay] = useState(false);
  const [done, setDone] = useState(false);
  const [restartkey, setRestartKey] = useState(0);
  const [time, setTime] = useState(0);
  const instructionImg = useSelector(
    (state) => state.admin.assessmentInstruction
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (assessmentResults === null && assessmentResultLoading) {
      if (location.pathname.includes('preview')) {
        getAssessmentById(match.params.id);
      } else if (location.pathname.includes('edit')) {
        getAssessmentById(match.params.id);
      } else {
        getAssessmentByCode(match.params.id);
      }
    }
  }, [
    assessment,
    assessmentResults,
    user,
    getAssessmentByCode,
    assessmentResultLoading,
  ]);

  useEffect(() => {
    if(assessment){
      dispatch(getAssessmentInstructionByCategoryID(assessment.CategoryID))
    }
  }, [assessment]);

  return (
    <Fragment>
      {assessment !== null ? (
        <div className=' container mx-auto my-5' style={{ paddingTop: '80px' }}>
          <div className='mb-3 '>
            <div className='d-sm-flex  w-100 align-items-center justify-content-between'>
              <div className='d-flex mb-2 mb-sm-0'>
                <div
                  className='admin-back mx-2  rounded-circle d-flex align-items-center justify-content-center txt-primary'
                  onClick={() => {
                    if (!isAuthenticated) {
                      clearAssessmentResult();
                      hist.push('/assessment/join');
                    } else {
                      hist.goBack();
                    }
                  }}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='18'
                    height='18'
                    fill='currentColor'
                    className='bi bi-arrow-left-short'
                    viewBox='0 0 16 16'
                  >
                    <path
                      fillRule='evenodd'
                      d='M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z'
                    />
                  </svg>
                </div>
                <h4 className='m-0'>Assessment</h4>
              </div>
            </div>
          </div>
          <div className='d-flex  position-relative '>
            <div className='container card shadow border-0 w-100 '>
              <div className='row g-3 my-2 mx-2'>
                <div className='col-auto'>
                  <label for='Title'>
                    <b>Student Name</b>
                  </label>
                  {(user !== null || user !== undefined) && (
                    <input
                      type='Text'
                      class='form-control border-primary bg-white rounded-0 border-0 border-bottom px-0'
                      placeholder='Please enter a title'
                      id='Title'
                      readOnly
                      value={user.FirstName + ' ' + user.LastName}
                    />
                  )}
                </div>
                {user.AlternativeID !== null && (
                  <div className='col-auto'>
                    <label for='Title'>
                      <b>Student ID</b>
                    </label>
                    {(user !== null || user !== undefined) && (
                      <input
                        type='Text'
                        class='form-control border-primary bg-white rounded-0 border-0 border-bottom px-0'
                        placeholder='Please enter a title'
                        id='Title'
                        readOnly
                        value={user.AlternativeID}
                      />
                    )}
                  </div>
                )}

                <div className='col-auto'>
                  <label for='Title'>
                    <b>Assessment Type</b>
                  </label>
                  <input
                    type='Text'
                    class='form-control border-primary bg-white rounded-0 border-0 border-bottom px-0'
                    placeholder='Please enter a title'
                    id='Title'
                    readOnly
                    value={assessment.Category}
                  />
                </div>
                <div className='col-auto'>
                  <label for='BenchMark'>
                    <b>Benchmark</b>
                  </label>
                  <input
                    type='Text'
                    class='form-control border-primary bg-white rounded-0 border-0 border-bottom px-0'
                    placeholder='Please enter a title'
                    id='Title'
                    readOnly
                    value={assessmentResults.BenchMark}
                  />
                </div>
                <div className='col-auto'>
                  <label for='BenchMark'>
                    <b>Year</b>
                  </label>
                  <input
                    type='Text'
                    class='form-control border-primary bg-white rounded-0 border-0 border-bottom px-0'
                    placeholder='Please enter a title'
                    id='Title'
                    readOnly
                    value={
                      assessmentResults.year - 1 + '-' + assessmentResults.year
                    }
                  />
                </div>

                <div className='col-auto'>
                  <label for='BenchMark'>
                    <b>Grade</b>
                  </label>
                  <input
                    type='Text'
                    class='form-control border-primary bg-white rounded-0 border-0 border-bottom px-0'
                    placeholder='Please enter a title'
                    id='Grade'
                    readOnly
                    value={
                      assessment.GradeID === 7
                        ? 'Other'
                        : 'Grade ' + assessment.GradeID
                    }
                  />
                </div>

                <div
                  class='accordion my-4 border border-rounded'
                  id='directions'
                >
                  <div class='accordion-item border-0'>
                    <h2 class='accordion-header' id='headingOne'>
                      <button
                        class='accordion-button focus-primary'
                        type='button'
                        data-bs-toggle='collapse'
                        data-bs-target='#collapseOne'
                        aria-expanded='true'
                        aria-controls='collapseOne'
                      >
                        Instructions
                      </button>
                    </h2>
                    <div
                      id='collapseOne'
                      aria-labelledby='headingOne'
                      data-parent='#directions'
                      class='collapse show'
                    >
                      <div class='accordion-body text-center'>
                        {/* <img
                          src={
                            process.env.PUBLIC_URL +
                            `/images/${assessment.CategoryID}.png`
                          }
                          alt=''
                          srcset=''
                        /> */}
                            <img
                          src={`data:image/png;base64,${instructionImg}`}
                          alt=''
                          srcset=''
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {assessment.CategoryID !== 6 && isAuthenticated && (
                  <div className='my-3'>
                    <h5 className='txt-primary'>Legend</h5>
                    <div className='card  p-1 d-inline-block '>
                      <div className='d-flex'>
                        <div className='p-2 d-flex align-items-center justify-content-start w-50'>
                          <span className='self-correct px-1 mx-2  txt-primary d-inline-flex align-items-center justify-content-center'>
                            SC
                          </span>
                          <span>
                            <b>Self Correction</b>
                          </span>
                        </div>
                        <div className='p-2 d-flex align-items-center justify-content-start w-50'>
                          <span className='skip px-1 mx-2   d-inline-flex align-items-center justify-content-center'>
                            -
                          </span>
                          <span>
                            <b>Skipping</b>
                          </span>
                        </div>
                      </div>

                      <div className='d-flex'>
                        <div className='p-2 d-flex align-items-center justify-content-start w-50'>
                          <span className='incorrect px-1 mx-2 d-flex align-items-center justify-content-center'>
                          </span>
                          <span>
                            <b>Incorrect response</b>
                          </span>
                        </div>
                        <div className='p-2 d-flex align-items-center justify-content-start w-50'>
                          <span className='no-response px-1 mx-2   d-inline-flex align-items-center justify-content-center'>
                            /
                          </span>
                          <span>
                            <b>No response</b>
                          </span>
                        </div>
                      </div>
                      <div className='d-flex'>
                        <div className='p-2 d-flex align-items-center justify-content-start w-50'>
                          <span
                            style={{ color: '#FAA525' }}
                            className='time-out px-1 mx-2  d-inline-flex align-items-center justify-content-center'
                          >
                            <b> ]</b>
                          </span>
                          <span>
                            <b>Time out</b>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {assessment.CategoryID === 6 && isAuthenticated && (
                  <div className='my-3'>
                    <h5 className='txt-primary'>Legend</h5>
                    <div className='card  p-1 d-inline-block '>
                      <div className='d-flex'>
                        <div className='p-2 d-flex align-items-center justify-content-start w-50'>
                          <span className='self-correct px-1 mx-2  txt-primary d-inline-flex align-items-center justify-content-center'></span>
                          <span>
                            <b>Correct response</b>
                          </span>
                        </div>
                        <div className='p-2 d-flex align-items-center justify-content-start w-50'>
                          <span className='incorrect px-1 mx-2 d-flex align-items-center justify-content-center'></span>
                          <span>
                            <b>Incorrect response</b>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className='d-flex pb-5 pt-1 justify-content-between'>
                {assessment.CategoryID === 1 && (
                  <AssessmentLetters
                    time={time}
                    assessment={assessment}
                    forceUpdate={forceUpdate}
                    done={done}
                    setDone={setDone}
                    setRestartKey={setRestartKey}
                    restartKey={restartkey}
                    setPlay={setPlay}
                    user={user}
                    updateAssessmentResult={updateAssessmentResult}
                    assessmentResults={assessmentResults}
                    deleteResult={deleteResult}
                    clearResult={clearResult}
                    isAuthenticated={isAuthenticated}
                  />
                )}
                {assessment.CategoryID === 2 && (
                  <AssessmentLetters
                    time={time}
                    assessment={assessment}
                    forceUpdate={forceUpdate}
                    done={done}
                    setDone={setDone}
                    setRestartKey={setRestartKey}
                    restartKey={restartkey}
                    setPlay={setPlay}
                    user={user}
                    updateAssessmentResult={updateAssessmentResult}
                    deleteResult={deleteResult}
                    clearResult={clearResult}
                    assessmentResults={assessmentResults}
                    isAuthenticated={isAuthenticated}
                  />
                )}
                {assessment.CategoryID === 3 && (
                  <AssessmentReading
                    time={time}
                    assessment={assessment}
                    forceUpdate={forceUpdate}
                    done={done}
                    setDone={setDone}
                    setRestartKey={setRestartKey}
                    restartKey={restartkey}
                    setPlay={setPlay}
                    user={user}
                    updateAssessmentResult={updateAssessmentResult}
                    deleteResult={deleteResult}
                    clearResult={clearResult}
                    assessmentResults={assessmentResults}
                    isAuthenticated={isAuthenticated}
                  />
                )}
                {assessment.CategoryID === 4 && (
                  <AssessmentSilly
                    assessment={assessment}
                    forceUpdate={forceUpdate}
                    done={done}
                    setDone={setDone}
                    setRestartKey={setRestartKey}
                    restartKey={restartkey}
                    setPlay={setPlay}
                    user={user}
                    updateAssessmentResult={updateAssessmentResult}
                    deleteResult={deleteResult}
                    clearResult={clearResult}
                    assessmentResults={assessmentResults}
                    isAuthenticated={isAuthenticated}
                  />
                )}
                {assessment.CategoryID === 5 && isAuthenticated && (
                  <AssessmentBreakUpWord
                    assessment={assessment}
                    forceUpdate={forceUpdate}
                    done={done}
                    setDone={setDone}
                    setRestartKey={setRestartKey}
                    restartKey={restartkey}
                    setPlay={setPlay}
                    user={user}
                    updateAssessmentResult={updateAssessmentResult}
                    deleteResult={deleteResult}
                    clearResult={clearResult}
                    assessmentResults={assessmentResults}
                    isAuthenticated={isAuthenticated}
                  />
                )}
                {assessment.CategoryID === 6 && isAuthenticated && (
                  <AssessmentFirstSound
                    assessment={assessment}
                    forceUpdate={forceUpdate}
                    done={done}
                    setDone={setDone}
                    setRestartKey={setRestartKey}
                    restartKey={restartkey}
                    setPlay={setPlay}
                    user={user}
                    updateAssessmentResult={updateAssessmentResult}
                    deleteResult={deleteResult}
                    clearResult={clearResult}
                    assessmentResults={assessmentResults}
                    isAuthenticated={isAuthenticated}
                  />
                )}

                {isAuthenticated && (
                  <Fragment>
                    <div
                      className='card border-0  border-2  mx-2 mx-lg-auto '
                      style={{ width: '200px', position: 'relative' }}
                    >
                      <div
                        className=''
                        style={{
                          position: 'sticky',
                          top: '120px',
                        }}
                      >
                        {!location.pathname.includes(
                          '/assessment/preview/',
                        ) && (
                          <div className='my-3 mx-auto d-flex flex-column align-items-center'>
                            <CountdownCircleTimer
                              duration={assessment.Timer * 60}
                              key={restartkey}
                              size={150}
                              isPlaying={play}
                              onComplete={() => {
                                console.log('done');
                                setDone(true);
                                setPlay(false);
                              }}
                              colors={[
                                ['#18a587', 0.5],
                                ['#F7B801', 0.25],
                                ['#A30000', 0.25],
                              ]}
                            >
                              {({ remainingTime }) => {
                                setTime(remainingTime);
                                return remainingTime;
                              }}
                            </CountdownCircleTimer>
                            <div className='d-flex mt-3 align-items-center'>
                              {!play ? (
                                <div
                                  className='btn button-primary d-flex align-items-center'
                                  onClick={() => setPlay(true)}
                                >
                                  <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    width='16'
                                    height='16'
                                    fill='#ffffff'
                                    class='bi bi-play-fill mx-1'
                                    viewBox='0 0 16 16'
                                  >
                                    <path d='m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z' />
                                  </svg>
                                  Start
                                </div>
                              ) : (
                                <div
                                  className='btn button-primary  d-flex align-items-center'
                                  onClick={() => setPlay(false)}
                                >
                                  <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    width='16'
                                    height='16'
                                    fill='#ffffff'
                                    class='bi bi-stop-fill mx-1'
                                    viewBox='0 0 16 16'
                                  >
                                    <path d='M5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5A1.5 1.5 0 0 1 5 3.5z' />
                                  </svg>
                                  Pause
                                </div>
                              )}
                              <div
                                className='rounded-circle txt-primary mx-2 cursor-pointer'
                                onClick={() => {
                                  setRestartKey(restartkey + 1);
                                  setPlay(false);
                                  setDone(false);
                                }}
                              >
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  width='24'
                                  height='24'
                                  fill='currentColor'
                                  class='bi bi-arrow-clockwise'
                                  viewBox='0 0 16 16'
                                >
                                  <path
                                    fill-rule='evenodd'
                                    d='M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z'
                                  />
                                  <path d='M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z' />
                                </svg>
                              </div>
                            </div>
                          </div>
                        )}
                        <div className=''>
                          <h6 className='txt-primary text-center'>Hints</h6>
                          <div className='text-left'>
                            {assessment.CategoryID === 1 && (
                              <div style={{ fontSize: '10px' }}>
                                <ol class='list-group list-group-numbered'>
                                  <li class='list-group-item'>
                                    Remind the students to say the letter name,
                                    not the letter sound.
                                  </li>
                                </ol>
                              </div>
                            )}
                            {assessment.CategoryID === 2 && (
                              <div style={{ fontSize: '10px' }}>
                                <ol class='list-group list-group-numbered'>
                                  <li class='list-group-item'>
                                    Remind the students to say the letter sound,
                                    not the letter name.
                                  </li>
                                  <li class='list-group-item'>
                                    If the student says /s/ for ‘c’ ask them
                                    what other sound the letter makes. Mark as
                                    incorrect if the student doesn’t respond
                                    with /k/ for ‘c’.
                                  </li>
                                </ol>
                              </div>
                            )}
                            {assessment.CategoryID === 3 && (
                              <div style={{ fontSize: '10px' }}>
                                <ol class='list-group list-group-numbered'>
                                  <li class='list-group-item'>
                                    If the student skips words, remind them to
                                    read every word.
                                  </li>
                                </ol>
                              </div>
                            )}
                            {assessment.CategoryID === 4 && (
                              <div style={{ fontSize: '10px' }}>
                                <ol class='list-group list-group-numbered'>
                                  <li class='list-group-item'>
                                    Remind the student to read the whole word or
                                    say the sounds.
                                  </li>
                                </ol>
                              </div>
                            )}
                            {assessment.CategoryID === 5 && (
                              <div style={{ fontSize: '10px' }}>
                                <ol class='list-group list-group-numbered'>
                                  <li class='list-group-item'>
                                    If the student spells or repeats the word,
                                    remind them to say the sounds in the word.
                                  </li>
                                </ol>
                              </div>
                            )}
                            {assessment.CategoryID === 6 && (
                              <div style={{ fontSize: '10px' }}>
                                <ol class='list-group list-group-numbered'>
                                  <li class='list-group-item'>
                                    Remind the students to say the first letter
                                    sound.
                                  </li>
                                </ol>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Fragment>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='d-flex align-items-center h-100 justify-content-center'>
          <Loading />
        </div>
      )}
    </Fragment>
  );
};

Assessment.propTypes = {
  user: PropTypes.object,
  isAuthenticated: PropTypes.bool.isRequired,
  getResult: PropTypes.func.isRequired,
  deleteResult: PropTypes.func.isRequired,
  clearResult: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  assessment: state.assessment.assessment,
  assessmentResults: state.assessment.assessmentResults,
  assessmentResultLoading: state.assessment.assessmentResultLoading,
  user: state.assessment.student,
});

export default connect(mapStateToProps, {
  getAssessmentByCode,
  updateAssessmentResult,
  deleteResult,
  clearResult,
  getAssessmentById,
  getResult,
  clearAssessmentResult,
})(Assessment);
