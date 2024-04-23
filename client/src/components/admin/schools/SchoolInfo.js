import React, { Fragment } from 'react';

const SchoolInfo = ({ school, schoolLoading }) => {
  return (
    <Fragment>
      {schoolLoading ? (
        <div className='card w-100 p-2 p-sm-3 p-lg-4 shadow-lg border-0  mb-2 vh-100 '>
          <div className='d-flex justify-content-center align-items-center h-100'>
            <div class='spinner-border txt-primary' role='status'>
              <span class='visually-hidden'>Loading...</span>
            </div>
          </div>
        </div>
      ) : (
        <div className='card w-100 p-2 p-sm-3 p-lg-4 shadow-lg border-0  mb-2 '>
          <div className='mb-3'>
            <div className='txt-primary'>SchoolID</div>
            <div className=''>{school.SchoolID}</div>
          </div>
          <div className='mb-3'>
            <div className='txt-primary'>Name</div>
            <div className=''>{school.Name}</div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default SchoolInfo;
