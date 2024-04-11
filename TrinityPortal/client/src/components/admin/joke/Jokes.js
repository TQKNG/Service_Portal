import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import {
  loadJokesList,
  addJoke,
  clearJoke,
} from "../../../actions/admin";
import JokesList from "./JokesList";

const Jokes = ({
  authUser,
  jokesList,
  loadJokesList,
  jokeListLoading,
  clearJoke,
  addJoke
}) => {
  const hist = useHistory();
  useEffect(() => {
    if (jokesList.length === 0 && jokeListLoading) {
      loadJokesList();
    }
  }, [jokesList, jokeListLoading, loadJokesList]);
  return (
    <Fragment>
      <div className="p-sm-5 p-2 w-100 dashboard-margin">
        <div className="mb-3 ">
          <div className="d-flex align-items-center">
            <h6 className="txt-primary-light mb-0">Admin / Jokes</h6>{" "}
            <div className="rounded-pill bg-primary px-2 py-1 align-self-center mx-2 my-2 caption ">
              {jokesList.length}
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
                      hist.push("/admin/joke/add");
                      clearJoke();
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
                    Add New Joke
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        <JokesList
          jokesList={
             jokesList
          }
          jokeListLoading={jokeListLoading}
        />
      </div>
    </Fragment>
  );
};

Jokes.propTypes = {
  jokesList: PropTypes.array,
  authUser: PropTypes.object,
  loadJokesList: PropTypes.func.isRequired,
  jokeListLoading: PropTypes.bool,
  clearJoke: PropTypes.func.isRequired,
  addJoke: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  jokesList: state.admin.jokesList,
  jokeListLoading: state.admin.jokeListLoading,
  authUser: state.auth.user,
});

export default connect(mapStateToProps, {
  loadJokesList,
  addJoke,
  clearJoke,
})(Jokes);
