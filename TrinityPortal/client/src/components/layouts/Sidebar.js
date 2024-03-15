import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { clearItems } from '../../actions/admin';
import { useHistory, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

const Sidebar = ({
  users,
  schools,
  assessments,
  dashboard,
  results,
  clearItems,
  classrooms,
}) => {
  const history = useHistory();
  const location = useLocation();
  useEffect(() => {
    setSelected({
      users: location.pathname.includes('/admin/user'),
      schools: location.pathname.includes('/admin/school'),
      assessments: location.pathname.includes('/admin/assessment'),
      dashboard: location.pathname.includes('/admin/dashboard'),
      results: location.pathname.includes('/admin/result'),
      classrooms: location.pathname.includes('/admin/classroom'),
    });
  }, [location.pathname]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState({
    users: location.pathname.includes('/admin/user'),
    schools: location.pathname.includes('/admin/school'),
    assessments: location.pathname.includes('/admin/assessment'),
    dashboard: location.pathname.includes('/admin/dashboard'),
    results: location.pathname.includes('/admin/result'),
    classrooms: location.pathname.includes('/admin/classroom'),
  });
  return (
    <div className=' shadow-lg h-100  sidebar position-fixed bg-white '>
      <div
        className='back'
        onClick={() => {
          setOpen(!open);
        }}
      >
        <div className='sidebar-icon text-center  py-3'>
          {!open ? (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              height='24px'
              viewBox='0 0 24 24'
              width='24px'
              fill='#18a587'
            >
              <path d='M0 0h24v24H0V0z' fill='none' />
              <path d='M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z' />
            </svg>
          ) : (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              enableBackground='new 0 0 24 24'
              height='24px'
              viewBox='0 0 24 24'
              width='24px'
              fill='#18a587'
            >
              <path d='M0,0h24v24H0V0z' fill='none' />
              <path d='M3,18h13v-2H3V18z M3,13h10v-2H3V13z M3,6v2h13V6H3z M21,15.59L17.42,12L21,8.41L19.59,7l-5,5l5,5L21,15.59z' />
            </svg>
          )}
        </div>
      </div>
      {dashboard && (
        <div
          className={`d-flex ${
            selected.dashboard ? 'sidebar-item-selected' : ''
          } sidebar-row`}
          onClick={() => {
            setSelected({
              users: false,
              schools: false,
              assessments: false,
              dashboard: true,
              results: false,
              classrooms: false,
            });
            history.push('/admin/dashboard');
            clearItems();
          }}
        >
          <div className='sidebar-icon text-center  py-2'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              height='24px'
              viewBox='0 0 24 24'
              width='24px'
              fill='#000000'
            >
              <path d='M0 0h24v24H0V0z' fill='none' />
              <path d='M19 5v2h-4V5h4M9 5v6H5V5h4m10 8v6h-4v-6h4M9 17v2H5v-2h4M21 3h-8v6h8V3zM11 3H3v10h8V3zm10 8h-8v10h8V11zm-10 4H3v6h8v-6z' />
            </svg>
          </div>
          <div
            className={`sidebar-description  ${!open ? 'd-none' : ' py-2'}`}
            onClick={() => {
              history.push('/admin/dashboard');
              clearItems();
            }}
          >
            Dashboard
          </div>
        </div>
      )}
      {schools && (
        <div
          className={`d-flex ${
            selected.schools ? 'sidebar-item-selected' : ''
          } sidebar-row`}
          onClick={() => {
            setSelected({
              users: false,
              schools: true,
              assessments: false,
              dashboard: false,
              results: false,
              classrooms: false,
            });
            history.push('/admin/schools');
            clearItems();
          }}
        >
          <div className='sidebar-icon text-center  py-2'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              height='24px'
              viewBox='0 0 24 24'
              width='24px'
              fill={selected.schools ? '#18a587' : '#000000'}
            >
              <path d='M0 0h24v24H0V0z' fill='none' />
              <path d='M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z' />
            </svg>
          </div>
          <div className={`sidebar-description  ${!open ? 'd-none' : ' py-2'}`}>
            Schools
          </div>
        </div>
      )}
      {users && (
        <div
          className={`d-flex ${
            selected.users ? 'sidebar-item-selected' : ''
          } sidebar-row`}
          onClick={() => {
            setSelected({
              users: true,
              schools: false,
              assessments: false,
              dashboard: false,
              results: false,
              classrooms: false,
            });
            history.push('/admin/users');
            clearItems();
          }}
        >
          <div className='sidebar-icon text-center  py-2'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24px'
              height='24px'
              fill='currentColor'
              className='bi bi-people'
              viewBox='0 0 16 16'
            >
              <path d='M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z' />
            </svg>
          </div>
          <div className={`sidebar-description  ${!open ? 'd-none' : ' py-2'}`}>
            Users
          </div>
        </div>
      )}

      {classrooms && (
        <div
          className={`d-flex ${
            selected.classrooms ? 'sidebar-item-selected' : ''
          } sidebar-row`}
          onClick={() => {
            setSelected({
              users: false,
              schools: false,
              assessments: false,
              dashboard: false,
              results: false,
              classrooms: true,
            });
            history.push('/admin/classrooms');
            clearItems();
          }}
        >
          <div className='sidebar-icon text-center  py-2'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              fill='currentColor'
              class='bi bi-door-closed'
              viewBox='0 0 16 16'
            >
              <path d='M3 2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v13h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V2zm1 13h8V2H4v13z' />
              <path d='M9 9a1 1 0 1 0 2 0 1 1 0 0 0-2 0z' />
            </svg>
          </div>
          <div
            className={`sidebar-description  ${!open ? 'd-none' : ' py-2'}`}
            onClick={() => {
              history.push('/admin/classrooms');
              clearItems();
            }}
          >
            Classrooms
          </div>
        </div>
      )}

      {assessments && (
        <div
          className={`d-flex ${
            selected.assessments ? 'sidebar-item-selected' : ''
          } sidebar-row`}
          onClick={() => {
            setSelected({
              users: false,
              schools: false,
              assessments: true,
              dashboard: false,
              results: false,
              classrooms: false,
            });
            history.push('/admin/assessments');
            clearItems();
          }}
        >
          <div className='sidebar-icon text-center  py-2'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              height='24px'
              viewBox='0 0 24 24'
              width='24px'
              fill={selected.assessments ? '#18a587' : '#000000'}
            >
              <path d='M0 0h24v24H0V0z' fill='none' />
              <path d='M7 15h7v2H7zm0-4h10v2H7zm0-4h10v2H7zm12-4h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-.14 0-.27.01-.4.04-.39.08-.74.28-1.01.55-.18.18-.33.4-.43.64-.1.23-.16.49-.16.77v14c0 .27.06.54.16.78s.25.45.43.64c.27.27.62.47 1.01.55.13.02.26.03.4.03h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7-.25c.41 0 .75.34.75.75s-.34.75-.75.75-.75-.34-.75-.75.34-.75.75-.75zM19 19H5V5h14v14z' />
            </svg>
          </div>
          <div
            className={`sidebar-description  ${!open ? 'd-none' : ' py-2'}`}
            onClick={() => {
              history.push('/admin/assessments');
              clearItems();
            }}
          >
            Assessments
          </div>
        </div>
      )}

      {results && (
        <div
          className={`d-flex ${
            selected.results ? 'sidebar-item-selected' : ''
          } sidebar-row`}
          onClick={() => {
            setSelected({
              users: false,
              schools: false,
              assessments: false,
              dashboard: false,
              results: true,
              classrooms: false,
            });
            history.push('/admin/result');
            clearItems();
          }}
        >
          <div className='sidebar-icon text-center  py-2'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              fill='currentColor'
              class='bi bi-bar-chart'
              viewBox='0 0 16 16'
            >
              <path d='M4 11H2v3h2v-3zm5-4H7v7h2V7zm5-5v12h-2V2h2zm-2-1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1h-2zM6 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm-5 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3z' />
            </svg>
          </div>
          <div
            className={`sidebar-description  ${!open ? 'd-none' : ' py-2'}`}
            onClick={() => {
              history.push('/admin/result');
              clearItems();
            }}
          >
            Results
          </div>
        </div>
      )}
    </div>
  );
};

Sidebar.propTypes = {
  clearItems: PropTypes.func.isRequired,
};

export default connect(null, { clearItems })(Sidebar);
