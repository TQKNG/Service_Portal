import React, { useMemo, useState } from "react";
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
  const {isSwitchStatus, setIsSwitchStatus} = useState(null);
  const {
    visitID,
    firstName,
    lastName,
    Status,
    phoneNumber,
    signInDate,
    signOutDate,
    homeAreas,
    scheduledVisit,
    purpose,
    residentName,
    firstVisit,
    sicknessSymptom,
    acknowledgement,
    adminOffices,
  } = reception;

  const hist = useHistory();

  const visitStatus = useMemo(() => {
    if (signInDate && !signOutDate) {
      return 1;
    } else if (signInDate && signOutDate) {
      return 2;
    } else {
      return 0;
    }
  }, [signInDate, signOutDate]);

  return (
    <div className="admin-users-fields  d-flex align-items-center justify-content-around  p-2 border-bottom">
      {/* Full Name */}
      <div
        className="admin-visitor-field text-truncate"
        onClick={() => {
          setReception(reception);
          //   hist.push(`/admin/school/schoolId=${SchoolID}`);
        }}
        title={firstName + " " + lastName}
      >
        {firstName && lastName ? `${firstName} ${lastName}` : "N/A"}
      </div>

      {/* Phone Number */}
      <div className="admin-visitor-field  text-truncate ">
        {phoneNumber}
      </div>

      {/* Sign in Time */}
      <div className="admin-visitor-field text-truncate ">
        {signInDate && moment(signInDate).format("MMMM Do, YYYY h:mm A")}
      </div>

      {/* Sign out Time */}
      <div className="admin-visitor-field text-truncate ">
        {signOutDate && moment(signOutDate).format("MMMM Do, YYYY h:mm A")}
      </div>

      {/* Home Area */}
      <div className="admin-visitor-field text-truncate">{homeAreas}</div>

      {/* Scheduled Visit */}
      <div className="admin-visitor-field text-truncate text-center">
        {scheduledVisit ? "Yes" : "No"}
      </div>

      {/* Purpose */}
      <div className="admin-visitor-field text-truncate ">{purpose}</div>

      {/* Resident Name */}
      <div className="admin-visitor-field text-truncate text-center">{residentName}</div>

      {/* First Visit */}
      <div className="admin-visitor-field text-truncate text-center">{firstVisit?"Yes" : "No"}</div>

      {/* Sickness Symptom */}
      <div className="admin-visitor-field text-truncate text-center">{sicknessSymptom?"Yes" : "No"}</div>

      {/* Admin Offices */}
      <div className="admin-visitor-field text-truncate ">{adminOffices}</div>

      {/* Acknowledgement */}
      <div className="admin-visitor-field text-truncate text-center">{acknowledgement?"Yes" : "No"}</div>

      {/* Status */}
      <div
       className="admin-visitor-field text-truncate text-center"
       >
        <Badge
          pill
          className="d-flex justify-content-center align-items-center"
          bg={`${
            visitStatus === 1
              ? "warning"
              : visitStatus === 2
              ? "success"
              : ""
          }`}
        >
          {visitStatus === 1
            ? "Sign In"
            : visitStatus === 2
            ? "Sign Out"
            : ""}
        </Badge>
      </div>

      {/* Edit */}
      <div className="admin-visitor-field  text-truncate text-center">
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
                  setReception(reception, visitStatus);
                  hist.push('/admin/reception/edit');
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
