import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  updateSchedule,
  addSchedule,
  deleteSchedule,
  clearSchedule,
  loadUsersList,
  loadLocationsList,
} from "../../../actions/admin";
import Alert from "../../layouts/Alert";
import PropTypes from "prop-types";
import DatePicker from "../../layouts/CalendarPicker";
import moment from "moment";

const ScheduleForm = ({
  schedule,
  authUser,
  robotsList,
  locationsList,
  updateSchedule,
  addSchedule,
  deleteSchedule,
  clearSchedule,
  loadUsersList,
  loadLocationsList,
}) => {
  const hist = useHistory();
  const location = useLocation();
  const [startTime, setStartTime] = useState(null);
  const [formData, setFormData] = useState({
    ScheduleID:
      schedule === null
        ? ""
        : schedule.ScheduleID !== undefined
        ? schedule.ScheduleID
        : "",
    Robot:
      schedule === null
        ? {}
        : schedule.userID !== undefined
        ? schedule.userID
        : {},
    Location:
      schedule === null
        ? {}
        : schedule.location?.description !== undefined
        ? schedule.location?.description
        : {},
    Duration:
      schedule === null
        ? 0
        : schedule.duration !== undefined
        ? schedule.duration
        : 0,
    Announcement:
      schedule === null
        ? ""
        : schedule.announcement !== undefined
        ? schedule.announcement
        : "",
    StartTime:
      schedule === null
        ? ""
        : schedule.startTime !== undefined
        ? schedule.startTime
        : "",
  });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);
    if (location.pathname.includes("add")) {
      console.log("add");

      console.log("Test formData", formData);

      addSchedule(formData).then(() => {
        setFormData({
          ScheduleID: "",
          Robot: {},
          Location: {},
          Duration: 0,
          Announcement: "",
          StartTime: "",
        });
      });
    } else if (location.pathname.includes("edit")) {
      updateSchedule(ScheduleID, formData);
    }
    hist.push("/admin/schedule");
    clearSchedule();
  };

  useEffect(() => {
    if (schedule === null) return;
    setFormData({
      ScheduleID:
        schedule === null
          ? ""
          : schedule.scheduleID !== undefined
          ? schedule.scheduleID
          : "",
      Robot:
        schedule === null
          ? {}
          : schedule.userID !== undefined
          ? schedule.userID
          : {},
      Location:
        schedule === null
          ? {}
          : schedule.location?.description !== undefined
          ? schedule.location?.description
          : {},
      Duration:
        schedule === null
          ? 0
          : schedule.duration !== undefined
          ? schedule.duration
          : 0,
      Announcement:
        schedule === null
          ? ""
          : schedule.announcement !== undefined
          ? schedule.announcement
          : "",
      StartTime:
        schedule === null
          ? ""
          : schedule.startTime !== undefined
          ? schedule.startTime
          : "",
    });
  }, [schedule]);

  // On component load, load the robot list
  useEffect(() => {
    if (authUser) {
      loadUsersList({ roleID: 1 });
    }
  }, [authUser]);

  // Populate the location list on robot change
  useEffect(() => {
    if (formData.Robot !== null) {
      loadLocationsList({ userID: parseInt(formData.Robot) });
    }
  }, [formData.Robot]);

  // Set the start time
  useEffect(() => {
    if (formData.StartTime !== "") {
      setStartTime(moment(formData.StartTime));
    }
  }, [formData.StartTime]);

  if (schedule == null && location.pathname.includes("edit")) {
    hist.push("/admin/schedule");
  }

  const { ScheduleID, Robot, Announcement, Location, Duration } = formData;

  return (
    <div className="p-sm-5 p-2 w-100  dashboard-margin mx-lg-auto container">
      <div className="mb-3 ">
        <h6 className="txt-primary-light">
          {`${authUser.firstName} ${authUser.lastName}`} / Schedules / Schedule
        </h6>
        <div className="d-sm-flex  w-100 align-items-center justify-content-between">
          <div className="d-flex mb-2 mb-sm-0">
            <div
              className="admin-back mx-2  rounded-circle d-flex align-items-center justify-content-center txt-primary"
              onClick={() => {
                hist.goBack();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                className="bi bi-arrow-left-short"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
                />
              </svg>
            </div>
            <h4 className="m-0">
              {location.pathname.includes("add") ? "Add Schedule" : "Edit"}
            </h4>
          </div>
        </div>
      </div>
      <form
        className="card w-100 p-2 p-sm-3 p-lg-4 shadow-lg border-0  mb-2 "
        onSubmit={(e) => onSubmit(e)}
      >
        <Alert />

        {/* Select Robot */}
        <div className="mb-3">
          <div className="txt-primary">Selected Robot</div>
          <select
            disabled={location.pathname.includes("/edit") ? true : false}
            className="form-select form-control rounded "
            aria-label="Default select example"
            id="Robot"
            value={Robot}
            onChange={(e) => onChange(e)}
          >
            <option value={null}>Select a robot</option>
            {robotsList?.map((robot) => (
              <option key={robot.userID} value={robot.userID}>
                {robot.userName}
              </option>
            ))}
          </select>
        </div>

        {/* Select Location*/}
        <div className="mb-3">
          <div className="txt-primary">Selected Location</div>
          <select
            disabled={location.pathname.includes("/edit") ? true : false}
            className="form-select form-control rounded "
            aria-label="Default select example"
            id="Location"
            value={Location}
            onChange={(e) => onChange(e)}
          >
            <option value={null}>{location.pathname.includes("/edit") ? Location : "Select your location"}</option>
            {locationsList?.map((location) => (
              <option key={location.locationID} value={location.locationID}>
                {location.description}
              </option>
            ))}
          </select>
        </div>

        {/* Announcement */}
        <div className="mb-3">
          <div className="txt-primary">Announcement</div>
          <textarea
            type="text"
            className="form-control rounded"
            rows="4"
            cols="50"
            id="Announcement"
            placeholder="Enter the announcement here..."
            required
            value={Announcement}
            onChange={(e) => onChange(e)}
          />
        </div>

        {/* Select duration*/}
        <div className="mb-3">
          <div className="txt-primary">Select duration</div>
          <select
            disabled={location.pathname.includes("/edit") ? true : false}
            className="w-20 form-select form-control rounded"
            aria-label="Default select example"
            id="Duration"
            value={Duration}
            onChange={(e) => onChange(e)}
          >
            <option value={null}>Select duration</option>
            <option value={5}>5 minutes</option>
            <option value={10}>10 minutes</option>
            <option value={15}>15 minutes</option>
            <option value={20}>20 minutes</option>
            <option value={25}>25 minutes</option>
            <option value={30}>30 minutes</option>
            <option value={35}>35 minutes</option>
            <option value={40}>40 minutes</option>
            <option value={45}>45 minutes</option>
            <option value={50}>50 minutes</option>
            <option value={55}>55 minutes</option>
            <option value={60}>60 minutes</option>
          </select>
        </div>

        {/* Select date time */}
        <div className="mb-3">
          <div className="txt-primary">Select start time</div>
          <DatePicker
            defaultValue={formData.StartTime}
            editMode={location.pathname.includes("/edit") ? true : false}
            startTime={startTime}
            setStartTime={setStartTime}
            setFormData={setFormData}
          />
        </div>

        <div className="d-flex align-items-center justify-content-center">
          <button type="submit" className="button-primary btn-block btn px-5">
            Save
          </button>

          {/* Delete Button */}
          {/* Delete Module */}
          <div
            className="modal fade"
            id="deleteSchedule"
            aria-labelledby="deleteScheduleLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="deleteScheduleLabel">
                    Delete Schedule
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  Are you sure you want to delete schedule?
                  <br />
                  <br />
                  <b>
                    <span className="text-danger text-center">
                      Warning Deleting a schedule will result in deleting
                      everything related to it
                    </span>
                  </b>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn button-primary"
                    onClick={() => {
                      deleteSchedule(ScheduleID);
                      hist.push("/admin/schedule");
                      clearSchedule();
                    }}
                    data-bs-dismiss="modal"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
          {authUser.roleID === 5 && ScheduleID !== "" && (
            <div
              className="btn btn-danger d-flex align-items-center px-4 mx-3"
              data-bs-toggle="modal"
              data-bs-target="#deleteSchedule"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-trash-fill button-child"
                viewBox="0 0 16 16"
              >
                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
              </svg>
              Delete
            </div>
          )}
        </div>
      </form>
    </div>
  );
};
ScheduleForm.propTypes = {
  schedule: PropTypes.object,
  authUser: PropTypes.object.isRequired,
  robotsList: PropTypes.array,
  locationsList: PropTypes.array,
  updateSchedule: PropTypes.func.isRequired,
  deleteSchedule: PropTypes.func.isRequired,
  clearSchedule: PropTypes.func.isRequired,
  loadUsersList: PropTypes.func.isRequired,
  loadLocationsList: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  schedule: state.admin.schedule,
  authUser: state.auth.user,
  robotsList: state.admin.usersList,
  locationsList: state.admin.locationsList,
});

export default connect(mapStateToProps, {
  updateSchedule,
  addSchedule,
  deleteSchedule,
  clearSchedule,
  loadUsersList,
  loadLocationsList,
})(ScheduleForm);
