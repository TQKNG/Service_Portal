import React, { useState, useEffect } from 'react';
import Alert from '../../layouts/Alert';
import _ from 'lodash';

import ResultListItem from './ResultListItem';
import Search from '../../layouts/Search';
import ResultFilter from './ResultFilter';
import SortIcon from '../../layouts/SortIcon';

const ResultsList = ({ user, resultsList, resultListLoading }) => {
  const format = (arr) => {
    let data = [];
    for (let i = 0; i < arr.length; i++) {
      data.push({ ...arr[i], Name: arr[i].FirstName + ' ' + arr[i].LastName });
    }
    console.log(data);
    return data;
  };

  const [listSearch, setListSearch] = useState(format(resultsList));

  const [search, setSearch] = useState('');
  const [formData, setFormData] = useState({
    AccessCode: '',
    FirstName: '',
    LastName: '',
    Title: '',
    BenchMarkID: '',
    GradeID: '',
  });

  const [page, setPage] = useState(1);

  const [sortKeys, setSortKeys] = useState([]);

  const [isShowIcon, setIsShowIcon] = useState(null);

  const [icons, setIcons] = useState({
    BenchMark: 0,
    AccessCode: 0,
    Assessment: 0,
    Student: 0,
    Score: 0,
  });

  const { AccessCode, Assessment, Student, BenchMark, Score } = icons;

  useEffect(() => {
    if (sortKeys.length > 0) {
      setListSearch(
        _.orderBy(
          searchInput(filterInput(format(resultsList), formData), search),
          getKeys(sortKeys),
          getOrder(sortKeys),
        ),
      );
    } else {
      setListSearch(
        searchInput(filterInput(format(resultsList), formData), search),
      );
    }
  }, [sortKeys]);

  useEffect(() => {
    if (!resultListLoading) {
      setListSearch(resultsList);
    }
  }, [resultListLoading, setListSearch, resultsList]);

  const getKeys = (arr) => {
    return arr.map((a) => a.key);
  };
  const getOrder = (arr) => {
    return arr.map((a) => a.order);
  };

  const setFilter = (data) => {
    setIcons({
      BenchMark: 0,
      AccessCode: 0,
      Assessment: 0,
      Student: 0,
      Score: 0,
    });
    setListSearch(filterInput(listSearch, data));
  };

  const searchInput = (arr, word) => {
    return arr.filter(
      (item) =>
        (
          item.FirstName.toUpperCase() +
          ' ' +
          item.LastName.toUpperCase()
        ).includes(word.toUpperCase()) ||
        item.Title.toUpperCase().includes(word.toUpperCase()) ||
        (item.AccessCode + '').toUpperCase().includes(word.toUpperCase()) ||
        (item.BenchMarkID + '').toUpperCase().includes(word.toUpperCase()) ||
        (item.GradeID + '').toUpperCase().includes(word.toUpperCase()),
    );
  };

  const filterInput = (arr, data) => {
    return arr.filter((item) =>
      (item.FirstName === ''
        ? true
        : item.FirstName.toUpperCase().includes(
            data.FirstName.toUpperCase(),
          )) &&
      (item.LastName === ''
        ? true
        : item.LastName.toUpperCase().includes(data.LastName.toUpperCase())) &&
      (item.AccessCode + '' === ''
        ? true
        : (item.AccessCode + '')
            .toUpperCase()
            .includes(data.AccessCode.toUpperCase())) &&
      (item.Title === ''
        ? true
        : item.Title.toUpperCase().includes(data.Title.toUpperCase())) &&
      (item.BenchMarkID + '' === ''
        ? true
        : (item.BenchMarkID + '')
            .toUpperCase()
            .includes(data.BenchMarkID.toUpperCase())) &&
      item.GradeID + '' === ''
        ? true
        : (item.GradeID === 7 ? 'Other' : item.GradeID + '')
            .toUpperCase()
            .includes(data.GradeID.toUpperCase()),
    );
  };

  return (
    <div className='card w-100 p-2 p-sm-3 p-lg-5 shadow-lg border-0 users-list '>
      <Alert />
      <div className='d-flex w-100 align-items-center justify-content-between mb-3'>
        <div className='d-flex align-items-center'>
          {!resultListLoading && listSearch.length / 15 > 1 && (
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
                BenchMark: 0,
                AccessCode: 0,
                Assessment: 0,
                Student: 0,
                Score: 0,
              });

              return searchInput(
                filterInput(resultsList, formData),
                e.target.value,
              );
            }}
          />
          <ResultFilter
            setFilter={setFilter}
            resultsList={format(resultsList)}
            setListSearch={setListSearch}
            searchInput={searchInput}
            search={search}
            formData={formData}
            setFormData={setFormData}
          />
        </div>
      </div>
      <div className='admin-users-fields  d-flex align-items-center justify-content-around  rounded  bg-body txt-primary'>
        <div
          className='admin-users-field text-truncate mr-1'
          onClick={() => {
            if (Student === 0) {
              setSortKeys([...sortKeys, { key: 'Name', order: 'asc' }]);
              setIcons({ ...icons, Student: 1 });
            } else if (Student === 1) {
              setSortKeys(
                sortKeys.map((a) => {
                  if (a.key === 'Name') return { ...a, order: 'desc' };
                  return a;
                }),
              );
              setIcons({
                ...icons,
                Student: -1,
              });
            } else {
              setSortKeys(sortKeys.filter((a) => a.key !== 'Name'));
              setIcons({
                ...icons,
                Student: 0,
              });
            }
          }}
          onMouseEnter={() => setIsShowIcon('student')}
          onMouseLeave={() => setIsShowIcon(null)}
        >
          Student
          <SortIcon icon={Student} isShowIcon={isShowIcon ==='student'}/>
        </div>

        <div
          className='admin-users-field  text-truncate d-md-block d-none mx-1'
          onClick={() => {
            if (Assessment === 0) {
              setSortKeys([...sortKeys, { key: 'Title', order: 'asc' }]);
              setIcons({
                ...icons,
                Assessment: 1,
              });
            } else if (Assessment === 1) {
              setSortKeys(
                sortKeys.map((a) => {
                  if (a.key === 'Title') return { ...a, order: 'desc' };
                  return a;
                }),
              );
              setIcons({
                ...icons,
                Assessment: -1,
              });
            } else {
              setSortKeys(sortKeys.filter((a) => a.key !== 'Title'));
              setIcons({
                ...icons,
                Assessment: 0,
              });
            }
          }}
          onMouseEnter={() => setIsShowIcon('assessment')}
          onMouseLeave={() => setIsShowIcon(null)}
        >
          Assessment
          <SortIcon icon={Assessment} isShowIcon={isShowIcon ==='assessment'}/>
        </div>
        <div
          className='admin-users-field text-truncate mr-1'
          onClick={() => {
            if (BenchMark === 0) {
              setSortKeys([...sortKeys, { key: 'BenchMarkID', order: 'asc' }]);
              setIcons({
                ...icons,
                BenchMark: 1,
              });
            } else if (BenchMark === 1) {
              setSortKeys(
                sortKeys.map((a) => {
                  if (a.key === 'BenchMarkID') return { ...a, order: 'desc' };
                  return a;
                }),
              );
              setIcons({ ...icons, BenchMark: -1 });
            } else {
              setSortKeys(sortKeys.filter((a) => a.key !== 'BenchMarkID'));
              setIcons({
                ...icons,
                BenchMark: 0,
              });
            }
          }}
          onMouseEnter={() => setIsShowIcon('benchmark')}
          onMouseLeave={() => setIsShowIcon(null)}
        >
          Benchmark
          <SortIcon icon={BenchMark} isShowIcon={isShowIcon === 'benchmark'} />
        </div>
        <div
          className='admin-users-field text-truncate mr-1'
          onClick={() => {
            if (Score === 0) {
              setSortKeys([...sortKeys, { key: 'GradeID', order: 'asc' }]);
              setIcons({
                ...icons,
                Score: 1,
              });
            } else if (Score === 1) {
              setSortKeys(
                sortKeys.map((a) => {
                  if (a.key === 'GradeID') return { ...a, order: 'desc' };
                  return a;
                }),
              );
              setIcons({
                ...icons,
                Score: -1,
              });
            } else {
              setSortKeys(sortKeys.filter((a) => a.key !== 'GradeID'));
              setIcons({
                ...icons,
                Score: 0,
              });
            }
          }}
          onMouseEnter={() => setIsShowIcon('score')}
          onMouseLeave={() => setIsShowIcon(null)}
        >
          Grade
          <SortIcon icon={Score} isShowIcon={isShowIcon ==='score'} />
        </div>

        <div
          className='admin-users-field text-truncate ml-1'
          onClick={() => {
            if (AccessCode === 0) {
              setSortKeys([...sortKeys, { key: 'AccessCode', order: 'asc' }]);
              setIcons({
                ...icons,
                AccessCode: 1,
              });
            } else if (AccessCode === 1) {
              setSortKeys(
                sortKeys.map((a) => {
                  if (a.key === 'AccessCode') return { ...a, order: 'desc' };
                  return a;
                }),
              );
              setIcons({
                ...icons,
                AccessCode: -1,
              });
            } else {
              setSortKeys(sortKeys.filter((a) => a.key !== 'AccessCode'));
              setIcons({
                ...icons,
                AccessCode: 0,
              });
            }
          }}
          onMouseEnter={() => setIsShowIcon('accesscode')}
          onMouseLeave={() => setIsShowIcon(null)}
        >
          Access Code
          <SortIcon icon={AccessCode} isShowIcon={isShowIcon ==='accesscode'} />
        </div>

        <div className='admin-users-field text-truncate ml-1'>Actions</div>
      </div>
      <div className='users-list-body '>
        {resultListLoading ? (
          <div className='d-flex justify-content-center align-items-center h-100'>
            <div class='spinner-border txt-primary' role='status'>
              <span class='visually-hidden'>Loading...</span>
            </div>
          </div>
        ) : (
          listSearch
            .slice(15 * (page - 1), 15 * page)
            .map((result, id) => (
              <ResultListItem result={result} key={id} user={user} />
            ))
        )}
      </div>
    </div>
  );
};

export default ResultsList;
