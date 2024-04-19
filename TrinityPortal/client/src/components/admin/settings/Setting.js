import React, { useState, Fragment, useEffect } from "react";
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
  const [checked, setChecked] = useState(false);
  const [volMaxTR, setVolMaxTR] = useState(null);
  const [volMinTR, setVolMinTR] = useState(null);
  const [formData, setFormData] = useState({
    volumeMin1:
      settingsList === null
        ? 0
        : settingsList.Volume !== undefined
        ? settingsList.Volume["9am-5pm"].min
        : 0,
    volumeMax1:
      settingsList === null
        ? 0
        : settingsList.Volume !== undefined
        ? settingsList.Volume["9am-5pm"].max
        : 0,
    volumeMin2:
      settingsList === null
        ? 0
        : settingsList.Volume !== undefined
        ? settingsList.Volume["5pm-9am"].min
        : 0,
    volumeMax2:
      settingsList === null
        ? 0
        : settingsList.Volume !== undefined
        ? settingsList.Volume["5pm-9am"].max
        : 0,
    language: "",
    roles:
      settingsList === null
        ? []
        : settingsList.Roles !== undefined
        ? settingsList.Roles
        : [],
    emails: [],
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

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const onChangeTime = (time, timeString)=>{
    setVolMaxTR(time);
    let minTime = time.slice().reverse();
    setVolMinTR(minTime);
  }

  const onSubmit = (e) => {
    e.preventDefault();

    const updatedFormData = { ...formData, outbreakStatus: checked };
    setFormData(updatedFormData);

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
      volumeMin1:
        settingsList === null
          ? 0
          : settingsList.Volume !== undefined
          ? settingsList.Volume["9am-5pm"].min
          : 0,
      volumeMax1:
        settingsList === null
          ? 0
          : settingsList.Volume !== undefined
          ? settingsList.Volume["9am-5pm"].max
          : 0,
      volumeMin2:
        settingsList === null
          ? 0
          : settingsList.Volume !== undefined
          ? settingsList.Volume["5pm-9am"].min
          : 0,
      volumeMax2:
        settingsList === null
          ? 0
          : settingsList.Volume !== undefined
          ? settingsList.Volume["5pm-9am"].max
          : 0,
      language: "",
      roles:
        settingsList === null
          ? []
          : settingsList.Roles !== undefined
          ? settingsList.Roles
          : [],
      emails: [],
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

  const {
    volumeMax,
    volumeMin,
    language,
    outbreakStatus,
    outbreakMessage1,
    outbreakMessage2,
    volumeMin1,
    volumeMax1,
    volumeMin2,
    volumeMax2,
    roles,
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
                            <div className="txt-primary">Select Time and Volume Max</div>
                            <TimePicker.RangePicker 
                            value = {volMaxTR}
                            format='hh A' onChange={onChangeTime}/>
                            <div className="d-flex gap-3">
                              <div className="col-9">
                                <VolumeController
                                  volume={volumeMax1}
                                  setFormData={setFormData}
                                  type={"Max"}
                                />
                              </div>
                              <div className="w-100">
                                <input
                                  id="volumeMax1"
                                  className="w-100 form-control rounded "
                                  value={volumeMax1}
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
                            <div className="txt-primary">Select Time and Volume Min</div>
                            <TimePicker.RangePicker 
                            disabled
                            value={volMinTR}
                            format='hh A'/>
                            <div className="d-flex gap-3">
                              <div className="col-9">
                                <VolumeController
                                  volume={volumeMin1}
                                  setFormData={setFormData}
                                  type={"Min"}
                                />
                              </div>
                              <div className="w-100">
                                <input
                                  id="volumeMin1"
                                  className="w-100 form-control rounded "
                                  value={volumeMin1}
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
                      // onSubmit={(e) => onSubmit(e)}
                    >
                      {/* Fields */}
                      <>
                        <div className="mb-3">
                          <div className="txt-primary">Office 1</div>
                          <input
                            type="text"
                            className="form-control rounded "
                            id="role1"
                            placeholder=""
                            required
                            value={roles[0]}
                            onChange={(e) => onChange(e)}
                          />
                        </div>
                        <div className="mb-3">
                          <div className="txt-primary">Office 2</div>
                          <input
                            type="text"
                            className="form-control rounded "
                            id="role2"
                            placeholder=""
                            required
                            value={roles[1]}
                            onChange={(e) => onChange(e)}
                          />
                        </div>
                        <div className="mb-3">
                          <div className="txt-primary">Office 3</div>
                          <input
                            type="text"
                            className="form-control rounded "
                            id="role3"
                            placeholder=""
                            required
                            value={roles[2]}
                            onChange={(e) => onChange(e)}
                          />
                        </div>
                        <div className="mb-3">
                          <div className="txt-primary">Office 4</div>
                          <input
                            type="text"
                            className="form-control rounded "
                            id="role4"
                            placeholder=""
                            required
                            value={roles[3]}
                            onChange={(e) => onChange(e)}
                          />
                        </div>
                        <div className="mb-3">
                          <div className="txt-primary">Office 5</div>
                          <input
                            type="text"
                            className="form-control rounded "
                            id="role5"
                            placeholder=""
                            required
                            value={roles[4]}
                            onChange={(e) => onChange(e)}
                          />
                        </div>
                        <div className="mb-3">
                          <div className="txt-primary">Office 6</div>
                          <input
                            type="text"
                            className="form-control rounded "
                            id="role6"
                            placeholder=""
                            required
                            value={roles[5]}
                            onChange={(e) => onChange(e)}
                          />
                        </div>
                        <div className="mb-3">
                          <div className="txt-primary">Office 7</div>
                          <input
                            type="text"
                            className="form-control rounded "
                            id="role7"
                            placeholder=""
                            required
                            value={roles[6]}
                            onChange={(e) => onChange(e)}
                          />
                        </div>
                        <div className="mb-3">
                          <div className="txt-primary">Office 8</div>
                          <input
                            type="text"
                            className="form-control rounded "
                            id="role8"
                            placeholder=""
                            required
                            value={roles[7]}
                            onChange={(e) => onChange(e)}
                          />
                        </div>
                        <div className="mb-3">
                          <div className="txt-primary">Office 9</div>
                          <input
                            type="text"
                            className="form-control rounded "
                            id="role9"
                            placeholder=""
                            required
                            value={roles[8]}
                            onChange={(e) => onChange(e)}
                          />
                        </div>
                      </>
                    </div>
                  </div>

                  {/* Email Settings */}
                  <div className="col-12 col-md-3 d-flex flex-column">
                    <h6>Email Settings</h6>
                    {/* Form Content */}
                    <div
                      className="w-100 p-2 p-sm-3 p-lg-4 shadow-lg  mb-2 overflow-auto d-flex flex-column gap-2 justify-content-start"
                      style={{ height: "500px" }}
                    >
                      {/* Fields */}
                      <>
                        <div className="mb-3">
                          <div className="txt-primary">Host Email</div>
                          <input
                            type="text"
                            className="form-control rounded "
                            id="message1"
                            placeholder=""
                            // value={Name}
                            // onChange={(e) => onChange(e)}
                          />
                        </div>
                        <div className="mb-3">
                          <div className="txt-primary">Email 1</div>
                          <input
                            type="text"
                            className="form-control rounded "
                            id="message1"
                            placeholder=""
                            // value={Name}
                            // onChange={(e) => onChange(e)}
                          />
                        </div>
                        <div className="mb-3">
                          <div className="txt-primary">Email 2</div>
                          <input
                            type="text"
                            className="form-control rounded "
                            id="message1"
                            placeholder=""
                            // value={Name}
                            // onChange={(e) => onChange(e)}
                          />
                        </div>
                        <div className="mb-3">
                          <div className="txt-primary">Email 3</div>
                          <input
                            type="text"
                            className="form-control rounded "
                            id="message1"
                            placeholder=""
                            // value={Name}
                            // onChange={(e) => onChange(e)}
                          />
                        </div>
                      </>
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
