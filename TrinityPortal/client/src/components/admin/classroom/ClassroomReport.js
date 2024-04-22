import React, { Fragment, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { generateReport } from '../../../actions/admin';
import Loading from '../../layouts/Loading';
import AverageScorePerGradeByBenchMarkChart from './../dashboard/AverageScorePerGradeByBenchMarkChart';
import AverageGrade from './../dashboard/AverageGrade';
import GradeByAssessmentTypeChart from './../dashboard/GradeByAssessmentTypeChart';
import OverallResultChart from '../dashboard/OverallResultChart';

const ClassroomReport = ({
  generateReport,
  reports,
  reportsLoading,
  classroom,
  authUser,
  classroomLoading,
}) => {
  const [benchMark, setBenchMark] = useState(0);
  const [year, setYear] = useState(-1);
  const hist = useHistory();
  useEffect(() => {
    if (reportsLoading && !classroomLoading) {
      console.log("Test classroom Value", classroom)
      generateReport(
        classroom.SchoolID,
        classroom.Year,
        -1,
        classroom.TeacherID,
      );
    }
  }, [reportsLoading, reports]);

  if (classroom == null) {
    hist.push('/admin/classrooms');
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
            <h6 className='txt-primary-light'>Admin / Classroom / Report</h6>
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
                  reports={reports.filter(
                    (item) =>
                      item.ClassroomID === classroom.ClassroomID &&
                      (benchMark === 0
                        ? true
                        : item.BenchMarkID === parseInt(benchMark)) &&
                      (year === -1 ? true : item.Year === parseInt(year)) &&
                      item.Percentile !== null,
                  )}
                  benchMarkID={benchMark}
                />
                <AverageGrade
                  reports={reports.filter(
                    (item) =>
                      item.ClassroomID === classroom.ClassroomID &&
                      (benchMark === 0
                        ? true
                        : item.BenchMarkID === parseInt(benchMark)) &&
                      (year === -1 ? true : item.Year === parseInt(year)) &&
                      item.Percentile !== null,
                  )}
                  benchMarkID={benchMark}
                  classroom={true}
                />
              </div>
              <div className='d-flex flex-column flex-lg-fill'>
                <GradeByAssessmentTypeChart
                  reports={reports.filter(
                    (item) =>
                      item.ClassroomID === classroom.ClassroomID &&
                      (benchMark === 0
                        ? true
                        : item.BenchMarkID === parseInt(benchMark)) &&
                      (year === -1 ? true : item.Year === parseInt(year)) &&
                      item.Percentile !== null,
                  )}
                  benchMarkID={benchMark}
                />
                <AverageScorePerGradeByBenchMarkChart
                  reports={reports.filter(
                    (item) => item.ClassroomID === classroom.ClassroomID,
                  )}
                  benchMarkID={benchMark}
                  classroom={true}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </Fragment>
  );
};
ClassroomReport.propTypes = {
  generateReport: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  reports: state.admin.reports,
  reportsLoading: state.admin.reportsLoading,
  classroom: state.admin.classroom,
  classroomLoading: state.admin.classroomLoading,
  authUser: state.auth.user,
});

export default connect(mapStateToProps, { generateReport })(ClassroomReport);
