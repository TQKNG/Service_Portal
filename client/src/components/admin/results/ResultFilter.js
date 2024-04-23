import React, { useState } from 'react';

const ResultFilter = ({
  resultsList,
  setFilter,
  setListSearch,
  formData,
  setFormData,
  search,
  searchInput,
}) => {
  const [applied, setApplied] = useState(false);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const { AccessCode, FirstName, LastName, Title, BenchMarkID, GradeID } =
    formData;

  return (
    <div>
      <div
        className='modal fade'
        id='filterResult'
        aria-labelledby='filterResultLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-dialog-centered'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='filterResultLabel'>
                Filter Results
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
                <div className='txt-primary'>Assessment Title</div>
                <input
                  type='text'
                  className='form-control rounded '
                  id='Title'
                  placeholder='Enter Title...'
                  required
                  value={Title}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className='mb-3'>
                <div className='txt-primary'>First Name</div>
                <input
                  type='text'
                  className='form-control rounded '
                  id='FirstName'
                  placeholder='Enter FirstName...'
                  required
                  value={FirstName}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className='mb-3'>
                <div className='txt-primary'>Last Name</div>
                <input
                  type='text'
                  className='form-control rounded '
                  id='LastName'
                  placeholder='Enter Last Name...'
                  required
                  value={LastName}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className='mb-3'>
                <label for='inputAssessment'>
                  <b>Benchmark</b>
                </label>
                <select
                  className='form-select form-control border-primary'
                  aria-label='Default select'
                  value={BenchMarkID}
                  id='BenchMarkID'
                  onChange={(e) => onChange(e)}
                >
                  <option value={''}>Select Benchmark</option>
                  <option value={1}>Benchmark 1 – Fall</option>
                  <option value={2}>Benchmark 2 – Winter</option>
                  <option value={3}>Benchmark 3 – Spring</option>
                  <option value={4}>Progress Monitoring</option>
                </select>
              </div>
              <div className='mb-3'>
                <label for='inputAssessment'>
                  <b>Grade</b>
                </label>
                <select
                  className='form-select form-control border-primary'
                  aria-label='Default select'
                  value={GradeID}
                  id='GradeID'
                  onChange={(e) => onChange(e)}
                >
                  <option value={''}>Select Grade</option>
                  <option value={1}>Grade 1 </option>
                  <option value={2}>Grade 2 </option>
                  <option value={3}>Grade 3 </option>
                  <option value={4}>Grade 4 </option>
                  <option value={5}>Grade 5 </option>
                  <option value={6}>Grade 6 </option>
                  <option value={7}>Other </option>
                </select>
              </div>
              <div className='mb-3'>
                <div className='txt-primary'>Access Code</div>
                <input
                  type='text'
                  className='form-control rounded '
                  id='AccessCode'
                  placeholder='Enter Access Code...'
                  required
                  value={AccessCode}
                  onChange={(e) => onChange(e)}
                />
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
          data-bs-target='#filterResult'
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
            setListSearch(searchInput(resultsList, search));
            setFormData({
              AccessCode: '',
              FirstName: '',
              LastName: '',
              Title: '',
              BenchMarkID: '',
              GradeID: '',
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

export default ResultFilter;
