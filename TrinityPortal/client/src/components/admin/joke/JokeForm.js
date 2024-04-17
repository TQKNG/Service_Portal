import React, { useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  updateJoke,
  addJoke,
  deleteJoke,
  clearJoke,
} from "../../../actions/admin";
import Alert from "../../layouts/Alert";
import PropTypes from "prop-types";
import FileUpload from "../../layouts/FileUpload";

const JokeForm = ({
  joke,
  authUser,
  updateJoke,
  addJoke,
  deleteJoke,
  clearJoke,
}) => {
  const hist = useHistory();
  const location = useLocation();

  const [formData, setFormData] = useState({
    JokeID: joke === null ? "" : joke.JokeID !== undefined ? joke.JokeID : "",
    Name: joke === null ? "" : joke.Name !== undefined ? joke.Name : "",
    JokeText:
      joke === null ? "" : joke.JokeText !== undefined ? joke.JokeText : "",
    JokeData:
      joke === null ? "" : joke.JokeData !== undefined ? joke.JokeData : "",
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

      addJoke(formData).then(() => {
        setFormData({
          JokeID: "",
          Name: "",
          JokeText: "",
          JokeData: "",
        });
      });
    } else if (location.pathname.includes("edit")) {
      console.log("edit");
      updateJoke(JokeID, formData);
      hist.push("/admin/jokes");
      clearJoke();
    }
  };

  const { JokeID, Name, JJokeData, JokeText } = formData;

  if (joke == null && location.pathname.includes("edit")) {
    hist.push("/admin/jokes");
  }

  return (
    <div className="p-sm-5 p-2 w-100  dashboard-margin mx-lg-auto container">
      <div className="mb-3 ">
        <h6 className="txt-primary-light">Admin / Jokes / Joke</h6>
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
              {location.pathname.includes("add") ? "Add Joke" : "Edit"}
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
        <div className="mb-3">
          <div className="txt-primary">Joke Text</div>
          <textarea
            type="text"
            className="form-control rounded"
            rows="4"
            cols="50"
            id="JokeText"
            placeholder="Enter Joke Text..."
            required
            value={JokeText}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="mb-3">
          <div className="d-flex flex-column gap-2 mb-2">
            <div className="txt-primary">Joke File</div>
            {/* Display of the audio */}
            {/* Display of the image */}
            {formData.JokeData !== "" && (
              <img
                src={formData.JokeData}
                className="mb-3"
                alt=""
                srcset=""
                width="200px"
              />
            )}
          </div>

          <FileUpload
            instructionText={
              "Drag and drop joke file here, or click to browse joke"
            }
            imgSrc={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="50"
                viewBox="0 -960 960 960"
                width="50"
                fill="#1ba587"
              >
                <path d="M480-40q-149 0-254.5-42.5T120-200q0-32 20-57.5t56-45.5l65 58q-24 8-42.5 20.5T200-200q0 26 81 53t199 27q118 0 199-27t81-53q0-12-18.5-24.5T699-245l65-58q36 20 56 45.5t20 57.5q0 75-105.5 117.5T480-40Zm0-160q-22 0-42.5-7.5T400-230L148-453q-13-11-20.5-27t-7.5-33v-80q0-17 6.5-33t19.5-27l252-235q17-16 38-24t44-8q23 0 44 8t38 24l252 235q13 11 19.5 27t6.5 33v80q0 17-7.5 33T812-453L560-230q-17 15-37.5 22.5T480-200Zm-4-188q14 0 26.5-4.5T526-407l222-197-240-226q-7-5-14-7.5t-15-2.5q-8 0-15 2.5t-12 7.5L208-600l218 193q11 10 23.5 14.5T476-388ZM360-550q21 0 35.5-14.5T410-600q0-21-14.5-35.5T360-650q-21 0-35.5 14.5T310-600q0 21 14.5 35.5T360-550Zm50 54q43 21 90.5 13.5T584-522q34-29 44.5-73T618-678L410-496Zm70-174q21 0 35.5-14.5T530-720q0-21-14.5-35.5T480-770q-21 0-35.5 14.5T430-720q0 21 14.5 35.5T480-670Zm-2 56Z" />
              </svg>
            }
            module={"joke"}
            setFormData={setFormData}
            formData={formData}
            fieldType={"image"}
          />
        </div>

        {location.pathname.includes("edit") && (
          <div className="mb-3">
            <div className="txt-primary">JokeID</div>
            <input
              disabled
              type="text"
              className="form-control rounded "
              id="JokeID"
              placeholder="Enterjoke ID..."
              value={JokeID}
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
            id="deleteJoke"
            aria-labelledby="deleteJokeLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="deleteJokeLabel">
                    Delete Joke
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  Are you sure you want to delete joke?
                  <br />
                  <br />
                  <b>
                    <span className="text-danger text-center">
                      Warning Deleting a joke will result in deleting everything
                      related to it.
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
                      deleteJoke(JokeID);
                      hist.push("/admin/jokes");
                      clearJoke();
                    }}
                    data-bs-dismiss="modal"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
          {authUser.UserTypeID === 5 && JokeID !== "" && (
            <div
              className="btn btn-danger d-flex align-items-center px-4 mx-3"
              data-bs-toggle="modal"
              data-bs-target="#deleteJoke"
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
JokeForm.propTypes = {
  joke: PropTypes.object,
  authUser: PropTypes.object.isRequired,
  updateJoke: PropTypes.func.isRequired,
  deleteJoke: PropTypes.func.isRequired,
  clearJoke: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  joke: state.admin.joke,
  authUser: state.auth.user,
});

export default connect(mapStateToProps, {
  updateJoke,
  addJoke,
  deleteJoke,
  clearJoke,
})(JokeForm);
