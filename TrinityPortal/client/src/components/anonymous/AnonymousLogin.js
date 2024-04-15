import React, { useEffect, useState } from "react";
import Alert from "../layouts/Alert";
import { setAlert } from "../../actions/alerts";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import AnonymousConfirm from "./AnonymousConfirm";

const AnonymousLogin = ({ setAlert, device, isSignedIn }) => {
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    PhoneNumber: "",
    InOut: null,
    HomeAreas: [],
    ScheduledVisit: null,
    Purpose: "",
    ResidentName: "",
    FirstVisit: null,
    SicknessSymptom: null,
    Acknowledgement: null,
    DepartmentVisit: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    FirstName,
    LastName,
    PhoneNumber,
    InOut,
    HomeAreas,
    ScheduledVisit,
    Purpose,
    ResidentName,
    FirstVisit,
    SicknessSymptom,
    Acknowledgement,
    DepartmentVisit,
  } = formData;
  const [isRobot, setIsRobot] = useState(false);
  const [isAdminOfficeClick, setIsAdminOfficeClick] = useState(false);
  const [isSicknessSymptom, setIsSicknessSymptom] = useState(false);
  const [error, setError] = useState(null);

  // Check if the user is already logged in
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });

    // Select multi-select areas checkbox
    if (e.target.id === "HomeAreas") {
      if (HomeAreas.includes(e.target.value)) {
        setFormData({
          ...formData,
          HomeAreas: HomeAreas.filter((area) => area !== e.target.value),
        });
      } else {
        setFormData({ ...formData, HomeAreas: [...HomeAreas, e.target.value] });
      }
    }

    if (e.target.id === "AdminOffices") {
      setIsAdminOfficeClick((prevState) => !prevState);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    console.log("test formData", formData);

    const {
      FirstName,
      LastName,
      PhoneNumber,
      InOut,
      HomeAreas,
      ScheduledVisit,
      Purpose,
      ResidentName,
      FirstVisit,
      SicknessSymptom,
      Acknowledgement,
      DepartmentVisit,
    } = formData;

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

    // Sickness Symptom validation
    if(SicknessSymptom === null || SicknessSymptom === "true" ) {
      validationError = "Please do not enter the building until your symptoms have resolved.";
      setError(validationError);
      return;
    }

    // Acknowledgement validation
    if(Acknowledgement === null || Acknowledgement === "false") {
      validationError = "Tick the box to acknowledge that you will follow all staff directions during your visit.";
      setError(validationError);
      return;
    }

    if (validationError === null) {
      setError(null);
      setIsSubmitted(true);
      const updatedFormData = { ...formData, isRobot, isSignedIn, InOut: true };

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
          setFormData({
            FirstName: "",
            LastName: "",
            PhoneNumber: "",
            InOut: null,
            HomeAreas: [],
            ScheduledVisit: null,
            Purpose: "",
            ResidentName: "",
            FirstVisit: null,
            SicknessSymptom: null,
            Acknowledgement: null,
            DepartmentVisit: "",
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

  // Check if the device is a robot
  useEffect(() => {
    if (device.includes("sl3288")) {
      setIsRobot(true);
    }
  }, [device]);

  return (
    <>
      {/* Popup - Symptom */}
      <div
        className="modal fade"
        id="popupSymtomp"
        aria-labelledby="popupSymtompLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title"
                id="popupSymtompLabel"
                style={{ fontSize: "2rem" }}
              >
                Wait!
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div
              className="modal-body text-center"
              style={{ fontSize: "2rem" }}
            >
              Please do not enter the building until your symptoms have
              resolved.
            </div>
            <div className="modal-footer mx-auto">
              <button
                type="button"
                className="w-100 bg-dark-green text-white btn-lg btn-block btn custom-btn p-5 d-flex align-items-center justify-content-center"
                onClick={() => {}}
                data-bs-dismiss="modal"
              >
                <span className="responsive-btn-text">Close</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Popup - First Visit */}
      <div
        className="modal fade"
        id="popupFirstVisit"
        aria-labelledby="popupFirstVisitLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title"
                id="popupFirstVisitLabel"
                style={{ fontSize: "2rem" }}
              >
                Wait!
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div
              className="modal-body text-center"
              style={{ fontSize: "1.3rem" }}
            >
              {`Since this is your first visit to our home, PLEASE see the receptionist before you enter.
There is some mandatory training that you must undertake (~10 minutes)`}
            </div>
            <div className="modal-footer mx-auto">
              <button
                type="button"
                className="w-100 bg-dark-green text-white btn-lg btn-block btn custom-btn p-5 d-flex align-items-center justify-content-center"
                onClick={() => {}}
                data-bs-dismiss="modal"
              >
                <span className="responsive-btn-text">Close</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-100 mx-auto">
        {/* Form Content */}
        <form
          className="w-100 p-2 p-sm-3 p-lg-4 mb-2 overflow-auto d-flex flex-column gap-2 justify-content-around overflow-hidden"
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
                    required
                    value={FirstName}
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
                    required
                    placeholder=""
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

              {/* Q1: Which home area(s) will you visit today? */}
              <div className="d-flex flex-column mb-3 mb-md-5 gap-2">
                <div className="txt-primary responsive-label-text">
                  Which home area(s) will you visit today?
                </div>
                <div class="">
                  <div class="row">
                    <div class="col-sm-4 d-flex gap-3 align-items-center">
                      <input
                        id="HomeAreas"
                        type="checkbox"
                        name="Oak Ridge Orchard"
                        value="Oak Ridge Orchard"
                        className="form-check-input"
                        onChange={(e) => onChange(e)}
                      />
                      <label
                        className="responsive-input-text"
                        style={{ whiteSpace: "nowrap" }}
                      >
                        Oak Ridge
                      </label>
                    </div>
                    <div class="col-sm-4 d-flex gap-3 align-items-center">
                      <input
                        id="HomeAreas"
                        type="checkbox"
                        name="Maple Ridge"
                        value="Maple Ridge"
                        className="form-check-input"
                        onChange={(e) => onChange(e)}
                      />
                      <label
                        className="responsive-input-text"
                        style={{ whiteSpace: "nowrap" }}
                      >
                        Maple Bush
                      </label>
                    </div>
                    <div class="col-sm-4 d-flex gap-3 align-items-center">
                      <input
                        id="HomeAreas"
                        type="checkbox"
                        name="Pine Woods"
                        value="Pine Woods"
                        onChange={(e) => onChange(e)}
                        className="form-check-input"
                      />
                      <label
                        className="responsive-input-text"
                        style={{ whiteSpace: "nowrap" }}
                      >
                        Pine Woods
                      </label>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-4 d-flex gap-3 align-items-center">
                      <input
                        id="HomeAreas"
                        type="checkbox"
                        name="Walnut Groves"
                        value="Walnut Groves"
                        onChange={(e) => onChange(e)}
                        className="form-check-input"
                      />
                      <label
                        className="responsive-input-text"
                        style={{ whiteSpace: "nowrap" }}
                      >
                        Walnut Grove
                      </label>
                    </div>
                    <div class="col-sm-4 d-flex gap-3 align-items-center">
                      <input
                        id="HomeAreas"
                        type="checkbox"
                        name="Admin Offices"
                        value="Admin Offices"
                        onChange={(e) => onChange(e)}
                        className="form-check-input"
                      />
                      <label
                        className="responsive-input-text"
                        style={{ whiteSpace: "nowrap" }}
                      >
                        Cherry Orchard
                      </label>
                    </div>
                    <div class="col-sm-4 d-flex gap-3 align-items-center">
                      <input
                        id="AdminOffices"
                        type="checkbox"
                        name="Other"
                        value="Other"
                        onChange={(e) => onChange(e)}
                        className="form-check-input"
                      />
                      <label
                        className="responsive-input-text"
                        style={{ whiteSpace: "nowrap" }}
                      >
                        Admin Offices
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Q4: What is the purpose of your visit? */}
              {isAdminOfficeClick && (
                <div className="mb-3 mb-md-5 d-flex flex-column flex-sm-row justify-content-between  gap-2">
                  <div
                    className="txt-primary responsive-label-text"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    Which department are you visiting?
                  </div>
                  <select
                    className="form-select responsive-input-text"
                    aria-label="Default select example"
                    id="DepartmentVisit"
                    value={DepartmentVisit}
                    onChange={(e) => onChange(e)}
                  >
                    <option value={"Administration"}>Administration </option>
                    <option value={"Finance"}>Finance </option>
                    <option value={"Human Resources"}>Human Resources </option>
                    <option value={"Maintenance"}>Maintenance </option>
                    <option value={"Resident Services"}>
                      Resident Services{" "}
                    </option>
                  </select>
                </div>
              )}

              {/* Q2: Is your visit Scheduled or Unscheduled? */}
              <div className="mb-3 mb-md-5 d-flex flex-column flex-sm-row gap-2">
                <div
                  className="txt-primary w-20 responsive-label-text"
                  style={{ whiteSpace: "nowrap" }}
                >
                  Is your visit?
                </div>
                <div class="w-100">
                  <div class="w-70 row">
                    <div class="col-sm-4 d-flex gap-3 align-items-center">
                      <input
                        id="ScheduledVisit"
                        type="radio"
                        name="options"
                        value={true}
                        onChange={(e) => onChange(e)}
                        className="form-check-input"
                      />
                      <label className="responsive-input-text">Scheduled</label>
                    </div>
                    <div class="col-sm-4 d-flex gap-3 align-items-center">
                      <input
                        id="ScheduledVisit"
                        type="radio"
                        name="options"
                        value={false}
                        onChange={(e) => onChange(e)}
                        className="form-check-input"
                      />
                      <label className="responsive-input-text">
                        Unscheduled
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Q3: What is the purpose of your visit? */}
              <div className="mb-3 mb-md-5 d-flex flex-column flex-sm-row  gap-2">
                <div
                  className="txt-primary w-50 responsive-label-text"
                  style={{ whiteSpace: "nowrap" }}
                >
                  What is the purpose of your visit?
                </div>
                <select
                  className="form-select responsive-input-text"
                  aria-label="Default select example"
                  id="Purpose"
                  value={Purpose}
                  onChange={(e) => onChange(e)}
                >
                  <option value={"Caregiver"}>Caregiver </option>
                  <option value={"Contractor/Supplier"}>
                    Contractor/Supplier{" "}
                  </option>
                  <option value={"Funeral Assistance"}>
                    Funeral Assistance{" "}
                  </option>
                  <option value={"General Visitor"}>General Visitor </option>
                  <option value={"Student"}>Student </option>
                  <option value={"Transportation"}>Transportation </option>
                  <option value={"Volunteer "}>Volunteer </option>
                </select>
              </div>

              {/* Q3: What is the name of the resident you are visiting? */}
              <div className="mb-3 mb-md-5 d-flex flex-column flex-sm-row  gap-2">
                <div
                  className="txt-primary w-60 responsive-label-text"
                  style={{ whiteSpace: "nowrap" }}
                >
                  What is the name of the resident you are visiting?
                </div>
                <input
                  type="text"
                  className="form-control rounded responsive-input-text"
                  id="ResidentName"
                  placeholder=""
                  value={ResidentName}
                  onChange={(e) => onChange(e)}
                />
              </div>

              {/* Q4: Is this your first visit to Trinity Village Care Center */}
              <div className="mb-3 mb-md-5 d-flex flex-column flex-sm-row  gap-2">
                <div
                  className="txt-primary responsive-label-text"
                  style={{ whiteSpace: "nowrap" }}
                >
                  Is this your first visit to Trinity Village Care Center?
                </div>
                <div class="w-100">
                  <div class="w-50 row">
                    <div
                      class="col-sm-6 d-flex gap-3 align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#popupFirstVisit"
                    >
                      <input
                        id="FirstVisit"
                        type="radio"
                        name="FirstVisit"
                        value={true}
                        className="form-check-input"
                        onChange={(e) => onChange(e)}
                      />
                      <label className="responsive-input-text ">Yes</label>
                    </div>
                    <div class="col-sm-6 d-flex gap-3 align-items-center">
                      <input
                        id="FirstVisit"
                        type="radio"
                        name="FirstVisit"
                        value={false}
                        className="form-check-input"
                        onChange={(e) => onChange(e)}
                      />
                      <label className="responsive-input-text">No</label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Q5: Do you have any new or worsening respiratory or gastrointestinal symptoms */}
              <div className="mb-3 mb-md-5  d-flex flex-column gap-2">
                <div className="txt-primary w-100 responsive-label-text">
                  Do you have any new or worsening respiratory or
                  gastrointestinal symptoms?
                </div>
                <div class="">
                  <div class="w-70 row">
                    <div
                      class="col-sm-3 d-flex gap-3 align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#popupSymtomp"
                    >
                      <input
                        id="SicknessSymptom"
                        type="radio"
                        name="SicknessSymptom"
                        value={true}
                        className="form-check-input"
                        onChange={(e) => onChange(e)}
                      />
                      <label className="responsive-input-text">Yes</label>
                    </div>
                    <div class="col-sm-3 d-flex gap-3 align-items-center">
                      <input
                        id="SicknessSymptom"
                        type="radio"
                        name="SicknessSymptom"
                        value={false}
                        className="form-check-input"
                        onChange={(e) => onChange(e)}
                      />
                      <label className="responsive-input-text">No</label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Checkbox: Please tick this box to acknowledge that you will follow all staff directions during your visit*/}
              <div className="mb-3 mb-md-5 d-flex align-items-center justify-content-center gap-3">
                <input
                  id="Acknowledgement"
                  type="checkbox"
                  name="Acknowledgement"
                  value={true}
                  className="form-check-input"
                  onChange={(e) => onChange(e)}
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
              <AnonymousConfirm isSignedIn={isSignedIn} />
            </>
          )}

          {/* Validation error message */}
          <div className="mb-3 mb-md-5 d-flex align-items-center justify-content-center gap-3">
            {error && (
              <span className="responsive-error-text text-danger">{error}</span>
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

AnonymousLogin.propTypes = {
  setAlert: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {
  setAlert,
})(AnonymousLogin);
