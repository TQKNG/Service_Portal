import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useLocation, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

// Components
import AnonymousLogin from "./AnonymousLogin";
import AnonymousLogout from "./AnonymousLogout";
import { loadSettingsList } from "../../actions/admin";
import useWebSocket from "../../services/WebSocketService";

const Anonymous = ({
  isOutbreak,
  selectedMessage,
  outbreakMessage1,
  outbreakMessage2,
  otherMessage1,
  otherMessage2,
  otherMessage3,
  otherMessage4,
  offices,
  loadSettingsList,
}) => {
  const location = useLocation();
  const [device, setDetectDevice] = useState("Unknown");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isSignedOut, setIsSignedOut] = useState(false);

  // WebSocket client Config

  // Socket implementation without heartbeat
  const { connect, disconnect, sendMessage, onMessage } = useWebSocket(
    `wss:trinityvillagedev.azurewebsites.net`
    // `wss:${window.location.hostname}:5001`
    // `ws://192.168.50.96:5001`
  );

  useEffect(() => {
    connect();

    disconnect();
  }, []);

  useEffect(() => {
    const HEARTBEAT_INTERVAL = 30000;
    const handleIncomingMessage = (data) => {
      const formatedMessage = JSON.parse(data);

      if (formatedMessage.type === "settingsUpdated") {
        loadSettingsList();
      } else if (
        formatedMessage.type === "voiceCommand" &&
        formatedMessage.data?.commandID === 1
      ) {
        console.log("Sign In", formatedMessage.data.commandID);
        setIsSignedIn(true);
        setIsSignedOut(false);
      } else if (
        formatedMessage.type === "voiceCommand" &&
        formatedMessage.data?.commandID === 2
      ) {
        setIsSignedIn(false);
        setIsSignedOut(true);
      } else if (
        formatedMessage.type === "voiceCommand" &&
        formatedMessage.data?.commandID === 3
      ) {
        setIsSignedIn(false);
        setIsSignedOut(false);
      }
    };

    onMessage(handleIncomingMessage);

    // Hearbeat implementation
    const sendHeartbeat = () => {
      sendMessage("heartbeat");
    };

    const heartbeatInterval = setInterval(sendHeartbeat, HEARTBEAT_INTERVAL);

    return () => {
      // Clean up subscription
      onMessage(null);
      clearInterval(heartbeatInterval);
    };
  }, [onMessage]);

  // Socket implementation with heartbeat
  // const HEARTBEAT_INTERVAL = 30000;
  // useEffect(() => {
  //   const handleIncomingMessage = (data) => {
  //     const formatedMessage = JSON.parse(data);

  //     if(formatedMessage.type === "settingsUpdated"){
  //       loadSettingsList();
  //     }
  //     else if(formatedMessage.type === "voiceCommand" && formatedMessage.data?.commandID === 1 ){
  //       console.log("Sign In", formatedMessage.data.commandID);
  //       setIsSignedIn(true);
  //       setIsSignedOut(false);
  //     }
  //     else if(formatedMessage.type === "voiceCommand" && formatedMessage.data?.commandID === 2 ){
  //       setIsSignedIn(false);
  //       setIsSignedOut(true);
  //     }
  //     else if(formatedMessage.type === "voiceCommand" && formatedMessage.data?.commandID === 3 ){
  //       setIsSignedIn(false);
  //       setIsSignedOut(false);
  //     }
  //   };

  //   const sendHeartbeat = () => {
  //     sendMessage('heartbeat');
  //   };

  //   const heartbeatInterval = setInterval(sendHeartbeat, HEARTBEAT_INTERVAL);

  //   connect();

  //   onMessage(handleIncomingMessage);

  //   return () => {
  //     // Clean up subscription and interval
  //     disconnect();
  //     onMessage(null);
  //     clearInterval(heartbeatInterval);
  //   };
  // }, [onMessage]);

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

  useEffect(() => {
    console.log("Load Settings", isOutbreak);
    loadSettingsList();
  }, []);

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
              {isOutbreak ? `${outbreakMessage2}` : `${outbreakMessage1}`}
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
          <div className="w-100 d-flex gap-0 justify-content-around m-3 mb-sm-3 mb-md-5">
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

          {/* Outbreak message footer*/}
          <div
            className={`w-100 d-flex flex-column ${
              isOutbreak ? "my-1" : "justify-content-end flex-grow-1"
            } align-items-center`}
          >
            {isOutbreak && (
              <>
                <div
                  className="w-80 d-flex justify-content-center align-items-center responsive-disclaimer-text"
                  style={{ border: "3px solid red", padding: "10px" }}
                >
                  PLEASE READ these instructions:
                  <br />
                  <br />
                  {selectedMessage === 1
                    ? otherMessage1
                    : selectedMessage === 2
                    ? otherMessage2
                    : selectedMessage === 3
                    ? otherMessage3
                    : otherMessage4}
                </div>
              </>
            )}
          </div>
          {/* QR */}
          <div className="w-100 d-flex flex-column gap-0 align-items-center justify-content-center p-2 p-sm-3 p-lg-4 mt-sm-1 mt-md-5">
            <img
              src={process.env.PUBLIC_URL + `/qrForm.png`}
              alt="QR Code"
              style={{ maxWidth: "30%", height: "auto" }}
            />
          </div>

          {/* Hero cover */}
          {/* {!isOutbreak && (
            <img
              src={process.env.PUBLIC_URL + `images/Welcome-Hero.png`}
              alt="hero cover"
              style={{ width: "100%", height: "auto", objectFit: "cover" }}
            />
          )} */}
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
            <AnonymousLogin
              device={device}
              isSignedIn={isSignedIn}
              offices={offices}
            />
          )}
          {isSignedOut && (
            <AnonymousLogout device={device} isSignedOut={isSignedOut} />
          )}
          <div className="d-flex flex-column gap-0 align-items-center w-100 justify-content-end flex-grow-1">
            {/* <img
              src={process.env.PUBLIC_URL + `images/Welcome-Hero.png`}
              alt="hero cover"
              style={{ width: "100%", height: "auto", objectFit: "cover" }}
            /> */}
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
  selectedMessage: PropTypes.number.isRequired,
  otherMessage1: PropTypes.string.isRequired,
  otherMessage2: PropTypes.string.isRequired,
  otherMessage3: PropTypes.string.isRequired,
  otherMessage4: PropTypes.string.isRequired,
  offices: PropTypes.array.isRequired,
  loadSettingsList: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isOutbreak: !!state.admin.settingsList.OutbreakStatus,
  outbreakMessage1: state.admin.settingsList.OutbreakMessage?.outBreakMessage1,
  outbreakMessage2: state.admin.settingsList.OutbreakMessage?.outBreakMessage2,
  selectedMessage: state.admin.settingsList.SelectedMessage,
  otherMessage1: state.admin.settingsList.OtherMessage?.otherMessage1,
  otherMessage2: state.admin.settingsList.OtherMessage?.otherMessage2,
  otherMessage3: state.admin.settingsList.OtherMessage?.otherMessage3,
  otherMessage4: state.admin.settingsList.OtherMessage?.otherMessage4,
  offices: state.admin.settingsList.AdminOffices,
});

export default connect(mapStateToProps, {
  loadSettingsList,
})(Anonymous);
