import React, { useState, useEffect } from 'react';
import Alert from '../../layouts/Alert';
import _ from 'lodash';

import Search from '../../layouts/Search';
import ClassroomFilter from './ClassroomFilter';
import ClassroomsListItem from './ClassroomsListItem';
import SortIcon from '../../layouts/SortIcon';

const ClassroomsList = ({ classroomsList, classroomListLoading, user }) => {
  const [listSearch, setListSearch] = useState(
    user.SchoolID !== null
      ? classroomsList.filter(
          (classroom) => classroom.SchoolID === user.SchoolID,
        )
      : classroomsList,
  );

  const [page, setPage] = useState(1);

  const [sortKeys, setSortKeys] = useState([]);

  const [isShowIcon, setIsShowIcon] = useState(null);

  const [search, setSearch] = useState('');
  const [formData, setFormData] = useState({
    Section: '',
    Year: '',
    Grade: '',
  });

  const [icons, setIcons] = useState({
    section: 0,
    grade: 0,
    school: 0,
    year: 0,
    teacher: 0,
  });

  const { section, grade, school, year, teacher } = icons;

  useEffect(() => {
    if (sortKeys.length > 0) {
      setListSearch(
        _.orderBy(
          searchInput(filterInput(classroomsList, formData), search),
          getKeys(sortKeys),
          getOrder(sortKeys),
        ),
      );
    } else {
      setListSearch(searchInput(filterInput(classroomsList, formData), search));
    }
  }, [sortKeys]);

  useEffect(() => {
    if (!classroomListLoading) {
      setListSearch(
        user.SchoolID !== null
          ? classroomsList.filter(
              (classroom) => classroom.SchoolID === user.SchoolID,
            )
          : classroomsList,
      );
    }
  }, [classroomListLoading, setListSearch, classroomsList]);

  const getKeys = (arr) => {
    return arr.map((a) => a.key);
  };
  const getOrder = (arr) => {
    return arr.map((a) => a.order);
  };

  const setFilter = (data) => {
    setIcons({
      section: 0,
      grade: 0,
      school: 0,
      year: 0,
      teacher: 0,
    });
    setListSearch(filterInput(listSearch, data));
  };

  const searchInput = (arr, word) => {
    return arr.filter(
      (item) =>
        item.Section.toUpperCase() === word.toUpperCase() ||
        `${item.Year - 1}-${item.Year}`
          .toUpperCase()
          .includes(word.toUpperCase()) ||
        item.SchoolName.toUpperCase().includes(word.toUpperCase()) ||
        item.Grade.toUpperCase().includes(word.toUpperCase()) ||
        (item.TeacherName + ' ' + item.TeacherLastName)
          .toUpperCase()
          .includes(word.toUpperCase()),
    );
  };

  const filterInput = (arr, data) => {
    return arr.filter(
      (item) =>
        item.Section.toUpperCase().includes(data.Section.toUpperCase()) &&
        (item.Grade === '' ? true : item.Grade.includes(data.Grade)) &&
        (item.Year === '' ? true : (item.Year + '').includes(data.Year + '')),
    );
  };

  return (
    <div className='card w-100 p-2 p-sm-3 p-lg-5 shadow-lg border-0 users-list '>
      <Alert />
      <div className='d-flex w-100 align-items-center justify-content-between mb-3'>
        <div className=''>
          {!classroomListLoading && listSearch.length / 15 > 1 && (
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
                section: 0,
                grade: 0,
                school: 0,
                year: 0,
                teacher: 0,
              });

              return searchInput(
                filterInput(classroomsList, formData),
                e.target.value,
              );
            }}
          />
          <ClassroomFilter
            setFilter={setFilter}
            classroomsList={classroomsList}
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
          className='admin-classrooms-field text-truncate mr-1'
          onClick={() => {
            if (section === 0) {
              setSortKeys([...sortKeys, { key: 'Section', order: 'asc' }]);
              setIcons({ ...icons, section: 1 });
            } else if (section === 1) {
              setSortKeys(
                sortKeys.map((a) => {
                  if (a.key === 'Section') return { ...a, order: 'desc' };
                  return a;
                }),
              );
              setIcons({
                ...icons,
                section: -1,
              });
            } else {
              setSortKeys(sortKeys.filter((a) => a.key !== 'Section'));
              setIcons({
                ...icons,
                section: 0,
              });
            }
          }}
          onMouseEnter={() => setIsShowIcon('section')}
          onMouseLeave={() => setIsShowIcon(null)}
        >
         Song Name
          <SortIcon icon={section}isShowIcon={isShowIcon ==='section' } />
        </div>

        <div
          className='admin-classrooms-field  text-truncate d-md-block d-none mx-1'
          onClick={() => {
            if (grade === 0) {
              setSortKeys([...sortKeys, { key: 'Grade', order: 'asc' }]);
              setIcons({
                ...icons,
                grade: 1,
              });
            } else if (grade === 1) {
              setSortKeys(
                sortKeys.map((a) => {
                  if (a.key === 'Grade') return { ...a, order: 'desc' };
                  return a;
                }),
              );
              setIcons({ ...icons, grade: -1 });
            } else {
              setSortKeys(sortKeys.filter((a) => a.key !== 'Grade'));
              setIcons({
                ...icons,
                grade: 0,
              });
            }
          }}
          onMouseEnter={() => setIsShowIcon('grade')}
          onMouseLeave={() => setIsShowIcon(null)}
        >
          Length
          <SortIcon icon={grade} isShowIcon={isShowIcon ==='grade' } />
        </div>
        <div
          className='admin-classrooms-field text-truncate mr-1'
          onClick={() => {
            if (teacher === 0) {
              setSortKeys([...sortKeys, { key: 'TeacherName', order: 'asc' }]);
              setIcons({
                ...icons,
                teacher: 1,
              });
            } else if (teacher === 1) {
              setSortKeys(
                sortKeys.map((a) => {
                  if (a.key === 'TeacherName') return { ...a, order: 'desc' };
                  return a;
                }),
              );
              setIcons({
                ...icons,
                teacher: -1,
              });
            } else {
              setSortKeys(sortKeys.filter((a) => a.key !== 'TeacherName'));
              setIcons({
                ...icons,
                teacher: 0,
              });
            }
          }}
          onMouseEnter={() => setIsShowIcon('teacher')}
          onMouseLeave={() => setIsShowIcon(null)}
        >
          Last Uploaded Date
          <SortIcon icon={teacher} isShowIcon={isShowIcon==='teacher'} />
        </div>

        {/* {user.UserTypeID === 5 && (
          <div
            className='admin-classrooms-field text-truncate d-md-block d-none mx-1'
            onClick={() => {
              listSearch.forEach((item, id) => {
                let l = listSearch;
                if (item.SchoolName === null) {
                  l[id].SchoolName = '';
                }
                setListSearch(l);
              });

              if (school === 0) {
                setSortKeys([...sortKeys, { key: 'SchoolName', order: 'asc' }]);
                setIcons({
                  ...icons,
                  school: 1,
                });
              } else if (school === 1) {
                setSortKeys(
                  sortKeys.map((a) => {
                    if (a.key === 'SchoolName') return { ...a, order: 'desc' };
                    return a;
                  }),
                );
                setIcons({
                  ...icons,
                  school: -1,
                });
              } else {
                setSortKeys(sortKeys.filter((a) => a.key !== 'SchoolName'));
                setIcons({
                  ...icons,
                  school: 0,
                });
              }
            }}
            onMouseEnter={() => setIsShowIcon('school')}
            onMouseLeave={() => setIsShowIcon(null)}
          >
            School
            <SortIcon icon={school} isShowIcon={isShowIcon==='school'} />
          </div>
        )} */}

        {/* <div
          className='admin-classrooms-field text-truncate ml-1'
          onClick={() => {
            if (year === 0) {
              setSortKeys([...sortKeys, { key: 'Year', order: 'asc' }]);
              setIcons({
                ...icons,
                year: 1,
              });
            } else if (year === 1) {
              setSortKeys(
                sortKeys.map((a) => {
                  if (a.key === 'Year') return { ...a, order: 'desc' };
                  return a;
                }),
              );
              setIcons({
                ...icons,
                year: -1,
              });
            } else {
              setSortKeys(sortKeys.filter((a) => a.key !== 'Year'));
              setIcons({
                ...icons,
                year: 0,
              });
            }
          }}
          onMouseEnter={() => setIsShowIcon('year')}
          onMouseLeave={() => setIsShowIcon(null)}
        >
          Year
          <SortIcon icon={year} isShowIcon={isShowIcon ==='year'}/>
        </div> */}
        <div className='admin-classrooms-field text-truncate ml-1'>Actions</div>
      </div>
      {/* <div className='users-list-body '>
        {classroomListLoading ? (
          <div className='d-flex justify-content-center align-items-center h-100'>
            <div className='spinner-border txt-primary' role='status'>
              <span className='visually-hidden'>Loading...</span>
            </div>
          </div>
        ) : (
          listSearch
            .slice(15 * (page - 1), 15 * page)
            .map((classroom, id) => (
              <ClassroomsListItem classroom={classroom} user={user} key={id} />
            ))
        )}
      </div> */}
    </div>
  );
};

export default ClassroomsList;
