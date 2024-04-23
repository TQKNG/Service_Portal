import React, { useState, useEffect } from 'react';
import { PieChart } from 'react-minimal-pie-chart';

const AverageGrade = ({ reports, benchMarkID, classroom }) => {
  const calculate = (data, grade) => {
    let arr = data.filter((item) => item.GradeID === grade);
    let average = arr.reduce((a, b) => {
      return a + b.Percentile;
    }, 0);
    average = average / arr.length;
    console.log(arr, grade, average);

    if (isNaN(average)) {
      return -1;
    }

    return Math.round(average);
  };

  const [grade, setGrade] = useState(1);
  const [value, setValue] = useState(calculate(reports, grade));

  useEffect(() => {
    setValue(calculate(reports, 1));
    setGrade(1);
  }, [benchMarkID, reports]);

  return (
    <div className='card shadow-lg border-0  py-5 px-4 mb-5 mx-lg-2  mx-auto '>
      <div className='d-flex justify-content-between mb-3 '>
        <h6 className='text-center w-100 '>Students Average Grade </h6>
        {classroom !== true && (
          <select
            className='d-inline-block'
            aria-label='Default select example'
            id='grade'
            value={grade}
            onChange={(e) => {
              setGrade(e.target.value);
              setValue(calculate(reports, parseInt(e.target.value)));
            }}
          >
            <option value={1}>Grade 1</option>
            <option value={2}>Grade 2</option>
            <option value={3}>Grade 3</option>
            <option value={4}>Grade 4</option>
            <option value={5}>Grade 5</option>
            <option value={6}>Grade 6</option>
          </select>
        )}
      </div>

      <PieChart
        style={{
          width: '350px',
          height: '250px',
        }}
        data={[
          {
            title: 'One',
            value: value !== -1 ? value : 0,
            color: '#18a587',
          },
        ]}
        totalValue={100}
        lineWidth={10}
        label={() => `${value !== -1 ? value : 'No Data'}`}
        labelPosition={`50%`}
        animate={true}
        rounded={true}
      />
    </div>
  );
};

export default AverageGrade;
