import React, { Fragment, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  loadTriviasList,
  addTrivia,
  clearTrivia,
} from "../../../actions/admin";
import TriviasList from "./TriviasList";

const Trivias = ({
  authUser,
  triviasList,
  loadTriviasList,
  triviaListLoading,
  clearTrivia,
  addTrivia
}) => {
  const hist = useHistory();

  useEffect(() => {
    if (triviasList.length === 0 && triviaListLoading) {
      loadTriviasList();
    }
  }, [triviasList, triviaListLoading, loadTriviasList]);
  return (
    <Fragment>
      <div className="p-sm-5 p-2 w-100 dashboard-margin">
        <div className="mb-3 ">
          <div className="d-flex align-items-center">
            <h6 className="txt-primary-light mb-0">Admin / Trivias</h6>{" "}
            <div className="rounded-pill bg-primary px-2 py-1 align-self-center mx-2 my-2 caption ">
              {triviasList.length}
            </div>
          </div>
          {/* Template */}
          <div className="d-flex w-100 align-items-center justify-content-end">
            {authUser.UserTypeID === 5 && (
              <>
                <div className="d-flex">
                  <div
                    className="btn button-parent button-primary d-flex align-items-center px-3"
                    onClick={() => {
                      clearTrivia();
                      hist.push("/admin/trivia/add");
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
                    Add New Question
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        <TriviasList
          triviasList={
             triviasList
          }
          triviaListLoading={triviaListLoading}
        />
      </div>
    </Fragment>
  );
};

Trivias.propTypes = {
  triviasList: PropTypes.array,
  authUser: PropTypes.object,
  loadTriviasList: PropTypes.func.isRequired,
  triviaListLoading: PropTypes.bool,
  clearTrivia: PropTypes.func.isRequired,
  addTrivia: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  triviasList: state.admin.triviasList,
  triviaListLoading: state.admin.triviaListLoading,
  authUser: state.auth.user,
});

export default connect(mapStateToProps, {
  loadTriviasList,
  addTrivia,
  clearTrivia,
})(Trivias);
