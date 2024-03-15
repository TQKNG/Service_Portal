import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loadResultsList, clearAll } from "../../../actions/admin";

import ResultsList from "./ResultsList";

const Results = ({
  resultsList,
  loadResultsList,
  resultListLoading,
  user,
  clearAll,
}) => {
  useEffect(() => {
    if (resultsList.length === 0 && resultListLoading && user !== null) {
      if (
        user.UserTypeID === 6 ||
        user.UserTypeID === 3 ||
        user.UserTypeID === 4
      ) {
        loadResultsList(user.SchoolID);
      } else {
        loadResultsList(user.SchoolID);
      }
    }
  }, [resultsList, resultListLoading, loadResultsList, user]);
  const hist = useHistory();

  const studentsList = (arr) => {
    if (user.UserTypeID !== 1) {
      return arr;
    } else {
      let students = [];
      for (let i = 0; i < user.Students.length; i++) {
        students.push(user.Students[i].StudentID);
      }
      return arr.filter((student) => students.includes(student.StudentID));
    }
  };

  return (
    <div className="p-sm-5 p-2 w-100 dashboard-margin">
      <div className="mb-3 ">
        <div className="d-flex align-items-center">
          <h6 className="txt-primary-light mb-0">
            {user.UserType} / Assign Assessment
          </h6>{" "}
          <div className="rounded-pill bg-primary px-2 py-1 align-self-center mx-2 my-2 caption ">
            {studentsList(resultsList).length}
          </div>
        </div>
        <div className="d-flex w-100 align-items-center justify-content-end">
          <div className="d-flex">
            {(parseInt(user.UserTypeID) === 5 || parseInt(user.UserTypeID) === 6) && (
              <div
                className="btn button-parent button-primary d-flex align-items-center px-3 mx-3"
                onClick={() => {
                  clearAll();
                  hist.push("/assessment/finalize");
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="18"
                  fill="#ffffff"
                  className="bi bi-list-ol button-child"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5z"
                  />
                  <path d="M1.713 11.865v-.474H2c.217 0 .363-.137.363-.317 0-.185-.158-.31-.361-.31-.223 0-.367.152-.373.31h-.59c.016-.467.373-.787.986-.787.588-.002.954.291.957.703a.595.595 0 0 1-.492.594v.033a.615.615 0 0 1 .569.631c.003.533-.502.8-1.051.8-.656 0-1-.37-1.008-.794h.582c.008.178.186.306.422.309.254 0 .424-.145.422-.35-.002-.195-.155-.348-.414-.348h-.3zm-.004-4.699h-.604v-.035c0-.408.295-.844.958-.844.583 0 .96.326.96.756 0 .389-.257.617-.476.848l-.537.572v.03h1.054V9H1.143v-.395l.957-.99c.138-.142.293-.304.293-.508 0-.18-.147-.32-.342-.32a.33.33 0 0 0-.342.338v.041zM2.564 5h-.635V2.924h-.031l-.598.42v-.567l.629-.443h.635V5z" />
                </svg>
                Benchmark Calculation
              </div>
            )}

            <div
              className="btn button-parent button-primary d-flex align-items-center px-3"
              onClick={() => {
                clearAll();
                hist.push("/assessment/add");
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                enableBackground="new 0 0 24 24"
                height="18px"
                viewBox="0 0 24 24"
                width="24px"
                fill="#ffffff"
                className="button-child"
              >
                <g>
                  <rect fill="none" height="18" width="18" />
                </g>
                <g>
                  <g>
                    <path d="M19,13h-6v6h-2v-6H5v-2h6V5h2v6h6V13z" />
                  </g>
                </g>
              </svg>
              Assign Assessment
            </div>
          </div>
        </div>
      </div>

      <ResultsList
        resultsList={studentsList(resultsList)}
        resultListLoading={resultListLoading}
        user={user}
      />
    </div>
  );
};
Results.propTypes = {
  resultsList: PropTypes.array,
  loadResultsList: PropTypes.func.isRequired,
  resultListLoading: PropTypes.bool,
  clearAll: PropTypes.func.isRequired,
  user: PropTypes.object,
};
const mapStateToProps = (state) => ({
  resultsList: state.admin.resultsList,
  resultListLoading: state.admin.resultListLoading,
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  loadResultsList,
  clearAll,
})(Results);
