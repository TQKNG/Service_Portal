import React, { useEffect, useState } from 'react';
import _ from 'lodash';

import AssessmentListItem from './AssessmentListItem';
import Alert from '../../layouts/Alert';
import Search from '../../layouts/Search';
import AssessmentFilter from './AssessmentFilter';
import SortIcon from '../../layouts/SortIcon';

const AssessmentList = ({ assessmentsList, assessmentListLoading, user }) => {
  const [listSearch, setListSearch] = useState(assessmentsList);

  const [page, setPage] = useState(1);

  const [sortKeys, setSortKeys] = useState([]);

  const [search, setSearch] = useState('');
  const [formData, setFormData] = useState({
    GradeID: '',
    CategoryID: '',
    Title: '',
  });

  const [icons, setIcons] = useState({
    title: 0,
    grade: 0,
    type: 0,
  });

  const [isShowIcon, setIsShowIcon] = useState(null);

  const { title, grade, type } = icons;

  useEffect(() => {
    if (sortKeys.length > 0) {
      setListSearch(
        _.orderBy(
          searchInput(filterInput(assessmentsList, formData), search),
          getKeys(sortKeys),
          getOrder(sortKeys),
        ),
      );
    } else {
      setListSearch(
        searchInput(filterInput(assessmentsList, formData), search),
      );
    }
  }, [sortKeys]);

  useEffect(() => {
    if (!assessmentListLoading) {
      setListSearch(assessmentsList);
    }
  }, [assessmentListLoading, setListSearch, assessmentsList]);

  const getKeys = (arr) => {
    return arr.map((a) => a.key);
  };
  const getOrder = (arr) => {
    return arr.map((a) => a.order);
  };

  const setFilter = (data) => {
    setIcons({
      title: 0,
      grade: 0,
      type: 0,
    });
    setListSearch(filterInput(listSearch, data));
  };

  const searchInput = (arr, word) => {
    return arr.filter(
      (item) =>
        item.Title.toUpperCase().includes(word.toUpperCase()) ||
        ('Grade ' + item.GradeID).toUpperCase().includes(word.toUpperCase()) ||
        item.Category.toUpperCase().includes(word.toUpperCase()),
    );
  };

  const filterInput = (arr, data) => {
    return arr.filter(
      (item) =>
        item.Title.toUpperCase().includes(data.Title.toUpperCase()) &&
        (data.CategoryID === ''
          ? true
          : item.CategoryID + '' === data.CategoryID) &&
        (data.GradeID === '' ? true : item.GradeID + '' === data.GradeID),
    );
  };

  return (
    <div className='card w-100 p-2 p-sm-3 p-lg-5 shadow-lg border-0 users-list '>
      <Alert />
      <div className='d-flex w-100 align-items-center justify-content-between mb-3'>
        <div className=''>
          {!assessmentListLoading && listSearch.length / 15 > 1 && (
            <nav aria-label='Page navigation txt-primary'>
              <ul className='pagination txt-primary'>
                {page > 1 && (
                  <li className='page-item' onClick={() => setPage(page - 1)}>
                    <div
                      className='page-link txt-primary'
                      aria-label='Previous'
                    >
                      <span aria-hidden='true'>&laquo;</span>
                    </div>
                  </li>
                )}
                {listSearch.map((num, id) => {
                  let ind = id + 1;

                  if (ind <= Math.ceil(listSearch.length / 15))
                    return (
                      <li
                        className='page-item'
                        onClick={() => setPage(ind)}
                        key={id}
                      >
                        <div
                          className={`page-link txt-primary ${
                            ind === page ? 'page-selected' : ''
                          }`}
                        >
                          {ind}
                        </div>
                      </li>
                    );
                  return;
                })}
                {page < listSearch.length / 15 && (
                  <li className='page-item' onClick={() => setPage(page + 1)}>
                    <div className='page-link txt-primary' aria-label='Next'>
                      <span aria-hidden='true'>&raquo;</span>
                    </div>
                  </li>
                )}
              </ul>
            </nav>
          )}
        </div>
        <div className='d-flex'>
          <Search
            setListSearch={setListSearch}
            setSearch={setSearch}
            filter={(e) => {
              setIcons({
                title: 0,
                grade: 0,
                type: 0,
              });

              return searchInput(
                filterInput(assessmentsList, formData),
                e.target.value,
              );
            }}
          />
          <AssessmentFilter
            assessmentsList={assessmentsList}
            setFilter={setFilter}
            setListSearch={setListSearch}
            formData={formData}
            setFormData={setFormData}
            searchInput={searchInput}
            search={search}
          />
        </div>
      </div>
      <div className='admin-users-fields  d-flex align-items-center justify-content-around  rounded  bg-body txt-primary'>
        <div
          className='admin-assessments-field text-truncate '
          onClick={() => {
            listSearch.forEach((item, id) => {
              let l = listSearch;
              l[id].Title = item.Title.toLowerCase();
              l[id].Category = item.Category.toLowerCase();
              l[id].GradeID = (item.GradeID + '').toLowerCase();

              setListSearch(l);
            });

            if (title === 0) {
              setSortKeys([...sortKeys, { key: 'Title', order: 'asc' }]);
              setIcons({
                ...icons,
                title: 1,
              });
            } else if (title === 1) {
              setSortKeys(
                sortKeys.map((a) => {
                  if (a.key === 'Title') return { ...a, order: 'desc' };
                  return a;
                }),
              );
              setIcons({
                ...icons,
                title: -1,
              });
            } else {
              setSortKeys(sortKeys.filter((a) => a.key !== 'Title'));
              setIcons({
                ...icons,
                title: 0,
              });
            }
          }}
          onMouseEnter={() => setIsShowIcon('title')}
          onMouseLeave={() => setIsShowIcon(null)}
        >
          Title
          <SortIcon icon={title} isShowIcon={isShowIcon==='title'} />
        </div>
        <div
          className='admin-assessments-field  text-truncate mx-1 '
          onClick={() => {
            listSearch.forEach((item, id) => {
              let l = listSearch;

              l[id].Title = item.Title.toLowerCase();
              l[id].Category = item.Category.toLowerCase();
              l[id].GradeID = (item.GradeID + '').toLowerCase();

              setListSearch(l);
            });

            if (type === 0) {
              setSortKeys([...sortKeys, { key: 'Category', order: 'asc' }]);
              setIcons({
                ...icons,
                type: 1,
              });
            } else if (type === 1) {
              setSortKeys(
                sortKeys.map((a) => {
                  if (a.key === 'Category') return { ...a, order: 'desc' };
                  return a;
                }),
              );
              setIcons({
                ...icons,
                type: -1,
              });
            } else {
              setSortKeys(sortKeys.filter((a) => a.key !== 'Category'));
              setIcons({
                ...icons,
                type: 0,
              });
            }
          }}
          onMouseEnter={() => setIsShowIcon('type')}
          onMouseLeave={() => setIsShowIcon(null)}
        >
          Genre
          <SortIcon icon={type} isShowIcon={isShowIcon==='type'}  />
        </div>
        {/* <div
          className='admin-assessments-field  text-truncate mx-1 '
          onClick={() => {
            listSearch.forEach((item, id) => {
              let l = listSearch;

              l[id].Title = item.Title.toLowerCase();
              l[id].Category = item.Category.toLowerCase();
              l[id].GradeID = (item.GradeID + '').toLowerCase();

              setListSearch(l);
            });

            if (grade === 0) {
              setSortKeys([...sortKeys, { key: 'GradeID', order: 'asc' }]);
              setIcons({
                ...icons,
                grade: 1,
              });
            } else if (grade === 1) {
              setSortKeys(
                sortKeys.map((a) => {
                  if (a.key === 'GradeID') return { ...a, order: 'desc' };
                  return a;
                }),
              );
              setIcons({
                ...icons,
                grade: -1,
              });
            } else {
              setSortKeys(sortKeys.filter((a) => a.key !== 'GradeID'));
              setIcons({
                ...icons,
                grade: 0,
              });
            }
          }}
          onMouseEnter={() => setIsShowIcon('grade')}
          onMouseLeave={() => setIsShowIcon(null)}
        >
          Grade
          <SortIcon icon={grade}  isShowIcon={isShowIcon === 'grade'}/>
        </div> */}

        <div className='admin-assessments-field text-truncate ml-1'>
          Actions
        </div>
      </div>
      {/* <div className='users-list-body '>
        {assessmentListLoading ? (
          <div className='d-flex justify-content-center align-items-center h-100'>
            <div class='spinner-border txt-primary' role='status'>
              <span class='visually-hidden'>Loading...</span>
            </div>
          </div>
        ) : (
          listSearch
            .slice(15 * (page - 1), 15 * page)
            .map((assessment, id) => (
              <AssessmentListItem
                assessment={assessment}
                key={id}
                user={user}
              />
            ))
        )}
      </div> */}
    </div>
  );
};

export default AssessmentList;
