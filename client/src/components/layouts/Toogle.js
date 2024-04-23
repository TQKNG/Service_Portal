import React, { useState } from "react";

const Toogle = ({ checked, setChecked,labels }) => {
  const handleChange = () => {
    setChecked(!checked);
  };

  return (
    <div className="toggle-container" onClick={handleChange}>
      <div
        className={`dialog-button ${checked?"bg-danger":"bg-primary"} text-white text-truncate m-0 ${
          checked ? "disabled" : ""
        }`}
      >
        {checked ? labels[1] : labels[0]}
      </div>
    </div>
  );
};

export default Toogle;
