import React, { useEffect, useState } from "react";
import Alert from "../layouts/Alert";
import { setAlert } from "../../actions/alerts";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import AnonymousConfirm from "./AnonymousConfirm";

const AnonymousLogout = ({ setAlert, device, isSignedOut }) => {
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    PhoneNumber: "",
    InOut: null,
  });

  const [error, setError] = useState(null);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const { PhoneNumber, FirstName, LastName, InOut } = formData;
  const [isRobot, setIsRobot] = useState(false);

  // Check if the user is already logged in
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const { FirstName, LastName, PhoneNumber } = formData;

    // Validation before submitting
    // Phone Number validation
    let validationError = null;

    if (PhoneNumber !== "") {
      const isValidPhoneNumber =
        /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(PhoneNumber);

      if (!isValidPhoneNumber) {
        validationError = "Invalid phone number.";
        setError(validationError);
        return;
      }
    } else {
      validationError = "Phone number is required.";
      setError(validationError);
      return;
    }

    if (FirstName === "John" && LastName === "Doe"&& PhoneNumber === "1234567890") {
      setError("Your name was not found! Please check the spelling of your name.")
      return;
    }

    if (validationError === null) {
      setError(null);
      setIsSubmitted(true);
      const updatedFormData = {
        ...formData,
        isRobot,
        isSignedOut,
        InOut: false,
      };
      // Fetch API to server
      fetch(`https://b9dk2wds-3000.use.devtunnels.ms/api/receptions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFormData),
      })
        .then((response) => {
          setTimeout(() => {
            window.location.reload();
          }, 2000);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          // Handle the API response
          setIsSubmitted(true);
          setFormData({
            PhoneNumber: "",
            FirstName: "",
            LastName: "",
            InOut: false,
          });
          setTimeout(() => {
            window.location.reload();
          }, 5000);
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    }
  };

  useEffect(() => {
    if (device.includes("sl3288")) {
      setIsRobot(true);
    }
  }, [device]);

  return (
    <>
      <div className="w-100 h-100 mx-auto">
        {/* Form Content */}
        <form
          className="w-100 p-2 p-sm-3 p-lg-4 mb-2 overflow-auto d-flex flex-column gap-2 justify-content-around"
          style={{ minHeight: "200px" }}
          onSubmit={(e) => onSubmit(e)}
        >
          <Alert />
          {/* Fields */}
          {!isSubmitted && (
            <>
              {/*  Accessed from */}
              {/* <div className="mb-3">
                <div className="txt-primary">
                  Access From {""}
                  {device?.includes("Unknown") ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      viewBox="0 -960 960 960"
                      width="24"
                    >
                      <path d="M480-280q-17 0-29.5-12.5T438-322q0-17 12.5-29.5T480-364q17 0 29.5 12.5T522-322q0 17-12.5 29.5T480-280Zm-30-128q0-46 7.5-63t42.5-47q14-14 24-27.5t10-30.5q0-18-13.5-32T480-622q-27 0-41 15.5T420-574l-54-22q12-35 41-59.5t73-24.5q47 0 80.5 25.5T594-578q0 24-12 45t-30 39q-30 30-36 42t-6 44h-60ZM280-40q-33 0-56.5-23.5T200-120v-720q0-33 23.5-56.5T280-920h400q33 0 56.5 23.5T760-840v720q0 33-23.5 56.5T680-40H280Zm0-120v40h400v-40H280Zm0-80h400v-480H280v480Zm0-560h400v-40H280v40Zm0 0v-40 40Zm0 640v40-40Z" />
                    </svg>
                  ) : device?.includes("Desktop") ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      viewBox="0 -960 960 960"
                      width="24"
                    >
                      <path d="M320-120v-80h80v-80H160q-33 0-56.5-23.5T80-360v-400q0-33 23.5-56.5T160-840h640q33 0 56.5 23.5T880-760v400q0 33-23.5 56.5T800-280H560v80h80v80H320ZM160-360h640v-400H160v400Zm0 0v-400 400Z" />
                    </svg>
                  ) : (
                    //Android
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      viewBox="0 -960 960 960"
                      width="24"
                    >
                      <path d="M280-40q-33 0-56.5-23.5T200-120v-720q0-33 23.5-56.5T280-920h400q33 0 56.5 23.5T760-840v720q0 33-23.5 56.5T680-40H280Zm0-200v120h400v-120H280Zm200 100q17 0 28.5-11.5T520-180q0-17-11.5-28.5T480-220q-17 0-28.5 11.5T440-180q0 17 11.5 28.5T480-140ZM280-320h400v-400H280v400Zm0-480h400v-40H280v40Zm0 560v120-120Zm0-560v-40 40Z" />
                    </svg>
                  )}
                </div>
                <input
                  type="text"
                  className="form-control rounded "
                  id="AlternativeID"
                  value={device}
                  disabled
                  onChange={(e) => onChange(e)}
                />
              </div> */}

              {/* Full Name */}
              <div className="w-100 d-flex mb-3 mb-md-5 gap-4 flex-column flex-sm-row justify-content-between">
                {/* First Name */}
                <div
                  className="w-100 d-flex justify-content-between gap-3"
                  style={{ whiteSpace: "nowrap" }}
                >
                  <div className="txt-primary responsive-label-text">
                    First Name:
                  </div>
                  <input
                    type="text"
                    className="form-control rounded responsive-input-text"
                    id="FirstName"
                    placeholder=""
                    value={FirstName}
                    required
                    onChange={(e) => onChange(e)}
                  />
                </div>

                {/* Last Name */}
                <div className="w-100 d-flex justify-content-between gap-3">
                  <div
                    className="txt-primary responsive-label-text"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    Last Name:
                  </div>
                  <input
                    type="text"
                    className="form-control rounded responsive-input-text "
                    id="LastName"
                    placeholder=""
                    required
                    value={LastName}
                    onChange={(e) => onChange(e)}
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div className="mb-3 mb-md-5 d-flex gap-4">
                <div className="txt-primary responsive-label-text">
                  Phone Number:
                </div>
                <input
                  type="tel"
                  className="form-control rounded responsive-input-text w-50"
                  id="PhoneNumber"
                  placeholder=""
                  value={PhoneNumber}
                  onChange={(e) => onChange(e)}
                />
              </div>
            </>
          )}

          {/* Confirmation screen */}
          {isSubmitted && (
            <>
              <AnonymousConfirm isSignedOut={isSignedOut} />
            </>
          )}

          {/* Validation error message */}
          <div className="mb-3 mb-md-5 d-flex align-items-center justify-content-center gap-3">
            {error && (
              <span className="responsive-input-text text-danger">{error}</span>
            )}
          </div>

          {/* Buttons */}
          <div className="d-flex align-items-center justify-content-center gap-2">
            {!isSubmitted && (
              <>
                {/* Submit*/}
                <button
                  type="submit"
                  className="w-30 bg-dark-green text-white btn-lg btn-block btn custom-btn p-4 p-md-5 d-flex align-items-center justify-content-center"
                >
                  <span className="responsive-btn-text">Submit</span>
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

AnonymousLogout.propTypes = {
  setAlert: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {
  setAlert,
})(AnonymousLogout);
