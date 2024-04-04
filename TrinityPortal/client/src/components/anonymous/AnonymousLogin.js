import React, { useEffect, useState } from "react";
import Alert from "../layouts/Alert";
import { setAlert } from "../../actions/alerts";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import AnonymousConfirm from "./AnonymousConfirm";

const AnonymousLogin = ({ setAlert, device, isSignedIn }) => {
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

    window.scrollTo(0, 0);
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
          style={{ minHeight: "400px" }}
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
              <div className="w-100 d-flex mb-5 gap-4">
                {/* First Name */}
                <div className="w-50">
                  <div className="txt-primary responsive-label-text">
                    First Name
                  </div>
                  <input
                    type="text"
                    className="form-control rounded responsive-input-text"
                    id="FullName"
                    placeholder="Enter First Name..."
                    
                    // value={FullName}
                    onChange={(e) => onChange(e)}
                  />
                </div>

                {/* Last Name */}
                <div className="w-50">
                  <div className="txt-primary responsive-label-text">
                    Last Name
                  </div>
                  <input
                    type="text"
                    className="form-control rounded responsive-input-text "
                    id="FullName"
                    placeholder="Enter Last Name..."
                    
                    // value={FullName}
                    onChange={(e) => onChange(e)}
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div className="mb-5">
                <div className="txt-primary responsive-label-text">
                  Phone Number {`(in case if emergency)`}
                </div>
                <input
                  type="tel"
                  className="form-control rounded responsive-input-text"
                  id="PhoneNumber"
                  placeholder="Enter your phone..."
                  
                  // value={PhoneNumber}
                  onChange={(e) => onChange(e)}
                />
              </div>

              {/* Q1: Which home area(s) will you visit today? */}
              <div className="mb-5">
                <div className="txt-primary responsive-label-text">
                  Which home area(s) will you visit today?
                </div>
                <div class="container-fluid">
                  <div class="row">
                    <div class="col-md-4 d-flex gap-3 align-items-center">
                      <input
                        type="checkbox"
                        name="options"
                        value="option1"
                        className="form-check-input"
                      />
                      <label className="responsive-input-text">
                        Oak Ridge Orchard
                      </label>
                    </div>
                    <div class="col-md-4 d-flex gap-3 align-items-center">
                      <input
                        type="checkbox"
                        name="options"
                        value="option1"
                        className="form-check-input"
                      />
                      <label className="responsive-input-text">
                        Maple Ridge
                      </label>
                    </div>
                    <div class="col-md-4 d-flex gap-3 align-items-center">
                      <input
                        type="checkbox"
                        name="options"
                        value="option1"
                        className="form-check-input"
                      />
                      <label className="responsive-input-text">
                        Pine Woods
                      </label>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-4 d-flex gap-3 align-items-center">
                      <input
                        type="checkbox"
                        name="options"
                        value="option1"
                        className="form-check-input"
                      />
                      <label className="responsive-input-text">
                        Walnut Groves
                      </label>
                    </div>
                    <div class="col-md-4 d-flex gap-3 align-items-center">
                      <input
                        type="checkbox"
                        name="options"
                        value="option1"
                        className="form-check-input"
                      />
                      <label className="responsive-input-text">
                        Admin Offices
                      </label>
                    </div>
                    <div class="col-md-4 d-flex gap-3 align-items-center">
                      <input
                        type="checkbox"
                        name="options"
                        value="option1"
                        className="form-check-input"
                      />
                      <label className="responsive-input-text">Other</label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Q2: Is your visit Scheduled or Unscheduled? */}
              <div className="mb-5 d-flex">
                <div className="txt-primary w-20 responsive-label-text">
                  Is your visit?
                </div>
                <div class="container-fluid">
                  <div class="w-70 row">
                    <div class="col-md-4 d-flex gap-3 align-items-center">
                      <input
                        type="radio"
                        name="options"
                        value="option1"
                        className="form-check-input"
                      />
                      <label className="responsive-input-text">Scheduled</label>
                    </div>
                    <div class="col-md-4 d-flex gap-3 align-items-center">
                      <input
                        type="radio"
                        name="options"
                        value="option1"
                        className="form-check-input"
                      />
                      <label className="responsive-input-text">
                        Unscheduled
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Q4: What is the purpose of your visit? */}
              <div className="mb-5 d-flex gap-2">
                <div className="txt-primary w-50 responsive-label-text" style={{whiteSpace:"nowrap"}}>
                  What is the purpose of your visit?
                </div>
                <select
                  className="form-select responsive-input-text"
                  aria-label="Default select example"
                  id="Role"
                  // value={Role}
                  onChange={(e) => onChange(e)}
                >
                  <option value={-1}>Please Select One</option>
                  <option value={1}>Office 1</option>
                  <option value={2}>Office 2</option>
                  <option value={3}>Office 3</option>
                  <option value={4}>Office 4</option>
                  <option value={5}>Office 5</option>
                </select>
              </div>

              {/* Q3: What is the name of the resident you are visiting? */}
              <div className="mb-5 d-flex gap-2">
                <div className="txt-primary w-60 responsive-label-text" style={{whiteSpace:"nowrap"}}>
                  What is the name of the resident you are visiting?
                </div>
                <input
                  type="text"
                  className="form-control rounded responsive-input-text"
                  id="FullName"
                  placeholder=""
                  
                  // value={FullName}
                  onChange={(e) => onChange(e)}
                />
              </div>

              {/* Q4: Is this your first visit to Trinity Village Care Center */}
              <div className="mb-5 d-flex gap-5">
                <div className="txt-primary w-60 responsive-label-text" style={{whiteSpace:"nowrap"}}>
                  Is this your first visit to Trinity Village Care Center?
                </div>
                <div class="container-fluid">
                  <div class="w-70 row">
                    <div class="col-md-3 d-flex gap-3 align-items-center">
                      <input
                        type="radio"
                        name="options"
                        value="option1"
                        className="form-check-input"
                      />
                      <label className="responsive-input-text ">Yes</label>
                    </div>
                    <div class="col-md-3 d-flex gap-3 align-items-center">
                      <input
                        type="radio"
                        name="options"
                        value="option1"
                        className="form-check-input"
                      />
                      <label className="responsive-input-text ">No</label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Q5: Do you have any new or worsening respiratory or gastrointestinal symptoms */}
              <div className="mb-5 d-flex flex-column">
                <div className="txt-primary w-100 responsive-label-text">
                  Do you have any new or worsening respiratory or
                  gastrointestinal symptoms?
                </div>
                <div class="container-fluid">
                  <div class="w-70 row">
                    <div class="col-md-3 d-flex gap-3 align-items-center">
                      <input type="radio" name="options" value="option1" className="form-check-input" />
                      <label className="responsive-input-text">Yes</label>
                    </div>
                    <div class="col-md-3 d-flex gap-3 align-items-center">
                      <input type="radio" name="options" value="option1" className="form-check-input" />
                      <label className="responsive-input-text">No</label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Checkbox: Please tick this box to acknowledge that you will follow all staff directions during your visit*/}
              <div className="mb-5 d-flex align-items-center justify-content-center gap-2">
                <input
                  type="checkbox"
                  name="options"
                  value="option1"
                  className="form-check-input"
                />
                <div className="txt-primary w-100 responsive-label-text">
                  Please tick this box to acknowledge that you will follow all
                  staff directions during your visit
                </div>
              </div>
            </>
          )}

          {/* Confirmation screen */}
          {isSubmitted && (
            <>
            <AnonymousConfirm isSignedIn={isSignedIn}/>
            </>
          )}

          {/* Buttons */}
          <div className="d-flex align-items-center justify-content-center gap-2">
            {!isSubmitted && (
              <>
                {/* Submit*/}
                <button
                  className="w-30 bg-dark-green text-white btn-lg btn-block btn custom-btn p-5 d-flex align-items-center justify-content-center"
                  onClick={() => setIsSubmitted(true)}
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

AnonymousLogin.propTypes = {
  setAlert: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {
  setAlert,
})(AnonymousLogin);
