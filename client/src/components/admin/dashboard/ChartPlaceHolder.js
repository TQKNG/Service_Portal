import React from 'react'
import { ResponsiveContainer } from 'recharts'

const ChartPlaceHolder = ({title}) => {
  return (
    <>
         <div className="card shadow-lg border-0  py-5 px-4 mb-2 flex-fill">
      <h6>
        {title}
      </h6>
      <div className="d-flex flex-column">
        <div className="">
          <div
            className="w-100 d-flex justify-content-start"
            style={{ fontSize: "0.7rem" }}
          >
            <b className="">Result</b>
          </div>
          <ResponsiveContainer minHeight={300}>
            <img src={process.env.PUBLIC_URL + `/chartPlaceholder.png`} alt="" />
          </ResponsiveContainer>
          <div
            className="w-100 d-flex justify-content-end"
            style={{ fontSize: "0.7rem" }}
          >
            <b className="">hh:mm:ss</b>
          </div>
        </div>
      </div>
    </div>    
    </>
  )
}

export default ChartPlaceHolder