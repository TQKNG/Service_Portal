import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import {
  loadSongsList,
  addSong,
  clearSong,
} from "../../../actions/admin";
import SongsList from "./SongsList";

const Songs = ({
  authUser,
  songsList,
  loadSongsList,
  songListLoading,
  clearSong,
  addSong
}) => {

  const hist = useHistory();
  useEffect(() => {
    if (songsList.length === 0 && songListLoading) {
      loadSongsList();
    }
  }, [songsList, songListLoading, loadSongsList]);
  return (
    <Fragment>
      <div className="p-sm-5 p-2 w-100 dashboard-margin">
        <div className="mb-3 ">
          <div className="d-flex align-items-center">
            <h6 className="txt-primary-light mb-0">{`${authUser.firstName} ${authUser.lastName}`} / Songs</h6>{" "}
            <div className="rounded-pill bg-primary px-2 py-1 align-self-center mx-2 my-2 caption ">
              {songsList.length}
            </div>
          </div>
          <div className="d-flex w-100 align-items-center justify-content-end">
            {authUser.roleID === 5 && (
              <>
                <div className="d-flex">
                  <div
                    className="btn button-parent button-primary d-flex align-items-center px-3"
                    onClick={() => {
                      clearSong();
                      hist.push('/admin/song/add');
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
                    Add New Song
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      
        <SongsList
          songsList={
             songsList
          }
          songListLoading={songListLoading}
        />
      </div>
    </Fragment>
  );
};

Songs.propTypes = {
  songsList: PropTypes.array,
  authUser: PropTypes.object,
  loadSongsList: PropTypes.func.isRequired,
  songListLoading: PropTypes.bool,
  clearSong: PropTypes.func.isRequired,
  addSong: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  songsList: state.admin.songsList,
  songListLoading: state.admin.songListLoading,
  authUser: state.auth.user,
});

export default connect(mapStateToProps, {
  loadSongsList,
  addSong,
  clearSong,
})(Songs);
