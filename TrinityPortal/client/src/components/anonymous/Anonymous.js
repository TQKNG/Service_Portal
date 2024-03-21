import React from "react";
import { connect } from "react-redux";
import { useLocation, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

// Components
import AnonymousForm from "./AnonymousForm";


const Anonymous = () => {
  const location = useLocation();

  return (
    <div className="w-100 h-100 d-flex align-items-center justify-content-center">
    
      {location.pathname === "/anonymousform" && <AnonymousForm/>}
     
    </div>
  );
};

Anonymous.propTypes = {
};

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps, {})(Anonymous);
