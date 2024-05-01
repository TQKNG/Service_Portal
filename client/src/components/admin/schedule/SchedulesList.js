import React, { useEffect, useState } from "react";
import Alert from "../../layouts/Alert";
import _ from "underscore";
import Search from "../../layouts/Search";
import SortIcon from "../../layouts/SortIcon";
import ScheduleListItem from "./ScheduleListItem";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SchedulesList = ({ schedulesList, scheduleListLoading }) => {
  const [listSearch, setListSearch] = useState(schedulesList);
  const [page, setPage] = useState(1);
  const [icons, setIcons] = useState({
    name: 0,
  });
  const [isShowIcon, setIsShowIcon] = useState(null);

  const { name } = icons;

  useEffect(() => {
    if (!scheduleListLoading) {
      // on initial load, sort by InOutID ASC - default
      const sortedList = _.sortBy(schedulesList, _.property("InOutID"));

      setListSearch(sortedList);
    }
  }, [scheduleListLoading, setListSearch, schedulesList]);

  return (
    <div className="card w-100 p-2 p-sm-3 p-lg-5 shadow-lg border-0 users-list ">
      <ToastContainer />
      <Alert />
      <div className="d-flex w-100 align-items-center justify-content-between mb-3">
        <div className="">
          {!scheduleListLoading && listSearch.length / 15 > 1 && (
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
              const list = schedulesList.filter((item) =>
                item.Name.toUpperCase().includes(e.target.value.toUpperCase())
              );
              return list;
            }}
          />
        </div>
      </div>
      <div className="admin-users-fields  d-flex align-items-center justify-content-around  rounded  bg-body txt-primary">
        {/* Schedule ID */}
        <div className="admin-schools-field text-truncate mx-auto ">
          Schedule ID
        </div>

        <div
          className="admin-schools-field  text-truncate mx-auto"
          onMouseEnter={() => setIsShowIcon("name")}
          onMouseLeave={() => setIsShowIcon(null)}
          onClick={() => {
            if (name === 0 && schedulesList.length) {
              const sortedList = _.sortBy(schedulesList, (schedule) => {
                const name = schedule.Name;
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
                (schedule) => schedule.Name.toLowerCase(),
              ]).reverse();
              setListSearch(sortedList);
              setIcons({
                name: -1,
              });
            } else {
              const sortedList = _.sortBy(
                schedulesList,
                _.property("ScheduleID")
              );
              setListSearch(sortedList);
              setIcons({
                name: 0,
              });
            }
          }}
        >
          Robot Name
          <SortIcon icon={name} isShowIcon={isShowIcon === "name"} />
        </div>

        {/*Location */}
        <div className="admin-large-field text-truncate mx-auto">Location</div>
        {/*Announcement */}
        <div className="admin-large-field text-truncate mx-auto">
          Announcement
        </div>
        {/*Start Time */}
        <div className="admin-large-field text-truncate mx-auto">
          Start Time
        </div>
        {/* Acutal End Time */}
        <div className="admin-large-field text-truncate mx-auto">
          Actual End Time
        </div>
        {/*Duration */}
        <div className="admin-large-field text-truncate mx-auto">Duration</div>
        {/* Status */}
        <div className="admin-large-field text-truncate mx-auto">Status</div>
        <div className="admin-schools-field text-truncate ml-1">Actions</div>
      </div>
      <div className="users-list-body ">
        {scheduleListLoading ? (
          <div className="d-flex justify-content-center align-items-center h-100">
            <div class="spinner-border txt-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : schedulesList.length === 0 ? (
          <div className="d-flex justify-content-center align-items-center h-100">
            <div className="txt-primary">No Schedules Found</div>
          </div>
        ) : (
          listSearch
            .slice(15 * (page - 1), 15 * page)
            .map((schedule, id) => (
              <ScheduleListItem schedule={schedule} key={id} />
            ))
        )}
      </div>
    </div>
  );
};

export default SchedulesList;
