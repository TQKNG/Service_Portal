import React, { useEffect, useState } from "react";
import Alert from "../../layouts/Alert";
import _ from "underscore";
import Search from "../../layouts/Search";
import SortIcon from "../../layouts/SortIcon";
import SongListItem from "./SongListItem";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SongsList = ({ songsList, songListLoading }) => {
  const [listSearch, setListSearch] = useState(songsList);
  const [page, setPage] = useState(1);
  const [icons, setIcons] = useState({
    name: 0,
  });
  const [isShowIcon, setIsShowIcon] = useState(null);

  const { name } = icons;


  useEffect(() => {
    if (!songListLoading) {
      // on initial load, sort by InOutID ASC - default
      const sortedList = _.sortBy(songsList, _.property("InOutID"));

      setListSearch(sortedList);
    }
  }, [songListLoading, setListSearch, songsList]);

  return (
    <div className="card w-100 p-2 p-sm-3 p-lg-5 shadow-lg border-0 users-list ">
      <ToastContainer />
      <Alert />
      <div className="d-flex w-100 align-items-center justify-content-between mb-3">
        <div className="">
          {!songListLoading && listSearch.length / 15 > 1 && (
            <nav aria-label="Page navigation txt-primary">
              <ul className="pagination txt-primary">
                {page > 1 && (
                  <li className="page-item" onClick={() => setPage(page - 1)}>
                    <div
                      className="page-link txt-primary"
                      aria-label="Previous"
                    >
                      <span aria-hidden="true">&laquo;</span>
                    </div>
                  </li>
                )}
                {listSearch.map((num, id) => {
                  let ind = id + 1;

                  if (ind <= Math.ceil(listSearch.length / 15))
                    return (
                      <li
                        className="page-item"
                        onClick={() => setPage(ind)}
                        key={id}
                      >
                        <div
                          className={`page-link txt-primary ${
                            ind === page ? "page-selected" : ""
                          }`}
                        >
                          {ind}
                        </div>
                      </li>
                    );
                })}
                {page < listSearch.length / 15 && (
                  <li className="page-item" onClick={() => setPage(page + 1)}>
                    <div className="page-link txt-primary" aria-label="Next">
                      <span aria-hidden="true">&raquo;</span>
                    </div>
                  </li>
                )}
              </ul>
            </nav>
          )}
        </div>
        <div className="d-flex">
          <Search
            setListSearch={setListSearch}
            filter={(e) => {
              const list = songsList.filter((item) =>
                item.Name.toUpperCase().includes(
                  e.target.value.toUpperCase()
                )
              );
              return list;
            }}
          />
        </div>
      </div>
      <div className="admin-users-fields  d-flex align-items-center justify-content-around  rounded  bg-body txt-primary">
        <div className="admin-schools-field text-truncate ">Song ID</div>

        <div
          className="admin-schools-field  text-truncate mx-1 "
          onMouseEnter={() => setIsShowIcon("name")}
          onMouseLeave={() => setIsShowIcon(null)}
          onClick={() => {
            if (name === 0 && songsList.length) {
              const sortedList = _.sortBy(songsList, (song) => {
                const name = song.Name;
                if (/^\d/.test(name)) {
                  return 0; // Numbers should come first
                } else {
                  return name.toLowerCase(); // Convert to lowercase to ensure case-insensitive sorting
                }
              });
              setListSearch(sortedList);
              setIcons({
                name: 1,
              });
            } else if (name === 1) {
              const sortedList = _.sortBy(listSearch, [
                (song) => song.Name.toLowerCase(),
              ]).reverse();
              setListSearch(sortedList);
              setIcons({
                name: -1,
              });
            } else {
              const sortedList = _.sortBy(
                songsList,
                _.property("SongID")
              );
              setListSearch(sortedList);
              setIcons({
                name: 0,
              });
            }
          }}
        >
          Name
          <SortIcon icon={name} isShowIcon={isShowIcon === "name"} />
        </div>
        <div className="admin-schools-field text-truncate ml-1">Actions</div>
      </div>
      <div className="users-list-body ">
        {songListLoading ? (
          <div className="d-flex justify-content-center align-items-center h-100">
            <div class="spinner-border txt-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : 
          songsList.length === 0 ? (
            <div className="d-flex justify-content-center align-items-center h-100">
              <div className="txt-primary">No Songs Found</div>
            </div>
          ) : (
            listSearch
              .slice(15 * (page - 1), 15 * page)
              .map((song, id) => (
                <SongListItem song={song} key={id} />
              ))
          )
       }
      </div>
    </div>
  );
};

export default SongsList;
