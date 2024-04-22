import React, { useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  updateSchool,
  addSchool,
  deleteSchool,
  clearSchool,
} from "../../../actions/admin";
import Alert from "../../layouts/Alert";
import PropTypes from "prop-types";

const SchoolForm = ({
  school,
  authUser,
  updateSchool,
  addSchool,
  deleteSchool,
  clearSchool,
}) => {
  const hist = useHistory();
  const location = useLocation();

  const [formData, setFormData] = useState({
    SchoolID:
      school === null
        ? ""
        : school.SchoolID !== undefined
        ? school.SchoolID
        : "",
    Name: school === null ? "" : school.Name !== undefined ? school.Name : "",
  });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);
    if (location.pathname.includes("add")) {
      console.log("add");
      addSchool(formData).then(() => {
        setFormData({ SchoolID: "", Name: "" });
      });
    } else if (location.pathname.includes("edit")) {
      console.log("edit");
      updateSchool(SchoolID, formData);
      hist.push("/admin/schools");
      clearSchool();
    }
  };

  const { Name, SchoolID } = formData;

  if (school == null && location.pathname.includes("edit")) {
    hist.push("/admin/schools");
  }

  return (
    <div className="p-sm-5 p-2 w-100  dashboard-margin mx-lg-auto container">
      <div className="mb-3 ">
        <h6 className="txt-primary-light">Admin / Schools / School</h6>
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
              {location.pathname.includes("add") ? "Add School" : "Edit"}
            </h4>
          </div>
        </div>
      </div>
      <form
        className="card w-100 p-2 p-sm-3 p-lg-4 shadow-lg border-0  mb-2 "
        onSubmit={(e) => onSubmit(e)}
      >
        <Alert />
        <div className="mb-3">
          <div className="txt-primary">Name</div>
          <input
            type="text"
            className="form-control rounded "
            id="Name"
            placeholder="Enter Name..."
            required
            value={Name}
            onChange={(e) => onChange(e)}
          />
        </div>

        {location.pathname.includes("edit") && (
          <div className="mb-3">
            <div className="txt-primary">SchoolID</div>
            <input
              disabled
              type="text"
              className="form-control rounded "
              id="SchoolID"
              placeholder="Enter school ID..."
              value={SchoolID}
            />
          </div>
        )}

        <div className="d-flex align-items-center justify-content-center">
          <button type="submit" className="button-primary btn-block btn px-5">
            Save
          </button>

          {/* Delete Button */}
          {/* Delete Module */}
          <div
            className="modal fade"
            id="deleteSchool"
            aria-labelledby="deleteSchoolLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="deleteSchoolLabel">
                    Delete School
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  Are you sure you want to delete school?
                  <br />
                  <br />
                  <b>
                    <span className="text-danger text-center">
                      Warning Deleting a school will result in deleting
                      everything related to it such a users and assessments
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
                      deleteSchool(SchoolID);
                      hist.push("/admin/schools");
                      clearSchool();
                    }}
                    data-bs-dismiss="modal"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
          {authUser.UserTypeID === 5 && SchoolID !== "" && (
            <div
              className="btn btn-danger d-flex align-items-center px-4 mx-3"
              data-bs-toggle="modal"
              data-bs-target="#deleteSchool"
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
SchoolForm.propTypes = {
  school: PropTypes.object,
  authUser: PropTypes.object.isRequired,
  updateSchool: PropTypes.func.isRequired,
  deleteSchool: PropTypes.func.isRequired,
  clearSchool: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  school: state.admin.school,
  authUser: state.auth.user,
});

export default connect(mapStateToProps, {
  updateSchool,
  addSchool,
  deleteSchool,
  clearSchool,
})(SchoolForm);
