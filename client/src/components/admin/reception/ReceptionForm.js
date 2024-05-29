import React, { useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  updateReception,
  addReception,
  deleteReception,
  clearReception,
} from "../../../actions/admin";
import Alert from "../../layouts/Alert";
import PropTypes from "prop-types";
import FileUpload from "../../layouts/FileUpload";

const ReceptionForm = ({
  reception,
  authUser,
  updateReception,
  addReception,
  deleteReception,
  clearReception,
}) => {
  const hist = useHistory();
  const location = useLocation();

  const [formData, setFormData] = useState({
    ReceptionID: reception === null ? "" : reception.visitID !== undefined ? reception.visitID : "",
    // Name: reception === null ? "" : reception.Name !== undefined ? reception.Name : "",
    // Lyrics: reception === null ? "" : reception.Lyrics !== undefined ? reception.Lyrics : "",
    // ReceptionData:
    //   reception === null ? "" : reception.ReceptionData !== undefined ? reception.ReceptionData : "",
    // ReceptionLogo:
    //   reception === null ? "" : reception.ReceptionLogo !== undefined ? reception.ReceptionLogo : "",
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

      addReception(formData).then(() => {
        setFormData({
        //   ReceptionID: "",
        //   Name: "",
        //   Lyrics: "",
        //   ReceptionData: "",
        //   ReceptionLogo: "",
        });
      });
    } else if (location.pathname.includes("edit")) {
    //   updateReception(ReceptionID, formData);
    }
    hist.push("/admin/reception");
    clearReception();
  };

  const { Name, Lyrics, ReceptionID } = formData;

  if (reception == null && location.pathname.includes("edit")) {
    hist.push("/admin/receptions");
  }

  return (
    <div className="p-sm-5 p-2 w-100  dashboard-margin mx-lg-auto container">
      <div className="mb-3 ">
        <h6 className="txt-primary-light">
          {`${authUser.firstName} ${authUser.lastName}`} / Receptions / Reception
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
              {location.pathname.includes("add") ? "Add Reception" : "Edit"}
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
          <div className="txt-primary">Reception ID</div>
          <input
            type="text"
            className="form-control rounded "
            id="ReceptionID"
            required
            value={ReceptionID}
            // onChange={(e) => onChange(e)}
            disabled
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
            id="deleteReception"
            aria-labelledby="deleteReceptionLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="deleteReceptionLabel">
                    Delete Reception
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  Are you sure you want to delete reception?
                  <br />
                  <br />
                  <b>
                    <span className="text-danger text-center">
                      Warning Deleting areception will result in deleting everything
                      related to it
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
                      deleteReception(ReceptionID);
                      hist.push("/admin/receptions");
                      clearReception();
                    }}
                    data-bs-dismiss="modal"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
          {authUser.roleID === 5 && ReceptionID !== "" && (
            <div
              className="btn btn-danger d-flex align-items-center px-4 mx-3"
              data-bs-toggle="modal"
              data-bs-target="#deleteReception"
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
ReceptionForm.propTypes = {
  reception: PropTypes.object,
  authUser: PropTypes.object.isRequired,
  updateReception: PropTypes.func.isRequired,
  deleteReception: PropTypes.func.isRequired,
  clearReception: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  reception: state.admin.reception,
  authUser: state.auth.user,
});

export default connect(mapStateToProps, {
  updateReception,
  addReception,
  deleteReception,
  clearReception,
})(ReceptionForm);
