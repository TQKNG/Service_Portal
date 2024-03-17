import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { clearItems } from "../../actions/admin";
import { useHistory, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

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
      users: location.pathname.includes("/admin/user"),
      schools: location.pathname.includes("/admin/school"),
      assessments: location.pathname.includes("/admin/assessment"),
      dashboard: location.pathname.includes("/admin/dashboard"),
      results: location.pathname.includes("/admin/result"),
      classrooms: location.pathname.includes("/admin/classroom"),
    });
  }, [location.pathname]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState({
    users: location.pathname.includes("/admin/user"),
    schools: location.pathname.includes("/admin/school"),
    assessments: location.pathname.includes("/admin/assessment"),
    dashboard: location.pathname.includes("/admin/dashboard"),
    results: location.pathname.includes("/admin/result"),
    classrooms: location.pathname.includes("/admin/classroom"),
  });
  return (
    <div className=" shadow-lg h-100  sidebar position-fixed bg-white ">
      <div
        className="back"
        onClick={() => {
          setOpen(!open);
        }}
      >
        <div className="sidebar-icon text-center  py-3">
          {!open ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="#18a587"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              enableBackground="new 0 0 24 24"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="#18a587"
            >
              <path d="M0,0h24v24H0V0z" fill="none" />
              <path d="M3,18h13v-2H3V18z M3,13h10v-2H3V13z M3,6v2h13V6H3z M21,15.59L17.42,12L21,8.41L19.59,7l-5,5l5,5L21,15.59z" />
            </svg>
          )}
        </div>
      </div>
      {dashboard && (
        <div
          className={`d-flex ${
            selected.dashboard ? "sidebar-item-selected" : ""
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
            history.push("/admin/dashboard");
            clearItems();
          }}
        >
          <div className="sidebar-icon text-center  py-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="26"
              viewBox="0 -960 960 960"
              width="26"
              fill="currentColor"
            >
              <path d="M80-120v-80h800v80H80Zm40-120v-280h120v280H120Zm200 0v-480h120v480H320Zm200 0v-360h120v360H520Zm200 0v-600h120v600H720Z" />
            </svg>
          </div>
          <div
            className={`sidebar-description  ${!open ? "d-none" : " py-2"}`}
            onClick={() => {
              history.push("/admin/dashboard");
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
            selected.schools ? "sidebar-item-selected" : ""
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
            history.push("/admin/schools");
            clearItems();
          }}
        >
          <div className="sidebar-icon text-center  py-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -960 960 960"
              height="26"
              width="26"
              fill="currentColor"
            >
              <path d="m234-480-12-60q-12-5-22.5-10.5T178-564l-58 18-40-68 46-40q-2-13-2-26t2-26l-46-40 40-68 58 18q11-8 21.5-13.5T222-820l12-60h80l12 60q12 5 22.5 10.5T370-796l58-18 40 68-46 40q2 13 2 26t-2 26l46 40-40 68-58-18q-11 8-21.5 13.5T326-540l-12 60h-80Zm40-120q33 0 56.5-23.5T354-680q0-33-23.5-56.5T274-760q-33 0-56.5 23.5T194-680q0 33 23.5 56.5T274-600ZM592-40l-18-84q-17-6-31.5-14.5T514-158l-80 26-56-96 64-56q-2-18-2-36t2-36l-64-56 56-96 80 26q14-11 28.5-19.5T574-516l18-84h112l18 84q17 6 31.5 14.5T782-482l80-26 56 96-64 56q2 18 2 36t-2 36l64 56-56 96-80-26q-14 11-28.5 19.5T722-124l-18 84H592Zm56-160q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Z" />
            </svg>
          </div>
          <div className={`sidebar-description  ${!open ? "d-none" : " py-2"}`}>
            Configuration
          </div>
        </div>
      )}
      {users && (
        <div
          className={`d-flex ${
            selected.users ? "sidebar-item-selected" : ""
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
            history.push("/admin/users");
            clearItems();
          }}
        >
          <div className="sidebar-icon text-center  py-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="26"
              viewBox="0 -960 960 960"
              width="26"
              fill="currentColor"
            >
              <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" />
            </svg>
          </div>
          <div className={`sidebar-description  ${!open ? "d-none" : " py-2"}`}>
            Users
          </div>
        </div>
      )}

      {classrooms && (
        <div
          className={`d-flex ${
            selected.classrooms ? "sidebar-item-selected" : ""
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
            history.push("/admin/classrooms");
            clearItems();
          }}
        >
          <div className="sidebar-icon text-center  py-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="26"
              viewBox="0 -960 960 960"
              width="26"
              fill="currentColor"
            >
              <path d="M400-240q50 0 85-35t35-85v-280h120v-80H460v256q-14-8-29-12t-31-4q-50 0-85 35t-35 85q0 50 35 85t85 35Zm80 160q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
            </svg>
          </div>
          <div
            className={`sidebar-description  ${!open ? "d-none" : " py-2"}`}
            onClick={() => {
              history.push("/admin/classrooms");
              clearItems();
            }}
          >
            Songs
          </div>
        </div>
      )}

      {assessments && (
        <div
          className={`d-flex ${
            selected.assessments ? "sidebar-item-selected" : ""
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
            history.push("/admin/assessments");
            clearItems();
          }}
        >
          <div className="sidebar-icon text-center  py-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="26"
              viewBox="0 -960 960 960"
              width="26"
              fill="currentColor"
            >
              <path d="M480-160q-48-38-104-59t-116-21q-42 0-82.5 11T100-198q-21 11-40.5-1T40-234v-482q0-11 5.5-21T62-752q46-24 96-36t102-12q58 0 113.5 15T480-740v484q51-32 107-48t113-16q36 0 70.5 6t69.5 18v-480q15 5 29.5 10.5T898-752q11 5 16.5 15t5.5 21v482q0 23-19.5 35t-40.5 1q-37-20-77.5-31T700-240q-60 0-116 21t-104 59Zm80-200v-380l200-200v400L560-360Zm-160 65v-396q-33-14-68.5-21.5T260-720q-37 0-72 7t-68 21v397q35-13 69.5-19t70.5-6q36 0 70.5 6t69.5 19Zm0 0v-396 396Z" />
            </svg>
          </div>
          <div
            className={`sidebar-description  ${!open ? "d-none" : " py-2"}`}
            onClick={() => {
              history.push("/admin/assessments");
              clearItems();
            }}
          >
            Books
          </div>
        </div>
      )}

      {schools && (
        <div
          className={`d-flex ${
            selected.results ? "sidebar-item-selected" : ""
          } sidebar-row`}
          onClick={() => {
            setSelected({
              users: false,
              schools: false,
              assessments: false,
              dashboard: false,
              results: false,
              classrooms: false,
            });
            history.push("/admin/result");
            clearItems();
          }}
        >
          <div className="sidebar-icon text-center  py-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="26"
              viewBox="0 -960 960 960"
              width="26"
              fillColor="currentColor"
            >
              <path d="M560-360q17 0 29.5-12.5T602-402q0-17-12.5-29.5T560-444q-17 0-29.5 12.5T518-402q0 17 12.5 29.5T560-360Zm-30-128h60q0-29 6-42.5t28-35.5q30-30 40-48.5t10-43.5q0-45-31.5-73.5T560-760q-41 0-71.5 23T446-676l54 22q9-25 24.5-37.5T560-704q24 0 39 13.5t15 36.5q0 14-8 26.5T578-596q-33 29-40.5 45.5T530-488ZM320-240q-33 0-56.5-23.5T240-320v-480q0-33 23.5-56.5T320-880h480q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H320Zm0-80h480v-480H320v480ZM160-80q-33 0-56.5-23.5T80-160v-560h80v560h560v80H160Zm160-720v480-480Z" />
            </svg>
          </div>
          <div
            className={`sidebar-description  ${!open ? "d-none" : " py-2"}`}
            onClick={() => {
              history.push("/admin/result");
              clearItems();
            }}
          >
            Trivia
          </div>
        </div>
      )}

        <div
          className={`d-flex  ? "sidebar-item-selected" : ""
          } sidebar-row`}
          onClick={() => {
            // setSelected({
            //   users: false,
            //   schools: false,
            //   assessments: false,
            //   dashboard: false,
            //   results: true,
            //   classrooms: false,
            // });
            // history.push("/admin/result");
            // clearItems();
          }}
        >
          <div className="sidebar-icon text-center  py-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="26"
              viewBox="0 -960 960 960"
              width="26"
              fill="currentColor"
            >
              <path d="M480-40q-149 0-254.5-42.5T120-200q0-32 20-57.5t56-45.5l65 58q-24 8-42.5 20.5T200-200q0 26 81 53t199 27q118 0 199-27t81-53q0-12-18.5-24.5T699-245l65-58q36 20 56 45.5t20 57.5q0 75-105.5 117.5T480-40Zm0-160q-22 0-42.5-7.5T400-230L148-453q-13-11-20.5-27t-7.5-33v-80q0-17 6.5-33t19.5-27l252-235q17-16 38-24t44-8q23 0 44 8t38 24l252 235q13 11 19.5 27t6.5 33v80q0 17-7.5 33T812-453L560-230q-17 15-37.5 22.5T480-200Zm-4-188q14 0 26.5-4.5T526-407l222-197-240-226q-7-5-14-7.5t-15-2.5q-8 0-15 2.5t-12 7.5L208-600l218 193q11 10 23.5 14.5T476-388ZM360-550q21 0 35.5-14.5T410-600q0-21-14.5-35.5T360-650q-21 0-35.5 14.5T310-600q0 21 14.5 35.5T360-550Zm50 54q43 21 90.5 13.5T584-522q34-29 44.5-73T618-678L410-496Zm70-174q21 0 35.5-14.5T530-720q0-21-14.5-35.5T480-770q-21 0-35.5 14.5T430-720q0 21 14.5 35.5T480-670Zm-2 56Z" />
            </svg>
          </div>
          <div
            className={`sidebar-description  ${!open ? "d-none" : " py-2"}`}
            onClick={() => {
              // history.push("/admin/result");
              // clearItems();
            }}
          >
            Jokes
          </div>
        </div>
    </div>
  );
};

Sidebar.propTypes = {
  clearItems: PropTypes.func.isRequired,
};

export default connect(null, { clearItems })(Sidebar);
