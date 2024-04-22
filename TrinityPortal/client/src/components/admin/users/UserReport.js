import React, { Fragment, useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { generateReport } from '../../../actions/admin';
import Loading from '../../layouts/Loading';
import OverallResultChart from './../dashboard/OverallResultChart';
import AverageScorePerGradeByBenchMarkChart from './../dashboard/AverageScorePerGradeByBenchMarkChart';
import AverageGrade from './../dashboard/AverageGrade';
import GradeByAssessmentTypeChart from './../dashboard/GradeByAssessmentTypeChart';

const UserReport = ({
  generateReport,
  reports,
  reportsLoading,
  user,
  authUser,
  userLoading,
}) => {
  const [benchMark, setBenchMark] = useState(0);
  const [year, setYear] = useState(-1);
  const hist = useHistory();

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
    if (reportsLoading && !userLoading) {
      if (authUser.UserTypeID === 1) {
        generateReport(authUser.SchoolID, year, user.UserID, authUser.UserID);
      } else if (authUser.UserTypeID === 5) {
        generateReport(-1, -1, user.SchoolID, -1, -1, -1, -1);
      } else {
        generateReport(authUser.SchoolID, year, user.UserID, -1);
      }
    }
  }, [reportsLoading, reports]);

  if (user == null) {
    hist.push('/admin/users');
  }

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
              Admin / User / Report /
              {' ' +
                user.FirstName +
                ' ' +
                user.LastName +
                (user.AlternativeID !== null ? `-${user.AlternativeID}` : '')}
            </h6>
            <div className='d-sm-flex  w-100 align-items-center justify-content-between'>
              <div className='d-flex mb-2 mb-sm-0'>
                <div
                  className='admin-back mx-2  rounded-circle d-flex align-items-center justify-content-center txt-primary'
                  onClick={() => {
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
                <div className='col-5 col-lg-2 p-0 mx-2'>
                  <select
                    className='form-select form-control bg-primary text-white m-0'
                    aria-label='Default select example'
                    value={year}
                    id='year'
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
                <div className='col-5 col-lg-2 p-0'>
                  <select
                    className='form-select form-control bg-primary text-white m-0'
                    aria-label='Default select example'
                    value={benchMark}
                    id='benchMark'
                    onChange={(e) => setBenchMark(parseInt(e.target.value))}
                  >
                    <option value={0}>All Benchmarks</option>
                    <option value={1}>Benchmark 1 - Fall</option>
                    <option value={2}>Benchmark 2 - Winter</option>
                    <option value={3}>Benchmark 3 - Spring</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {reports !== undefined && (
            <div className='d-flex w-100 justify-content-between flex-column flex-lg-row'>
              <div className='d-flex flex-column '>
                <OverallResultChart
                  reports={formatReports(
                    reports.filter(
                      (item) =>
                        (benchMark === 0
                          ? true
                          : item.BenchMarkID === parseInt(benchMark)) &&
                        (year === -1 ? true : item.Year === parseInt(year)) &&
                        item.Percentile !== null,
                    ),
                  )}
                  benchMarkID={benchMark}
                />
                <AverageGrade
                  reports={formatReports(
                    reports.filter(
                      (item) =>
                        (benchMark === 0
                          ? true
                          : item.BenchMarkID === parseInt(benchMark)) &&
                        (year === -1 ? true : item.Year === parseInt(year)) &&
                        item.Percentile !== null,
                    ),
                  )}
                  benchMarkID={benchMark}
                />
              </div>
              <div className='d-flex flex-column flex-lg-fill'>
                <GradeByAssessmentTypeChart
                  reports={formatReports(
                    reports.filter(
                      (item) =>
                        (benchMark === 0
                          ? true
                          : item.BenchMarkID === parseInt(benchMark)) &&
                        (year === -1 ? true : item.Year === parseInt(year)) &&
                        item.Percentile !== null,
                    ),
                  )}
                  benchMarkID={benchMark}
                />
                <AverageScorePerGradeByBenchMarkChart
                  reports={formatReports(
                    reports.filter((item) => item.Percentile !== null),
                  )}
                  benchMarkID={benchMark}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </Fragment>
  );
};
UserReport.propTypes = {
  generateReport: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  reports: state.admin.reports,
  reportsLoading: state.admin.reportsLoading,
  user: state.admin.user,
  userLoading: state.admin.userLoading,
  authUser: state.auth.user,
});

export default connect(mapStateToProps, { generateReport })(UserReport);
