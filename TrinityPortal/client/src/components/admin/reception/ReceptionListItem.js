import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Badge from "react-bootstrap/Badge";
import { setReception } from "../../../actions/admin";
import ToolTipComp from "../../layouts/ToolTip";
import moment from "moment";

const ReceptionsListItem = ({ reception, setReception }) => {
  const [edit, setEdit] = useState(false);
  const [show, setShow] = useState(false);
  const { InOutID, DateTime, FullName, ClockIn, ClockOut, Status } = reception;
  const hist = useHistory();
  return (
    <div className="admin-users-fields  d-flex align-items-center justify-content-around  p-2 border-bottom">
      {/* Full Name */}
      <div
        className="admin-large-field  text-truncate  mx-auto"
        onClick={() => {
          setReception(reception);
          //   hist.push(`/admin/school/schoolId=${SchoolID}`);
        }}
        title={FullName}
      >
        {FullName ? FullName : "N/A"}
      </div>

      {/* Phone Number */}
      <div className="admin-large-field text-truncate  mx-auto">Phone number</div>

      {/* Sign in Time */}
      <div className="admin-schools-field text-truncate  mx-auto">
        {ClockIn && moment(ClockIn).format("HH:mm:ss")}
      </div>

      {/* Sign out Time */}
      <div className="admin-schools-field text-truncate  mx-auto">
        {ClockOut && moment(ClockOut).format("HH:mm:ss")}
      </div>

      {/* Home Area */}
      <div className="admin-schools-field text-truncate ">Admin Office</div>

      {/* Scheduled Visit */}
      <div className="admin-schools-field text-truncate ">Yes</div>

      {/* Purpose */}
      <div className="admin-schools-field text-truncate  mx-auto">Purpose</div>

      {/* Resident Name */}
      <div className="admin-schools-field text-truncate  mx-auto">John Doe</div>

      {/* First Visit */}
      <div className="admin-schools-field text-truncate  mx-auto">Yes</div>

      {/* Sickness Symptom */}
      <div className="admin-schools-field text-truncate  mx-auto">Yes</div>

      {/* Acknowledgement */}
      <div className="admin-schools-field text-truncate  mx-auto">Yes</div>

      {/* Status */}
      <div className="admin-schools-field text-truncate  mx-auto">
        <Badge
          pill
          className="w-30"
          bg={`${
            Status === 0
              ? "secondary"
              : Status === 1
              ? "warning"
              : Status === 2
              ? "warning"
              : Status === 3
              ? "success"
              : ""
          }`}
        >
          {Status === 0
            ? "N/A"
            : Status === 1
            ? "In"
            : Status === 2
            ? "Progress"
            : Status === 3
            ? "Out"
            : ""}
        </Badge>
      </div>

      {/* Edit */}
      <div className="admin-schools-field  text-truncate mx-auto">
        <ToolTipComp
          myButton={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill={edit ? "#18a587" : "#505050"}
              onMouseEnter={() => {
                setEdit(true);
              }}
              onMouseLeave={() => {
                setEdit(false);
              }}
              className="cursor-pointer"
              onClick={() => {
                //   setSchool(school);
                //   hist.push('/admin/school/edit');
              }}
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M3 17.46v3.04c0 .28.22.5.5.5h3.04c.13 0 .26-.05.35-.15L17.81 9.94l-3.75-3.75L3.15 17.1c-.1.1-.15.22-.15.36zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
            </svg>
          }
          type="Edit"
          module="Reception"
        />

        {/* <ToolTipComp
          myButton={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              enable-background="new 0 0 24 24"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              className="mx-3 cursor-pointer"
              fill={show ? "#18a587" : "#505050"}
              onMouseEnter={() => {
                setShow(true);
              }}
              onMouseLeave={() => {
                setShow(false);
              }}
              onClick={() => {
                setReception(reception);
                //   hist.push(`/admin/school/schoolId=${SchoolID}`);
              }}
            >
              <g>
                <path d="M0,0h24v24H0V0z" fill="none" />
              </g>
              <g>
                <g>
                  <path d="M15,3H5C3.9,3,3.01,3.9,3.01,5L3,19c0,1.1,0.89,2,1.99,2H19c1.1,0,2-0.9,2-2V9L15,3z M5,19V5h9v5h5v9H5z M9,8 c0,0.55-0.45,1-1,1S7,8.55,7,8s0.45-1,1-1S9,7.45,9,8z M9,12c0,0.55-0.45,1-1,1s-1-0.45-1-1s0.45-1,1-1S9,11.45,9,12z M9,16 c0,0.55-0.45,1-1,1s-1-0.45-1-1s0.45-1,1-1S9,15.45,9,16z" />
                </g>
              </g>
            </svg>
          }
          type="Show"
          module="Reception"
        /> */}
      </div>
    </div>
  );
};

ReceptionsListItem.propTypes = {
  reception: PropTypes.object.isRequired,
  setReception: PropTypes.func.isRequired,
};

export default connect(null, { setReception })(ReceptionsListItem);
