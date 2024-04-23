import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadSchoolsList } from '../../../actions/admin';
import PropTypes from 'prop-types';

const UserFilter = ({
  user,
  schoolsList,
  loadSchoolsList,
  setFilter,
  schoolListLoading,
  setListSearch,
  usersList,
  formData,
  setFormData,
  search,
  searchInput,
}) => {
  const [applied, setApplied] = useState(false);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const { FirstName, LastName, SchoolID, Email, UserTypeID } = formData;

  if (user === null) return <Redirect to='/admin/users' />;

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
                Filter User
              </h5>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            {schoolsList.length === 0 && schoolListLoading ? (
              <div className='modal-body text-center'>
                <div class='spinner-border txt-primary mx-1' role='status'>
                  <span class='visually-hidden'>Loading...</span>
                </div>
              </div>
            ) : (
              <div className='modal-body'>
                <div className='mb-3'>
                  <div className='txt-primary'>First Name</div>
                  <input
                    type='text'
                    className='form-control rounded '
                    id='FirstName'
                    placeholder='Enter First Name...'
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
                  <div className='txt-primary'>Email</div>
                  <input
                    type='Email'
                    className='form-control rounded '
                    id='Email'
                    placeholder='Enter Email...'
                    required
                    value={Email}
                    onChange={(e) => onChange(e)}
                  />
                </div>
                {user.UserTypeID === 5 && (
                  <div className='mb-3'>
                    <div className='txt-primary'>School</div>
                    <select
                      className='form-select'
                      aria-label='Default select example'
                      id='SchoolID'
                      value={SchoolID}
                      onChange={(e) => onChange(e)}
                    >
                      <option value={''}>------------------</option>
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
                        .map((school) => {
                          return (
                            <option
                              key={school.SchoolID}
                              value={school.SchoolID}
                            >
                              {school.Name}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                )}
                <div className='mb-3'>
                  <div className='txt-primary'>Role</div>
                  <select
                    className='form-select'
                    aria-label='Default select example'
                    id='UserTypeID'
                    value={UserTypeID}
                    onChange={(e) => onChange(e)}
                  >
                    <option value={''}>------------------</option>
                    <option value={1}>Teacher</option>
                    <option value={2}>Student</option>
                    <option value={3}>Vice Principal</option>
                    <option value={4}>Principal</option>
                    {user.UserTypeID === 5 && <option value={5}>Admin</option>}
                  </select>
                </div>
              </div>
            )}
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
                  console.log(formData);
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
          onClick={() => {
            if(user.UserTypeID === 5)loadSchoolsList();
            else if (user.UserTypeID === 6)loadSchoolsList({schoolIds: user.schoolIds})
            else{
          loadSchoolsList({SchoolID: user.SchoolID})}
          }}
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
            setListSearch(searchInput(usersList, search));
            setFormData({
              FirstName: '',
              LastName: '',
              SchoolID: '',
              UserTypeID: '',
              Email: '',
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

UserFilter.propTypes = {
  loadSchoolsList: PropTypes.func.isRequired,
  schoolsList: PropTypes.array.isRequired,
  schoolListLoading: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  schoolsList: state.admin.schoolsList,
  schoolListLoading: state.admin.schoolListLoading,
  user: state.auth.user,
});

export default connect(mapStateToProps, { loadSchoolsList })(UserFilter);
