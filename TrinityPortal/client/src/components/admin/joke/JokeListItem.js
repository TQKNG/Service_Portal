import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Badge from "react-bootstrap/Badge";
import { setJoke } from "../../../actions/admin";
import ToolTipComp from "../../layouts/ToolTip";
import moment from 'moment';

const JokesListItem = ({ joke, setJoke }) => {
  const [edit, setEdit] = useState(false);
  const [show, setShow] = useState(false);
  const { JokeID, Name } = joke;
  const hist = useHistory();
  return (
    <div className="admin-users-fields  d-flex align-items-center justify-content-around   p-2 border-bottom">
      <div className="admin-schools-field text-truncate mr-1">{JokeID}</div>
      <div
        className="admin-schools-field  text-truncate "
        onClick={() => {
          setJoke(joke);
          //   hist.push(`/admin/school/schoolId=${SchoolID}`);
        }}
        title={Name}
      >
        {Name?Name:"N/A"}
      </div>
      <div className="admin-schools-field  text-truncate">
        <ToolTipComp
          myButton={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill={edit ? "#18a587" : "#505050"}
              onMouseEnter={() => {
                setEdit(true);
              }}
              onMouseLeave={() => {
                setEdit(false);
              }}
              className="cursor-pointer"
              onClick={() => {
                  setJoke(joke);
                  hist.push('/admin/joke/edit');
              }}
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M3 17.46v3.04c0 .28.22.5.5.5h3.04c.13 0 .26-.05.35-.15L17.81 9.94l-3.75-3.75L3.15 17.1c-.1.1-.15.22-.15.36zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
            </svg>
          }
          type="Edit"
          module="Joke"
        />

        {/* <ToolTipComp
          myButton={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              enable-background="new 0 0 24 24"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              className="mx-3 cursor-pointer"
              fill={show ? "#18a587" : "#505050"}
              onMouseEnter={() => {
                setShow(true);
              }}
              onMouseLeave={() => {
                setShow(false);
              }}
              onClick={() => {
                setJoke(joke);
                //   hist.push(`/admin/school/schoolId=${SchoolID}`);
              }}
            >
              <g>
                <path d="M0,0h24v24H0V0z" fill="none" />
              </g>
              <g>
                <g>
                  <path d="M15,3H5C3.9,3,3.01,3.9,3.01,5L3,19c0,1.1,0.89,2,1.99,2H19c1.1,0,2-0.9,2-2V9L15,3z M5,19V5h9v5h5v9H5z M9,8 c0,0.55-0.45,1-1,1S7,8.55,7,8s0.45-1,1-1S9,7.45,9,8z M9,12c0,0.55-0.45,1-1,1s-1-0.45-1-1s0.45-1,1-1S9,11.45,9,12z M9,16 c0,0.55-0.45,1-1,1s-1-0.45-1-1s0.45-1,1-1S9,15.45,9,16z" />
                </g>
              </g>
            </svg>
          }
          type="Show"
          module="Joke"
        /> */}
      </div>
    </div>
  );
};

JokesListItem.propTypes = {
  joke: PropTypes.object.isRequired,
  setJoke: PropTypes.func.isRequired,
};

export default connect(null, { setJoke })(JokesListItem);
