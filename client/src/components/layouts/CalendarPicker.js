import React from "react";
import { Badge } from "react-bootstrap";
import { DatePicker } from "antd";
import moment from "moment";

const CalendarPicker = ({
  defaultValue,
  startTime,
  setStartTime,
  setFormData,
  editMode,
}) => {
  const onChangeTime = (time, timeString) => {
    if (time) {
      // Set volMaxTR to the selected time range
      setStartTime(time);
      setFormData((prev) => ({ ...prev, StartTime: time }));
    }
  };
  return (
    <>
      {editMode ? (
        <DatePicker
          disabled
          value={moment(defaultValue)}
          allowClear={false}
          className="form-control rounded"
          style={{ width: "20%" }}
          format="YYYY-MM-DD hh:mm A"
          showTime={{
            format: "hh:mm A",
          }}
          onChange={onChangeTime}
          disabledDate={(current) => {
            // Can not select days before today
            return current && current < moment().startOf("day");
          }}
        />
      ) : (
        <DatePicker
          allowClear={false}
          className="form-control rounded"
          style={{ width: "20%" }}
          format="YYYY-MM-DD hh:mm A"
          showTime={{
            format: "hh:mm A",
          }}
          onChange={onChangeTime}
          disabledDate={(current) => {
            // Can not select days before today
            return current && current < moment().startOf("day");
          }}
        />
      )}
    </>
  );
};

export default CalendarPicker;
