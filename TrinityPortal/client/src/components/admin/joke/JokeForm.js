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
    Lyrics: joke === null ? "" : joke.Lyrics !== undefined ? joke.Lyrics : "",
    JokeData:
      joke === null ? "" : joke.JokeData !== undefined ? joke.JokeData : "",
    JokeLogo:
      joke === null ? "" : joke.JokeLogo !== undefined ? joke.JokeLogo : "",
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
          JokePath: "",
        });
      });
    } else if (location.pathname.includes("edit")) {
      console.log("edit");
      updateJoke(JokeID, formData);
      hist.push("/admin/jokes");
      clearJoke();
    }
  };

  const {JokeID, Name, JokePath, JokeText } = formData;

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
            id="Lyrics"
            placeholder="Enter Lyrics..."
            required
            value={JokeText}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="mb-3">
          <div className="d-flex align-items-center gap-2">
            <div className="txt-primary">Joke File</div>
            {/* Display of the audio */}
            {formData.JokeData !== "" && (
              <audio controls >
                <source
                  src={formData.JokeData}
                  type="audio/mpeg"
                />
                Your browser does not support the audio element.
              </audio>
            )}
          </div>

          <FileUpload
            instructionText={
              "Drag and drop joke file here, or click to browse joke"
            }
            imgSrc={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                height="50"
                width="50"
                fill="#1ba587"
              >
                <path d="M400-240q50 0 85-35t35-85v-280h120v-80H460v256q-14-8-29-12t-31-4q-50 0-85 35t-35 85q0 50 35 85t85 35Zm80 160q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
              </svg>
            }
            setFormData={setFormData}
            formData={formData}
            fieldType={"audio"}
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
