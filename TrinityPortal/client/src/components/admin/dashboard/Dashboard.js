import React, { useState, Fragment, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import {
  generateReport,
  clearReport,
  loadSchoolsList,
  getChartOverallResults,
  getChartOverallByAssessmentResults,
  getChartOverallProgression,
  getSchool,
  setSchool,
  loadClassroomsList,
  getUser,
} from "../../../actions/admin";
import Loading from "../../layouts/Loading";
import OverallResultChart from "./OverallResultChart";
import DashboardExport from "./DashboardExport";
import Toogle from "../../layouts/Toogle";
import OverallResultsByAssessmentType from "./OverallResultsByAssessmentChart";
import OverallResultsProgression from "./OverallResultsProgressionChart";

const Dashboard = ({
  generateReport,
  reports,
  reportsLoading,
  overallResultsChart,
  overallResultsChartLoading,
  overallResultsByAssessmentChart,
  overallResultsChartByAssessmentLoading,
  overallResultsProgressionChart,
  overallResultsChartProgressionLoading,
  getChartOverallResults,
  getChartOverallByAssessmentResults,
  getChartOverallProgression,
  user,
  clearReport,
  loadSchoolsList,
  loadClassroomsList,
  setSchool,
  schoolsList,
  school,
  classroomsList,
}) => {
  const hist = useHistory();
  const [benchMark, setBenchMark] = useState(-1);
  // const [year, setYear] = useState(new Date().getFullYear());
  const [year, setYear] = useState(-1);
  const [grade, setGrade] = useState(-1);
  const [classroom, setClassroom] = useState(-1);
  const [checked, setChecked] = useState(false);

  // Generate report based on school
  useEffect(() => {
    if (school) {
      loadClassroomsList();
    }
  }, [school, setSchool]);

  // Initial Load
  useEffect(() => {
    // Teacher Role
    if (user.UserTypeID === 1) {
      loadSchoolsList({ SchoolID: user.SchoolID });
      generateReport(
        year,
        benchMark,
        user.SchoolID,
        grade ? grade : -1,
        classroom ? classroom : -1,
        -1,
        user.UserID,
        user.schoolIds ? user.schoolIds : -1
      );
      getChartOverallResults(
        year,
        benchMark,
        user.SchoolID,
        grade ? grade : -1,
        classroom ? classroom : -1,
        -1,
        user.UserID,
        user.schoolIds ? user.schoolIds : -1
      );
      getChartOverallByAssessmentResults(
        year,
        benchMark,
        user.SchoolID,
        grade ? grade : -1,
        classroom ? classroom : -1,
        -1,
        user.UserID,
        user.schoolIds ? user.schoolIds : -1
      );
      getChartOverallProgression(
        year,
        benchMark,
        user.SchoolID,
        grade ? grade : -1,
        classroom ? classroom : -1,
        -1,
        user.UserID,
        user.schoolIds ? user.schoolIds : -1
      );
    } else if (user.UserTypeID === 5) {
      loadSchoolsList();
      generateReport(
        year,
        benchMark,
        school ? school : -1,
        grade ? grade : -1,
        classroom ? classroom : -1,
        -1,
        -1,
        user.schoolIds ? user.schoolIds : -1
      );
      getChartOverallResults(
        year,
        benchMark,
        school ? school : -1,
        grade ? grade : -1,
        classroom ? classroom : -1,
        -1,
        -1,
        user.schoolIds ? user.schoolIds : -1
      );
      getChartOverallByAssessmentResults(
        year,
        benchMark,
        school ? school : -1,
        grade ? grade : -1,
        classroom ? classroom : -1,
        -1,
        -1,
        user.schoolIds ? user.schoolIds : -1
      );
      getChartOverallProgression(
        year,
        benchMark,
        school ? school : -1,
        grade ? grade : -1,
        classroom ? classroom : -1,
        -1,
        -1,
        user.schoolIds ? user.schoolIds : -1
      );
    } else if (user.UserTypeID === 6) {
      loadSchoolsList({ schoolIds: user.schoolIds });
      generateReport(
        year,
        benchMark,
        school ? school : -1,
        grade ? grade : -1,
        classroom ? classroom : -1,
        -1,
        -1,
        !school || school === -1 ? user.schoolIds : -1
      );
      getChartOverallResults(
        year,
        benchMark,
        school ? school : -1,
        grade ? grade : -1,
        classroom ? classroom : -1,
        -1,
        -1,
        !school || school === -1 ? user.schoolIds : -1
      );
      getChartOverallByAssessmentResults(
        year,
        benchMark,
        school ? school : -1,
        grade ? grade : -1,
        classroom ? classroom : -1,
        -1,
        -1,
        !school || school === -1 ? user.schoolIds : -1
      );
      getChartOverallProgression(
        year,
        benchMark,
        school ? school : -1,
        grade ? grade : -1,
        classroom ? classroom : -1,
        -1,
        -1,
        !school || school === -1 ? user.schoolIds : -1
      );
    }
  }, [user, year, benchMark, school, grade, classroom, checked]);

  const uniqueGrades = useMemo(() => {
    const filteredList = classroomsList.filter(
      (classroom) => classroom.SchoolID === school
    );

    const uniqueGrades = filteredList.reduce(
      (uniquePairs, currentClassroom) => {
        if (!uniquePairs[currentClassroom.GradeID]) {
          uniquePairs[currentClassroom.GradeID] = currentClassroom.Grade;
        }
        return uniquePairs;
      },
      {}
    );
    return Object.entries(uniqueGrades).map(([gradeID, gradeName]) => (
      <option key={gradeID} value={gradeID}>
        {gradeName}
      </option>
    ));
  }, [classroomsList, school]);

  const uniqueClassroom = useMemo(() => {
    const filteredList = classroomsList.filter(
      (classroom) =>
        classroom.SchoolID === school && classroom.GradeID === grade
    );

    const uniqueClassroom = filteredList.reduce(
      (uniquePairs, currentClassroom) => {
        if (!uniquePairs[currentClassroom.Section]) {
          uniquePairs[currentClassroom.Section] = currentClassroom.ClassroomID;
        }
        return uniquePairs;
      },
      {}
    );
    return Object.entries(uniqueClassroom).map(([Section, ClassroomID]) => (
      <option key={ClassroomID} value={Section}>
        {Section}
      </option>
    ));
  }, [classroomsList, school, grade]);

  return (
    <Fragment>
      {reportsLoading ||
      reports === undefined ||
      overallResultsChartLoading ||
      overallResultsChart === undefined ? (
        <div className="d-flex align-items-center h-100 justify-content-center w-100">
          <Loading />
        </div>
      ) : (
        <div className="p-sm-5 p-2 w-100 dashboard-margin">
          <div className="mb-3">
            <h6 className="txt-primary-light">{user.UserType} / Dashboard</h6>

            <div className="d-flex w-100 align-items-center justify-content-end ">
              {/* Toogle */}
              {/* <div
                className="d-flex p-0 mx-2 align-items-center"
                style={{ minWidth: "200px" }}
              >
                <Toogle
                  checked={checked}
                  setChecked={setChecked}
                  labels={["Percentile", "Benchmark"]}
                />
              </div> */}
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

              {/* School Filter */}
              {/* <div className="p-0" style={{ maxWidth: "200px" }}>
                <div className="p-0 mx-2" style={{ maxWidth: "200px" }}>
                  <select
                    className="form-select form-control bg-primary text-white m-0 text-truncate"
                    aria-label="Default select example"
                    value={school !== null ? school : -1}
                    id="school"
                    style={{
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                    onChange={(e) => setSchool(parseInt(e.target.value))}
                  >
                    <option value={-1}>All Schools</option>
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
                      .map((s) => (
                        <option key={s.SchoolID} value={s.SchoolID}>
                          {s.Name}
                        </option>
                      ))}
                  </select>
                </div>
              </div> */}

              {/* Grade Filter */}
              <div className="p-0 mx-2" style={{ maxWidth: "200px" }}>
                <select
                  className="form-select form-control bg-primary text-white m-0"
                  aria-label="Default select example"
                  value={grade}
                  id="grade"
                  onChange={(e) => setGrade(parseInt(e.target.value))}
                >
                  <option value={-1}>All Location</option>
                  {school ? (
                    uniqueGrades
                  ) : (
                    <>
                      <option value={1}>Room 401</option>
                      <option value={2}>Room 402</option>
                      <option value={3}>Room 403</option>
                      <option value={4}>Room 404</option>
                      <option value={5}>Room 505</option>
                      <option value={6}>Room 506</option>
                    </>
                  )}
                  {/* {uniqueGrades} */}
                </select>
              </div>

              {/* Benchmark Filter */}
              <div className="p-0" style={{ maxWidth: "200px" }}>
                <select
                  className="form-select form-control bg-primary text-white m-0"
                  aria-label="Default select example"
                  value={benchMark}
                  id="benchMark"
                  onChange={(e) => setBenchMark(parseInt(e.target.value))}
                >
                  <option value={-1}>Media Type</option>
                  <option value={1}>Songs</option>
                  <option value={2}>Books</option>
                  <option value={3}>Trivias</option>
                  <option value={4}>Jokes</option>
                </select>
              </div>

              {/* Classroom Filter */}
              {/* <div className="p-0 mx-2" style={{ maxWidth: "200px" }}>
                <select
                  className="form-select form-control bg-primary text-white m-0"
                  aria-label="Default select example"
                  value={classroom}
                  id="classroom"
                  onChange={(e) => setClassroom(e.target.value)}
                >
                  <option value={-1}>All Sections</option>
                  {uniqueClassroom}
                </select>
              </div> */}

              {/* Benchmark Filter */}
              <div className="p-0 mx-2" style={{ maxWidth: "200px" }}>
                <select
                  className="form-select form-control bg-primary text-white m-0"
                  aria-label="Default select example"
                  value={benchMark}
                  id="benchMark"
                  onChange={(e) => setBenchMark(parseInt(e.target.value))}
                >
                  <option value={-1}>Robot Name</option>
                  <option value={1}>Amy Plus 1</option>
                  <option value={2}>Alice 2</option>
                  <option value={3}>Aden 4</option>
                  <option value={4}>Joshua 1</option>
                </select>
              </div>

              {/* Filtered Report Button */}
              {/* <div className="p-0 mx-2" style={{ maxWidth: "200px" }}>
                <a
                  href={process.env.PUBLIC_URL + "/templates/report.xlsx"}
                  download
                  className="btn button-parent button-primary d-flex align-items-center px-3"
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
                  Filtered Report
                </a>
              </div> */}

              {/* Export Button */}
              <div className="p-0 mx-2" style={{ maxWidth: "200px" }}>
                <DashboardExport reports={reports} />
              </div>

              {/* Compare Button */}
              {/* <div className="p-0 mx-2" style={{ maxWidth: "200px" }}>
                <div
                  className="btn button-parent button-primary txt-primary d-flex align-items-center px-3 text-center"
                  onClick={() => {
                    clearReport();
                    hist.push("/admin/dashboard/compare");
                  }}
                >
                  Compare
                </div>
              </div> */}
            </div>
          </div>
          {reports !== undefined && (
            <div className="d-flex justify-content-between align-items-center flex-column flex-lg-row row">
              <div className="col-12">
                <div className="row">
                  <div className="col-4">
                    <OverallResultChart
                      chartData={overallResultsChart[checked ? 1 : 0]} //1: Risk, 0: Percentile
                      calculationType={checked ? 1 : 0} //1: Risk, 0: Percentile
                      benchMarkID={benchMark}
                    />
                  </div>

                  <div className="col-8">
                    <OverallResultsByAssessmentType
                      chartData={
                        overallResultsByAssessmentChart[checked ? 1 : 0]
                      } //1: Risk, 0: Percentile
                      calculationType={checked ? 1 : 0} //1: Risk, 0: Percentile
                      benchMarkID={benchMark}
                    />
                  </div>
                </div>
                <div className="col-12">
                  <OverallResultsProgression
                    chartData={overallResultsProgressionChart[checked ? 1 : 0]} //1: Risk, 0: Percentile
                    calculationType={checked ? 1 : 0} //1: Risk, 0: Percentile
                    benchMarkID={benchMark}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </Fragment>
  );
};
Dashboard.propTypes = {
  user: PropTypes.object,
  reports: PropTypes.array,
  reportsLoading: PropTypes.bool,
  overallResultsChart: PropTypes.array,
  overallResultsChartLoading: PropTypes.bool,
  overallResultsByAssessmentChart: PropTypes.array,
  overallResultsByAssessmentChartLoading: PropTypes.bool,
  overallResultsProgressionChart: PropTypes.array,
  overallResultsProgressionChartLoading: PropTypes.bool,
  generateReport: PropTypes.func.isRequired,
  getChartOverallResults: PropTypes.func.isRequired,
  getChartOverallByAssessmentResults: PropTypes.func.isRequired,
  getChartOverallProgression: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  reports: state.admin.reports,
  reportsLoading: state.admin.reportsLoading,
  overallResultsChart: state.admin.overallResultsChart,
  overallResultsChartLoading: state.admin.overallResultsChartLoading,
  overallResultsByAssessmentChart: state.admin.overallResultsByAssessmentChart,
  overallResultsChartByAssessmentLoading:
    state.admin.overallResultsChartByAssessmentLoading,
  overallResultsProgressionChart: state.admin.overallResultsProgressionChart,
  overallResultsChartProgressionLoading:
    state.admin.overallResultsChartProgressionLoading,
  user: state.auth.user,
  schoolsList: state.admin.schoolsList,
  schoolListLoading: state.admin.schoolListLoading,
  school: state.admin.school,
  schoolLoading: state.admin.schoolLoading,
  classroomsList: state.admin.classroomsList,
  classroomsListLoading: state.admin.classroomsListLoading,
});

export default connect(mapStateToProps, {
  generateReport,
  getChartOverallResults,
  getChartOverallByAssessmentResults,
  getChartOverallProgression,
  clearReport,
  loadSchoolsList,
  loadClassroomsList,
  setSchool,
})(Dashboard);
