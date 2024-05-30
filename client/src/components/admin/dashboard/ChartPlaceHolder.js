import React, { useState } from "react";
import { CSVLink } from "react-csv";

const ChartPlaceHolder = ({ title, reportName, reports }) => {
  const [isHover, setIsHover] = useState(null);

  return (
    <>
      <CSVLink
        data={reports}
        filename={`${reportName}.csv`}
        id="export-report-button"
        style={{ textDecoration: "none" }}
      >
        <div
          className={`card shadow-lg ${
            isHover ? "border-5" : "border-0"
          }  py-5 px-4 mb-2 flex-fill`}
          onMouseEnter={() => {
            setIsHover(true);
          }}
          onMouseLeave={() => {
            setIsHover(false);
          }}
        >
          <h6>{title}</h6>
          <div className="d-flex flex-column">
            <div className="">
              <div
                className="w-100 d-flex justify-content-start"
                style={{ fontSize: "0.7rem" }}
              ></div>
              <img
                src={process.env.PUBLIC_URL + `/logo.png`}
                alt=""
                style={{ objectFit: "cover", width: "100%" }}
              />
              <div
                className="w-100 d-flex justify-content-end"
                style={{ fontSize: "0.7rem" }}
              ></div>
            </div>
          </div>
        </div>
      </CSVLink>
    </>
  );
};

export default ChartPlaceHolder;
