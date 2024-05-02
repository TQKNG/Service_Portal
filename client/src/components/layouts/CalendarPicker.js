import React from "react";
import { Badge } from "react-bootstrap";
import { DatePicker } from "antd";
import moment from "moment";

const CalendarPicker = ({ startTime, setStartTime, setFormData }) => {
  const onChangeTime = (time, timeString) => {
    if (time) {
      // Set volMaxTR to the selected time range
      setStartTime(time);
      setFormData((prev) => ({ ...prev, StartTime: time }));
    }
  };
  return (
    <>
      <DatePicker
        allowClear={false}
        className="form-control rounded"
        style={{ width: "20%" }}
        format="YYYY-MM-DD hh:mm A"
        renderExtraFooter={() => (
          <div type="primary" className="w-100 p-4 text-center" size="large">
            {/* Message */}
            <div className="txt-primary">
              Already booked please select another time slot
            </div>
            {/* Time slots */}
            <div className="w-100 d-flex justify-content-center gap-3">
              <Badge pill className="w-15" bg={`danger`}>
                12:00 PM
              </Badge>
              <Badge pill className="w-15" bg={`danger`}>
                03:00 PM
              </Badge>
              <Badge pill className="w-15" bg={`success`}>
                5:00 PM
              </Badge>
            </div>
          </div>
        )}
        showTime={{
          format: "hh:mm A",
        }}
        onChange={onChangeTime}
        // dateRender={(current) => {
        //   const style = {};

        //   // Customize the status of the calendar
        //   if ([1, 3, 5].includes(current.date())) {
        //     style.backgroundColor = "red";
        //   }

        //   return (
        //     <div className="ant-picker-cell-inner" style={style}>
        //       {current.date()}
        //     </div>
        //   );
        // }}
        disabledDate={(current) => {
          // Can not select days before today
          return current && current < moment().startOf("day");
        }}
        // disabledTime={(current) => {
        //   if (current && current.date() === moment().date()) {
        //     return {
        //       disabledHours: () => range(0, moment().hours()),
        //       disabledMinutes: () => range(0, moment().minutes()),
        //       disabledSeconds: () => range(0, moment().seconds()),
        //     };
        //   }
        //   return {};
        // }}
      />
    </>
  );
};

export default CalendarPicker;
