import React from "react";

const AnonymousConfirm = ({ isSignedIn, formData, isSignedOut }) => {
  const {SicknessSymptom} = formData;
  return (
    <>
      <div className="w-100 d-flex flex-column justify-content-center align-item-center p-5 gap-4">
        {isSignedIn && (
          <>
            <h4 className={`${SicknessSymptom === 'true'?'txt-danger':'txt-primary'} responsive-confirmation-heading text-center`}>
            {SicknessSymptom === 'true'? "Wait!":"Have a wonderful visit."} 
            </h4>
            <div className="responsive-disclaimer-text text-center">
              {SicknessSymptom === 'true'? "Please do not enter the building until your symptoms have resolved. You indicated yes that you have new or worsening respiratory or gastrointestinal symptoms.":"Thank you for signing in today. Please remember to sign out when you are leaving the building"} 
            </div>
          </>
        )}

        {isSignedOut && (
          <>
            <h4 className="txt-primary responsive-confirmation-heading text-center">
              Thank you for your visit.
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
