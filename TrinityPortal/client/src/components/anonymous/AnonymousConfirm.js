import React from "react";

const AnonymousConfirm = () => {
  return (
    <>
      <div className="w-100 d-flex flex-column justify-content-center align-item-center p-5 gap-4">
        <h4 className="txt-primary responsive-heading text-center">
          Have a wonderful visit !!!
        </h4>
        <div className="responsive-disclaimer-text">
          Thank you for signing in today. Please remember to sign out when you
          are leaving the building
        </div>
      </div>
    </>
  );
};

export default AnonymousConfirm;
