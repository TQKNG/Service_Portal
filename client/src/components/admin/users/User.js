import React, { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  getUser,
  deleteUser,
  clearUser,
  clearReport,
  generateReport,
  getChartOverallProgression,
  getChartAverageScorePerBenchmarkCategory,
} from "../../../actions/admin";
import PropTypes from "prop-types";
import Toogle from "../../layouts/Toogle";
import UserInfo from "./UserInfo";
import DashboardExport from "../dashboard/DashboardExport";

const User = ({
  userId,
  user,
  userLoading,
  getUser,
  deleteUser,
  clearUser,
  clearReport,
  authUser,
  reports,
  averageScorePerBenchmarkCategoryChart,
  averageScorePerBenchmarkCategoryChartLoading,
  overallResultsProgressionChart,
  generateReport,
  getChartOverallProgression,
  getChartAverageScorePerBenchmarkCategory,
  reportsLoading,
}) => {
  const hist = useHistory();
  const [year, setYear] = useState(new Date().getFullYear());
  const [checked, setChecked] = useState(false);

  // /reports/:year/:benchmark/:school/:grade/:section/:student/:teacher/:schoolIds

  // Initial Load the student report
  useEffect(() => {
    if (user === null && userLoading) {
      console.log(userId);
      getUser(userId);
    }
    if (reportsLoading && !userLoading) {
      // Admin
      if (authUser.UserTypeID === 6) {
        generateReport(year, -1, user.SchoolID, -1, -1, userId, -1, -1);
        // Super Admin
      } else if (authUser.UserTypeID === 5) {
        generateReport(year, -1, user.SchoolID, -1, -1, userId, -1);
      }
      // Other
      else {
        generateReport(
          year,
          -1,
          user.SchoolID,
          -1,
          -1,
          userId,
          authUser.UserID,
          -1
        );
      }
    }
  }, [
    reports,
    reportsLoading,
    generateReport,
    user,
    userLoading,
    getUser,
    userId,
  ]);

  useEffect(() => {
    if (user !== null) {
      generateReport(year, -1, user.SchoolID, -1, -1, userId, -1, -1);
      getChartAverageScorePerBenchmarkCategory(
        year,
        -1,
        user.SchoolID,
        -1,
        -1,
        userId,
        -1
      );
      if (authUser.UserTypeID === 6) {
        getChartOverallProgression(
          year,
          -1,
          user.SchoolID,
          -1,
          -1,
          userId,
          -1,
          -1
        );
      } else {
        getChartOverallProgression(year, -1, user.SchoolID, -1, -1, userId, -1);
      }
    }
  }, [year]);

  return (
    <Fragment>
      {/* Delete Modal */}
      {/* <div
        className="modal fade"
        id="deleteUser"
        aria-labelledby="deleteUserLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteUserLabel">
                Delete User
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Are you sure you want to delete user?
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
                  deleteUser(userId);
                  hist.push("/admin/users");
                  clearUser();
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
            {authUser.UserType} / Users / User
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
            {user !== null && (
              <div className="d-flex mx-2 mx-sm-0">
                {/* {user.UserTypeID === 2 && (
                  <div
                    className='btn button-parent button-primary-outline txt-primary d-flex align-items-center px-3'
                    onClick={() => {
                      hist.push('/admin/user/report');
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
                  </div>
                )} */}
                {user.UserTypeID === 2 && (
                  <>
                    {" "}
                    {/* Toogle */}
                    <div
                      className="d-flex p-0 mx-2 align-items-center"
                      style={{ minWidth: "200px" }}
                    >
                      <Toogle
                        checked={checked}
                        setChecked={setChecked}
                        labels={["Percentile", "Benchmark"]}
                      />
                    </div>
                    {/* Year Filter */}
                    <div className="p-0 mx-2" style={{ maxWidth: "200px" }}>
                      <select
                        className="form-select form-control bg-primary text-white m-0"
                        aria-label="Default select example"
                        value={year}
                        id="year"
                        onChange={(e) => setYear(parseInt(e.target.value))}
                      >
                        <option value={-1}>All Years</option>
                        <option value={2020}>2019-2020</option>
                        <option value={2021}>2020-2021</option>
                        <option value={2022}>2021-2022</option>
                        <option value={2023}>2022-2023</option>
                        <option value={2024}>2023-2024</option>
                      </select>
                    </div>
                    {/* Export Button */}
                    <div className="p-0 mx-2" style={{ maxWidth: "200px" }}>
                      <DashboardExport reports={reports} />
                    </div>
                  </>
                )}
                {authUser.UserTypeID >= 5 && (
                  <div
                    className="btn button-parent button-primary-outline txt-primary d-flex align-items-center px-3 mx-3"
                    onClick={() => {
                      hist.push("/admin/user/edit");
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
                )}

                {/* <div
                  className="btn btn-danger d-flex align-items-center px-3 "
                  data-bs-toggle="modal"
                  data-bs-target="#deleteUser"
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
              </div>
            )}
          </div>
        </div>
        <UserInfo
          checked={checked}
          user={user}
          userLoading={userLoading}
          reportsLoading={reportsLoading}
          reports={reports}
          averageScorePerBenchmarkCategoryChart={
            averageScorePerBenchmarkCategoryChart
          }
          overallResultsProgressionChart={overallResultsProgressionChart}
        />
      </div>
    </Fragment>
  );
};
User.propTypes = {
  user: PropTypes.object.isRequired,
  userLoading: PropTypes.bool.isRequired,
  getUser: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  clearUser: PropTypes.func.isRequired,
  clearReport: PropTypes.func.isRequired,
  reports: PropTypes.array,
  overallResultsProgressionChart: PropTypes.array,
  averageScorePerBenchmarkCategoryChart: PropTypes.array,
  generateReport: PropTypes.func.isRequired,
  getChartOverallProgression: PropTypes.func.isRequired,
  getChartAverageScorePerBenchmarkCategory: PropTypes.func.isRequired,
  reportsLoading: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  user: state.admin.user,
  userLoading: state.admin.userLoading,
  reports: state.admin.reports,
  reportsLoading: state.admin.reportsLoading,
  authUser: state.auth.user,
  overallResultsProgressionChart: state.admin.overallResultsProgressionChart,
  averageScorePerBenchmarkCategoryChart:
    state.admin.averageScorePerBenchmarkCategoryChart,
  averageScorePerBenchmarkCategoryChartLoading:
    state.admin.averageScorePerBenchmarkCategoryChartLoading,
});

export default connect(mapStateToProps, {
  getUser,
  deleteUser,
  clearUser,
  clearReport,
  generateReport,
  getChartOverallProgression,
  getChartAverageScorePerBenchmarkCategory,
})(User);
