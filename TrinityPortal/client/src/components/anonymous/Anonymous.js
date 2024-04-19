import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useLocation, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

// Components
import AnonymousLogin from "./AnonymousLogin";
import AnonymousLogout from "./AnonymousLogout";
import { loadSettingsList } from "../../actions/admin";
import useWebSocket from "../../services/WebSocketService";

const Anonymous = ({isOutbreak, outbreakMessage1,outbreakMessage2, offices,loadSettingsList}) => {
  const location = useLocation();
  const [device, setDetectDevice] = useState("Unknown");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isSignedOut, setIsSignedOut] = useState(false);

   // WebSocket Config
   const { connect, disconnect, sendMessage, onMessage } = useWebSocket(
    `ws:${window.location.hostname}:5001`
  );

  useEffect(() => {
    connect();

    disconnect();
  }, []);

  useEffect(() => {
    const handleIncomingMessage = (data) => {

      const convertedData = JSON.parse(data).data;

      console.log("Test converted Data", convertedData);

      loadSettingsList();

    };

    onMessage(handleIncomingMessage);

    return () => {
      // Clean up subscription
      onMessage(null);
    };
  }, [onMessage]);

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

  useEffect(()=>{
    console.log("Load Settings", isOutbreak)
    loadSettingsList();
  },[])

  return (
    <div className="w-100 h-100 d-flex flex-column align-items-center justify-content-start">
      {!isSignedIn && !isSignedOut ? (
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
                ? `${outbreakMessage2}`
                : `${outbreakMessage1}`}
            </span>
          </div>

          {/* Welcome Panel */}
          <div
            className={`w-100 d-flex flex-column align-items-center justify-content-center p-2 p-sm-3 p-lg-4 mb-4 mb-md-5`}
          >
            <h1 className="responsive-heading">Welcome to</h1>
            <img
              src={process.env.PUBLIC_URL + `/images/logo.png`}
              alt="trinity-logo"
              className="m-0"
              style={{ maxWidth: "100%", height: "auto", objectFit: "cover" }}
            />
          </div>

          {/* Warning text */}
          <div className="w-80 d-flex flex-column mb-4">
            <h5 className="responsive-sub-text">Please sanitize your hands.</h5>
            <h5 className="responsive-sub-text">Masks are recommended</h5>
            <h5 className="responsive-sub-text">but not mandatory.</h5>
          </div>

          {/* Sign In Sign Out Buttons */}
          <div className="w-100 d-flex gap-0 justify-content-around m-3 mb-sm-3">
            {/* In */}
            <button
              className="w-30 bg-dark-green text-white btn-block btn custom-btn p-4 p-md-5 d-flex align-items-center justify-content-center"
              onClick={() => setIsSignedIn(true)}
              style={{ whiteSpace: "nowrap" }}
            >
              <span className="responsive-btn-text text-center">Sign In</span>
            </button>
            {/* Out */}
            <button
              className="w-30 bg-pale-yellow  btn-block btn p-4 p-md-5 d-flex align-items-center justify-content-center"
              onClick={() => setIsSignedOut(true)}
              style={{ whiteSpace: "nowrap" }}
            >
              <span className="responsive-btn-text text-center">Sign Out</span>
            </button>
          </div>

          {/* QR */}
          <div className="w-100 d-flex flex-column gap-0 align-items-center justify-content-center p-2 p-sm-3 p-lg-4">
            <img
              src={process.env.PUBLIC_URL + `/qrForm.png`}
              alt="QR Code"
              style={{ maxWidth: "30%", height: "auto" }}
            />
          </div>

          {/* Hero cover */}
          <div className="w-100 d-flex flex-column justify-content-end flex-grow-1 gap-0 align-items-center ">
            {isOutbreak ? (
              <>
                <div className="w-80 d-flex justify-content-center align-items-center responsive-disclaimer-text my-sm-5 my-4" >
                    PLEASE READ these instructions:
                    <br />
                    <br />
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Nisi quam magni eaque sint officiis unde eius nesciunt
                    sapiente porro, voluptates perferendis est delectus tempore.
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
                style={{ width: "100%", height:"auto", objectFit: "cover"}}
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
            <div
              className="bg-pale-yellow rounded-circle text-center d-flex align-items-center justify-content-center admin-assessments-type"
              onClick={() => {
                setIsSignedIn(false);
                setIsSignedOut(false);
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
          <div className="w-100 d-flex flex-row align-items-center justify-content-between p-3 p-sm-5">
            <h1
              className="w-100 text-left responsive-signinout-text"
              style={{
                whiteSpace: "nowrap",
              }}
            >
              {isSignedIn ? "SIGN IN" : isSignedOut && "SIGN OUT"}
            </h1>
            <div className="w-100 d-flex justify-content-end">
              <img
                src={process.env.PUBLIC_URL + `/images/logo.png`}
                alt="trinity-logo"
                className="img-fluid m-0"
                style={{ maxWidth: "95%", height: "auto", objectFit: "cover" }}
              />
            </div>
          </div>
          {isSignedIn && (
            <AnonymousLogin device={device} isSignedIn={isSignedIn} offices={offices} />
          )}
          {isSignedOut && (
            <AnonymousLogout device={device} isSignedOut={isSignedOut} />
          )}
          <div className="d-flex flex-column gap-0 align-items-center w-100 justify-content-end flex-grow-1">
            <img
              src={process.env.PUBLIC_URL + `images/Welcome-Hero.png`}
              alt="hero cover"
              style={{ width: "100%", height: "auto", objectFit: "cover" }}
            />
          </div>
        </>
      )}
    </div>
  );
};

Anonymous.propTypes = {
  isOutbreak: PropTypes.bool.isRequired,
  outbreakMessage1: PropTypes.string.isRequired,
  outbreakMessage2: PropTypes.string.isRequired,
  offices: PropTypes.array.isRequired,
  loadSettingsList: PropTypes.func.isRequired,

};

const mapStateToProps = (state) => ({
  isOutbreak: state.admin.settingsList.OutbreakStatus,
  outbreakMessage1: state.admin.settingsList.OutbreakMessage?.outBreakMessage1,
  outbreakMessage2: state.admin.settingsList.OutbreakMessage?.outBreakMessage2,
  offices: state.admin.settingsList.Roles
});

export default connect(mapStateToProps, {
  loadSettingsList
})(Anonymous);
