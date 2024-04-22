import React, { useState, Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { generateReport, clearReport } from '../../../actions/admin';
import Loading from '../../layouts/Loading';
import OverallResultChart from './OverallResultChart';
import AverageScorePerGradeByBenchMarkChart from './AverageScorePerGradeByBenchMarkChart';
import AverageGrade from './AverageGrade';
import GradeByAssessmentTypeChart from './GradeByAssessmentTypeChart';

// your forceUpdate hook
const useForceUpdate = () => {
  const [value, setValue] = useState(0); // integer state
  return () => setValue((value) => value + 1); // update the state to force render
};
const CompareDashboard = ({
  generateReport,
  reports,
  reportsLoading,
  user,
  clearReport,
}) => {
  const hist = useHistory();
  const forceUpdate = useForceUpdate();
  const [benchMark, setBenchMark] = useState([0]);
  const [year, setYear] = useState(2021);
  const [years, setYears] = useState([2021]);
  const formatReports = (arr) => {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].CategoryID === 4) {
        let CLS = JSON.parse(JSON.stringify(arr[i])),
          WWR = JSON.parse(JSON.stringify(arr[i]));
        // CLS
        CLS.TotalScore = parseInt((arr[i].TotalScore + '').slice(0, -3));
        CLS.Rank = parseInt((arr[i].Rank + '').slice(0, -4));
        CLS.Percentile = parseInt((arr[i].Percentile + '').slice(0, -3));
        CLS.Category = 'Silly Word (CLS)';
        WWR.TotalScore = parseInt((arr[i].TotalScore + '').slice(-3));
        WWR.Rank = parseInt((arr[i].Rank + '').slice(-4));
        WWR.Percentile = parseInt((arr[i].Percentile + '').slice(-3));
        WWR.CategoryID = 7;
        WWR.Category = 'Silly Word (WWR)';
        result.push(CLS);
        result.push(WWR);
        //console.log(CLS, WWR);
      } else {
        result.push(arr[i]);
      }
    }
    return result;
  };

  useEffect(() => {
    if (reportsLoading) {
      if (user.UserTypeID === 1) {
        generateReport(
          year,
          benchMark,
          user.SchoolID,
          -1,
          -1,
          -1,
          user.UserID,
          user.schoolIds ? user.schoolIds : -1
        );
      } else if (user.UserTypeID === 5) {
        generateReport(
          year,
          benchMark,
          -1,
          -1,
          -1,
          -1,
          -1,
          user.schoolIds ? user.schoolIds : -1
        );
      } else {
        generateReport(
          year,
          benchMark,
           -1,
          -1,
         -1,
          -1,
          -1,
           -1
        );
      }
    }
  }, [generateReport, reports, reportsLoading]);

  return (
    <Fragment>
      {reportsLoading || reports === undefined ? (
        <div className='d-flex align-items-center h-100 justify-content-center w-100'>
          <Loading />
        </div>
      ) : (
        <div className='p-sm-5 p-2 w-100 dashboard-margin'>
          <div className='mb-3 '>
            <h6 className='txt-primary-light'>
              {user.UserType} / Compare Dashboard
            </h6>
            <div className='d-sm-flex  w-100 align-items-center justify-content-between'>
              <div className='d-flex mb-2 mb-sm-0'>
                <div
                  className='admin-back mx-2  rounded-circle d-flex align-items-center justify-content-center txt-primary'
                  onClick={() => {
                    clearReport();
                    hist.goBack();
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
              <div className='d-flex w-100 align-items-center justify-content-end '>
                <div className='d-flex p-0 my-3'>
                  <div
                    className='btn button-parent button-primary-outline txt-primary d-flex align-items-center px-3 '
                    onClick={() => {
                      setYears([2021]);
                      setYear(0);
                    }}
                  >
                    Clear
                  </div>
                  <select
                    className='form-select form-control bg-primary text-white mx-2'
                    aria-label='Default select example'
                    value={year}
                    id='year'
                    onChange={(e) => setYear(parseInt(e.target.value))}
                  >
                    <option value={0}>Select a year</option>
                    <option value={2020}>2019-2020</option>
                    <option value={2021}>2020-2021</option>
                    <option value={2022}>2021-2022</option>
                    <option value={2023}>2022-2023</option>
                    <option value={2024}>2023-2024</option>
                  </select>
                </div>

                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='30'
                  height='30'
                  fill='currentColor'
                  class='bi bi-plus add-item-btn rounded-circle border border-primary txt-primary border-2 '
                  viewBox='0 0 16 16'
                  onClick={() => {
                    if (year !== 0) {
                      let set = new Set([...years, year]);
                      if (set.size !== years.length) {
                        setYears([...years, year]);
                        setBenchMark([...benchMark, 0]);
                        forceUpdate();
                      }
                      setYear(0);
                      forceUpdate();
                    }
                  }}
                >
                  <path d='M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z' />
                </svg>
              </div>
            </div>
            {years.map((y, id) => (
              <div key={id}>
                <div className='d-flex w-100 align-items-center justify-content-between my-2 '>
                  <div className='col-5 col-lg-2 p-0'>
                    <h6 className='txt-primary'>
                      {y - 1}-{y}
                    </h6>
                  </div>
                  <div className='col-5 col-lg-2 p-0'>
                    <select
                      className='form-select form-control bg-primary text-white m-0'
                      aria-label='Default select example'
                      value={benchMark[id]}
                      id='benchMark'
                      onChange={(e) => {
                        let temp = benchMark;
                        temp[id] = parseInt(e.target.value);
                        setBenchMark(temp);
                        forceUpdate();
                      }}
                    >
                      <option value={0}>All Benchmarks</option>
                      <option value={1}>Benchmark 1 - Fall</option>
                      <option value={2}>Benchmark 2 - Winter</option>
                      <option value={3}>Benchmark 3 - Spring</option>
                    </select>
                  </div>
                </div>

                {reports !== undefined && (
                  <div className='d-flex w-100 justify-content-between flex-column flex-lg-row'>
                    <div className='d-flex flex-column '>
                      <OverallResultChart
                        reports={formatReports(
                          reports.filter(
                            (item) =>
                              (benchMark[id] === 0
                                ? true
                                : item.BenchMarkID ===
                                  parseInt(benchMark[id])) &&
                              item.Year === parseInt(y) &&
                              item.TotalScore !== null &&
                              item.Percentile !== null,
                          ),
                        )}
                        benchMarkID={benchMark[id]}
                      />
                      <AverageGrade
                        reports={formatReports(
                          reports.filter(
                            (item) =>
                              (benchMark[id] === 0
                                ? true
                                : item.BenchMarkID ===
                                  parseInt(benchMark[id])) &&
                              item.Year === parseInt(y) &&
                              item.TotalScore !== null &&
                              item.Percentile !== null,
                          ),
                        )}
                        benchMarkID={benchMark[id]}
                      />
                    </div>
                    <div className='d-flex flex-column flex-lg-fill'>
                      <GradeByAssessmentTypeChart
                        reports={formatReports(
                          reports.filter(
                            (item) =>
                              (benchMark[id] === 0
                                ? true
                                : item.BenchMarkID ===
                                  parseInt(benchMark[id])) &&
                              item.Year === parseInt(y) &&
                              item.TotalScore !== null &&
                              item.Percentile !== null,
                          ),
                        )}
                        benchMarkID={benchMark[id]}
                      />
                      <AverageScorePerGradeByBenchMarkChart
                        reports={formatReports(
                          reports.filter(
                            (item) =>
                              (benchMark[id] === 0
                                ? true
                                : item.BenchMarkID ===
                                  parseInt(benchMark[id])) &&
                              item.Year === parseInt(y) &&
                              item.TotalScore !== null &&
                              item.Percentile !== null,
                          ),
                        )}
                        benchMarkID={benchMark[id]}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </Fragment>
  );
};
CompareDashboard.propTypes = {
  user: PropTypes.object,
  reports: PropTypes.array,
  reportsLoading: PropTypes.bool,
  generateReport: PropTypes.func.isRequired,
  clearReport: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  reports: state.admin.reports,
  reportsLoading: state.admin.reportsLoading,
  user: state.auth.user,
});

export default connect(mapStateToProps, { generateReport, clearReport })(
  CompareDashboard,
);
