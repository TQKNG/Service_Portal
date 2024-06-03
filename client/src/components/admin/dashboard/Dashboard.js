import React, { useState, Fragment, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import DashboardExport from "./DashboardExport";
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
  loadStatisticLogsList,
  loadReceptionsList,
} from "../../../actions/admin";
import Loading from "../../layouts/Loading";
import ChartPlaceHolder from "./ChartPlaceHolder";

const Dashboard = ({
  statisticlogsList,
  receptionsList,
  loadReceptionsList,
  loadStatisticLogsList,
  reports,
  user,
}) => {
  const hist = useHistory();
  const [benchMark, setBenchMark] = useState(-1);
  // const [year, setYear] = useState(new Date().getFullYear());
  const [year, setYear] = useState(-1);
  const [grade, setGrade] = useState(-1);

  const formatReport = (report) => {
    return report.map((item) => {
      return {
        ...item,
        "Start Time": new Date(item["Start Time"]),
        "End Time": new Date(item["End Time"]),
      };
    });
  };

  const formatReport2 = (report) => {
    return report.map((item) => {
      delete item.id;
      delete item.isDeleted;
      return {
        ...item,
        signInDate: new Date(item.signInDate),
        signOutDate: new Date(item.signOutDate),
        homeAreas: JSON.parse(item.homeAreas).map((item)=>String(item)), // Stringify the array
      };
    });
  };
  

  useEffect(() => {
    loadStatisticLogsList();
    loadReceptionsList();
  }, [user]);

  return (
    <Fragment>
      {!user ? (
        <div className="d-flex align-items-center h-100 justify-content-center w-100">
          <Loading />
        </div>
      ) : (
        <div className="p-sm-5 p-2 w-100 dashboard-margin">
          <div className="mb-3">
            <h6 className="txt-primary-light">
              {`${user.firstName} ${user.lastName}`} / Report
            </h6>

            <div className="d-flex w-100 align-items-center justify-content-end ">
              {/* Year Filter */}
              {/* <div className="p-0 mx-2" style={{ maxWidth: "200px" }}>
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
              </div> */}

              {/* Grade Filter */}
              {/* <div className="p-0 mx-2" style={{ maxWidth: "200px" }}>
                <select
                  className="form-select form-control bg-primary text-white m-0"
                  aria-label="Default select example"
                  value={grade}
                  id="grade"
                  onChange={(e) => setGrade(parseInt(e.target.value))}
                >
                  <option value={-1}>All Location</option>
                  <option value={1}>Room 401</option>
                  <option value={2}>Room 402</option>
                  <option value={3}>Room 403</option>
                  <option value={4}>Room 404</option>
                  <option value={5}>Room 505</option>
                  <option value={6}>Room 506</option>
                </select>
              </div> */}

              {/* Benchmark Filter */}
              {/* <div className="p-0" style={{ maxWidth: "200px" }}>
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
              </div> */}

              {/* Benchmark Filter */}
              {/* <div className="p-0 mx-2" style={{ maxWidth: "200px" }}>
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
              </div> */}

              {/* Report */}
              {/* <div className="p-0 mx-2" style={{ maxWidth: "200px" }}>
                <DashboardExport reportName={`Statistics-${new Date().toLocaleString()}`}  reports={formatReport(statisticlogsList)} />
              </div> */}
            </div>
          </div>
          {statisticlogsList !== undefined && (
            <div className="d-flex justify-content-between align-items-center flex-column flex-lg-row row">
              <div className="col-12">
                <div className="row">
                  {/* Report 1 */}
                  <div className="col-12 col-lg-2">
                    <ChartPlaceHolder
                      title={"Statistics Log Report"}
                      reportName={`Statistics-${new Date().toLocaleString()}`}
                      reports={formatReport(
                        statisticlogsList.length ? statisticlogsList[0] : []
                      )}
                    />
                  </div>

                  {/* Report 2 */}
                  <div className="col-12 col-lg-2">
                    <ChartPlaceHolder
                      title={"Visits Report"}
                      reportName={`Visits-${new Date().toLocaleString()}`}
                      reports={
                       formatReport2(receptionsList)
                      }
                    />
                  </div>

                  {/* Report 2 */}
                  {/* <div className="col-12 col-lg-2">
                    <ChartPlaceHolder
                      title={"Top 5 Songs Report"}
                      reportName={`Top 5 Songs-${new Date().toLocaleString()}`}
                      reports={
                        statisticlogsList.length ? statisticlogsList[1] : []
                      }
                    />
                  </div> */}

                  {/* Report 3 */}
                  {/* <div className="col-12 col-lg-2">
                    <ChartPlaceHolder
                      title={"Top 5 Books Report"}
                      reportName={`Top 5 Books-${new Date().toLocaleString()}`}
                      reports={
                        statisticlogsList.length ? statisticlogsList[2] : []
                      }
                    />
                  </div> */}

                  {/* <div className="col-8">
                    <ChartPlaceHolder title={"Top Read Books"} />
                  </div> */}
                </div>
                {/* <div className="col-12">
                  <ChartPlaceHolder title={"Average Time Spending per Activity"} />
                </div> */}
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
  statisticlogsList: PropTypes.array,
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
  statisticlogsList: state.admin.statisticlogsList,
  receptionsList: state.admin.receptionsList,
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
  loadStatisticLogsList,
  loadReceptionsList,
  loadClassroomsList,
  setSchool,
})(Dashboard);
