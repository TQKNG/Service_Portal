import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setSchedule } from "../../../actions/admin";
import Badge from "react-bootstrap/Badge";
import ToolTipComp from "../../layouts/ToolTip";
import moment from "moment";

const SchedulesListItem = ({ schedule, setSchedule }) => {
  const [edit, setEdit] = useState(false);
  const [show, setShow] = useState(false);
  const {
    scheduleID,
    userID,
    location,
    announcement,
    startTime,
    actualEndTime,
    duration,
    statusID,
  } = schedule;
  const hist = useHistory();
  return (
    <div className="admin-users-fields  d-flex align-items-center justify-content-around   p-2 border-bottom">
      {/* Schedule ID */}
      <div className="admin-schools-field text-truncate mx-auto">
        {scheduleID}
      </div>

      {/* Robot Name */}
      <div
        className="admin-schools-field  text-truncate mx-auto"
        onClick={() => {}}
        title={userID}
      >
        {userID ? userID : "N/A"}
      </div>

      {/* Location */}
      <div className="admin-large-field text-truncate mx-auto">
        {`Room ${location.description}`}
      </div>

      {/* Announcement */}
      <div className="admin-large-field text-truncate mx-auto">
        {announcement}
      </div>

      {/* Start Time */}
      <div className="admin-large-field text-truncate mx-auto">
        {moment(startTime).format("MMM Do YY, h:mm a")}
      </div>

      {/* Actual End Time */}
      <div className="admin-large-field text-truncate mx-auto">
        {actualEndTime}
      </div>

      {/* Duration */}
      <div className="admin-large-field text-truncate mx-auto">
        {`${duration} mins`}
      </div>

      {/* Status */}
      <div className="admin-large-field text-truncate mx-auto">
        {/* 1: New, 2: Deleted, 3: Cancelled, 4: Completed */}
        <Badge
          pill
          className="d-flex w-50 justify-content-center"
          bg={`${statusID === 1
            ? "warning"
            : statusID === 2
            ? "danger"
            : statusID === 3
            ? "info"
            : statusID === 4
            ? "success"
            : "N/A"}`}
        >
          {statusID === 1
            ? "New"
            : statusID === 2
            ? "Cancelled"
            : statusID === 3
            ? "Incompleted"
            : statusID === 4
            ? "Done"
            : "N/A"}
        </Badge>
      </div>

      {/* Action */}
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
                setSchedule(schedule);
                hist.push(`/admin/schedule/edit`);
              }}
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M3 17.46v3.04c0 .28.22.5.5.5h3.04c.13 0 .26-.05.35-.15L17.81 9.94l-3.75-3.75L3.15 17.1c-.1.1-.15.22-.15.36zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
            </svg>
          }
          type="Edit"
          module="Schedule"
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
                setSchedule(schedule);
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
          module="Schedule"
        /> */}
      </div>
    </div>
  );
};

SchedulesListItem.propTypes = {
  schedule: PropTypes.object.isRequired,
  setSchedule: PropTypes.func.isRequired,
};

export default connect(null, { setSchedule })(SchedulesListItem);
