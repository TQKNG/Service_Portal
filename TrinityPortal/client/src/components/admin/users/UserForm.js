import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  updateUser,
  addUser,
  clearUser,
  loadSchoolsList,
  deleteUser,
} from "../../../actions/admin";
import PropTypes from "prop-types";
import Alert from "../../layouts/Alert";
import { setAlert } from "../../../actions/alerts";
import MultiSelectWithCheckboxes from "../../layouts/MultiSelect";

const UserForm = ({
  user,
  updateUser,
  addUser,
  deleteUser,
  clearUser,
  authUser,
  schoolsList,
  loadSchoolsList,
  schoolListLoading,
  setAlert,
}) => {
  const hist = useHistory();
  const location = useLocation();
  const [hidden, setHidden] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    if (schoolsList.length === 0 && schoolListLoading) {
      if (authUser.UserTypeID === 5) loadSchoolsList();
      else if (authUser.UserTypeID === 6)
        loadSchoolsList({ schoolIds: authUser.schoolIds });
      else {
        loadSchoolsList({ SchoolID: authUser.SchoolID });
      }
    }
  }, [schoolsList, loadSchoolsList, schoolListLoading]);

  const [formData, setFormData] = useState({
    FirstName:
      user === null ? "" : user.FirstName !== undefined ? user.FirstName : "",
    LastName:
      user === null ? "" : user.LastName !== undefined ? user.LastName : "",
    UserID: user === null ? "" : user.UserID !== undefined ? user.UserID : "",
    Role: user === null ? "" : user.Role !== undefined ? user.Role : "",
    DeviceID:
      user === null ? "" : user.DeviceID !== undefined ? user.DeviceID : "",
    HardwareID:
      user === null ? "" : user.HardwareID !== undefined ? user.HardwareID : "",
    AlternativeID:
      user === null
        ? ""
        : user.AlternativeID !== undefined
        ? user.AlternativeID
        : "",
    SchoolID:
      authUser.SchoolID !== null
        ? authUser.SchoolID
        : user === null
        ? null
        : user.SchoolID + "" !== undefined
        ? user.SchoolID + ""
        : null,
    Schools:
      authUser.schoolIds !== null
        ? authUser.schoolIds
        : user === null
        ? []
        : user.schoolIds !== null
        ? user.schoolIds.split(",").map(Number) // convert string to array to array of numbers
        : [],
    Email: user === null ? "" : user.Email !== undefined ? user.Email : "",
    UserName:
      user === null ? "" : user.UserName !== undefined ? user.UserName : "",
    Password:
      user === null ? "" : user.Password !== undefined ? user.Password : "",
    Password2:
      user === null ? "" : user.Password !== undefined ? user.Password : "",
    UserTypeID:
      user === null
        ? "1"
        : user.UserTypeID !== undefined
        ? user.UserTypeID + ""
        : "1",
    ResetToken:
      user === null ? "" : user.ResetToken !== undefined ? user.ResetToken : "",
    ResetTokenExpire:
      user === null
        ? ""
        : user.ResetTokenExpire !== undefined
        ? user.ResetTokenExpire
        : "",
  });

  const onChange = (e) => {
    if (e.target.id === "Schools") {
      // If the target is the multi-select, update the state with an array of selected options
      const selectedOptions = Array.from(
        e.target.selectedOptions,
        (option) => option.value
      );
      setFormData({ ...formData, [e.target.id]: selectedOptions });
    } else {
      setErrorMessage("");
      // If the target is not a multi-select, update the state with the single value
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
    console.log("Test formData", formData);
  };

  const handleBlur = (password) => {
    if (!/(?=.*\d)/.test(password)) {
      setErrorMessage("Password must contain at least one number.");
    } else if (!/(?=.*[a-z])/.test(password)) {
      setErrorMessage("Password must contain at least one lowercase letter.");
    } else if (!/(?=.*[A-Z])/.test(password)) {
      setErrorMessage("Password must contain at least one uppercase letter.");
    } else if (!/(?=.*[!@#$%=._])/.test(password)) {
      setErrorMessage("Password must contain at least one special character.");
    } else if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long.");
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (location.pathname.includes("add")) {
      if (Password !== Email || parseInt(UserTypeID) === 2) {
        // Check if the password and repeat password match
        if (Password !== Password2) {
          setAlert("Repeat Password not match", "danger");
        } else {
          let data = formData;
          if (parseInt(UserTypeID) === 2) {
            data = {
              ...data,
              Password: "121233212321312",
              Email: `${
                FirstName +
                LastName +
                SchoolID +
                Math.floor(Math.random() * 1000)
              }@mail.com`,
            };
          }
          addUser(data).then(() => {
            setFormData({
              FirstName: "",
              LastName: "",
              AlternativeID: "",
              UserID: "",
              SchoolID: "1",
              Email: "",
              Password: "",
              Password2: "",
              UserTypeID: 1,
              ResetToken: "",
              ResetTokenExpire: "",
            });
          });
        }
      } else {
        window.scrollTo(0, 0);
        setAlert("Password and Email can't be the same", "danger");
      }
    } else if (location.pathname.includes("edit")) {
      console.log("edit");

      updateUser(UserID, formData);
      hist.push("/admin/users");
      clearUser();
    }
  };

  const {
    FirstName,
    LastName,
    UserID,
    Email,
    UserName,
    Role,
    SchoolID,
    Schools,
    Password,
    Password2,
    UserTypeID,
    ResetToken,
    ResetTokenExpire,
    AlternativeID,
  } = formData;

  if (user == null && location.pathname.includes("edit")) {
    hist.push("/admin/users");
  }

  return (
    <div className="p-sm-5 p-2 w-100  dashboard-margin mx-lg-auto container">
      <div className="mb-3 ">
        <h6 className="txt-primary-light">
          {authUser.UserType} / Users / User
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
              {location.pathname.includes("add") ? "Add User" : "Edit"}
            </h4>
          </div>
        </div>
      </div>
      <form
        className="card w-100 p-2 p-sm-3 p-lg-4 shadow-lg border-0  mb-2 "
        onSubmit={(e) => onSubmit(e)}
      >
        <Alert />

        {/* First Name Field */}
        <div className="mb-3">
          <div className="txt-primary">First Name</div>
          <input
            type="text"
            className="form-control rounded "
            id="FirstName"
            placeholder="Enter First Name..."
            required
            value={FirstName}
            onChange={(e) => onChange(e)}
          />
        </div>

        {/* Last Name Field */}
        <div className="mb-3">
          <div className="txt-primary">Last Name</div>
          <input
            type="text"
            className="form-control rounded "
            id="LastName"
            placeholder="Enter Last Name..."
            required
            value={LastName}
            onChange={(e) => onChange(e)}
          />
        </div>

        {/* Email Field */}
        {!location.pathname.includes("edit") && parseInt(UserTypeID) !== 2 && (
          <div className="mb-3">
            <div className="txt-primary">Email</div>
            <input
              type="Email"
              className="form-control rounded "
              id="Email"
              placeholder="Enter Email..."
              readOnly={location.pathname.includes("edit")}
              required
              value={Email}
              pattern="(?![_.-])((?![_.-][_.-])[a-zA-Z\d_.-]){0,63}[a-zA-Z\d]@((?!-)((?!--)[a-zA-Z\d-]){0,63}[a-zA-Z\d]\.){1,2}([a-zA-Z]{2,14}\.)?[a-zA-Z]{2,14}"
              onChange={(e) => onChange(e)}
            />
          </div>
        )}

        {/* User name */}
        <div className="mb-3">
          <div className="txt-primary">User Name</div>
          <input
            type="text"
            className="form-control rounded "
            id="UserName"
            placeholder="Enter an User Name..."
            value={UserName}
            onChange={(e) => onChange(e)}
          />
        </div>

        <div className="mb-3">
          <div className="txt-primary">Role</div>
          <select
            className="form-select"
            aria-label="Default select example"
            id="Role"
            value={Role}
            onChange={(e) => onChange(e)}
          >
            <option value={1}>Administrator</option>
            <option value={2}>Receptionist</option>
            {/* Business logic to have these two roles merged to Admin */}
            {/* <option value={3}>Vice Principal</option>
            <option value={4}>Principal</option> */}
          </select>
        </div>

        {!location.pathname.includes("edit") && parseInt(UserTypeID) !== 2 && (
          <>
            <div className="mb-3">
              <div className="txt-primary">Password</div>
              <div className="form-inline mb-1 ">
                <div className={`input-group w-100 border rounded`}>
                  <input
                    type={hidden ? "password" : "text"}
                    className="form-control border-0"
                    id="Password"
                    placeholder="Enter Password.."
                    required
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[!@#$%=._])(?=.*[A-Z]).{8,}"
                    // title="Must contain at least one number, one uppercase and lowercase letter, one special character, and at least 8 or more characters"
                    value={Password}
                    onChange={(e) => onChange(e)}
                    onBlur={() => handleBlur(Password)}
                  />
                  <div className="input-group-prepend border-0  ">
                    <span
                      className="input-group-text  cursor-pointer border-0  h-100 bg-body"
                      id="inputGroupFileAddon01"
                      onMouseDown={() => setHidden(false)}
                      onMouseUp={() => setHidden(true)}
                    >
                      {!hidden ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-eye-slash"
                          viewBox="0 0 16 16"
                        >
                          <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                          <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                          <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-eye"
                          viewBox="0 0 16 16"
                        >
                          <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                          <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                        </svg>
                      )}
                    </span>
                  </div>
                </div>
                {errorMessage && (
                  <div style={{ color: "red" }}>{errorMessage}</div>
                )}
              </div>
            </div>
            <div className="mb-3">
              <div className="txt-primary">Repeat Password</div>
              <div className="form-inline mb-1 ">
                <div className={`input-group w-100 border rounded`}>
                  <input
                    type={hidden ? "password" : "text"}
                    className="form-control  border-0"
                    id="Password2"
                    placeholder="Enter Password..."
                    required
                    title="Password must match"
                    value={Password2}
                    onChange={(e) => onChange(e)}
                  />
                  <div className="input-group-prepend border-0  ">
                    <span
                      className="input-group-text  cursor-pointer border-0  h-100 bg-body"
                      id="inputGroupFileAddon01"
                      onMouseDown={() => setHidden(false)}
                      onMouseUp={() => setHidden(true)}
                    >
                      {!hidden ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-eye-slash"
                          viewBox="0 0 16 16"
                        >
                          <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                          <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                          <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-eye"
                          viewBox="0 0 16 16"
                        >
                          <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                          <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                        </svg>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* {ResetToken !== null && (
          <div className="mb-3">
            <div className="txt-primary">ResetToken</div>
            <input
              type="text"
              className="form-control rounded "
              id="ResetToken"
              disabled
              value={ResetToken}
              onChange={(e) => onChange(e)}
            />
          </div>
        )}
        {ResetTokenExpire !== null && (
          <div className="mb-3">
            <div className="txt-primary">ResetTokenExpire</div>
            <input
              type="text"
              className="form-control rounded "
              id="ResetTokenExpire"
              disabled
              value={ResetTokenExpire}
              onChange={(e) => onChange(e)}
            />
          </div>
        )} */}
        <div className="d-flex align-items-center justify-content-center gap-2">
          <button type="submit" className="button-primary btn-block btn px-5">
            Save
          </button>
          {/* Delete button  */}
          {/* Delete Modal */}
          <div
            className="modal fade"
            id="deleteUser"
            aria-labelledby="deleteUserLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="deleteUserLabel">
                    Delete User
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  Are you sure you want to delete user?
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
                      console.log("Delete user", UserID);
                      deleteUser(UserID);
                      hist.push("/admin/users");
                      clearUser();
                    }}
                    data-bs-dismiss="modal"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>

          {UserID !== "" && authUser.UserTypeID >= 5 && (
            <div
              className="btn btn-danger d-flex align-items-center px-4"
              data-bs-toggle="modal"
              data-bs-target="#deleteUser"
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
UserForm.propTypes = {
  user: PropTypes.object,
  updateUser: PropTypes.func.isRequired,
  addUser: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  clearUser: PropTypes.func.isRequired,
  schoolsList: PropTypes.array.isRequired,
  loadSchoolsList: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.admin.user,
  authUser: state.auth.user,
  schoolsList: state.admin.schoolsList,
  schoolListLoading: state.admin.schoolListLoading,
  setAlert: PropTypes.func.isRequired,
});

export default connect(mapStateToProps, {
  updateUser,
  addUser,
  deleteUser,
  clearUser,
  loadSchoolsList,
  setAlert,
})(UserForm);
