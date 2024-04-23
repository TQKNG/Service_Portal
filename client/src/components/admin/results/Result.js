import React, { Fragment, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { getResult, deleteResult, clearResult } from '../../../actions/admin';
import { getAssessmentById } from '../../../actions/assessment';
import PropTypes from 'prop-types';
import ResultInfo from './ResultInfo';

const Result = ({
  resultId,
  result,
  resultLoading,
  getResult,
  deleteResult,
  clearResult,
  getAssessmentById,
  user,
}) => {
  const hist = useHistory();
  useEffect(() => {
    if (result === null && resultLoading) {
      console.log(resultId);
      getResult(resultId);
    }
  }, [result, resultLoading, getResult, resultId]);

  return (
    <Fragment>
      <div
        className='modal fade'
        id='deleteResult'
        aria-labelledby='deleteResultLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-dialog-centered'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='deleteResultLabel'>
                Delete Assigned Assessment
              </h5>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body'>
              Are you sure you want to delete assigned assessment?
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
                  deleteResult(resultId, user.SchoolID);
                  hist.push('/admin/result');
                  clearResult();
                }}
                data-bs-dismiss='modal'
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className='p-sm-5 p-2 w-100  dashboard-margin'>
        <div className='mb-3 '>
          <h6 className='txt-primary-light'>
            {user.UserType} / Assigned Assessments / Assigned Assessment
          </h6>
          <div className='d-sm-flex  w-100 align-items-center justify-content-between'>
            <div className='d-flex mb-2 mb-sm-0'>
              <div
                className='admin-back mx-2  rounded-circle d-flex align-items-center justify-content-center txt-primary'
                onClick={() => {
                  hist.goBack();
                  clearResult();
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
            <div className='d-flex mx-2 mx-sm-0'>
              <div
                className='btn button-parent button-primary-outline txt-primary d-flex align-items-center px-3'
                onClick={() => {
                  getAssessmentById(result.ResultID).then(() =>
                    hist.push(`/assessment/edit/${result.ResultID}`),
                  );
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
              {/* <div
                className='btn btn-danger d-flex align-items-center px-3 mx-3'
                data-bs-toggle='modal'
                data-bs-target='#deleteResult'
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
          </div>
        </div>
        <ResultInfo
          result={result}
          resultLoading={resultLoading}
          getAssessmentById={getAssessmentById}
        />
      </div>
    </Fragment>
  );
};
Result.propTypes = {
  result: PropTypes.object.isRequired,
  resultLoading: PropTypes.bool.isRequired,
  getResult: PropTypes.func.isRequired,
  deleteResult: PropTypes.func.isRequired,
  clearResult: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  result: state.admin.result,
  resultLoading: state.admin.resultLoading,
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  getResult,
  deleteResult,
  clearResult,
  getAssessmentById,
})(Result);
