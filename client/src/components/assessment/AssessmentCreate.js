import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loadAssessmentsList, loadUsersList } from "../../actions/admin";
import { addAssessmentResult, clearAssessmentResult } from "../../actions/assessment";
import Loading from "../layouts/Loading";
import { useHistory } from "react-router-dom";
import MultiSelectWithCheckboxes from "../layouts/MultiSelect";

const AssessmentCreate = ({
  user,
  isAuthenticated,
  assessmentsList,
  assessmentListLoading,
  loadAssessmentsList,
  loadUsersList,
  usersList,
  usersListLoading,
  addAssessmentResult,
  accessCode,
}) => {
  const hist = useHistory();
  const [formData, setFormData] = useState({
    StudentID: "",
    StudentIDs: [],
    AssessmentID: "",
    BenchMarkID: 1,
    Year: 2021,
  });
  const [assessmentType, setAssessmentType] = useState("");
  const [grade, setGrade] = useState("");

  useEffect(() => {
    if (usersListLoading) {
      loadUsersList({ UserTypeID: 2 });
    }
    if (assessmentListLoading) {
      loadAssessmentsList();
    }
  }, [assessmentListLoading, loadAssessmentsList]);


  const onSubmit = (e) => {
    e.preventDefault();

    if (AssessmentID !== "") {
      let CategoryID;
      for (let i = 0; i < assessmentsList.length; i++) {
        if (assessmentsList[i].AssessmentID === AssessmentID) {
          CategoryID = assessmentsList[i].CategoryID;
        }
      }
      console.log(formData);
      addAssessmentResult({ ...formData, CategoryID }).then(() => {
        setFormData({
          StudentID: "",
          AssessmentID: "",
          BenchMarkID: 1,
          Year: 2021,
        });
        setTimeout(() => {
          hist.push("/admin/result");
        }, 3000);
        console.log(formData);
      });
    }
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const { StudentID, StudentIDs, AssessmentID, BenchMarkID, Year } = formData;

  return (
    <Fragment>
      {user !== null &&
      isAuthenticated &&
      !usersListLoading &&
      !assessmentListLoading 
      ? (
        <div className=" container mx-auto my-5" style={{ paddingTop: "80px" }}>
          <div className="mb-3 ">
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
                <h4 className="m-0">Assessment</h4>
              </div>
            </div>
          </div>
          <div className="d-flex  position-relative ">
            <div className="container card shadow border-0 w-100 ">
              <div className="card-body  mt-1">
                <h4>Assign Assessment</h4>

                <form onSubmit={(e) => onSubmit(e)}>
                  <div className="mt-3">
                    <label for="inputGrade">
                      <b>Student</b>
                    </label>
                    <MultiSelectWithCheckboxes
                      id="StudentIDs"
                      value={StudentIDs}
                      optionsList={user.UserTypeID ===6?usersList
                        .filter((student) =>
                          user.schoolIds
                            .split(",")
                            .map((id) => parseInt(id.trim()))
                            .includes(student.SchoolID)
                        )
                        .map((student) => ({
                          value: student.UserID,
                          label: `${student.FirstName} ${student.LastName}${
                            student.AlternativeID !== null
                              ? ` - ${student.AlternativeID}`
                              : ""
                          }`,
                        })):usersList?.map((user) => ({
                        value: user.UserID,
                        label: `${user.FirstName} ${user.LastName}${
                          user.AlternativeID !== null
                            ? ` - ${user.AlternativeID}`
                            : ""
                        }`,
                      }))}
                      placeholder={"Select Students"}
                      formData={formData}
                      setFormData={setFormData}
                    />
                  </div>
                  <div className="mt-3">
                    <label for="inputAssessment">
                      <b>Grade</b>
                    </label>
                    <select
                      className="form-select form-control border-primary"
                      aria-label="Default select example"
                      value={grade}
                      id="grade"
                      onChange={(e) => setGrade(e.target.value)}
                    >
                      <option value={""}>All Grades</option>
                      <option value={1}>Grade 1</option>
                      <option value={2}>Grade 2</option>
                      <option value={3}>Grade 3</option>
                      <option value={4}>Grade 4</option>
                      <option value={5}>Grade 5</option>
                      <option value={6}>Grade 6</option>
                      <option value={7}>Other</option>
                    </select>
                  </div>

                  <div className="mt-3">
                    <label for="inputAssessment">
                      <b>Assessment Type</b>
                    </label>
                    <select
                      className="form-select form-control border-primary"
                      aria-label="Default select example"
                      value={assessmentType}
                      id="AssessmentID"
                      onChange={(e) => setAssessmentType(e.target.value)}
                    >
                      <option value={""}>All</option>
                      <option value={2}>Letter Sounds</option>
                      <option value={1}>Name the Letter</option>
                      <option value={3}>Story Reading</option>
                      <option value={4}>Silly Words</option>
                      <option value={5}>Break up the word</option>
                      <option value={6}>Say the first Sound</option>
                    </select>
                  </div>
                  <div className="mt-3">
                    <label for="inputAssessment">
                      <b>Assessment</b>
                    </label>
                    <select
                      className="form-select form-control border-primary"
                      aria-label="Default select example"
                      value={AssessmentID}
                      id="AssessmentID"
                      onChange={(e) => onChange(e)}
                    >
                      <option value={0}>Select Assessment</option>
                      {user.UserTypeID === 6?assessmentsList
                        .sort((a, b) => {
                          const nameA = a.Title.trim();
                          const nameB = b.Title.trim();

                          if (nameA < nameB) {
                            return -1;
                          }
                          if (nameA > nameB) {
                            return 1;
                          }
                          return 0;
                        })
                        .filter(
                          (item) =>
                            (assessmentType === ""
                              ? true
                              : item.CategoryID === parseInt(assessmentType)) &&
                            (grade === ""
                              ? true
                              : item.GradeID === parseInt(grade))&&
                              user.schoolIds
                              .split(",")
                              .map((id) => parseInt(id.trim()))
                              .includes(item.SchoolID)
                        )
                        .map((assessment) => {
                          return (
                            <option value={assessment.AssessmentID}>
                              {assessment.Title + ` (${assessment.Category})`}
                            </option>
                          );
                        }):assessmentsList
                        .sort((a, b) => {
                          const nameA = a.Title.trim();
                          const nameB = b.Title.trim();

                          if (nameA < nameB) {
                            return -1;
                          }
                          if (nameA > nameB) {
                            return 1;
                          }
                          return 0;
                        })
                        .filter(
                          (item) =>
                            (assessmentType === ""
                              ? true
                              : item.CategoryID === parseInt(assessmentType)) &&
                            (grade === ""
                              ? true
                              : item.GradeID === parseInt(grade))
                        )
                        .map((assessment) => {
                          return (
                            <option value={assessment.AssessmentID}>
                              {assessment.Title + ` (${assessment.Category})`}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                  <div className="mt-3">
                    <label for="inputAssessment">
                      <b>Benchmark</b>
                    </label>
                    <select
                      className="form-select form-control border-primary"
                      aria-label="Default select"
                      value={BenchMarkID}
                      id="BenchMarkID"
                      onChange={(e) => onChange(e)}
                    >
                      <option value={1}>Benchmark 1 – Fall</option>
                      <option value={2}>Benchmark 2 – Winter</option>
                      <option value={3}>Benchmark 3 – Spring</option>
                      <option value={4}>Progress Monitoring</option>
                    </select>
                  </div>
                  <div className="mt-3">
                    <label for="inputAssessment">
                      <b>Year</b>
                    </label>
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
                  <div className="d-flex align-items-center justify-content-end my-3">
                    <button
                      type="submit"
                      className="button-primary btn-block btn px-5"
                    >
                      Create
                    </button>
                  </div>
                </form>
                <div className="text-center my-2">
                  Use this{" "}
                  <a
                    href="https://radev.azurewebsites.net/assessment/join"
                    className="txt-primary"
                  >
                    https://radev.azurewebsites.net/assessment/join
                  </a>{" "}
                  to enter the Access Code and start the assessment.
                </div>
                {accessCode !== null && (
                  <div className="text-center my-2">
                    <h5 className="text-center">Access Code: {accessCode}</h5>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="d-flex align-items-center h-100 justify-content-center">
          <Loading />
        </div>
      )}
    </Fragment>
  );
};

AssessmentCreate.propTypes = {
  user: PropTypes.object,
  isAuthenticated: PropTypes.bool.isRequired,
  addAssessmentResult: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
  usersList: state.admin.usersList,
  usersListLoading: state.admin.usersListLoading,
  assessmentsList: state.admin.assessmentsList,
  assessmentListLoading: state.admin.assessmentListLoading,
  accessCode: state.assessment.accessCode,
  clearAdmin: state.admin.clearAdmin
});

export default connect(mapStateToProps, {
  loadUsersList,
  loadAssessmentsList,
  addAssessmentResult,
})(AssessmentCreate);
