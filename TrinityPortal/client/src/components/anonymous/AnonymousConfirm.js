import React from "react";

const AnonymousConfirm = ({ isSignedIn, isSignedOut }) => {
  return (
    <>
      <div className="w-100 d-flex flex-column justify-content-center align-item-center p-5 gap-4">
        {isSignedIn && (
          <>
            <h4 className="txt-primary responsive-heading text-center">
              Have a wonderful visit !!!
            </h4>
            <div className="responsive-disclaimer-text text-center">
              Thank you for signing in today. Please remember to sign out when
              you are leaving the building
            </div>
          </>
        )}

        {isSignedOut && (
          <>
            <h4 className="txt-primary responsive-heading text-center">
              Thank you for your visit !!!
            </h4>
            <div className="responsive-disclaimer-text text-center">
              Have a nice day.
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default AnonymousConfirm;
