import React, { Fragment } from "react";

const Setting = () => {
  return (
    <Fragment>
      <div className="p-sm-5 p-2 w-100 dashboard-margin">
        <div className="mb-3 ">
          <div className="d-flex align-items-center">
            <h6 className="txt-primary-light mb-0">Admin / Setting</h6>{" "}
          </div>
        </div>
        <div className="card w-100 p-2 p-sm-3 p-lg-5 shadow-lg border-0 users-list">
          <div className="row">
            <div className="col-4 d-flex flex-column">
              <h6>General Settings</h6>
              {/* Form Content */}
              <form
                className="w-100 p-2 p-sm-3 p-lg-4 shadow-lg  mb-2 overflow-auto d-flex flex-column gap-2 justify-content-around"
                style={{ minHeight: "400px" }}
                // onSubmit={(e) => onSubmit(e)}
              >
                {/* Fields */}
                <>
                  <div className="mb-3">
                    <div className="txt-primary">Volume {""}</div>
                    <input
                      type="text"
                      className="form-control rounded "
                      id="AlternativeID"
                      // value={device}
                      disabled
                      // onChange={(e) => onChange(e)}
                    />
                  </div>
                  <div className="mb-3">
                    <div className="txt-primary">Language</div>
                    <input
                      type="tel"
                      className="form-control rounded "
                      id="PhoneNumber"
                      placeholder="Enter your phone..."
                      required
                      // value={PhoneNumber}
                      // onChange={(e) => onChange(e)}
                    />
                  </div>
                  <div className="mb-3">
                    <div className="txt-primary">Others</div>
                    <input
                      type="text"
                      className="form-control rounded "
                      id="FullName"
                      placeholder="Enter Full Name..."
                      required
                      // value={FullName}
                      // onChange={(e) => onChange(e)}
                    />
                  </div>
                  <div className="mb-3">
                    <div className="txt-primary">Email</div>
                    <input
                      type="Email"
                      className="form-control rounded "
                      id="Email"
                      placeholder="Enter Email..."
                      required
                      // value={Email}
                      pattern="(?![_.-])((?![_.-][_.-])[a-zA-Z\d_.-]){0,63}[a-zA-Z\d]@((?!-)((?!--)[a-zA-Z\d-]){0,63}[a-zA-Z\d]\.){1,2}([a-zA-Z]{2,14}\.)?[a-zA-Z]{2,14}"
                      // onChange={(e) => onChange(e)}
                    />
                  </div>
                </>

                {/* Buttons */}
                <div className="d-flex align-items-center justify-content-center gap-2">
                  <>
                    {/* In */}
                    <button
                      type="submit"
                      className="button-primary btn-block btn px-5"
                    >
                      In
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24"
                        viewBox="0 -960 960 960"
                        width="24"
                        fill="currentColor"
                      >
                        <path d="M480-120v-80h280v-560H480v-80h280q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H480Zm-80-160-55-58 102-102H120v-80h327L345-622l55-58 200 200-200 200Z" />
                      </svg>
                    </button>
                    {/* Out */}
                  </>
                </div>
              </form>
            </div>
            <div className="col-8">
              <h6>Schedule a Visit</h6>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Setting;
