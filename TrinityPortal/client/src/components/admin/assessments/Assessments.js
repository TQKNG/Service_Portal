import React, { useEffect, Fragment, useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import * as XLSX from "xlsx";
import PropTypes from "prop-types";
import {
  clearAssessment,
  loadAssessmentsList,
  importAssessments,
  loadSchoolsList,
} from "../../../actions/admin";

import AssessmentList from "./AssessmentList";

const Assessments = ({
  assessmentsList,
  loadAssessmentsList,
  assessmentListLoading,
  clearAssessment,
  importAssessments,
  loadSchoolsList,
  user,
}) => {
  useEffect(() => {
    if (assessmentsList.length === 0 && assessmentListLoading) {
      if (user.UserTypeID === 6) {
        loadAssessmentsList({ schoolIds: user.schoolIds });
      } else {
        loadAssessmentsList();
      }
    }
    // Admin role: Retrive all assessment from the Admin's school list

    // Super Admin role and other roles: Retrive all assessments from all schools
  }, [assessmentsList, assessmentListLoading, loadAssessmentsList]);

  const [file, setFile] = useState(null);
  const hist = useHistory();
  return (
    <Fragment>
      <div className="p-sm-5 p-2 w-100 dashboard-margin">
        <div className="mb-3 ">
          <div className="d-flex align-items-center ">
            <h6 className="txt-primary-light mb-0">
              {user.UserType} / Books
            </h6>{" "}
            <div className="rounded-pill bg-primary px-2 py-1 align-self-center mx-2 my-2 caption ">
              {assessmentsList.length}
            </div>
          </div>
          <div className="d-flex w-100 align-items-center justify-content-end">
            {user.UserTypeID === 5 && (
              <div className="d-flex">
                <a
                  href={`${process.env.PUBLIC_URL}/templates/assessments${
                    user.UserTypeID === 5 ? "_admin" : ""
                  }.zip`}
                  download
                  className="btn button-parent button-primary d-flex align-items-center px-3 mx-3"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-download button-child"
                    viewBox="0 0 16 16"
                  >
                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                    <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
                  </svg>
                  Template
                </a>
                <div
                  className="btn button-parent button-primary d-flex align-items-center px-3 mx-3"
                  data-bs-toggle="modal"
                  data-bs-target="#ImportUser"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    enableBackground="new 0 0 24 24"
                    height="18px"
                    viewBox="0 0 24 24"
                    width="24px"
                    fill="#ffffff"
                    className="button-child"
                  >
                    <g>
                      <rect fill="none" height="18" width="18" />
                    </g>
                    <g>
                      <g>
                        <path d="M19,13h-6v6h-2v-6H5v-2h6V5h2v6h6V13z" />
                      </g>
                    </g>
                  </svg>
                  Import Excel
                </div>
                  <div
                    className="btn button-parent button-primary d-flex align-items-center px-3"
                    onClick={() => {
                      loadSchoolsList().then(() => {
                        clearAssessment();
                        hist.push("/admin/assessment/add");
                      });
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      enableBackground="new 0 0 24 24"
                      height="18px"
                      viewBox="0 0 24 24"
                      width="24px"
                      fill="#ffffff"
                      className="button-child"
                    >
                      <g>
                        <rect fill="none" height="18" width="18" />
                      </g>
                      <g>
                        <g>
                          <path d="M19,13h-6v6h-2v-6H5v-2h6V5h2v6h6V13z" />
                        </g>
                      </g>
                    </svg>
                    Add Assessment
                  </div>
              </div>
            )}
          </div>
        </div>
        <AssessmentList
          assessmentsList={user.UserTypeID === 6?assessmentsList.filter((assessment)=>{
            return user.schoolIds
            .split(",")
            .map((id) => parseInt(id.trim()))
            .includes(assessment.SchoolID)
          }):assessmentsList}
          assessmentListLoading={assessmentListLoading}
          user={user}
        />
      </div>
      <div
        className="modal fade"
        id="ImportUser"
        aria-labelledby="ImportUserLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="ImportUserLabel">
                Import Assessments
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <input
                type="file"
                accept=".xlsx"
                onChange={(e) => {
                  e.preventDefault();
                  var files = e.target.files,
                    f = files[0];
                  var reader = new FileReader();
                  reader.onload = function (e) {
                    var data = e.target.result;
                    let readedData = XLSX.read(data, { type: "binary" });
                    const wsname = readedData.SheetNames[0];
                    const ws = readedData.Sheets[wsname];

                    /* Convert array to json*/
                    const dataParse = XLSX.utils.sheet_to_json(ws, {
                      header: 1,
                    });
                    dataParse.splice(0, 1);
                    console.log(dataParse);
                    let d = [];
                    dataParse.forEach((assessment) => {
                      if (assessment.length !== 0) {
                        if (parseInt(assessment[2]) > 4) {
                          d.push({
                            Title: assessment[0],
                            GradeID: assessment[1],
                            CategoryID: assessment[2],
                            Timer: assessment[3],
                            Body: assessment[4],
                            Solution: assessment[5],
                            SolutionDetails:
                              assessment[6] === undefined
                                ? null
                                : assessment[6],
                            Scores: assessment[7],
                            SchoolsID:
                              user.SchoolID === null
                                ? assessment[8].split(",")
                                : [user.SchoolID],
                          });
                        } else {
                          if (parseInt(assessment[2]) === 3) {
                            assessment[4] = assessment[4]
                              .split(" ")
                              .join("&nbsp;");
                          }
                          d.push({
                            Title: assessment[0],
                            GradeID: assessment[1],
                            CategoryID: assessment[2],
                            Timer: assessment[3],
                            Body: assessment[4],
                            Groups: assessment[5],
                            SchoolsID:
                              user.SchoolID === null
                                ? assessment[6].split(",")
                                : [user.SchoolID],
                          });
                        }
                      }

                      console.log(d);
                    });

                    setFile(d);
                  };
                  reader.readAsBinaryString(f);
                }}
              />
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
                  importAssessments({ assessments: file });

                  setFile(null);
                }}
                data-bs-dismiss="modal"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Assessments.propTypes = {
  assessmentsList: PropTypes.array,
  loadAssessmentsList: PropTypes.func.isRequired,
  assessmentListLoading: PropTypes.bool,
  clearAssessment: PropTypes.func.isRequired,
  importAssessments: PropTypes.func.isRequired,
  loadSchoolsList: PropTypes.func.isRequired,
  user: PropTypes.object,
};
const mapStateToProps = (state) => ({
  assessmentsList: state.admin.assessmentsList,
  assessmentListLoading: state.admin.assessmentListLoading,
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  clearAssessment,
  loadAssessmentsList,
  importAssessments,
  loadSchoolsList,
})(Assessments);
