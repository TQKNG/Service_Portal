import React, { useState } from 'react';
import PropTypes from 'prop-types';

const StudentFilter = ({
  setFilter,
  setListSearch,
  formatReports,
  reports,
  formData,
  setFormData,
  search,
  searchInput,
}) => {
  const [applied, setApplied] = useState(false);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const { Year, BenchMark, Category, Grade, Teacher, Percentile } = formData;

  return (
    <div>
      <div
        className='modal fade'
        id='filterUser'
        aria-labelledby='filterUserLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-dialog-centered'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='filterUserLabel'>
                Filter Student
              </h5>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>

            <div className='modal-body'>
              <div className='mb-3'>
                <label for='inputAssessment'>
                  <b>Year</b>
                </label>
                <select
                  className='form-select form-control border-primary'
                  aria-label='Default select'
                  value={Year}
                  id='Year'
                  onChange={(e) => onChange(e)}
                >
                  <option value={''}>------------------</option>
                  <option value={'2020'}>2019-2020</option>
                  <option value={'2021'}>2020-2021</option>
                  <option value={'2022'}>2021-2022</option>
                  <option value={'2023'}>2022-2023</option>
                  <option value={'2024'}>2023-2024</option>
                </select>
              </div>
              <div className='mb-3'>
                <label for='inputGrade'>
                  <b>Grade</b>
                </label>
                <select
                  className='form-select form-control border-primary'
                  aria-label='Default select example'
                  value={Grade}
                  id='Grade'
                  onChange={(e) => onChange(e)}
                >
                  <option value={''}>------------------</option>
                  <option value={'Grade 1'}>Grade 1</option>
                  <option value={'Grade 2'}>Grade 2</option>
                  <option value={'Grade 3'}>Grade 3</option>
                  <option value={'Grade 4'}>Grade 4</option>
                  <option value={'Grade 5'}>Grade 5</option>
                  <option value={'Grade 6'}>Grade 6</option>
                  <option value={'Other'}>Other</option>
                </select>
              </div>
              <div className='mb-3'>
                <label for='inputGrade'>
                  <b>Benchmark</b>
                </label>
                <select
                  className='form-select form-control border-primary'
                  aria-label='Default select example'
                  value={BenchMark}
                  id='BenchMark'
                  onChange={(e) => onChange(e)}
                >
                  <option value={''}>------------------</option>
                  <option value={'Fall'}>Fall</option>
                  <option value={'Winter'}>Winter</option>
                  <option value={'Spring'}>Spring</option>
                  <option value={'Progress Monitoring'}>Other</option>
                </select>
              </div>
              <div className='mb-3'>
                <label for='inputGrade'>
                  <b>Category</b>
                </label>
                <select
                  className='form-select form-control border-primary'
                  aria-label='Default select example'
                  value={Category}
                  id='Category'
                  onChange={(e) => onChange(e)}
                >
                  <option value={''}>------------------</option>
                  <option value={'Name the Letter'}>Name the Letter</option>
                  <option value={'Letter Sounds'}>Letter Sounds</option>
                  <option value={'Story Reading'}>Story Reading</option>
                  <option value={'Silly Word (CLS)'}>Silly Word (CLS)</option>
                  <option value={'Silly Word (WWR)'}>Silly Word (WWR)</option>
                  <option value={'Break up the Word'}>Break up the Word</option>
                  <option value={'Say the first sound'}>
                    Say the first sound
                  </option>
                </select>
              </div>
              <div className='mb-3'>
                <label for='inputGrade'>
                  <b>Percentile</b>
                </label>
                <select
                  className='form-select form-control border-primary'
                  aria-label='Default select example'
                  value={Percentile}
                  id='Percentile'
                  onChange={(e) => onChange(e)}
                >
                  <option value={''}>------------------</option>
                  <option value={3}>Exceeding {'(>90th PR)'}</option>
                  <option value={2}>At Grade Level (20th-90th PR)</option>
                  <option value={1}>Below Grade Level: (10th-20th PR)</option>
                  <option value={0}>Well Below {'(<10th PR)'}</option>
                </select>
              </div>
            </div>

            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary'
                data-bs-dismiss='modal'
              >
                Cancel
              </button>
              <button
                type='button'
                className='btn button-primary'
                onClick={() => {
                  setFilter(formData);
                  setApplied(true);
                }}
                data-bs-dismiss='modal'
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>

      {!applied ? (
        <div
          className='btn button-parent button-primary d-flex align-items-center'
          data-bs-toggle='modal'
          data-bs-target='#filterUser'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='18'
            height='18'
            fill='#ffffff'
            class='bi bi-funnel-fill'
            viewBox='0 0 16 16'
          >
            <path d='M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2z' />
          </svg>
        </div>
      ) : (
        <div
          className='btn button-parent btn-danger d-flex align-items-center'
          onClick={() => {
            setListSearch(searchInput(formatReports(reports), search));
            setFormData({
              Year: '',
              BenchMark: '',
              Category: '',
              Grade: '',
              Teacher: '',
              Percentile: '',
            });
            setApplied(false);
          }}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='18'
            height='18'
            fill='#ffffff'
            class='bi bi-x-lg'
            viewBox='0 0 16 16'
          >
            <path d='M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z' />
          </svg>
        </div>
      )}
    </div>
  );
};

StudentFilter.propTypes = {
  usersList: PropTypes.array.isRequired,
  usersListLoading: PropTypes.bool.isRequired,
  user: PropTypes.object,
};

export default StudentFilter;
