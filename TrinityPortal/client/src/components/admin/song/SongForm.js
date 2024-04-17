import React, { useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  updateSong,
  addSong,
  deleteSong,
  clearSong,
} from "../../../actions/admin";
import Alert from "../../layouts/Alert";
import PropTypes from "prop-types";
import FileUpload from "../../layouts/FileUpload";

const SongForm = ({
  song,
  authUser,
  updateSong,
  addSong,
  deleteSong,
  clearSong,
}) => {
  const hist = useHistory();
  const location = useLocation();

  const [formData, setFormData] = useState({
    SongID: song === null ? "" : song.SongID !== undefined ? song.SongID : "",
    Name: song === null ? "" : song.Name !== undefined ? song.Name : "",
    Lyrics: song === null ? "" : song.Lyrics !== undefined ? song.Lyrics : "",
    SongData:
      song === null ? "" : song.SongData !== undefined ? song.SongData : "",
    SongLogo:
      song === null ? "" : song.SongLogo !== undefined ? song.SongLogo : "",
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

      addSong(formData).then(() => {
        setFormData({
          SongID: "",
          Name: "",
          Lyrics: "",
          SongData: "",
          SongLogo: "",
        });
      });
    } else if (location.pathname.includes("edit")) {
      console.log("edit");
      updateSong(SongID, formData);
    }
    hist.push("/admin/songs");
    clearSong();
  };

  const { Name, Lyrics, SongID } = formData;

  if (song == null && location.pathname.includes("edit")) {
    hist.push("/admin/songs");
  }

  return (
    <div className="p-sm-5 p-2 w-100  dashboard-margin mx-lg-auto container">
      <div className="mb-3 ">
        <h6 className="txt-primary-light">Admin / Songs / Song</h6>
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
              {location.pathname.includes("add") ? "Add Song" : "Edit"}
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
          <div className="txt-primary">Lyrics</div>
          <textarea
            type="text"
            className="form-control rounded"
            rows="4"
            cols="50"
            id="Lyrics"
            placeholder="Enter Lyrics..."
            required
            value={Lyrics}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="mb-3">
          <div className="d-flex align-items-center gap-2">
            <div className="txt-primary">Song File</div>
            {/* Display of the audio */}
            {formData.SongData !== "" && (
              <audio controls >
                <source
                  src={formData.SongData}
                  type="audio/mpeg"
                />
                Your browser does not support the audio element.
              </audio>
            )}
          </div>

          <FileUpload
            instructionText={
              "Drag and drop song file here, or click to browse song"
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
            module={"song"}
            setFormData={setFormData}
            formData={formData}
            fieldType={"audio"}
          />
        </div>

        <div className="mb-3">
          <div className="d-flex align-items-center gap-2">
            <div className="txt-primary">Image File</div>
            {/* Display of the image */}
            {formData.SongLogo !== "" && (
              <img
                src={formData.SongLogo}
                alt=""
                srcset=""
                width="50px"
                height="50px"
              />
            )}
          </div>
          <FileUpload
            instructionText={
              "Drag and drop song image file here, or click to browse song image"
            }
            imgSrc={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="50"
                viewBox="0 -960 960 960"
                width="50"
                fill="#1ba587"
              >
                <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h360v80H200v560h560v-360h80v360q0 33-23.5 56.5T760-120H200Zm480-480v-80h-80v-80h80v-80h80v80h80v80h-80v80h-80ZM240-280h480L570-480 450-320l-90-120-120 160Zm-40-480v560-560Z" />
              </svg>
            }
            module={"song"}
            setFormData={setFormData}
            formData={formData}
            fieldType={"image"}
          />
        </div>

        {location.pathname.includes("edit") && (
          <div className="mb-3">
            <div className="txt-primary">SongID</div>
            <input
              disabled
              type="text"
              className="form-control rounded "
              id="SongID"
              placeholder="Enter song ID..."
              value={SongID}
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
            id="deleteSong"
            aria-labelledby="deleteSongLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="deleteSongLabel">
                    Delete Song
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  Are you sure you want to deletesong?
                  <br />
                  <br />
                  <b>
                    <span className="text-danger text-center">
                      Warning Deleting asong will result in deleting everything
                      related to it such a users and assessments
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
                      deleteSong(SongID);
                      hist.push("/admin/songs");
                      clearSong();
                    }}
                    data-bs-dismiss="modal"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
          {authUser.roleID === 5 && SongID !== "" && (
            <div
              className="btn btn-danger d-flex align-items-center px-4 mx-3"
              data-bs-toggle="modal"
              data-bs-target="#deleteSong"
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
SongForm.propTypes = {
  song: PropTypes.object,
  authUser: PropTypes.object.isRequired,
  updateSong: PropTypes.func.isRequired,
  deleteSong: PropTypes.func.isRequired,
  clearSong: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  song: state.admin.song,
  authUser: state.auth.user,
});

export default connect(mapStateToProps, {
  updateSong,
  addSong,
  deleteSong,
  clearSong,
})(SongForm);
