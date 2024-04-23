import React, { Fragment } from "react";
import StudentGrid from "./StudentGrid";
import AverageScoreByBenchmarkCategory from "../dashboard/AverageScoreByBenchmarkCategory";
import OverallResultsProgression from "../dashboard/OverallResultsProgressionChart";
import { parse } from "dotenv";

const UserInfo = ({
  user,
  checked,
  userLoading,
  reportsLoading,
  reports,
  averageScorePerBenchmarkCategoryChart,
  overallResultsProgressionChart,
}) => {
  return (
    <Fragment>
      {userLoading ? (
        <div className="card w-100 p-2 p-sm-3 p-lg-4 shadow-lg border-0  mb-2 vh-100 ">
          <div className="d-flex justify-content-center align-items-center h-100">
            <div class="spinner-border txt-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="card w-100 p-2 p-sm-3 p-lg-4 shadow-lg border-0 mb-2 col-12">
          <div className="row">
            {/* User info */}
            <div className="d-flex flex-column col-2">
              {user.AlternativeID !== null && (
                <div className="mb-3">
                  <div className="txt-primary">ID</div>
                  <div className="">{user.AlternativeID}</div>
                </div>
              )}
              <div className="mb-3">
                <div className="txt-primary">First Name</div>
                <div className="">{user.FirstName}</div>
              </div>
              <div className="mb-3">
                <div className="txt-primary">Last Name</div>
                <div className="">{user.LastName}</div>
              </div>
              {user.UserTypeID !== 5 && (
                <div className="mb-3">
                  <div className="txt-primary">School</div>
                  <div className="">{user.SchoolName}</div>
                </div>
              )}
              {user.UserTypeID !== 2 && (
                <div className="mb-3">
                  <div className="txt-primary">Email</div>
                  <div className="">{user.Email}</div>
                </div>
              )}
              <div className="mb-3">
                <div className="txt-primary">Role</div>
                <div className=""> {user.UserType}</div>
              </div>
              {/* {user.ResetToken !== null && (
                <div className="mb-3">
                  <div className="txt-primary">ResetToken</div>
                  <div className="">{user.ResetToken}</div>
                </div>
              )}
              {user.ResetTokenExpire !== null && (
                <div className="mb-3">
                  <div className="txt-primary">ResetTokenExpire</div>
                  <div className="">{user.ResetTokenExpire}</div>
                </div>
              )} */}
              <div className="mb-3">
                <div className="txt-primary">Created Date</div>
                <div className="">
                  {" "}
                  {user.CreatedDate !== undefined
                    ? new Date(user.CreatedDate).toLocaleString("en-US", {
                        year: "numeric",
                        day: "2-digit",
                        month: "long",
                      })
                    : ""}
                </div>
              </div>
            </div>
            {/* Progression of Overall Results By Assessment Type */}
            {parseInt(user.UserTypeID) == 2 && (
              <>
                <div className="col-10">
                  {!checked ? (
                    <AverageScoreByBenchmarkCategory
                      chartData={averageScorePerBenchmarkCategoryChart}
                    />
                  ) : (
                    <OverallResultsProgression
                      chartData={
                        overallResultsProgressionChart[checked ? 1 : 0]
                      } //1: Risk, 0: Percentile
                      calculationType={checked ? 1 : 0} //1: Risk, 0: Percentile
                      // benchMarkID={benchMark}
                    />
                  )}
                </div>
              </>
            )}
          </div>

          {parseInt(user.UserTypeID) == 2 && (
            <StudentGrid reports={reports} reportsLoading={reportsLoading} />
          )}
        </div>
      )}
    </Fragment>
  );
};

export default UserInfo;
