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
    volumeMin:
      settingsList === null
        ? 0
        : settingsList.Volume !== undefined
        ? settingsList.Volume["5pm-9am"].min
        : 0,
    volumeMax:
      settingsList === null
        ? 0
        : settingsList.Volume !== undefined
        ? settingsList.Volume["5pm-9am"].max
        : 0,
    language: settingsList === null ? "" : settingsList.Language,
    roles:
      settingsList === null
        ? []
        : settingsList.Roles !== undefined
        ? settingsList.Roles
        : [],
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
        : settingsList.Volume !== undefined
        ? settingsList.Volume
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
  };

  const onRemoveOffice = (index) => {
    console.log("Test index", index);
    setFormData({ ...formData }, adminOffices.splice(index, 1));
  };

  const onAddOffice = () => {
    setFormData({ ...formData }, adminOffices.push({ title: "", email: "" }));
  };

  const onChangeTime = (time, timeString) => {
    setVolMaxTR(time);
    let minTime = time.slice().reverse();
    setVolMinTR(minTime);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    let volumeSettings = {
      volumeMax:{
        startTime: volMaxTR[0],
        endTime: volMaxTR[1],
        value: volumeMax
      },
      volumeMin:{
        startTime: volMinTR[0],
        endTime: volMinTR[1],
        value: volumeMin
      }
    }

    const updatedFormData = { ...formData, outbreakStatus: checked, volumeSettings: volumeSettings};
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
      volumeMin:
        settingsList === null
          ? 0
          : settingsList.Volume !== undefined
          ? settingsList.Volume["5pm-9am"].min
          : 0,
      volumeMax:
        settingsList === null
          ? 0
          : settingsList.Volume !== undefined
          ? settingsList.Volume["5pm-9am"].max
          : 0,
      language: settingsList === null ? "" : settingsList.Language,
      roles:
        settingsList === null
          ? []
          : settingsList.Roles !== undefined
          ? settingsList.Roles
          : [],
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
    });
  }, [settingsList]);

  // Set initial outbreak status
  useEffect(() => {
    setChecked(formData.outbreakStatus);
  }, [formData.outbreakStatus]);

  //Set scroll to the last office even when the office is added or removed
  useEffect(() => {
    if (lastOfficeRef.current) {
      lastOfficeRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [formData.adminOffices, onAddOffice, onRemoveOffice]);

  const {
    volumeMax,
    volumeMin,
    language,
    outbreakStatus,
    outbreakMessage1,
    outbreakMessage2,
    roles,
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
                              format="hh A"
                              onChange={onChangeTime}
                            />
                            <div className="d-flex gap-3">
                              <div className="col-9">
                                <VolumeController
                                  volume={volumeMax}
                                  setFormData={setFormData}
                                  type={"Max"}
                                />
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
                              value={volMinTR}
                              format="hh A"
                            />
                            <div className="d-flex gap-3">
                              <div className="col-9">
                                <VolumeController
                                  volume={volumeMin}
                                  setFormData={setFormData}
                                  type={"Min"}
                                />
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
                      </>
                    </div>
                  </div>

                  {/* Roles Settings */}
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
