import React, { useEffect, useState } from "react";
import Alert from "../layouts/Alert";
import { setAlert } from "../../actions/alerts";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

const AnonymousForm = ({ setAlert, device }) => {
  const [formData, setFormData] = useState({
    PhoneNumber: "",
    FullName: "",
    AlternativeID: "",
    Email: "",
    InOut: false,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const { PhoneNumber, FullName, Email, AlternativeID } = formData;
  const [isRobot, setIsRobot] = useState(false);

  // Check if the user is already logged in
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const updatedFormData = { ...formData, isRobot };
    // Fetch API to server
    fetch(`https://b9dk2wds-3000.use.devtunnels.ms/api/receptions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedFormData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Handle the API response
        console.log("Test AlternativeID", data);
        setIsSubmitted(true);
        setFormData({
          PhoneNumber: "",
          FullName: "",
          AlternativeID: "",
          Email: "",
          InOut: false,
        });
        setTimeout(() => {
          if (!device.includes("sl3288")) {
            window.location.reload();
          }
        }, 3000);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  useEffect(()=>{
    if(device.includes("sl3288")){
      setIsRobot(true);
    }
  },[device]);

  return (
    <>
      <div className="p-sm-5 p-2 w-100  dashboard-margin mx-auto container">
        {/* Header */}
        <div className=" d-flex gap-3 align-items-center bg-primary p-2 p-sm-3 p-lg-4 ">
          {/* Title */}
          <h6 className="text-white">Reception Check-In Form</h6>
          <img
            src={process.env.PUBLIC_URL + `/qrForm.png`}
            width="100px"
            height="100px"
          />
        </div>
        {/* Form Content */}
        <form
          className="w-100 p-2 p-sm-3 p-lg-4 shadow-lg  mb-2 overflow-auto d-flex flex-column gap-2 justify-content-around"
          style={{ minHeight: "400px" }}
          onSubmit={(e) => onSubmit(e)}
        >
          <Alert />
          {/* Fields */}
          {!isSubmitted && (
            <>
              <div className="mb-3">
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
              </div>
              <div className="mb-3">
                <div className="txt-primary">Phone Number</div>
                <input
                  type="tel"
                  className="form-control rounded "
                  id="PhoneNumber"
                  placeholder="Enter your phone..."
                  required
                  value={PhoneNumber}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className="mb-3">
                <div className="txt-primary">Full Name</div>
                <input
                  type="text"
                  className="form-control rounded "
                  id="FullName"
                  placeholder="Enter Full Name..."
                  required
                  value={FullName}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className="mb-3">
                <div className="txt-primary">Email</div>
                <input
                  type="Email"
                  className="form-control rounded "
                  id="Email"
                  placeholder="Enter Email..."
                  required
                  value={Email}
                  pattern="(?![_.-])((?![_.-][_.-])[a-zA-Z\d_.-]){0,63}[a-zA-Z\d]@((?!-)((?!--)[a-zA-Z\d-]){0,63}[a-zA-Z\d]\.){1,2}([a-zA-Z]{2,14}\.)?[a-zA-Z]{2,14}"
                  onChange={(e) => onChange(e)}
                />
              </div>
            </>
          )}

          {/* Confirmation screen */}
          {isSubmitted && (
            <div className="w-100 h-50 d-flex justify-content-center align-item-center">
              <h4 className="txt-primary">Enjoy your visit !!!</h4>
            </div>
          )}

          {/* Buttons */}
          <div className="d-flex align-items-center justify-content-center gap-2">
            {!isSubmitted && (
              <>
                {/* In */}
                <button
                  type="submit"
                  className="button-primary btn-block btn px-5"
                >
                  In
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 -960 960 960"
                    width="24"
                    fill="currentColor"
                  >
                    <path d="M480-120v-80h280v-560H480v-80h280q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H480Zm-80-160-55-58 102-102H120v-80h327L345-622l55-58 200 200-200 200Z" />
                  </svg>
                </button>
                {/* Out */}
                <button type="submit" className="btn-danger btn-block btn px-5">
                  Out
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 -960 960 960"
                    width="24"
                    fill="currentColor"
                  >
                    <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
                  </svg>
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

AnonymousForm.propTypes = {
  setAlert: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {
  setAlert,
})(AnonymousForm);
