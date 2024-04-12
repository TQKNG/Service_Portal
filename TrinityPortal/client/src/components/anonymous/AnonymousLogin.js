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
  } = formData;
  const [isRobot, setIsRobot] = useState(false);
  const [isAdminOfficeClick, setIsAdminOfficeClick] = useState(false);
  const [isSicknessSymptom, setIsSicknessSymptom] = useState(false);

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

    if(e.target.id === "AdminOffices"){
      setIsAdminOfficeClick(prevState => !prevState);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    setIsSubmitted(true);
    const updatedFormData = { ...formData, isRobot, isSignedIn,InOut:true };

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
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
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
    {/* Popup */}
     <div
        className='modal fade'
        id='showPopup'
        aria-labelledby='showPopupLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-dialog-centered'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='showPopupLabel' style={{fontSize:"2rem"}}>
               Wait !
              </h5>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body' style={{fontSize:"2rem"}}>
             Please do not enter the building until your symptoms have resolved
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn button-primary'
                onClick={() => {
                
                }}
                data-bs-dismiss='modal'
              >
              Close
              </button>
            </div>
          </div>
        </div>
      </div>

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
                    id="FirstName"
                    placeholder=""
                    value={FirstName}
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
                    id="LastName"
                    placeholder=""
                    value={LastName}
                    onChange={(e) => onChange(e)}
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div className="mb-5 d-flex gap-4">
                <div className="txt-primary responsive-label-text">
                  Phone Number 
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
              <div className="mb-5">
                <div className="txt-primary responsive-label-text">
                  Which home area(s) will you visit today?
                </div>
                <div class="container-fluid">
                  <div class="row">
                    <div class="col-md-4 d-flex gap-3 align-items-center">
                      <input
                        id="HomeAreas"
                        type="checkbox"
                        name="Oak Ridge Orchard"
                        value="Oak Ridge Orchard"
                        className="form-check-input"
                        onChange={(e) => onChange(e)}
                      />
                      <label className="responsive-input-text">
                      Oak Ridge
                      </label>
                    </div>
                    <div class="col-md-4 d-flex gap-3 align-items-center">
                      <input
                        id="HomeAreas"
                        type="checkbox"
                        name="Maple Ridge"
                        value="Maple Ridge"
                        className="form-check-input"
                        onChange={(e) => onChange(e)}
                      />
                      <label className="responsive-input-text">
                      Maple Bush
                      </label>
                    </div>
                    <div class="col-md-4 d-flex gap-3 align-items-center">
                      <input
                        id="HomeAreas"
                        type="checkbox"
                        name="Pine Woods"
                        value="Pine Woods"
                        onChange={(e) => onChange(e)}
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
                        id="HomeAreas"
                        type="checkbox"
                        name="Walnut Groves"
                        value="Walnut Groves"
                        onChange={(e) => onChange(e)}
                        className="form-check-input"
                      />
                      <label className="responsive-input-text">
                      Walnut Grove
                      </label>
                    </div>
                    <div class="col-md-4 d-flex gap-3 align-items-center">
                      <input
                        id="HomeAreas"
                        type="checkbox"
                        name="Admin Offices"
                        value="Admin Offices"
                        onChange={(e) => onChange(e)}
                        className="form-check-input"
                      />
                      <label className="responsive-input-text">
                      Cherry Orchard
                      </label>
                    </div>
                    <div class="col-md-4 d-flex gap-3 align-items-center">
                      <input
                        id="AdminOffices"
                        type="checkbox"
                        name="Other"
                        value="Other"
                        onChange={(e) => onChange(e)}
                        className="form-check-input"
                      />
                      <label className="responsive-input-text">Admin Offices</label>
                    </div>
                 
                  </div>
                </div>
              </div>

                      {/* Q4: What is the purpose of your visit? */}
                      {
                isAdminOfficeClick && (  <div className="mb-5 d-flex gap-2">
                <div
                  className="txt-primary w-50 responsive-label-text"
                  style={{ whiteSpace: "nowrap"}}
                >
                  Which department are you visiting?
                </div>
                <select
                  className="form-select responsive-input-text"
                  aria-label="Default select example"
                  id="Purpose"
                  value={Purpose}
                  onChange={(e) => onChange(e)}
                >
                  <option value={"1"}>Administration </option>
                  <option value={" 3"}>Finance </option>
                  <option value={" 2"}>Human Resources </option>
                  <option value={" 5"}>Maintenance </option>
                  <option value={" 4"}>Resident Services </option>
                </select>
              </div>)
              }

              {/* Q2: Is your visit Scheduled or Unscheduled? */}
              <div className="mb-5 d-flex">
                <div className="txt-primary w-20 responsive-label-text">
                  Is your visit?
                </div>
                <div class="container-fluid">
                  <div class="w-70 row">
                    <div class="col-md-4 d-flex gap-3 align-items-center">
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
                    <div class="col-md-4 d-flex gap-3 align-items-center">
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


              <div className="mb-5 d-flex gap-2">
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
                  <option value={"1"}>Caregiver </option>
                  <option value={" 3"}>Contractor/Supplier </option>
                  <option value={" 5"}>Funeral Assistance </option>
                  <option value={" 2"}>General Visitor </option>
                  <option value={" 4"}>Student </option>
                  <option value={" 2"}>Transportation </option>
                  <option value={" 4"}>Volunteer </option>
                </select>
              </div>

      


              
            

              {/* Q3: What is the name of the resident you are visiting? */}
              <div className="mb-5 d-flex gap-2">
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
              <div className="mb-5 d-flex gap-5">
                <div
                  className="txt-primary w-60 responsive-label-text"
                  style={{ whiteSpace: "nowrap" }}
                >
                  Is this your first visit to Trinity Village Care Center?
                </div>
                <div class="container-fluid">
                  <div class="w-90 row">
                    <div class="col-md-3 d-flex gap-3 align-items-center">
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
                    <div class="col-md-3 d-flex gap-3 align-items-center">
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
              <div className="mb-5 d-flex flex-column">
                <div className="txt-primary w-100 responsive-label-text">
                  Do you have any new or worsening respiratory or
                  gastrointestinal symptoms?
                </div>
                <div class="container-fluid">
                  <div class="w-70 row">
                    <div class="col-md-3 d-flex gap-3 align-items-center"  data-bs-toggle='modal'
                  data-bs-target='#showPopup'>
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
                    <div class="col-md-3 d-flex gap-3 align-items-center">
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
              <div className="mb-5 d-flex align-items-center justify-content-center gap-2">
                <input
                  id="Acknowledgement"
                  type="checkbox"
                  name="Acknowledgement"
                  value={true}
                  className="form-check-input"
                  onChange={(e) => onChange(e)}
                  required
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

          {/* Buttons */}
          <div className="d-flex align-items-center justify-content-center gap-2">
            {!isSubmitted && (
              <>
                {/* Submit*/}
                <button
                  type="submit"
                  className="w-30 bg-dark-green text-white btn-lg btn-block btn custom-btn p-5 d-flex align-items-center justify-content-center"
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
