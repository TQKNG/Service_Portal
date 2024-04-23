import React, { Fragment } from 'react';

import Alert from '../../layouts/Alert';
import ClassroomStudentGrid from './ClassroomStudentGrid';

const ClassroomInfo = ({
  user,
  classroom,
  classroomLoading,
  reports,
  reportsLoading,
}) => {
  return (
    <Fragment>
      {classroomLoading ? (
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
            <div className='txt-primary'>Section</div>
            <div className=''>{classroom.Section}</div>
          </div>
          <div className='mb-3'>
            <div className='txt-primary'>Grade</div>
            <div className=''>{classroom.Grade}</div>
          </div>
          <div className='mb-3'>
            <div className='txt-primary'>Remark</div>
            <div className=''>{classroom.Remark}</div>
          </div>
          <div className='mb-3'>
            <div className='txt-primary'>Year</div>
            <div className=''>
              {classroom.Year - 1}-{classroom.Year}
            </div>
          </div>
          <div className='mb-3'>
            <div className='txt-primary'>Teacher</div>
            <div className=''>
              {classroom.TeacherName + ' ' + classroom.TeacherLastName}
            </div>
          </div>
          {user.UserTypeID === 5 && (
            <div className='mb-3'>
              <div className='txt-primary'>Schools</div>
              <div className=''>{classroom.SchoolName}</div>
            </div>
          )}
          <div className='mb-3 w-80'>
            <h6 className='txt-primary'>Students Info</h6>
            {classroom.Students.length > 0 ? (
              <table className='table table-striped'>
                <thead>
                  <tr>
                    <th scope='col '>#</th>
                    <th scope='col '>First Name</th>
                    <th scope='col '>Last Name</th>
                  </tr>
                </thead>
                <tbody>
                  {classroom.Students.sort((a, b) => {
                    const nameA =
                      a.StudentName.toUpperCase() +
                      ' ' +
                      a.StudentLastName.toUpperCase();
                    const nameB =
                      b.StudentName.toUpperCase() +
                      ' ' +
                      b.StudentLastName.toUpperCase();
                    if (nameA < nameB) {
                      return -1;
                    }
                    if (nameA > nameB) {
                      return 1;
                    }
                    return 0;
                  }).map((item, id) => {
                    return (
                      <tr key={id}>
                        <th scope='row'>{id + 1}</th>
                        <td>{item.StudentName}</td>
                        <td>
                          {item.StudentLastName +
                            (item.AlternativeID !== null
                              ? ` - ${item.AlternativeID}`
                              : '')}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <div className=''>The Class in empty</div>
            )}{' '}
          </div>
          <ClassroomStudentGrid
            reports={reports}
            reportsLoading={reportsLoading}
          />
        </div>
      )}
    </Fragment>
  );
};

export default ClassroomInfo;
