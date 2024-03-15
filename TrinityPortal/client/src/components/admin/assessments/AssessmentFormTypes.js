import React from 'react';

const AssessmentFormTypes = ({ formData, setFormData, edit }) => {
  const Type = formData.CategoryID;
  return (
    <div className='card w-100 p-2 p-sm-3 p-lg-4 shadow-lg border-0  mb-2 '>
      <h6>Assessment Type</h6>
      <div className='row row-cols-1 row-cols-lg-2'>
        <div
          className='col mb-4'
          onClick={() => {
            if (!edit) setFormData({ ...formData, CategoryID: 1 });
          }}
        >
          <div
            className={`card h-100 cursor-pointer  shadow-sm  ${
              Type === 1 ? 'assessments-type-selected' : ''
            } `}
          >
            <div className='card-body text-left '>
              <div className='form-check'>
                <input
                  disabled={edit}
                  className='form-check-input'
                  type='checkbox'
                  onChange={() => {}}
                  value=''
                  checked={Type === 1 ? true : false}
                  id='defaultCheck1'
                />
                <div className='form-check-label d-flex justify-content-between '>
                  <div className='flex-grow-1 '>
                    <b>Name the Letter</b>
                    <p className='m-0'>
                      # of letters correct out of # of letters read within the
                      minute List of letters missed
                    </p>
                  </div>
                  <div className='bg-light-green rounded-circle flex-shrink-0 text-center d-flex align-items-center justify-content-center admin-assessments-type'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      height='60px'
                      viewBox='0 0 24 24'
                      width='60px'
                      fill='#ffffff'
                    >
                      <path d='M0 0h24v24H0V0z' fill='none' />
                      <path d='M13.12 16c.69 0 1.15-.69.9-1.32L9.77 3.87C9.56 3.34 9.06 3 8.5 3s-1.06.34-1.27.87L2.98 14.68c-.25.63.22 1.32.9 1.32.4 0 .76-.25.91-.63L5.67 13h5.64l.9 2.38c.15.37.51.62.91.62zm-6.69-5L8.5 5.48 10.57 11H6.43zm14.46 1.29l-7.39 7.39-2.97-2.97c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l3.68 3.68c.39.39 1.02.39 1.41 0l8.08-8.09c.39-.39.39-1.02 0-1.41-.38-.39-1.02-.39-1.4-.01z' />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col mb-4'>
          <div
            className={`card h-100 cursor-pointer  shadow-sm  ${
              Type === 2 ? 'assessments-type-selected' : ''
            } `}
            onClick={() => {
              if (!edit) setFormData({ ...formData, CategoryID: 2 });
            }}
          >
            <div className='card-body text-left '>
              <div className='form-check'>
                <input
                  disabled={edit}
                  className='form-check-input'
                  type='checkbox'
                  onChange={() => {
                    if (!edit) setFormData({ ...formData, CategoryID: 2 });
                  }}
                  value=''
                  checked={Type === 2 ? true : false}
                  id='defaultCheck2'
                />
                <div className='form-check-label d-flex justify-content-between '>
                  <div className='flex-grow-1 '>
                    <b>Letter Sounds</b>
                    <p className='m-0'>
                      # of letters correct out of # of letters read within the
                      minute List of letters missed
                    </p>
                  </div>
                  <div className='bg-blue rounded-circle flex-shrink-0 text-center d-flex align-items-center justify-content-center admin-assessments-type'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      height='60px'
                      viewBox='0 0 24 24'
                      width='60px'
                      fill='#ffffff'
                    >
                      <path d='M0 0h24v24H0V0z' fill='none' />
                      <path d='M12 5v8.55c-.94-.54-2.1-.75-3.33-.32-1.34.48-2.37 1.67-2.61 3.07-.46 2.74 1.86 5.08 4.59 4.65 1.96-.31 3.35-2.11 3.35-4.1V7h2c1.1 0 2-.9 2-2s-.9-2-2-2h-2c-1.1 0-2 .9-2 2z' />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col mb-4'>
          <div
            className={`card h-100 cursor-pointer  shadow-sm  ${
              Type === 5 ? 'assessments-type-selected' : ''
            } `}
            onClick={() => {
              if (!edit) setFormData({ ...formData, CategoryID: 5 });
            }}
          >
            <div className='card-body text-left '>
              <div className='form-check'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  disabled={edit}
                  onChange={() => {}}
                  value=''
                  checked={Type === 5 ? true : false}
                  id='defaultCheck3'
                />
                <div className='form-check-label d-flex justify-content-between '>
                  <div className='flex-grow-1 '>
                    <b>Break up the Word</b>
                    <p className='m-0'>Tally up the # of sounds correct</p>
                  </div>
                  <div className='bg-orange rounded-circle flex-shrink-0 text-center d-flex align-items-center justify-content-center admin-assessments-type'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      enable-background='new 0 0 24 24'
                      height='60px'
                      viewBox='0 0 24 24'
                      width='60px'
                      fill='#ffffff'
                    >
                      <g>
                        <rect fill='none' height='24' width='24' />
                      </g>
                      <g>
                        <g>
                          <polygon points='12.03,6.3 11.97,6.3 10.95,9.19 13.05,9.19' />
                          <path d='M4,22L4,22c0.55,0,1-0.45,1-1v-3c0-0.55-0.45-1-1-1h0c-0.55,0-1,0.45-1,1v3C3,21.55,3.45,22,4,22z' />
                          <path d='M12,15c3.31,0,6-2.69,6-6s-2.69-6-6-6S6,5.69,6,9S8.69,15,12,15z M12,5L12,5c0.38,0,0.71,0.23,0.85,0.59l2.12,5.65 c0.14,0.37-0.13,0.76-0.53,0.76h0c-0.24,0-0.45-0.15-0.53-0.38l-0.49-1.41h-2.83l-0.5,1.41C10.01,11.85,9.8,12,9.56,12h0 c-0.39,0-0.67-0.39-0.53-0.76l2.12-5.65C11.29,5.23,11.62,5,12,5z' />
                          <path d='M8,22L8,22c0.55,0,1-0.45,1-1v-3c0-0.55-0.45-1-1-1h0c-0.55,0-1,0.45-1,1v3C7,21.55,7.45,22,8,22z' />
                          <path d='M12,22L12,22c0.55,0,1-0.45,1-1v-3c0-0.55-0.45-1-1-1h0c-0.55,0-1,0.45-1,1v3C11,21.55,11.45,22,12,22z' />
                          <path d='M15,18v3c0,0.55,0.45,1,1,1h4c0.55,0,1-0.45,1-1v-3c0-0.55-0.45-1-1-1h-4C15.45,17,15,17.45,15,18z' />
                        </g>
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col mb-4'>
          <div
            className={`card h-100 cursor-pointer  shadow-sm  ${
              Type === 6 ? 'assessments-type-selected' : ''
            } `}
            onClick={() => {
              if (!edit)
                setFormData({
                  ...formData,
                  CategoryID: 6,
                });
            }}
          >
            <div className='card-body text-left '>
              <div className='form-check'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  disabled={edit}
                  onChange={() => {}}
                  value=''
                  checked={Type === 6 ? true : false}
                  id='defaultCheck4'
                />
                <div className='form-check-label d-flex justify-content-between '>
                  <div className='flex-grow-1 '>
                    <b>Say the first sound</b>
                    <p className='m-0'>
                      Total Score = (# of 2 point responses x 2 + # of 1 point
                      responses)
                    </p>
                  </div>
                  <div className='bg-red rounded-circle flex-shrink-0 text-center d-flex align-items-center justify-content-center admin-assessments-type'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      height='60px'
                      viewBox='0 0 24 24'
                      width='60px'
                      fill='#ffffff'
                    >
                      <path d='M0 0h24v24H0V0z' fill='none' />
                      <circle cx='9' cy='9' r='4' />
                      <path d='M9 15c-2.67 0-8 1.34-8 4v1c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-1c0-2.66-5.33-4-8-4zm6.47-7.23c.32.79.32 1.67 0 2.46-.19.47-.11 1 .25 1.36l.03.03c.58.58 1.57.46 1.95-.27.76-1.45.76-3.15-.02-4.66-.38-.74-1.38-.88-1.97-.29l-.01.01c-.34.35-.42.89-.23 1.36zm3.71-4.88c-.4.4-.46 1.02-.13 1.48 1.97 2.74 1.96 6.41-.03 9.25-.32.45-.25 1.07.14 1.46l.03.03c.49.49 1.32.45 1.74-.1 2.75-3.54 2.76-8.37 0-12.02-.42-.55-1.26-.59-1.75-.1z' />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col mb-4'>
          <div
            className={`card h-100 cursor-pointer  shadow-sm  ${
              Type === 4 ? 'assessments-type-selected' : ''
            } `}
            onClick={() => {
              if (!edit) setFormData({ ...formData, CategoryID: 4 });
            }}
          >
            <div className='card-body text-left '>
              <div className='form-check'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  disabled={edit}
                  onChange={() => {}}
                  value=''
                  checked={Type === 4 ? true : false}
                  id='defaultCheck5'
                />
                <div className='form-check-label d-flex justify-content-between '>
                  <div className='flex-grow-1 '>
                    <b>Silly Words</b>
                    <p className='m-0'>
                      Total # Correct Letter Sounds <br />
                      Total # Correct Words Read
                    </p>
                  </div>
                  <div className='bg-royal-blue rounded-circle flex-shrink-0 text-center d-flex align-items-center justify-content-center admin-assessments-type'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      enable-background='new 0 0 24 24'
                      height='60px'
                      viewBox='0 0 24 24'
                      width='60px'
                      fill='#ffffff'
                      className='pb-1'
                    >
                      <g>
                        <rect fill='none' height='24' width='24' />
                      </g>
                      <g>
                        <g>
                          <path d='M20,20H4c-1.1,0-2,0.9-2,2s0.9,2,2,2h16c1.1,0,2-0.9,2-2S21.1,20,20,20z' />
                          <path d='M7.11,17L7.11,17c0.48,0,0.91-0.3,1.06-0.75l1.01-2.83h5.65l0.99,2.82C15.98,16.7,16.41,17,16.89,17 c0.79,0,1.33-0.79,1.05-1.52L13.69,4.17C13.43,3.47,12.75,3,12,3s-1.43,0.47-1.69,1.17L6.06,15.48C5.78,16.21,6.33,17,7.11,17z M11.94,5.6h0.12l2.03,5.79H9.91L11.94,5.6z' />
                        </g>
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col mb-4'>
          <div
            className={`card h-100 cursor-pointer  shadow-sm  ${
              Type === 3 ? 'assessments-type-selected' : ''
            } `}
            onClick={() => {
              if (!edit) setFormData({ ...formData, CategoryID: 3 });
            }}
          >
            <div className='card-body text-left '>
              <div className='form-check'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  disabled={edit}
                  onChange={() => {}}
                  value=''
                  checked={Type === 3 ? true : false}
                  id='defaultCheck6'
                />
                <div className='form-check-label d-flex justify-content-between '>
                  <div className='flex-grow-1 '>
                    <b>Story Reading</b>
                    <p className='m-0'>
                      Total Words (in 1 minute); Errors (including Skipped
                      words); Words Read Correctly
                    </p>
                  </div>
                  <div className='bg-yellow rounded-circle flex-shrink-0 text-center d-flex align-items-center justify-content-center admin-assessments-type'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      enable-background='new 0 0 24 24'
                      height='60px'
                      viewBox='0 0 24 24'
                      width='60px'
                      fill='#ffffff'
                    >
                      <g>
                        <rect fill='none' height='24' width='24' x='0' />
                      </g>
                      <g>
                        <path d='M18.15,1.35l-4,4C14.05,5.45,14,5.57,14,5.71v8.17c0,0.43,0.51,0.66,0.83,0.37l4-3.6c0.11-0.09,0.17-0.23,0.17-0.37V1.71 C19,1.26,18.46,1.04,18.15,1.35z M22.47,5.2C22,4.96,21.51,4.76,21,4.59v12.03C19.86,16.21,18.69,16,17.5,16 c-1.9,0-3.78,0.54-5.5,1.58V5.48C10.38,4.55,8.51,4,6.5,4C4.71,4,3.02,4.44,1.53,5.2C1.2,5.36,1,5.71,1,6.08v12.08 c0,0.76,0.81,1.23,1.48,0.87C3.69,18.4,5.05,18,6.5,18c2.07,0,3.98,0.82,5.5,2c1.52-1.18,3.43-2,5.5-2c1.45,0,2.81,0.4,4.02,1.04 C22.19,19.4,23,18.93,23,18.17V6.08C23,5.71,22.8,5.36,22.47,5.2z' />
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentFormTypes;
