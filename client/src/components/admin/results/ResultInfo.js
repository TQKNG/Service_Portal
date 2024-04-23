import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const ResultInfo = ({ result, resultLoading, getAssessmentById }) => {
  return (
    <Fragment>
      {resultLoading ? (
        <div className='card w-100 p-2 p-sm-3 p-lg-4 shadow-lg border-0  mb-2 vh-100 '>
          <div className='d-flex justify-content-center align-items-center h-100'>
            <div class='spinner-border txt-primary' role='status'>
              <span class='visually-hidden'>Loading...</span>
            </div>
          </div>
        </div>
      ) : (
        <div className='card w-100 p-2 p-sm-3 p-lg-4 shadow-lg border-0  mb-2 '>
          <div className='mb-3'>
            <div className='txt-primary'>Student Name</div>
            <div className=''>{result.FirstName + ' ' + result.LastName}</div>
          </div>
          {result.AlternativeID !== null && (
            <div className='mb-3'>
              <div className='txt-primary'>Student ID</div>
              <div className=''>{result.AlternativeID}</div>
            </div>
          )}
          <div className='mb-3'>
            <div className='txt-primary'>Assessment Title</div>
            <div className=''>{result.Title}</div>
          </div>

          {/*result.TotalScore !== null && (
            <div className='mb-3'>
              <div className='txt-primary'>Percentage</div>
              <div className=''>{result.TotalScore + ' '}/ 100</div>
            </div>
          )*/}
          {result.CWPM !== null && result.CWPM !== undefined && (
            <div className='mb-3'>
              <div className='txt-primary'>Total Score</div>
              <div className=''>{result.CWPM}</div>
            </div>
          )}

          {result.Scores !== null && result.Scores !== undefined && (
            <div className='mb-3'>
              <div className='txt-primary'>Total Score</div>
              <div className=''>
                {
                  result.Scores.split(',').reduce((a, b) => {
                    if (a === '') {
                      return parseInt(b);
                    } else if (b === '') {
                      return parseInt(a);
                    } else {
                      return parseInt(a) + parseInt(b);
                    }
                  }, 0) /*+
                  ' / ' +
                  Math.floor(
                    (result.Scores.split(',').reduce((a, b) => {
                      if (a === '') {
                        return parseInt(b);
                      } else if (b === '') {
                        return parseInt(a);
                      } else {
                        return parseInt(a) + parseInt(b);
                      }
                    }, 0) *
                      100) /
                      result.TotalScore,
                  )*/
                }
              </div>
            </div>
          )}

          <div className='mb-3'>
            <div className='txt-primary'>Benchmark</div>
            <div className=''> {result.BenchMark}</div>
          </div>
          {result.TotalCLS !== undefined && (
            <Fragment>
              {result.TotalCLS !== null && (
                <div className='mb-3'>
                  <div className='txt-primary'>Total CLS</div>
                  <div className=''>{result.TotalCLS}</div>
                </div>
              )}
              {result.TotalWWR !== null && (
                <div className='mb-3'>
                  <div className='txt-primary'>Total WWR</div>
                  <div className=''>{result.TotalWWR}</div>
                </div>
              )}

              {result.WordReadNumber !== null && (
                <div className='mb-3'>
                  <div className='txt-primary'>Number of Words Read</div>
                  <div className=''>{result.WordReadNumber}</div>
                </div>
              )}
              {result.ErrorNumber !== null && (
                <div className='mb-3'>
                  <div className='txt-primary'>Number of Errors</div>
                  <div className=''>{result.ErrorNumber}</div>
                </div>
              )}
              {result.CWPM !== null && (
                <div className='mb-3'>
                  <div className='txt-primary'>CWPM</div>
                  <div className=''>{result.CWPM}</div>
                </div>
              )}
            </Fragment>
          )}

          {result.Comment !== null && (
            <div className='mb-3'>
              <div className='txt-primary'>Comment</div>
              <div className=''>{result.Comment}</div>
            </div>
          )}

          {result.year !== null && (
            <div className='mb-3'>
              <div className='txt-primary'>Year</div>
              <div className=''>
                {result.year - 1}-{result.year}
              </div>
            </div>
          )}

          <div className='mb-3 text-center'>
            <Link
              to={`/assessment/preview/${result.ResultID}`}
              className=' btn button-primary'
              onClick={() => getAssessmentById(result.ResultID)}
            >
              See Full Details
            </Link>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default ResultInfo;
