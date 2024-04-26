import React, { useState, Fragment, useEffect, useRef } from "react";
import VolumeController from "../../layouts/Slider";
import Toogle from "../../layouts/Toogle";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loadSettingsList, updateSetting } from "../../../actions/admin";
import Loading from "../../layouts/Loading";
import { TimePicker } from "antd";
import moment from "moment";

const Setting = ({
  authUser,
  settingsList,
  settingListLoading,
  updateSetting,
  loadSettingsList,
}) => {
  const [checked, setChecked] = useState(null);
  const lastOfficeRef = useRef(null);
  const [volMaxTR, setVolMaxTR] = useState(null);
  const [volMinTR, setVolMinTR] = useState(null);
  const [formData, setFormData] = useState({
    language: settingsList === null ? "" : settingsList.Language,
    adminOffices:
      settingsList === null
        ? []
        : settingsList.AdminOffices !== undefined
        ? settingsList.AdminOffices
        : [],
    outbreakStatus:
      settingsList === null
        ? 0
        : settingsList.OutbreakStatus !== undefined
        ? settingsList.OutbreakStatus
        : 0,
    volumeSetting:
      settingsList === null
        ? {}
        : settingsList.VolumeSetting !== undefined
        ? settingsList.VolumeSetting
        : {},
    outbreakMessage1:
      settingsList === null
        ? ""
        : settingsList.OutbreakMessage !== undefined
        ? settingsList.OutbreakMessage.outBreakMessage1
        : "",
    outbreakMessage2:
      settingsList === null
        ? ""
        : settingsList.OutbreakMessage !== undefined
        ? settingsList.OutbreakMessage.outBreakMessage2
        : "",
    otherMessage1:
      settingsList === null
        ? ""
        : settingsList.OtherMessage !== undefined
        ? settingsList.OtherMessage.otherMessage1
        : "",
    otherMessage2:
      settingsList === null
        ? ""
        : settingsList.OtherMessage !== undefined
        ? settingsList.OtherMessage.otherMessage2
        : "",
    otherMessage3:
      settingsList === null
        ? ""
        : settingsList.OtherMessage !== undefined
        ? settingsList.OtherMessage.otherMessage3
        : "",
    otherMessage4:
      settingsList === null
        ? ""
        : settingsList.OtherMessage !== undefined
        ? settingsList.OtherMessage.otherMessage4
        : "",
  });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });

    if (e.target.id.includes("title")) {
      let index = e.target.id.replace("title", "");
      console.log("Test index here", index);
      let office = adminOffices[index];
      office.title = e.target.value;
      setFormData({ ...formData, adminOffices: [...adminOffices] });
    }

    if (e.target.id.includes("email")) {
      let index = e.target.id.replace("email", "");
      console.log("Test index here", index);
      let office = adminOffices[index];
      office.email = e.target.value;
      setFormData({ ...formData, adminOffices: [...adminOffices] });
    }

    if (e.target.id === "volumeMax") {
      setFormData((prev) => ({
        ...prev,
        volumeSetting: {
          ...prev.volumeSetting,
          volumeMax: { ...prev.volumeSetting.volumeMax, value: e.target.value },
        },
      }));
    }

    if (e.target.id === "volumeMin") {
      setFormData((prev) => ({
        ...prev,
        volumeSetting: {
          ...prev.volumeSetting,
          volumeMin: { ...prev.volumeSetting.volumeMin, value: e.target.value },
        },
      }));
    }
  };

  const onRemoveOffice = (index) => {
    console.log("Test index", index);
    setFormData({ ...formData }, adminOffices.splice(index, 1));
  };

  const onAddOffice = () => {
    setFormData({ ...formData }, adminOffices.push({ title: "", email: "" }));
  };

  const onChangeTime = (time, timeString) => {
    if (time) {
      // Set volMaxTR to the selected time range
      setVolMaxTR(time);
    } 
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const updatedFormData = {
      ...formData,
      outbreakStatus: checked,
    };
    setFormData(updatedFormData);

    console.log("Test updated form", updatedFormData);
    updateSetting(updatedFormData).then(() => {
      console.log("Settings Updated");
    });
  };

  useEffect(() => {
    if (settingsList.length === 0 && settingListLoading) {
      loadSettingsList();
    }
  }, [settingsList, settingListLoading, loadSettingsList]);

  // Set the form whenever the list available
  useEffect(() => {
    setFormData({
      language: settingsList === null ? "" : settingsList.Language,
      adminOffices:
        settingsList === null
          ? []
          : settingsList.AdminOffices !== undefined
          ? settingsList.AdminOffices
          : [],
      volumeSetting:
        settingsList === null
          ? {}
          : settingsList.VolumeSetting !== undefined
          ? settingsList.VolumeSetting
          : {},
      outbreakStatus:
        settingsList === null
          ? 0
          : settingsList.OutbreakStatus !== undefined
          ? settingsList.OutbreakStatus
          : 0,
      outbreakMessage1:
        settingsList === null
          ? ""
          : settingsList.OutbreakMessage !== undefined
          ? settingsList.OutbreakMessage.outBreakMessage1
          : "",
      outbreakMessage2:
        settingsList === null
          ? ""
          : settingsList.OutbreakMessage !== undefined
          ? settingsList.OutbreakMessage.outBreakMessage2
          : "",
      otherMessage1:
        settingsList === null
          ? ""
          : settingsList.OtherMessage !== undefined
          ? settingsList.OtherMessage.otherMessage1
          : "",
      otherMessage2:
        settingsList === null
          ? ""
          : settingsList.OtherMessage !== undefined
          ? settingsList.OtherMessage.otherMessage2
          : "",
      otherMessage3:
        settingsList === null
          ? ""
          : settingsList.OtherMessage !== undefined
          ? settingsList.OtherMessage.otherMessage3
          : "",
      otherMessage4:
        settingsList === null
          ? ""
          : settingsList.OtherMessage !== undefined
          ? settingsList.OtherMessage.otherMessage4
          : "",
    });
  }, [settingsList]);

  // Set initial outbreak status
  useEffect(() => {
    setChecked(formData.outbreakStatus);
  }, [formData.outbreakStatus]);

  // Set datetime for volume max and min
  useEffect(() => {
    if (formData.volumeSetting) {
      setVolMaxTR(null); // Set initial value to null
      setVolMinTR(null); // Set initial value to null

      if (formData.volumeSetting.volumeMax) {
        setVolMaxTR([
          moment(formData.volumeSetting.volumeMax.startTime),
          moment(formData.volumeSetting.volumeMax.endTime),
        ]);
      }
      setVolMinTR([
        moment(formData.volumeSetting.volumeMin?.startTime),
        moment(formData.volumeSetting.volumeMin?.endTime),
      ]);
    }
  }, [formData.volumeSetting]);

  //Set scroll to the last office even when the office is added or removed
  useEffect(() => {
    if (lastOfficeRef.current) {
      lastOfficeRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [formData.adminOffices, onAddOffice, onRemoveOffice]);

  const {
    volumeSetting,
    language,
    outbreakStatus,
    outbreakMessage1,
    outbreakMessage2,
    otherMessage1,
    otherMessage2,
    otherMessage3,
    otherMessage4,
    adminOffices,
  } = formData;

  return (
    <>
      {settingsList === null ? (
        <div className="d-flex align-items-center h-100 justify-content-center w-100">
          <Loading />
        </div>
      ) : (
        <Fragment>
          <div className="p-sm-5 p-2 w-100 dashboard-margin">
            <div className="mb-3 ">
              <div className="d-flex align-items-center">
                <h6 className="txt-primary-light mb-0">
                  {`${authUser.firstName} ${authUser.lastName}`}/ Setting
                </h6>{" "}
              </div>
            </div>
            <div className="card w-100 p-2 p-sm-3 p-lg-5 shadow-lg border-0 users-list d-flex justify-content-between overflow-y-auto overflow-x-hidden">
              <form
                className="w-100 d-flex flex-column gap-5"
                onSubmit={(e) => onSubmit(e)}
              >
                <div className="row">
                  {/* General Settings */}
                  <div className="col-12 col-md-3 d-flex flex-column">
                    <h6>General Settings</h6>
                    {/* Form Content */}
                    <div
                      className="w-100 p-2 p-sm-3 p-lg-4 shadow-lg  mb-2 overflow-auto d-flex flex-column gap-2 justify-content-start"
                      style={{ height: "500px" }}
                    >
                      {/* Fields */}
                      <>
                        {/* Volume */}
                        <div className="mb-3">
                          {/* Volume Max */}
                          <div className="">
                            <div className="txt-primary">
                              Select Time and Volume Max
                            </div>
                            <TimePicker.RangePicker
                              value={volMaxTR}
                              allowClear={false}
                              needConfirm={false}
                              format="hh A"
                              // When close the time picker, update the selected value to form
                              onOpenChange={(open) => {
                                if (open) {
                                  if (volMaxTR[0] && volMaxTR[1]) {
                                    setFormData((prev) => ({
                                      ...prev,
                                      volumeSetting: {
                                        ...prev.volumeSetting,
                                        volumeMax: {
                                          ...prev.volumeSetting.volumeMax,
                                          startTime: volMaxTR[0],
                                          endTime: volMaxTR[1],
                                        },
                                        volumeMin:{
                                          ...prev.volumeSetting.volumeMin,
                                          startTime: volMaxTR[1],
                                          endTime: volMaxTR[0],
                                        }
                                      },
                                    }));

                                    
                                  }
                                
                                }
                              }}
                              onChange={onChangeTime}
                            />
                            <div className="d-flex gap-3">
                              <div className="col-9">
                                <VolumeController
                                  volume={volumeSetting?.volumeMax?.value}
                                  setFormData={setFormData}
                                  type={"Max"}
                                />
                              </div>
                              <div className="w-100">
                                <input
                                  id="volumeMax"
                                  className="w-100 form-control rounded "
                                  value={volumeSetting.volumeMax?.value}
                                  min={0}
                                  max={100}
                                  type="number"
                                  placeholder="Max."
                                  required
                                  onChange={(e) => onChange(e)}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* Volume Min */}
                        <div className="mb-3">
                          {/* Volume Min */}
                          <div className="">
                            <div className="txt-primary">
                              Select Time and Volume Min
                            </div>
                            <TimePicker.RangePicker
                              disabled
                              allowClear={false}
                              needConfirm={false}
                              value={volMinTR}
                              onOpenChange={(open) => {
                                if (open) {
                                  if (volMinTR[0] && volMinTR[1]) {
                                    setFormData((prev) => ({
                                      ...prev,
                                      volumeSetting: {
                                        ...prev.volumeSetting,
                                        volumeMin: {
                                          ...prev.volumeSetting.volumeMin,
                                          startTime: volMinTR[0],
                                          endTime: volMinTR[1],
                                        },
                                      },
                                    }));
                                  }
                                }
                              }}
                              onChange={onChangeTime}
                              format="hh A"
                            />
                            <div className="d-flex gap-3">
                              <div className="col-9">
                                <VolumeController
                                  volume={volumeSetting.volumeMin?.value}
                                  setFormData={setFormData}
                                  type={"Min"}
                                />
                              </div>
                              <div className="w-100">
                                <input
                                  id="volumeMin"
                                  className="w-100 form-control rounded "
                                  value={volumeSetting.volumeMin?.value}
                                  min={0}
                                  max={100}
                                  type="number"
                                  placeholder="Min."
                                  required
                                  onChange={(e) => onChange(e)}
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="mb-3">
                          <div className="txt-primary">Language</div>
                          <select
                            className="form-select form-control bg-white text-main m-0"
                            aria-label="Default select example"
                            value={language}
                            id="language"
                            onChange={(e) => onChange(e)}
                          >
                            <option value={"English"}>English</option>
                            <option value={"French"}>French</option>
                            <option value={"German"}>German</option>
                            <option value={"Chinese"}>Chinese</option>
                          </select>
                        </div>
                      </>
                    </div>
                  </div>

                  {/* Outbreak Settings */}
                  <div className="col-12 col-md-3 d-flex flex-column">
                    <h6>Outbreak Settings</h6>
                    {/* Form Content */}
                    <div
                      className="w-100 p-2 p-sm-3 p-lg-4 shadow-lg  mb-2 overflow-auto d-flex flex-column gap-2 justify-content-start"
                      style={{ height: "500px" }}
                    >
                      {/* Fields */}
                      <>
                        <div className="mb-3">
                          <div className="txt-primary">
                            Outbreak Status {""}
                          </div>
                          {/* Toogle */}
                          <div
                            className="d-flex p-0 align-items-center"
                            style={{ maxWidth: "100px" }}
                          >
                            <Toogle
                              checked={checked}
                              setChecked={setChecked}
                              labels={["No", "Yes"]}
                            />
                          </div>
                        </div>
                        <div className="mb-3">
                          <div className="txt-primary">Outbreak Message 1</div>
                          <input
                            type="text"
                            className="form-control rounded "
                            id="outbreakMessage1"
                            value={outbreakMessage1}
                            placeholder="Enter outbreak message 1"
                            required
                            onChange={(e) => onChange(e)}
                          />
                        </div>
                        <div className="mb-3">
                          <div className="txt-primary">Outbreak message 2</div>
                          <input
                            type="text"
                            className="form-control rounded "
                            id="outbreakMessage2"
                            value={outbreakMessage2}
                            placeholder="Enter outbreak message 2"
                            required
                            onChange={(e) => onChange(e)}
                          />
                        </div>
                        <div className="mb-3">
                          <div className="txt-primary">Other Message 1</div>
                          <textarea
                            type="text"
                            className="form-control rounded "
                            id="otherMessage1"
                            value={otherMessage1}
                            placeholder="Enter outbreak message 2"
                            required
                            onChange={(e) => onChange(e)}
                          />
                        </div>
                        <div className="mb-3">
                          <div className="txt-primary">Other Message 2</div>
                          <textarea
                            type="text"
                            className="form-control rounded "
                            id="otherMessage2"
                            value={otherMessage2}
                            placeholder="Enter outbreak message 2"
                            required
                            onChange={(e) => onChange(e)}
                          />
                        </div>
                        <div className="mb-3">
                          <div className="txt-primary">Other Message 3</div>
                          <textarea
                            type="text"
                            className="form-control rounded "
                            id="otherMessage3"
                            value={otherMessage3}
                            placeholder="Enter outbreak message 2"
                            required
                            onChange={(e) => onChange(e)}
                          />
                        </div>
                        <div className="mb-3">
                          <div className="txt-primary">Other Message 4</div>
                          <textarea
                            type="text"
                            className="form-control rounded "
                            id="otherMessage4"
                            value={otherMessage4}
                            placeholder="Enter outbreak message 2"
                            required
                            onChange={(e) => onChange(e)}
                          />
                        </div>
                      </>
                    </div>
                  </div>

                  {/* Admin Office Settings */}
                  <div className="col-12 col-md-3 d-flex flex-column">
                    <h6>Admin Office Settings</h6>
                    {/* Form Content */}
                    <div
                      className="w-100 p-2 p-sm-3 p-lg-4 shadow-lg  mb-2 overflow-auto d-flex flex-column gap-2 justify-content-start"
                      style={{ height: "500px" }}
                    >
                      {/* Add icon */}
                      <div
                        className="w-100 mx-auto text-center position-sticky"
                        style={{ top: 0, opacity: 0.8, background: "#1ba587" }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          enableBackground="new 0 0 24 24"
                          height="36px"
                          viewBox="0 0 24 24"
                          width="48px"
                          fill="white"
                          onClick={() => onAddOffice()}
                        >
                          <g>
                            <rect fill="none" height="50" width="50" />
                          </g>
                          <g>
                            <g>
                              <path d="M19,13h-6v6h-2v-6H5v-2h6V5h2v6h6V13z" />
                            </g>
                          </g>
                        </svg>
                      </div>

                      {adminOffices?.map((office, index) => {
                        const isLastItem = index === adminOffices.length - 1;
                        return (
                          <div
                            className="mb-3"
                            ref={isLastItem ? lastOfficeRef : null}
                          >
                            <div className="d-flex justify-content-between">
                              <div className="txt-primary">{`Office ${
                                index + 1
                              }`}</div>

                              <div
                                id={`${index}`}
                                onClick={() => onRemoveOffice(index)}
                              >
                                {/* Remove Icon */}
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  height="24"
                                  viewBox="0 -960 960 960"
                                  width="24"
                                  fill="salmon"
                                >
                                  <path d="M200-440v-80h560v80H200Z" />
                                </svg>
                              </div>
                            </div>
                            <input
                              type="text"
                              className="form-control rounded mb-1"
                              id={`title${index}`}
                              placeholder=""
                              value={office.title}
                              onChange={(e) => onChange(e)}
                            />
                            <input
                              type="text"
                              className="form-control rounded "
                              id={`email${index}`}
                              placeholder=""
                              value={office.email}
                              onChange={(e) => onChange(e)}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="row">
                  <div className="d-flex align-items-center justify-content-center gap-2">
                    <>
                      {/* Save */}
                      <button
                        type="submit"
                        className="button-primary btn-block btn px-5"
                      >
                        Save
                      </button>
                    </>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </>
  );
};

Setting.propTypes = {
  settingsList: PropTypes.array,
  loadSettingsList: PropTypes.func.isRequired,
  updateSetting: PropTypes.func.isRequired,
  settingListLoading: PropTypes.bool,
  authUser: PropTypes.object,
};
const mapStateToProps = (state) => ({
  authUser: state.auth.user,
  settingsList: state.admin.settingsList,
  settingListLoading: state.admin.settingListLoading,
});

export default connect(mapStateToProps, {
  loadSettingsList,
  updateSetting,
})(Setting);
