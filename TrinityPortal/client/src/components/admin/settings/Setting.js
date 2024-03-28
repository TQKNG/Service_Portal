import React, { useState, Fragment } from "react";
import VolumeController from "../../layouts/Slider";
import Toogle from "../../layouts/Toogle";

const Setting = () => {
  const [checked, setChecked] = useState(false);
  const [formData, setFormData] = useState({
    volumeMax: null,
    volumeMin: null,
    language: "",
    outbreakStatus: "",
    outbreakMessage1: "",
    outbreakMessage2: "",
  });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const {
    volumeMax,
    volumeMin,
    language,
    outbreakStatus,
    outbreakMessage1,
    outbreakMessage2,
  } = formData;
  return (
    <Fragment>
      <div className="p-sm-5 p-2 w-100 dashboard-margin">
        <div className="mb-3 ">
          <div className="d-flex align-items-center">
            <h6 className="txt-primary-light mb-0">Admin / Setting</h6>{" "}
          </div>
        </div>
        <div className="card w-100 p-2 p-sm-3 p-lg-5 shadow-lg border-0 users-list d-flex justify-content-between overflow-y-auto overflow-x-hidden">
          <div className="row">
            {/* General Settings */}
            <div className="col-12 col-md-4 d-flex flex-column">
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
                    <div className="txt-primary">Volume Max {""}</div>
                    <div className="d-flex gap-3">
                      <div className="col-9">
                        <VolumeController volume={volumeMax} setFormData={setFormData} type={"Max"}/>
                      </div>
                      <div className="w-100">
                        <input
                          id="volumeMax"
                          className="w-100 form-control rounded "
                          value={volumeMax}
                          min={0}
                          max={100}
                          type="number"
                          placeholder="Max."
                          required
                          onChange={onChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="txt-primary">Volume Min {""}</div>
                    <div className="d-flex gap-3">
                      <div className="col-9">
                        <VolumeController volume={volumeMin} setFormData type={"Min"}  />
                      </div>
                      <div className="w-100">
                        <input
                          id="volumeMin"
                          className="w-100 form-control rounded "
                          value={volumeMin}
                          min={0}
                          max={100}
                          type="number"
                          placeholder="Min."
                          required
                          onChange={onChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="txt-primary">Language</div>
                    <select
                      className="form-select form-control bg-white text-main m-0"
                      aria-label="Default select example"
                      // value={year}
                      id="language"
                      // onChange={(e) => setYear(parseInt(e.target.value))}
                    >
                      <option value={1}>English</option>
                      <option value={2}>French</option>
                      <option value={3}>German</option>
                      <option value={4}>Chinese</option>
                    </select>
                  </div>
                </>
              </form>
            </div>

            {/* Outbreak Settings */}
            <div className="col-12 col-md-8 d-flex flex-column">
              <h6>Outbreak Settings</h6>
              {/* Form Content */}
              <form
                className="w-100 p-2 p-sm-3 p-lg-4 shadow-lg  mb-2 overflow-auto d-flex flex-column gap-2 justify-content-around"
                style={{ minHeight: "400px" }}
                // onSubmit={(e) => onSubmit(e)}
              >
                {/* Fields */}
                <>
                  <div className="mb-3">
                    <div className="txt-primary">Outbreak Status {""}</div>
                    {/* Toogle */}
                    <div
                      className="d-flex p-0 align-items-center"
                      style={{ maxWidth: "100px" }}
                    >
                      <Toogle
                        checked={checked}
                        setChecked={setChecked}
                        labels={["Yes", "No"]}
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="txt-primary">Outbreak Message 1</div>
                    <input
                      type="text"
                      className="form-control rounded "
                      id="message1"
                      placeholder="Enter outbreak message 1"
                      required
                      // value={Name}
                      // onChange={(e) => onChange(e)}
                    />
                  </div>
                  <div className="mb-3">
                    <div className="txt-primary">Outbreak message 2</div>
                    <input
                      type="text"
                      className="form-control rounded "
                      id="message1"
                      placeholder="Enter outbreak message 2"
                      required
                      // value={Name}
                      // onChange={(e) => onChange(e)}
                    />
                  </div>
                </>
              </form>
            </div>
          </div>
          <div className="row">
            {/* Buttons */}
            <div className="d-flex align-items-center justify-content-center gap-2">
              <>
                {/* Save */}
                <button
                  type="submit"
                  className="button-primary btn-block btn px-5"
                >
                  Save
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
              </>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Setting;
