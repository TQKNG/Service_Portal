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
    setDetectDevice(device);

  }, [location]);

  return (
    <div className="w-100 h-100 d-flex align-items-center justify-content-center">
      {location.pathname === "/anonymousform" && (
        <AnonymousForm device={device} />
      )}
    </div>
  );
};

Anonymous.propTypes = {};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(Anonymous);
