import React, { useState, Fragment, useEffect } from 'react';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import { useHistory, useLocation } from 'react-router-dom';

const AssessmentLetters = ({
  assessment,
  forceUpdate,
  time,
  setRestartKey,
  restartKey,
  setDone,
  setPlay,
  updateAssessmentResult,
  assessmentResults,
  deleteResult,
  clearResult,
  user,
  isAuthenticated,
}) => {
  const hist = useHistory();
  const location = useLocation();
  const zeros = (arr) => {
    let r = [];
    for (let i = 0; i < arr.length; i++) {
      r.push(0);
    }
    return r;
  };
  const [letters, setLetters] = useState(
    assessmentResults.IncorrectIndex !== null
      ? () => {
          assessmentResults.IncorrectIndex.split(',');
          let temp = [];
          for (
            let i = 0;
            i < assessmentResults.IncorrectIndex.split(',').length;
            i++
          ) {
            temp[i] = parseInt(assessmentResults.IncorrectIndex.split(',')[i]);
          }
          return temp;
        }
      : zeros(assessment.Body.split(',')),
  );
  const [values, setValues] = useState({
    wr:
      assessmentResults.WordReadNumber !== null
        ? assessmentResults.WordReadNumber
        : 0,
    errors:
      assessmentResults.ErrorNumber !== null
        ? assessmentResults.ErrorNumber
        : 0,
  });
  const [comment, SetComment] = useState(
    assessmentResults.Comment !== null ? assessmentResults.Comment : '',
  );

  const [CWPM, setCWPM] = useState(
    assessmentResults.CWPM !== null ? assessmentResults.CWPM : 0,
  );

  const [totalScore, setTotalScore] = useState(
    assessmentResults.TotalScore !== null ? assessmentResults.TotalScore : 0,
  );

  const [doneCurrent, setDoneCurrent] = useState(
    location.pathname.includes('/assessment/preview/'),
  );

  const calculate = () => {
    let arr = [];
    let err = 0;
    console.log(letters);
    for (let i = 0; i < letters.length; i++) {
      if (letters[i] === 3) {
        break;
      }
      if (letters[i] === 1 || letters[i] === 4 || letters[i] === 5) {
        err++;
      }
      arr.push(letters[i]);
    }
    setValues({ wr: arr.length, errors: err });
    setCWPM(
      Math.round(
        Math.abs(values.wr - values.errors) / parseInt(assessment.Timer),
      ),
    );
    setTotalScore(
      Math.round(((values.wr - values.errors) / letters.length) * 100),
    );
    forceUpdate();
    setRestartKey(restartKey + 1);
    setPlay(false);
    setDone(true);
    forceUpdate();
    console.log(CWPM, totalScore);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let data = {
      ...assessmentResults,
      IncorrectIndex: letters.join(','),
      WordReadNumber: parseInt(values.wr),
      ErrorNumber: parseInt(values.errors),
      CWPM: CWPM,
      CategoryID: assessment.CategoryID,
      Comment: comment,
      TotalScore: totalScore,
    };
    updateAssessmentResult(data).then(() => {
      hist.push(`/admin/result`);
    });
  };

  useEffect(() => {
    if (
      doneCurrent &&
      !location.pathname.includes('preview') &&
      values.wr === 0
    ) {
      console.log(11111);
      calculate();
    }
    if (values.wr !== 0 && totalScore === 0) {
      console.log(1);
      setCWPM(
        Math.round(
          Math.abs(values.wr - values.errors) / parseInt(assessment.Timer),
        ),
      );
      setTotalScore(
        Math.round(((values.wr - values.errors) / letters.length) * 100),
      );

      forceUpdate();
      setRestartKey(restartKey + 1);
      setPlay(false);
      setDone(true);
      forceUpdate();
    }
  }, [
    doneCurrent,
    values,
    totalScore,
    CWPM,
    calculate,
    setCWPM,
    setTotalScore,
    forceUpdate,
  ]);

  return (
    <div className={`w-80  ${!isAuthenticated ? 'mx-auto' : ''}`}>
      <div className='d-flex flex-wrap border border-2 bg-light py-4'>
        {assessment.Body.split(',').map((letter, id) => {
          return (
            <div
              key={id}
              className='text-center my-3 cursor-pointer'
              style={{ width: 100 / assessment.Groups + '%' }}
            >
              <ContextMenuTrigger id={'same_unique_identifier' + id}>
                <b>
                  <div className='position-relative'>
                    <span
                      onClick={() => {
                        if (isAuthenticated && !doneCurrent) {
                          let temp = letters;
                          if (letters[id] === 0) {
                            temp[id] = 1;
                          } else if (letters[id] === 1) {
                            temp[id] = 2;
                          } else if (letters[id] === 2) {
                            for (let i = 0; i < temp.length; i++) {
                              if (temp[i] === 3) {
                                temp[i] = 0;
                              }
                            }

                            temp[id] = 3;
                          } else {
                            temp[id] = 0;
                          }
                          setLetters(temp);
                          forceUpdate();
                          console.log(letters);
                        }
                      }}
                    >
                      {letters[id] === 3 && (
                        <b style={{ color: '#FAA525' }}>]</b>
                      )}
                      <button className={'button-non'}>{letter}</button>

                      {letters[id] === 2 && (
                        <div
                          style={{
                            position: 'absolute',
                            display: 'inline-block',
                            top: '-150%',
                            left: '0',
                          }}
                          className=' w-100'
                        >
                          <span className='self-correct px-1 txt-primary d-inline-flex align-items-center justify-content-center'>
                            SC
                          </span>
                        </div>
                      )}
                      {letters[id] === 1 && (
                        <div
                          style={{
                            position: 'absolute',
                            display: 'inline-block',
                            top: '-150%',
                            left: '0',
                          }}
                          className=' w-100'
                        >
                          <span className='incorrect px-1  d-inline-flex align-items-center justify-content-center'>
                            <span>/</span>
                          </span>
                        </div>
                      )}
                      {letters[id] === 4 && (
                        <div
                          style={{
                            position: 'absolute',
                            display: 'inline-block',
                            top: '-150%',
                            left: '0',
                          }}
                          className=' w-100'
                        >
                          <span className='skip px-1   d-inline-flex align-items-center justify-content-center'>
                            <span>-</span>
                          </span>
                        </div>
                      )}
                      {letters[id] === 5 && (
                        <div
                          style={{
                            position: 'absolute',
                            display: 'inline-block',
                            top: '-150%',
                            left: '0',
                          }}
                          className=' w-100 d-inline-flex justify-content-center'
                        >
                          <span className='no-response px-1   d-inline-flex align-items-center justify-content-center'>
                            <span>/</span>
                          </span>
                        </div>
                      )}
                    </span>
                  </div>
                </b>
              </ContextMenuTrigger>

              {isAuthenticated && !doneCurrent && (
                <ContextMenu
                  id={'same_unique_identifier' + id}
                  className='card react-contextmenu p-1'
                >
                  <MenuItem
                    onClick={() => {
                      let temp = letters;
                      temp[id] = 2;
                      setLetters(temp);
                      forceUpdate();
                    }}
                    className='p-2 btn react-contextmenu-item d-flex align-items-center justify-content-start'
                  >
                    <span className='self-correct px-1 txt-primary d-inline-flex align-items-center justify-content-center'>
                      SC
                    </span>
                    <span>
                      <b>Self Correction</b>
                    </span>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      let temp = letters;
                      temp[id] = 4;
                      setLetters(temp);
                      forceUpdate();
                    }}
                    className='p-2 btn react-contextmenu-item d-flex align-items-center justify-content-start'
                  >
                    <span className='skip px-1   d-inline-flex align-items-center justify-content-center'>
                      -
                    </span>
                    <span>
                      <b>Skipping</b>
                    </span>
                  </MenuItem>

                  <MenuItem
                    onClick={() => {
                      let temp = letters;
                      temp[id] = 1;
                      setLetters(temp);
                      forceUpdate();
                    }}
                    className='p-2 btn react-contextmenu-item d-flex align-items-center justify-content-start'
                  >
                    <span className='incorrect px-1 d-flex align-items-center justify-content-center'>
                      /
                    </span>
                    <span>
                      <b>Incorrect response</b>
                    </span>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      let temp = letters;
                      temp[id] = 5;
                      setLetters(temp);
                      forceUpdate();
                    }}
                    className='p-2 btn react-contextmenu-item d-flex align-items-center justify-content-start'
                  >
                    <span className='no-response px-1   d-inline-flex align-items-center justify-content-center'>
                      /
                    </span>
                    <span>
                      <b>No response</b>
                    </span>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      let temp = letters;
                      for (let i = 0; i < temp.length; i++) {
                        if (temp[i] === 3) {
                          temp[i] = 0;
                        }
                      }

                      temp[id] = 3;
                      setLetters(temp);
                      forceUpdate();
                    }}
                    className='p-2 btn react-contextmenu-item d-flex align-items-center justify-content-start'
                  >
                    <span
                      style={{ color: '#FAA525' }}
                      className='time-out px-1   d-inline-flex align-items-center justify-content-center'
                    >
                      <b> ]</b>
                    </span>
                    <span>
                      <b>Time out</b>
                    </span>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      let temp = letters;
                      temp[id] = 0;
                      setLetters(temp);
                      forceUpdate();
                    }}
                    className='p-2 btn react-contextmenu-item d-flex align-items-center justify-content-start'
                  >
                    <span className='time-out px-1   d-inline-flex align-items-center justify-content-center'></span>
                    <span>
                      <b>Cancel</b>
                    </span>
                  </MenuItem>
                </ContextMenu>
              )}
            </div>
          );
        })}
      </div>
      {isAuthenticated && (
        <Fragment>
          <div class='form-floating my-2'>
            <textarea
              onChange={(e) => SetComment(e.target.value)}
              class='form-control'
              placeholder='Leave a comment here'
              id='floatingTextarea2'
              value={comment}
              readOnly={location.pathname.includes('/assessment/preview/')}
              style={{ height: '100px' }}
            ></textarea>
            <label for='floatingTextarea2'>Comments</label>
          </div>
          <div
            className={`d-flex align-items-center justify-content-${
              !doneCurrent ? 'end' : 'between'
            } my-3`}
          >
            {doneCurrent && (
              <div className=''>
                Total Letters Read:{' '}
                <span className='txt-primary'>
                  <b>{values.wr}</b>
                </span>{' '}
                , # of Errors:{' '}
                <span className='text-danger'>
                  <b>{values.errors}</b>
                </span>{' '}
                CLPM:{' '}
                <span>
                  <b>{CWPM}</b>
                </span>{' '}
                Total Score:{' '}
                <span>
                  <b>{CWPM}</b>
                </span>
              </div>
            )}
            {!location.pathname.includes('/assessment/preview/') && (
              <div className='d-flex align-items-center justify-content-end mb-2  p-2'>
                <button
                  type='reset'
                  className='button-primary btn-block btn px-5 mx-2'
                  onClick={() => {
                    setLetters(zeros(assessment.Body.split(',')));
                    setCWPM(0);
                    setValues({
                      wr: 0,
                      errors: 0,
                    });
                    setTotalScore(0);
                    setDone(false);
                    setDoneCurrent(false);
                  }}
                >
                  Clear
                </button>
                {!doneCurrent ? (
                  <button
                    className='button-primary btn-block btn px-5'
                    onClick={() => {
                      setDoneCurrent(true);
                      calculate();
                    }}
                  >
                    Done
                  </button>
                ) : (
                  <button
                    className='button-primary btn-block btn px-5'
                    onClick={(e) => onSubmit(e)}
                  >
                    Submit
                  </button>
                )}

                   {/* Delete Button */}
                {/* Delete Modal */}
                <div
                  className="modal fade"
                  id="deleteResult"
                  aria-labelledby="deleteResultLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="deleteResultLabel">
                          Delete Assigned Assessment
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        Are you sure you want to delete assigned assessment?
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          className="btn button-primary"
                          onClick={() => {
                            deleteResult(assessmentResults.ResultID, user.SchoolID);
                            hist.push("/admin/result");
                            clearResult();
                          }}
                          data-bs-dismiss="modal"
                        >
                          Confirm
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="btn btn-danger d-flex align-items-center px-4 mx-2"
                  data-bs-toggle="modal"
                  data-bs-target="#deleteResult"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-trash-fill button-child"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                  </svg>
                  Delete
                </div>
              </div>
            )}
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default AssessmentLetters;
