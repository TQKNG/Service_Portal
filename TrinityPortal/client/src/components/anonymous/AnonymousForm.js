import React, { useState } from "react";
import Alert from "../layouts/Alert";
import { setAlert } from "../../actions/alerts";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const AnonymousForm = ({ setAlert }) => {
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    AlternativeID: "",
    Email: "",
  });
  const { FirstName, LastName, Email, AlternativeID } = formData;

  const onChange = (e) => {};

  const onSubmit = (e) => {};

  return (
    <>
      <div className="p-sm-5 p-2 w-100  dashboard-margin mx-lg-auto container">
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
          className=" w-100 p-2 p-sm-3 p-lg-4 shadow-lg  mb-2 "
          onSubmit={(e) => onSubmit(e)}
        >
          <Alert />
          <div className="mb-3">
            <div className="txt-primary">ID</div>
            <input
              type="text"
              className="form-control rounded "
              id="AlternativeID"
              value={AlternativeID}
              disabled
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="mb-3">
            <div className="txt-primary">Phone Number</div>
            <input
              type="tel"
              className="form-control rounded "
              id="FirstName"
              placeholder="Enter your phone..."
              required
              value={FirstName}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="mb-3">
            <div className="txt-primary">FullName</div>
            <input
              type="text"
              className="form-control rounded "
              id="LastName"
              placeholder="Enter Full Name..."
              required
              value={LastName}
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

          <div className="d-flex align-items-center justify-content-center gap-2">
            <button type="submit" className="button-primary btn-block btn px-5">
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
