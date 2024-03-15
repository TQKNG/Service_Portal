import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadClassroomsList, clearClassroom } from '../../../actions/admin';
import PropTypes from 'prop-types';

import ClassroomsList from './ClassroomsList';

const Classrooms = ({
  loadClassroomsList,
  classroomsList,
  classroomListLoading,
  clearClassroom,
  user,
}) => {
  const hist = useHistory();
  useEffect(() => {
    if (classroomsList.length === 0 && classroomListLoading && user !== null) {
      loadClassroomsList();
    }
  }, [classroomsList, classroomListLoading, loadClassroomsList, user]);
  return (
    <div className='p-sm-5 p-2 w-100 dashboard-margin'>
      <div className='mb-3 '>
        <div className='d-flex align-items-center'>
          <h6 className='txt-primary-light mb-0'>
            {user.UserType} / Classrooms
          </h6>{' '}
          <div className='rounded-pill bg-primary px-2 py-1 align-self-center mx-2 my-2 caption '>
            {classroomsList.length}
          </div>
        </div>
        <div className='d-flex w-100 align-items-center justify-content-end'>
          <div className='d-flex'>
            {parseInt(user.UserTypeID) !== 1 && (
              <div
                className='btn button-parent button-primary d-flex align-items-center px-3'
                onClick={() => {
                  clearClassroom();
                  hist.push('/admin/classroom/add');
                }}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  enableBackground='new 0 0 24 24'
                  height='18px'
                  viewBox='0 0 24 24'
                  width='24px'
                  fill='#ffffff'
                  className='button-child'
                >
                  <g>
                    <rect fill='none' height='18' width='18' />
                  </g>
                  <g>
                    <g>
                      <path d='M19,13h-6v6h-2v-6H5v-2h6V5h2v6h6V13z' />
                    </g>
                  </g>
                </svg>
                Add Classroom
              </div>
            )}
          </div>
        </div>
      </div>
      <ClassroomsList
        classroomsList={
          user.UserTypeID === 1
            ? classroomsList.filter((item) => item.TeacherID === user.UserID)
            : classroomsList
        }
        classroomListLoading={classroomListLoading}
        user={user}
      />
    </div>
  );
};

Classrooms.propTypes = {
  classroomsList: PropTypes.array,
  loadClassroomsList: PropTypes.func.isRequired,
  classroomListLoading: PropTypes.bool,
  clearClassroom: PropTypes.func.isRequired,
  user: PropTypes.object,
};
const mapStateToProps = (state) => ({
  classroomsList: state.admin.classroomsList,
  classroomListLoading: state.admin.classroomListLoading,
  user: state.auth.user,
});

export default connect(mapStateToProps, { clearClassroom, loadClassroomsList })(
  Classrooms,
);
