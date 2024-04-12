import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useLocation, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

// Components
import AnonymousLogin from "./AnonymousLogin";
import AnonymousLogout from "./AnonymousLogout";

const Anonymous = () => {
  const location = useLocation();
  const [device, setDetectDevice] = useState("Unknown");
  const [isOutbreak, setIsOutbreak] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isSignedOut, setIsSignedOut] = useState(false);

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
      {!isSignedIn &&!isSignedOut ? (
        <>
          {/* Header */}
          <div
            className={`w-100 d-flex align-items-center justify-content-center ${
              isOutbreak ? `bg-red` : `bg-dark-sea-green`
            }  p-2 p-sm-3 p-lg-4`}
          >
            {/* Title */}
            <span className="responsive-text text-white text-center">
              {isOutbreak
                ? `We are currently in outbreak`
                : `There are currently no active outbreaks in the homes`}
            </span>
          </div>

          {/* Welcome Panel */}
          <div className={`w-100 d-flex flex-column gap-0 align-items-center justify-content-center p-2 p-sm-3 p-lg-4 mb-5`}>
            <h1 className="responsive-heading">Welcome to</h1>
            <img
              src={process.env.PUBLIC_URL + `/images/logo.png`}
              alt="trinity-logo"
              className="m-0"
              style={{ maxWidth: "100%", height: "auto", objectFit: "cover" }}
            />
          </div>

          {/* Warning text */}
          <div className="w-80 d-flex flex-column mb-5">
            <h5 className="responsive-sub-text">Please sanitize your hands.</h5>
            <h5 className="responsive-sub-text">Masks are recommended</h5>
            <h5 className="responsive-sub-text">but not mandatory.</h5>
          </div>

          {/* Sign In Sign Out Buttons */}
          <div className="w-100 d-flex gap-0 justify-content-around mb-5">
            {/* In */}
            <button
              className="w-30 bg-dark-green text-white btn-lg btn-block btn custom-btn p-5 d-flex align-items-center justify-content-center"
              onClick={() => setIsSignedIn(true)}
            >
              <span className="responsive-btn-text text-center">Sign In</span>
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
            <button className="w-30 bg-pale-yellow btn-lg btn-block btn p-5 d-flex align-items-center justify-content-center"
            onClick={() => setIsSignedOut(true)}
            >
              <span className="responsive-btn-text">Sign Out</span>
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
          <div className="w-100 d-flex flex-column gap-0 align-items-center justify-content-start p-2 p-sm-3 p-lg-4 my-5">
            <img
              src={process.env.PUBLIC_URL + `/qrForm.png`}
              alt="QR Code"
              style={{ maxWidth: "30%", height: "auto" }}
            />
          </div>

          {/* Hero cover */}
          <div className="w-100 d-flex flex-column gap-0 align-items-center justify-content-end flex-grow-1">
            {isOutbreak ? (
              <>
                <div className="d-flex responsive-disclaimer-text p-5">
                  PLEASE READ these instructions:
                  <br />
                  <br />
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi
                  quam magni eaque sint officiis unde eius nesciunt sapiente
                  porro, voluptates perferendis est delectus tempore.
                  Perferendis voluptatibus natus error impedit facere neque
                  dolor minima. Porro expedita qui explicabo provident, ipsum
                  quaerat odio nobis maiores eaque quae excepturi hic, amet
                  similique aperiam.
                </div>
              </>
            ) : (
              <img
                src={process.env.PUBLIC_URL + `images/Welcome-Hero.png`}
                alt="hero cover"
                style={{ width: "100%", objectFit: "cover" }}
              />
            )}
          </div>
        </>
      ) : (
        <>
          {/* Header */}
          <div
            className={`w-100 d-flex align-items-center justify-content-start bg-dark-sea-green
              p-2 p-sm-3 p-lg-4 gap-4`}
          >
            {/* Back Button */}
            <div className="bg-pale-yellow rounded-circle text-center d-flex align-items-center justify-content-center admin-assessments-type"
              onClick={() => {
                setIsSignedIn(false)
                setIsSignedOut(false)
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
              >
                <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
              </svg>
            </div>
            {/* Title */}
            <span className="responsive-text text-white text-center">Exit</span>
          </div>

          {/* Welcome Panel */}
          <div className="w-100 d-flex flex-row gap-0 align-items-center  p-2 p-sm-3 p-lg-4 my-4 gap-4">
            <h1 className="w-30 text-center" style={{fontSize:"50px", fontWeight:"800" ,marginRight:"15rem"}}>{isSignedIn?"SIGN IN":isSignedOut&&"SIGN OUT"}</h1>
            <img
              src={process.env.PUBLIC_URL + `/images/logo.png`}
              alt="trinity-logo"
              className="m-0"
              style={{ maxWidth: "50%", height: "auto", objectFit: "cover" }}
            />
          </div>
          {isSignedIn && <AnonymousLogin device={device} isSignedIn={isSignedIn} />}
          {isSignedOut && <AnonymousLogout device={device} isSignedOut={isSignedOut} />}
        </>
      )}
    </div>
  );
};

Anonymous.propTypes = {};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(Anonymous);
