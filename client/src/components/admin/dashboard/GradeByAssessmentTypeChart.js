import React, { useMemo } from 'react';
import { Chart } from 'react-charts';

const GradeByAssessmentTypeChart = ({ reports, benchMarkID }) => {
  const data = useMemo(
    () => [
      {
        label: 'Exceeding (>90th PR)',

        data: [
          [
            'Name The Letter',
            reports.filter(
              (item) => item.CategoryID === 1 && item.Percentile >= 90,
            ).length,
          ],
          [
            'Story Reading',
            reports.filter(
              (item) => item.CategoryID === 3 && item.Percentile >= 90,
            ).length,
          ],
          [
            'Break up the word',
            reports.filter(
              (item) => item.CategoryID === 5 && item.Percentile >= 90,
            ).length,
          ],
          [
            'First Sound Fluency',
            reports.filter(
              (item) => item.CategoryID === 6 && item.Percentile >= 90,
            ).length,
          ],
          [
            'Letter Sounds',
            reports.filter(
              (item) => item.CategoryID === 2 && item.Percentile >= 90,
            ).length,
          ],
          [
            'Silly Words (CLS)',
            reports.filter(
              (item) => item.CategoryID === 4 && item.Percentile >= 90,
            ).length,
          ],
          [
            'Silly Words (WWR)',
            reports.filter(
              (item) => item.CategoryID === 7 && item.Percentile >= 90,
            ).length,
          ],
        ],
      },
      {
        label: 'At Grade Level (20th-90th PR)',
        data: [
          [
            'Name The Letter',
            reports.filter(
              (item) =>
                item.CategoryID === 1 &&
                item.Percentile < 90 &&
                item.Percentile >= 20,
            ).length,
          ],
          [
            'Story Reading',
            reports.filter(
              (item) =>
                item.CategoryID === 3 &&
                item.Percentile < 90 &&
                item.Percentile >= 20,
            ).length,
          ],
          [
            'Break up the word',
            reports.filter(
              (item) =>
                item.CategoryID === 5 &&
                item.Percentile < 90 &&
                item.Percentile >= 20,
            ).length,
          ],
          [
            'First Sound Fluency',
            reports.filter(
              (item) =>
                item.CategoryID === 6 &&
                item.Percentile < 90 &&
                item.Percentile >= 20,
            ).length,
          ],
          [
            'Letter Sounds',
            reports.filter(
              (item) =>
                item.CategoryID === 2 &&
                item.Percentile < 90 &&
                item.Percentile >= 20,
            ).length,
          ],
          [
            'Silly Words (CLS)',
            reports.filter(
              (item) =>
                item.CategoryID === 4 &&
                item.Percentile < 90 &&
                item.Percentile >= 20,
            ).length,
          ],
          [
            'Silly Words (WWR)',
            reports.filter(
              (item) =>
                item.CategoryID === 7 &&
                item.Percentile < 90 &&
                item.Percentile >= 20,
            ).length,
          ],
        ],
      },
      {
        label: 'Below Grade Level (10th-20th PR)',
        data: [
          [
            'Name The Letter',
            reports.filter(
              (item) =>
                item.CategoryID === 1 &&
                item.Percentile < 20 &&
                item.Percentile >= 10,
            ).length,
          ],
          [
            'Story Reading',
            reports.filter(
              (item) =>
                item.CategoryID === 3 &&
                item.Percentile < 20 &&
                item.Percentile >= 10,
            ).length,
          ],
          [
            'Break up the word',
            reports.filter(
              (item) =>
                item.CategoryID === 5 &&
                item.Percentile < 20 &&
                item.Percentile >= 10,
            ).length,
          ],
          [
            'First Sound Fluency',
            reports.filter(
              (item) =>
                item.CategoryID === 6 &&
                item.Percentile < 20 &&
                item.Percentile >= 10,
            ).length,
          ],
          [
            'Letter Sounds',
            reports.filter(
              (item) =>
                item.CategoryID === 2 &&
                item.Percentile < 20 &&
                item.Percentile >= 10,
            ).length,
          ],
          [
            'Silly Words (CLS)',
            reports.filter(
              (item) =>
                item.CategoryID === 4 &&
                item.Percentile < 20 &&
                item.Percentile >= 10,
            ).length,
          ],
          [
            'Silly Words (WWR)',
            reports.filter(
              (item) =>
                item.CategoryID === 7 &&
                item.Percentile < 20 &&
                item.Percentile >= 10,
            ).length,
          ],
        ],
      },
      {
        label: 'Well Below (<10th PR)',
        data: [
          [
            'Name The Letter',
            reports.filter(
              (item) => item.CategoryID === 1 && item.Percentile < 10,
            ).length,
          ],
          [
            'Story Reading',
            reports.filter(
              (item) => item.CategoryID === 3 && item.Percentile < 10,
            ).length,
          ],
          [
            'Break up the word',
            reports.filter(
              (item) => item.CategoryID === 5 && item.Percentile < 10,
            ).length,
          ],
          [
            'First Sound Fluency',
            reports.filter(
              (item) => item.CategoryID === 6 && item.Percentile < 10,
            ).length,
          ],
          [
            'Letter Sounds',
            reports.filter(
              (item) => item.CategoryID === 2 && item.Percentile < 10,
            ).length,
          ],
          [
            'Silly Words (CLS)',
            reports.filter(
              (item) => item.CategoryID === 4 && item.Percentile < 10,
            ).length,
          ],
          [
            'Silly Words (WWR)',
            reports.filter(
              (item) => item.CategoryID === 7 && item.Percentile < 10,
            ).length,
          ],
        ],
      },
    ],
    [benchMarkID, reports],
  );

  const series = React.useMemo(
    () => ({
      type: 'bar',
    }),
    [benchMarkID, reports],
  );
  const axes = React.useMemo(
    () => [
      { primary: true, type: 'ordinal', position: 'left' },
      { position: 'bottom', type: 'linear', stacked: true },
    ],
    [benchMarkID, reports],
  );
  return (
    <div
      className='card shadow-lg border-0 py-5 px-4 mb-2 flex-fill'
    >
      <h6>Overall Results by Assessment Types</h6>
      <div
        style={{
          width: '100%',
          height: '230px',
        }}
      >
        <div className='d-flex justify-content-between'>
          <div className='d-flex align-items-center'>
            <div
              className='p-1 d-inline-block'
              style={{
                height: '10px',
                width: '10px',
                backgroundColor: '#4ab5eb',
              }}
            ></div>
            <div className='mx-2' style={{ fontSize: '0.6rem' }}>
              Exceeding {'(>90th PR)'}
            </div>
          </div>
          <div className='d-flex align-items-center '>
            <div
              className='p-1 d-inline-block'
              style={{
                height: '10px',
                width: '10px',
                backgroundColor: '#fc6868',
              }}
            ></div>
            <div className='mx-2' style={{ fontSize: '0.6rem' }}>
              At Grade Level {'(20th-90th PR)'}
            </div>
          </div>
          <div className='d-flex align-items-center'>
            <div
              className='p-1 d-inline-block'
              style={{
                height: '10px',
                width: '10px',
                backgroundColor: '#decf3f',
              }}
            ></div>
            <div className='mx-2' style={{ fontSize: '0.6rem' }}>
              Below Grade Level {'(10th-20th PR)'}
            </div>
          </div>
          <div className='d-flex align-items-center'>
            <div
              className='p-1 d-inline-block'
              style={{
                height: '10px',
                width: '10px',
                backgroundColor: '#60bd68',
              }}
            ></div>
            <div className='mx-2' style={{ fontSize: '0.6rem' }}>
              Well Below {'(<10th PR)'}
            </div>
          </div>
        </div>
        <div
          className='w-100 d-flex justify-content-start'
          style={{ fontSize: '0.6rem' }}
        >
          <b className=''>Assessment Type</b>
        </div>
        <Chart data={data} axes={axes} series={series} tooltip={true} />
        <div
          className='w-100 d-flex justify-content-end'
          style={{ fontSize: '0.6rem' }}
        >
          <b className=''>Number of Students</b>
        </div>
      </div>
    </div>
  );
};

export default GradeByAssessmentTypeChart;
