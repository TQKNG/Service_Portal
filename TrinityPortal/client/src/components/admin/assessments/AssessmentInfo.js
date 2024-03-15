import React, { Fragment, useState, useEffect } from 'react';
import ReactHtmlParser from 'react-html-parser';
import Alert from '../../layouts/Alert';

const AssessmentInfo = ({
  user,
  assessment,
  assessmentLoading,
  deleteSchoolAssessment,
  loadSchoolsList,
  addSchoolAssessment,
  setAlert,
  schoolsList,
}) => {
  const [list, setList] = useState([]);
  const [edit, setEdit] = useState(false);
  const [schoolsAssessmentList, setSchoolsAssessmentList] = useState([]);
  const [school, setSchool] = useState(-1);
  useEffect(() => {
    if (!assessmentLoading) {
      let arr = [];
      for (let i = 0; i < assessment.Schools.length; i++) {
        arr.push({
          Name: assessment.Schools[i].SchoolName,
          ID: assessment.Schools[i].SchoolID,
        });
      }
      setList(arr);
    }
  }, [assessmentLoading, assessment, setList]);

  return (
    <Fragment>
      {assessmentLoading ? (
        <div className='card w-100 p-2 p-sm-3 p-lg-4 shadow-lg border-0  mb-2 vh-100 '>
          <div className='d-flex justify-content-center align-items-center h-100'>
            <div class='spinner-border txt-primary' role='status'>
              <span class='visually-hidden'>Loading...</span>
            </div>
          </div>
        </div>
      ) : (
        <div className='card w-100 p-2 p-sm-3 p-lg-4 shadow-lg border-0  mb-2 '>
          <Alert />
          <div className='mb-3'>
            <div className='txt-primary'>Type</div>
            <div className=''>{assessment.Category}</div>
          </div>
          <div className='mb-3'>
            <div className='txt-primary'>Grade</div>
            {assessment.GradeID !== 7 ? (
              <div className=''>Grade {assessment.GradeID}</div>
            ) : (
              <div>Other</div>
            )}
          </div>
          <div className='mb-3'>
            <div className='txt-primary'>Title</div>
            <div className=''>{assessment.Title}</div>
          </div>
          <div className='mb-3'>
            <div className='txt-primary'>Timer</div>
            <div className=''>{assessment.Timer} Minute</div>
          </div>
          {user.UserTypeID === 5 && (
            <Fragment>
              <div className='mb-3'>
                <div className='txt-primary'>Schools</div>
                <div className='d-flex justify-content-end'>
                  <div
                    className='btn button-primary'
                    onClick={() => {
                      if (edit) {
                        setEdit(false);
                      } else {
                        let arr = [];
                        for (let i = 0; i < list.length; i++) {
                          arr.push(assessment.Schools[i].SchoolID);
                        }
                        setSchoolsAssessmentList(arr);
                        loadSchoolsList().then(() => {
                          setEdit(true);
                        });
                      }
                    }}
                  >
                    {edit ? 'Cancel' : 'Edit'}
                  </div>
                </div>
                {edit && (
                  <div className='d-flex my-3'>
                    <select
                      className='form-select mx-2'
                      aria-label='Default select example'
                      id='School'
                      value={school}
                      onChange={(e) => {
                        setSchool(parseInt(e.target.value));
                      }}
                    >
                      <option value={-1}>Please Select a School</option>
                      {schoolsList
                        .sort((a, b) => {
                          const nameA = a.Name;
                          const nameB = b.Name;

                          if (nameA < nameB) {
                            return -1;
                          }
                          if (nameA > nameB) {
                            return 1;
                          }
                          return 0;
                        })
                        .map((school, id) => {
                          return (
                            <option value={school.SchoolID} key={id}>
                              {school.Name}
                            </option>
                          );
                        })}
                    </select>
                    <button
                      className='btn button-primary'
                      onClick={(e) => {
                        const arr = [...schoolsAssessmentList, school];
                        if (
                          [...new Set(arr)].length ===
                          schoolsAssessmentList.length
                        ) {
                          console.log(1);
                          setAlert('School Already exists', 'danger');
                        } else {
                          console.log({
                            SchoolID: school,
                            AssessmentID: assessment.AssessmentID,
                            CategoryID: assessment.CategoryID,
                          });
                          addSchoolAssessment({
                            SchoolID: school,
                            AssessmentID: assessment.AssessmentID,
                            CategoryID: assessment.CategoryID,
                          });
                          setSchoolsAssessmentList(arr);
                          setEdit(false);
                        }
                      }}
                      disabled={school === -1}
                    >
                      Submit
                    </button>
                  </div>
                )}
                {list.length > 0 && (
                  <table className='table table-striped'>
                    <thead>
                      <tr>
                        <th scope='col '>#</th>
                        <th scope='col '>School Name</th>
                        {edit && <th scope='col '>Actions</th>}
                      </tr>
                    </thead>
                    <tbody>
                      {list.map((item, id) => {
                        return (
                          <tr key={id}>
                            <th scope='row'>{id + 1}</th>
                            <td>{item.Name}</td>

                            {edit && (
                              <td>
                                <div
                                  className=''
                                  onClick={() => {
                                    deleteSchoolAssessment(
                                      assessment.AssessmentID,
                                      assessment.CategoryID,
                                      item.ID,
                                    ).then(() => {
                                      setSchoolsAssessmentList(
                                        schoolsAssessmentList.filter(
                                          (s) => s !== item.ID,
                                        ),
                                      );
                                      setList(
                                        list.filter(
                                          (school) => item.ID !== school.ID,
                                        ),
                                      );
                                      setEdit(false);
                                    });
                                  }}
                                >
                                  <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    width='32'
                                    height='32'
                                    fill='currentColor'
                                    class='bi bi-trash delete-item-btn rounded-circle border  border-2 p-2'
                                    viewBox='0 0 16 16'
                                  >
                                    <path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z' />
                                    <path
                                      fill-rule='evenodd'
                                      d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z'
                                    />
                                  </svg>
                                </div>
                              </td>
                            )}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            </Fragment>
          )}

          <div className='mb-3'>
            <div className='txt-primary'>CreatedBy</div>
            <div className=''>{assessment.CreatedBy}</div>
          </div>
          <div className='mb-3 w-80'>
            <h6 className='txt-primary'>Assessment Material</h6>
            {assessment.Solution !== undefined && (
              <table className='table table-striped'>
                <thead>
                  <tr>
                    <th scope='col '>#</th>
                    <th scope='col '>Word</th>
                    <th scope='col '>Solution</th>
                    {assessment.SolutionDetails !== null && (
                      <th scope='col '>SolutionDetails</th>
                    )}
                    {assessment.CategoryID !== 6 && <th scope='col '>Score</th>}
                  </tr>
                </thead>
                <tbody>
                  {assessment.Body.split(',').map((item, id) => {
                    return (
                      <tr>
                        <th scope='row'>{id + 1}</th>
                        <td>{assessment.Body.split(',')[id]}</td>
                        <td>{assessment.Solution.split(',')[id]}</td>
                        {assessment.SolutionDetails !== null && (
                          <td>{assessment.SolutionDetails.split(',')[id]}</td>
                        )}
                        {assessment.CategoryID !== 6 && (
                          <td>{assessment.Scores.split(',')[id]}</td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
            {assessment.Groups !== undefined && (
              <Fragment>
                <div className='my-3 w-100'>
                  <div className='txt-primary'>Body</div>
                  <div className='w-80' style={{ whiteSpace: 'pre-line' }}>
                    <span className='w-50'>
                      {ReactHtmlParser(assessment.Body)}
                    </span>
                  </div>
                </div>
                {assessment.CategoryID !== 3 && (
                  <div className=''>
                    <div className='txt-primary'>Groups</div>
                    <div className=''>{assessment.Groups}</div>
                  </div>
                )}
              </Fragment>
            )}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default AssessmentInfo;
