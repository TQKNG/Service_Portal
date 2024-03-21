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
        <div className="mb-3 ">
          <h6 className="txt-primary-light">Reception Check-In Form</h6>
          <div className="d-sm-flex  w-100 align-items-center justify-content-between">
            <div className="d-flex mb-2 mb-sm-0">
              <h4 className="m-0">
                
              </h4>
            </div>
          </div>
        </div>
        {/* Form Content */}
        <form
          className="card w-100 p-2 p-sm-3 p-lg-4 shadow-lg border-0  mb-2 "
          onSubmit={(e) => onSubmit(e)}
        >
          <Alert />
          <div className="mb-3">
            <div className="txt-primary">ID</div>
            <input
              type="text"
              className="form-control rounded "
              id="AlternativeID"
              placeholder="Enter an Alternative ID..."
              value={AlternativeID}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="mb-3">
            <div className="txt-primary">Phone Number</div>
            <input
              type="tel"
              className="form-control rounded "
              id="FirstName"
              placeholder="Enter First Name..."
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
              placeholder="Enter Last Name..."
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
              Save
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
