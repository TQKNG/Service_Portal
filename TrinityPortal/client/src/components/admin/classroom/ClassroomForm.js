import React, { useState, useEffect } from "react";
import { useLocation, useHistory, Redirect } from "react-router-dom";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { connect } from "react-redux";
import {
  loadClassroomsList,
  clearClassroom,
  updateClassroom,
  deleteClassroom,
  addClassroom,
  loadSchoolsList,
  loadUsersList,
  deleteClassroomStudent,
  addClassroomStudent,
} from "../../../actions/admin";
import { setAlert } from "../../../actions/alerts";
import Alert from "../../layouts/Alert";
import PropTypes from "prop-types";
import ClassroomFormStudents from "./ClassroomFormStudents";

const ClassroomForm = ({
  clearClassroom,
  updateClassroom,
  addClassroom,
  deleteClassroom,
  schoolsList,
  classroom,
  user,
  schoolListLoading,
  loadSchoolsList,
  loadUsersList,
  usersList,
  usersListLoading,
  classroomLoading,
  deleteClassroomStudent,
  addClassroomStudent,
  setAlert,
}) => {
  const hist = useHistory();
  const location = useLocation();

  const [list, setList] = useState([]);
  const [edit, setEdit] = useState(false);
  const [studentsList, setStudentsList] = useState([]);
  const [student, setStudent] = useState(-1);

  useEffect(() => {
    if (!classroomLoading && location.pathname.includes("edit")) {
      setList(classroom.Students);
    }
  }, [classroomLoading, classroom, setList]);

  useEffect(() => {
    if (schoolsList.length === 0 && schoolListLoading) {
      loadSchoolsList();
    }
    if (usersList.length === 0 && usersListLoading) {
      loadUsersList();
    }
  }, [
    schoolsList,
    loadSchoolsList,
    schoolListLoading,
    usersListLoading,
    loadUsersList,
    usersList.length,
  ]);

  useEffect(() => {
    if (user.UserTypeID === 6) {
      loadUsersList();
    }
  }, [clearClassroom]);

  const [formData, setFormData] = useState({
    Section:
      classroom === null
        ? ""
        : classroom.Section !== undefined
        ? classroom.Section
        : "",
    Year:
      classroom === null
        ? 2021
        : classroom.Year !== undefined
        ? classroom.Year
        : 2021,
    GradeID:
      classroom === null
        ? 1
        : classroom.GradeID !== undefined
        ? classroom.GradeID
        : 1,
    TeacherID:
      classroom === null
        ? ""
        : classroom.TeacherID !== undefined
        ? classroom.TeacherID
        : "",
    Remarks:
      classroom === null
        ? ""
        : classroom.Remarks !== undefined
        ? classroom.Remarks
        : "",
    SchoolID:
      user.SchoolID !== null
        ? user.SchoolID
        : classroom === null
        ? ""
        : classroom.SchoolID !== undefined
        ? classroom.SchoolID
        : "",
    Students:
      classroom === null
        ? []
        : classroom.Students !== undefined
        ? classroom.Students
        : [],
  });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);
    if (location.pathname.includes("add")) {
      console.log("add");
      let data = {
        ...formData,
        Students: [...new Set(Students)].filter((item) => item !== -1),
      };
      console.log(data);
      addClassroom(data).then(() => {
        hist.push("/admin/classrooms");
        clearClassroom();
      });
    } else if (location.pathname.includes("edit")) {
      console.log("edit");
      updateClassroom(classroom.ClassroomID, formData).then(() => {
        hist.push("/admin/classrooms");
        clearClassroom();
      });
    }
  };

  const { Section, Remarks, GradeID, TeacherID, Year, SchoolID, Students,ClassroomID } =
    formData;

  if (classroom === null && location.pathname.includes("edit"))
    return <Redirect to="/admin/classrooms" />;

  return (
    <div className="p-sm-5 p-2 w-100  dashboard-margin mx-lg-auto container">
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
            <h4 className="m-0">
              {location.pathname.includes("add") ? "View" : "Edit"}
            </h4>
          </div>
        </div>
      </div>
      <form
        className="card w-100 p-2 p-sm-3 p-lg-4 shadow-lg border-0  mb-2 "
        onSubmit={(e) => onSubmit(e)}
      >
        <Alert />

        <div className="mb-3">
          <div className="txt-primary">Section</div>
          <input
            type="text"
            className="form-control rounded "
            id="Section"
            placeholder="Enter Section Name... (e.g., 2A, 2B)"
            required
            value={Section}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="mb-3">
          <div className="txt-primary">Remarks</div>
          <input
            type="text"
            className="form-control rounded "
            id="Remarks"
            placeholder="Enter Remarks..."
            value={Remarks}
            onChange={(e) => onChange(e)}
          />
        </div>
        {!schoolListLoading && user.SchoolID === null && (
          <div className="mb-3">
            <div className="txt-primary">School</div>
            <select
              className="form-select"
              aria-label="Default select example"
              id="SchoolID"
              value={SchoolID}
              onChange={(e) => onChange(e)}
            >
              <option value={""}>Select School</option>
              {user.UserTypeID === 6
                ? schoolsList
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
                    .filter((school) =>
                      user.schoolIds
                        .split(",")
                        .map((id) => parseInt(id.trim()))
                        .includes(school.SchoolID)
                    )
                    .map((school) => {
                      return (
                        <option key={school.SchoolID} value={school.SchoolID}>
                          {school.Name}
                        </option>
                      );
                    })
                : schoolsList
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
                    .map((school) => {
                      return (
                        <option key={school.SchoolID} value={school.SchoolID}>
                          {school.Name}
                        </option>
                      );
                    })}
            </select>
          </div>
        )}
        <div className="mb-3">
          <div className="txt-primary">Teacher</div>
          <Typeahead
            id="selections-example"
            labelKey={(option) =>
              `${option.FirstName} ${option.LastName}${
                option.AlternativeID !== null
                  ? ` - ${option.AlternativeID}`
                  : ""
              }`
            }
            onInputChange={(text, e) => {
              console.log(text);
              if (text.length === 0)
                setFormData({ ...formData, TeacherID: "" });
            }}
            defaultSelected={usersList
              .filter((teacher) => teacher.UserID === TeacherID)
              .slice(0, 1)}
            onChange={(e) => {
              console.log(e);
              if (e.length > 0)
                setFormData({ ...formData, TeacherID: e[0].UserID });
            }}
            options={usersList
              .sort((a, b) => {
                const nameA = a.FirstName + a.LastName;
                const nameB = b.FirstName + b.LastName;

                if (nameA < nameB) {
                  return -1;
                }
                if (nameA > nameB) {
                  return 1;
                }
                return 0;
              })
              .filter(
                (teacher) =>
                  teacher.UserTypeID === 1 &&
                  teacher.SchoolID === parseInt(SchoolID)
              )}
            placeholder="Select a Teacher"
          />
        </div>

        <div className="mb-3">
          <div className="txt-primary">Year</div>
          <select
            className="form-select form-control border-primary"
            aria-label="Default select"
            value={Year}
            id="Year"
            onChange={(e) => onChange(e)}
          >
            <option value={2020}>2019-2020</option>
            <option value={2021}>2020-2021</option>
            <option value={2022}>2021-2022</option>
            <option value={2023}>2022-2023</option>
            <option value={2024}>2023-2024</option>
          </select>
        </div>
        <div className="mb-3">
          <div className="txt-primary">Grade</div>
          <select
            className="form-select form-control border-primary"
            aria-label="Default select example"
            value={GradeID}
            id="GradeID"
            onChange={(e) => onChange(e)}
          >
            <option value={1}>Grade 1</option>
            <option value={2}>Grade 2</option>
            <option value={3}>Grade 3</option>
            <option value={4}>Grade 4</option>
            <option value={5}>Grade 5</option>
            <option value={6}>Grade 6</option>
            <option value={7}>Other</option>
          </select>
        </div>
        {SchoolID !== "" &&
          !usersListLoading &&
          !location.pathname.includes("edit") && (
            <div className="mb-3">
              <ClassroomFormStudents
                setFormData={setFormData}
                formData={formData}
                studentsList={usersList.filter(
                  (user) =>
                    user.UserTypeID === 2 &&
                    user.SchoolID === parseInt(SchoolID)
                )}
                setAlert={setAlert}
                edit={false}
              />
            </div>
          )}
        {location.pathname.includes("edit") && (
          <div className="mb-3 w-80">
            <h6 className="txt-primary">Students Info</h6>
            <div className="d-flex justify-content-end">
              <div
                className="btn button-primary"
                onClick={() => {
                  if (edit) {
                    setEdit(false);
                  } else {
                    let arr = [];
                    for (let i = 0; i < list.length; i++) {
                      arr.push(classroom.Students[i].StudentID);
                    }
                    setStudentsList(arr);
                    loadUsersList().then(() => {
                      setEdit(true);
                    });
                  }
                }}
              >
                {edit ? "Cancel" : "Edit"}
              </div>
            </div>
            {edit && (
              <div className="d-flex my-3">
                <Typeahead
                  className="w-100 mx-2"
                  id="student"
                  /*defaultSelected={usersList
                    .filter(
                      (item) =>
                        item.UserTypeID === 2 &&
                        item.SchoolID === classroom.SchoolID,
                    )
                    .slice(0, 1)}*/
                  labelKey={(option) =>
                    `${option.FirstName} ${option.LastName}${
                      option.AlternativeID !== null
                        ? ` - ${option.AlternativeID}`
                        : ""
                    }`
                  }
                  onInputChange={(text, e) => {
                    console.log(text);
                  }}
                  onChange={(e) => {
                    console.log(e);
                    if (e.length > 0) {
                      setStudent(e[0].UserID);
                    } else {
                      setStudent(-1);
                    }
                  }}
                  options={usersList.filter(
                    (item) =>
                      item.UserTypeID === 2 &&
                      item.SchoolID === classroom.SchoolID
                  )}
                  placeholder="Please Select a Student"
                />
                {/*<select
                  className='form-select mx-2'
                  aria-label='Default select example'
                  id='Student'
                  value={student}
                  onChange={(e) => {
                    setStudent(parseInt(e.target.value));
                  }}
                >
                  <option value={-1}>Please Select a Student</option>
                  {usersList
                    .filter(
                      (item) =>
                        item.UserTypeID === 2 &&
                        item.SchoolID === classroom.SchoolID,
                    )
                    .map((student, id) => {
                      return (
                        <option value={student.UserID} key={id}>
                          {student.FirstName + ' ' + student.LastName}
                        </option>
                      );
                    })}
                  </select>*/}
                <button
                  className="btn button-primary"
                  onClick={(e) => {
                    const arr = [...studentsList, student];
                    if ([...new Set(arr)].length === studentsList.length) {
                      console.log(1);
                      setAlert("User Already in Class", "danger");
                    } else {
                      addClassroomStudent({
                        StudentID: student,
                        ClassroomID: classroom.ClassroomID,
                      });
                      setStudentsList(arr);
                      setEdit(false);
                    }
                  }}
                  disabled={student === -1}
                >
                  Submit
                </button>
              </div>
            )}
            {list.length > 0 ? (
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col ">#</th>

                    <th scope="col ">First Name</th>
                    <th scope="col ">Last Name</th>

                    {edit && <th scope="col ">Actions</th>}
                  </tr>
                </thead>
                <tbody>
                  {list
                    .sort((a, b) => {
                      const nameA =
                        a.StudentName.toUpperCase() +
                        " " +
                        a.StudentLastName.toUpperCase();
                      const nameB =
                        b.StudentName.toUpperCase() +
                        " " +
                        b.StudentLastName.toUpperCase();
                      if (nameA < nameB) {
                        return -1;
                      }
                      if (nameA > nameB) {
                        return 1;
                      }
                      return 0;
                    })
                    .map((item, id) => {
                      return (
                        <tr key={id}>
                          <th scope="row">{id + 1}</th>

                          <td>{item.StudentName}</td>
                          <td>
                            {item.StudentLastName +
                              (item.AlternativeID !== null
                                ? ` - ${item.AlternativeID}`
                                : "")}
                          </td>
                          {edit && (
                            <td>
                              <div
                                className=""
                                onClick={() => {
                                  deleteClassroomStudent(
                                    item.ClassroomStudentID
                                  ).then(() => {
                                    setStudentsList(
                                      studentsList.filter(
                                        (s) => s !== item.StudentID
                                      )
                                    );
                                    setList(
                                      list.filter(
                                        (student) =>
                                          item.ClassroomStudentID !==
                                          student.ClassroomStudentID
                                      )
                                    );
                                    setEdit(false);
                                  });
                                }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="32"
                                  height="32"
                                  fill="currentColor"
                                  class="bi bi-trash delete-item-btn rounded-circle border  border-2 p-2"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                  <path
                                    fill-rule="evenodd"
                                    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
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
            ) : (
              <div className="">The Class in empty</div>
            )}{" "}
          </div>
        )}

        <div className="d-flex align-items-center justify-content-center gap-2">
          <button type="submit" className="button-primary btn-block btn px-5">
            Save
          </button>

          {/* Delete Button */}
          {parseInt(user.UserTypeID) > 2 && classroom?.ClassroomID&&(
            <>
              {/* Delete Modal */}
              <div
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
                          deleteClassroom(classroom.ClassroomID);
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
              </div>
              <div
                className="btn btn-danger d-flex align-items-center px-4"
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
              </div>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

ClassroomForm.propTypes = {
  classroom: PropTypes.object,
  user: PropTypes.object,
  schoolsList: PropTypes.array.isRequired,
  schoolListLoading: PropTypes.bool.isRequired,
  usersList: PropTypes.array.isRequired,
  usersListLoading: PropTypes.bool.isRequired,
  classroomLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  classroom: state.admin.classroom,
  user: state.auth.user,
  schoolsList: state.admin.schoolsList,
  schoolListLoading: state.admin.schoolListLoading,
  usersList: state.admin.usersList,
  usersListLoading: state.admin.usersListLoading,
  classroomLoading: state.admin.classroomLoading,
});

export default connect(mapStateToProps, {
  loadClassroomsList,
  clearClassroom,
  updateClassroom,
  deleteClassroom,
  addClassroom,
  loadSchoolsList,
  loadUsersList,
  deleteClassroomStudent,
  addClassroomStudent,
  setAlert,
})(ClassroomForm);
