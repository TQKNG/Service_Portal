import React, { Fragment, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  getClassroom,
  deleteClassroom,
  clearClassroom,
  deleteClassroomStudent,
  addClassroomStudent,
  loadUsersList,
  clearReport,
  generateReport,
} from "../../../actions/admin";
import { setAlert } from "../../../actions/alerts";
import PropTypes from "prop-types";

import ClassroomInfo from "./ClassroomInfo";

const Classroom = ({
  classroomId,
  classroom,
  classroomLoading,
  getClassroom,
  deleteClassroom,
  clearClassroom,
  deleteClassroomStudent,
  addClassroomStudent,
  loadUsersList,
  usersList,
  setAlert,
  user,
  reportsLoading,
  reports,
  generateReport,
}) => {
  const hist = useHistory();
  useEffect(() => {
    if (classroom === null && classroomLoading) {
      getClassroom(classroomId);
    }
    // '/reports/:year/:benchmark/:school/:grade/:section/:student/:teacher/',
 
  }, [classroom, classroomLoading, getClassroom, classroomId, ]);

  useEffect(()=>{
    if(classroom){
      if (user.UserTypeID === 6) {
        generateReport(
          classroom.Year ? classroom.Year : -1,
          -1,
          classroom.SchoolID ? classroom.SchoolID : -1,
          classroom.GradeID ? classroom.GradeID : -1,
          classroom.Section ? classroom.Section : -1,
          -1,
          classroom.TeacherID ? classroom.TeacherID : -1,
          user.schoolIds ? user.schoolIds : -1
        );
      } else {
        generateReport(
          classroom.Year ? classroom.Year : -1,
          -1,
          classroom.SchoolID ? classroom.SchoolID : -1,
          classroom.GradeID ? classroom.GradeID : -1,
          classroom.Section ? classroom.Section : -1,
          -1,
          classroom.TeacherID ? classroom.TeacherID : -1,
          -1
        );
      }
    }
    
  },[classroom])

  return (
    <Fragment>
      {/* Delete Modal */}
      {/* <div
        className="modal fade"
        id="deleteClassroom"
        aria-labelledby="deleteClassroomLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteClassroomLabel">
                Delete Classroom
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Are you sure you want to delete Classroom?
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
                  deleteClassroom(classroomId);
                  hist.push("/admin/classrooms");
                  clearClassroom();
                }}
                data-bs-dismiss="modal"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div> */}

      <div className="p-sm-5 p-2 w-100  dashboard-margin">
        <div className="mb-3 ">
          <h6 className="txt-primary-light">
            {user.UserType} / Classrooms / Classroom
          </h6>
          <div className="d-sm-flex  w-100 align-items-center justify-content-between">
            <div className="d-flex mb-2 mb-sm-0">
              <div
                className="admin-back mx-2  rounded-circle d-flex align-items-center justify-content-center txt-primary"
                onClick={() => {
                  hist.goBack();
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="currentColor"
                  className="bi bi-arrow-left-short"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
                  />
                </svg>
              </div>
              <h4 className="m-0">View</h4>
            </div>
            <div className="d-flex mx-2 mx-sm-0">
              {/*<div
                className='btn button-parent button-primary-outline txt-primary d-flex align-items-center px-3 mx-2'
                onClick={() => {
                  clearReport();
                  hist.push('/admin/classroom/report');
                }}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='16'
                  fill='currentColor'
                  className='bi bi-info-circle button-child'
                  viewBox='0 0 16 16'
                >
                  <path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z' />
                  <path d='m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z' />
                </svg>
                Check Reports
              </div>*/}
              {parseInt(user.UserTypeID) > 2 && (
                <>
                  <div
                    className="btn button-parent button-primary-outline txt-primary d-flex align-items-center px-3 mx-3"
                    onClick={() => {
                      hist.push("/admin/classroom/edit");
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="16px"
                      viewBox="0 0 24 24"
                      width="16px"
                      fill="currentColor"
                      className="button-child"
                    >
                      <path d="M0 0h24v24H0V0z" fill="none" />
                      <path d="M3 17.46v3.04c0 .28.22.5.5.5h3.04c.13 0 .26-.05.35-.15L17.81 9.94l-3.75-3.75L3.15 17.1c-.1.1-.15.22-.15.36zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                    </svg>
                    Edit
                  </div>

                  {/* Delete Button */}
                  {/* <div
                    className="btn btn-danger d-flex align-items-center px-3 "
                    data-bs-toggle="modal"
                    data-bs-target="#deleteClassroom"
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
                  </div> */}
                </>
              )}
            </div>
          </div>
        </div>
        <ClassroomInfo
          classroom={classroom}
          classroomLoading={classroomLoading}
          deleteClassroomStudent={deleteClassroomStudent}
          addClassroomStudent={addClassroomStudent}
          loadUsersList={loadUsersList}
          setAlert={setAlert}
          usersList={usersList}
          user={user}
          reports={reports}
          reportsLoading={reportsLoading}
        />
      </div>
    </Fragment>
  );
};

Classroom.propTypes = {
  classroom: PropTypes.object.isRequired,
  classroomLoading: PropTypes.bool.isRequired,
  getClassroom: PropTypes.func.isRequired,
  deleteClassroom: PropTypes.func.isRequired,
  clearClassroom: PropTypes.func.isRequired,
  deleteClassroomStudent: PropTypes.func.isRequired,
  loadUsersList: PropTypes.func.isRequired,
  addClassroomStudent: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  clearReport: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  classroom: state.admin.classroom,
  classroomLoading: state.admin.classroomLoading,
  usersList: state.admin.usersList,
  user: state.auth.user,
  reportsLoading: state.admin.reportsLoading,
  reports: state.admin.reports,
});

export default connect(mapStateToProps, {
  getClassroom,
  deleteClassroom,
  clearClassroom,
  deleteClassroomStudent,
  loadUsersList,
  addClassroomStudent,
  setAlert,
  clearReport,
  generateReport,
})(Classroom);
