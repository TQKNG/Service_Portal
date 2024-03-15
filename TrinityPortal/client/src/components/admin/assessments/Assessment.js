import React, { Fragment, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  deleteAssessment,
  getAssessment,
  clearAssessment,
  loadSchoolsList,
  deleteSchoolAssessment,
  addSchoolAssessment,
} from '../../../actions/admin';
import { setAlert } from '../../../actions/alerts';
import PropTypes from 'prop-types';

import AssessmentInfo from './AssessmentInfo';

const Assessment = ({
  categoryId,
  assessmentId,
  assessment,
  assessmentLoading,
  getAssessment,
  deleteAssessment,
  clearAssessment,
  loadSchoolsList,
  schoolsList,
  user,
  deleteSchoolAssessment,
  addSchoolAssessment,
  setAlert,
}) => {
  const hist = useHistory();
  useEffect(() => {
    if (assessment === null && assessmentLoading) {
      loadSchoolsList();
      console.log('loading assessment', assessmentId, categoryId);
      getAssessment(assessmentId, categoryId);
    }
  }, [
    assessment,
    assessmentLoading,
    getAssessment,
    assessmentId,
    categoryId,
    loadSchoolsList,
  ]);

  return (
    <Fragment>
      {/* Delete Button */}
      {/* <div
        className='modal fade'
        id='deleteassessment'
        aria-labelledby='deleteassessmentLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-dialog-centered'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='deleteassessmentLabel'>
                Delete Assessment
              </h5>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body'>
              Are you sure you want to delete this assessment?
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary'
                data-bs-dismiss='modal'
              >
                Cancel
              </button>
              <button
                type='button'
                className='btn button-primary'
                onClick={() => {
                  deleteAssessment(assessmentId, categoryId);
                  hist.push('/admin/assessments');
                  clearAssessment();
                }}
                data-bs-dismiss='modal'
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div> */}

      <div className='p-sm-5 p-2 w-80 mx-auto  dashboard-margin'>
        <div className='mb-3 '>
          <h6 className='txt-primary-light'>
            {user.UserType} / Assessments / Assessment
          </h6>
          <div className='d-sm-flex  w-100 align-items-center justify-content-between'>
            <div className='d-flex mb-2 mb-sm-0'>
              <div
                className='admin-back mx-2  rounded-circle d-flex align-items-center justify-content-center txt-primary'
                onClick={() => {
                  clearAssessment();
                  hist.push('/admin/assessments');
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
              <h4 className='m-0'>View</h4>
            </div>
            {user.UserTypeID === 5 && (
              <div className='d-flex mx-2 mx-sm-0'>
                <div
                  className='btn button-parent button-primary-outline txt-primary d-flex align-items-center px-3'
                  onClick={() => {
                    hist.push('/admin/assessment/edit');
                  }}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    height='16px'
                    viewBox='0 0 24 24'
                    width='16px'
                    fill='currentColor'
                    className='button-child'
                  >
                    <path d='M0 0h24v24H0V0z' fill='none' />
                    <path d='M3 17.46v3.04c0 .28.22.5.5.5h3.04c.13 0 .26-.05.35-.15L17.81 9.94l-3.75-3.75L3.15 17.1c-.1.1-.15.22-.15.36zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z' />
                  </svg>
                  Edit
                </div>

                {/* Delete Button */}
                {/* <div
                  className='btn btn-danger d-flex align-items-center px-3 mx-3'
                  data-bs-toggle='modal'
                  data-bs-target='#deleteassessment'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='16'
                    height='16'
                    fill='currentColor'
                    className='bi bi-trash-fill button-child'
                    viewBox='0 0 16 16'
                  >
                    <path d='M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z' />
                  </svg>
                  Delete
                </div> */}
              </div>
            )}
          </div>
        </div>

        <AssessmentInfo
          assessment={assessment}
          assessmentLoading={assessmentLoading}
          addSchoolAssessment={addSchoolAssessment}
          deleteSchoolAssessment={deleteSchoolAssessment}
          setAlert={setAlert}
          loadSchoolsList={loadSchoolsList}
          schoolsList={schoolsList}
          user={user}
        />
      </div>
    </Fragment>
  );
};
Assessment.propTypes = {
  assessment: PropTypes.object.isRequired,
  assessmentLoading: PropTypes.bool.isRequired,
  getAssessment: PropTypes.func.isRequired,
  deleteAssessment: PropTypes.func.isRequired,
  clearAssessment: PropTypes.func.isRequired,
  loadSchoolsList: PropTypes.func.isRequired,
  schoolsList: PropTypes.array.isRequired,
  schoolListLoading: PropTypes.bool.isRequired,
  deleteSchoolAssessment: PropTypes.func.isRequired,
  addSchoolAssessment: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  assessment: state.admin.assessment,
  assessmentLoading: state.admin.assessmentLoading,
  schoolsList: state.admin.schoolsList,
  schoolListLoading: state.admin.schoolListLoading,
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  getAssessment,
  deleteAssessment,
  clearAssessment,
  loadSchoolsList,
  setAlert,
  deleteSchoolAssessment,
  addSchoolAssessment,
})(Assessment);
