import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useLocation, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

// Components
import AnonymousForm from "./AnonymousForm";

const Anonymous = () => {
  const location = useLocation();
  const [device, setDetectDevice] = useState("Unknown");

  function detectDevice(userAgent) {
    if (userAgent.match(/Android/i)) {
      return "Android Phone";
    } else if (userAgent.match(/iPhone|iPad/i)) {
      return "iOS Iphone";
    } else if (userAgent.match(/Windows/i)) {
      return "Windows Desktop";
    } else if (userAgent.match(/Macintosh/i)) {
      return "Mac Desktop";
    } else if (userAgent.match(/Linux/i)) {
      return "Linux Desktop";
    } else {
      return "Unknown";
    }
  }

  // Check whether which device access the form
  useEffect(() => {
    const userAgent = navigator.userAgent;
    const device = detectDevice(userAgent);
    setDetectDevice(userAgent);
  }, [location]);

  return (
    <div className="w-100 h-100 d-flex flex-column align-items-center justify-content-start">
      {/* Header */}
      <div className="w-100  d-flex align-items-center justify-content-center bg-dark-sea-green p-2 p-sm-3 p-lg-4">
        {/* Title */}
        <h6 className="text-white">
          There are currently no active outbreaks in the homes
        </h6>
      </div>

      {/* Welcome Panel */}
      <div className="w-100  d-flex flex-column gap-0 align-items-center justify-content-center p-2 p-sm-3 p-lg-4">
        <h1 className="">Welcome to</h1>
        <img
          src={process.env.PUBLIC_URL + `/images/logo.png`}
          alt="trinity-logo"
          className="m-0"
        />
      </div>

      {/* Warning text */}
      <div className="w-100 d-flex flex-column gap-0 align-items-center justify-content-center p-2 p-sm-3 p-lg-4">
        <h5>Please sanitize your hands</h5>
        <h5>Marks are recommended</h5>
        <h5>but not mandatory</h5>
      </div>

      {/* Sign In Sign Out Buttons */}
      <div className="w-100 d-flex gap-4 align-items-center justify-content-center p-2 p-sm-3 p-lg-4">
        {/* In */}
        <button type="submit" className="bg-dark-green text-white btn-lg btn-block btn px-5" style={{minHeight:"100px", width:"300px"}}>
        <span className="h2">Sign In</span>
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
            fill="currentColor"
          >
            <path d="M480-120v-80h280v-560H480v-80h280q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H480Zm-80-160-55-58 102-102H120v-80h327L345-622l55-58 200 200-200 200Z" />
          </svg> */}
        </button>
        {/* Out */}
        <button type="submit" className="bg-pale-yellow btn-lg btn-block btn px-5" style={{minHeight:"100px",width:"300px"}} >
        <span className="h2">Sign Out</span>
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
            fill="currentColor"
          >
            <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
          </svg> */}
        </button>
      </div>

      {/* QR */}
      <div className="w-100 d-flex flex-column gap-0 align-items-center justify-content-start p-2 p-sm-3 p-lg-4">
        <img
          src={process.env.PUBLIC_URL + `/qrForm.png`}
          alt="QR Code"
          style={{ maxWidth: "20%", height: "auto" }} 
        />
      </div>

      {/* Hero cover */}
      <div className="w-100 d-flex flex-column gap-0 align-items-center justify-content-end flex-grow-1">
        <img
          src={process.env.PUBLIC_URL + `images/Login-Hero.jpg`}
          alt="hero cover"
          style={{ maxWidth: "100%", height: "auto",objectFit: "contain" }} 
        />
      </div>
      {/* Form */}
      {/* {location.pathname === "/anonymousform" && (
        <AnonymousForm device={device} />
      )} */}
    </div>
  );
};

Anonymous.propTypes = {};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(Anonymous);
