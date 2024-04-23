import React, { useState, useEffect } from 'react';
import Search from '../../layouts/Search';
import _ from 'lodash';
import ClassroomStudentFilter from './ClassroomStudentFilter';
import SortIcon from '../../layouts/SortIcon';

const ClassroomStudentGrid = ({ reports, reportsLoading }) => {
  const formatReports = (arr) => {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
      arr[i].Name = arr[i].FirstName + ' ' + arr[i].LastName;
      if (arr[i].CategoryID === 4) {
        let CLS = JSON.parse(JSON.stringify(arr[i])),
          WWR = JSON.parse(JSON.stringify(arr[i]));
        // CLS
        CLS.TotalScore = parseInt((arr[i].TotalScore + '').slice(0, -3));
        CLS.Rank = parseInt((arr[i].Rank + '').slice(0, -4));
        CLS.Percentile = parseInt((arr[i].Percentile + '').slice(0, -3));
        CLS.Category = 'Silly Word (CLS)';
        WWR.TotalScore = parseInt((arr[i].TotalScore + '').slice(-3));
        WWR.Rank = parseInt((arr[i].Rank + '').slice(-4));
        WWR.Percentile = parseInt((arr[i].Percentile + '').slice(-3));
        WWR.CategoryID = 7;
        WWR.Category = 'Silly Word (WWR)';
        result.push(CLS);
        result.push(WWR);
        //console.log(CLS, WWR);
      } else {
        result.push(arr[i]);
      }
    }
    return result;
  };

  const [listSearch, setListSearch] = useState(formatReports(reports));

  const [search, setSearch] = useState('');
  const [formData, setFormData] = useState({
    Year: '',
    BenchMark: '',
    Category: '',
    Grade: '',
    Percentile: '',
  });

  const [sortKeys, setSortKeys] = useState([]);

  useEffect(() => {
    if (sortKeys.length > 0) {
      setListSearch(
        _.orderBy(
          searchInput(filterInput(formatReports(reports), formData), search),
          getKeys(sortKeys),
          getOrder(sortKeys),
        ),
      );
    } else {
      setListSearch(
        searchInput(filterInput(formatReports(reports), formData), search),
      );
    }
  }, [sortKeys]);

  useEffect(() => {
    if (!reportsLoading) {
      setListSearch(formatReports(reports));
    }
  }, [reportsLoading, setListSearch, reports]);

  const [icons, setIcons] = useState({
    name: 0,
    year: 0,
    benchmark: 0,
    category: 0,
    title: 0,
    grade: 0,
    percentile: 0,
    teacher: 0,
  });

  const percentileCheck = (percentile, cond) => {
    if (cond === 0) return percentile < 10;
    else if (cond === 1) return percentile >= 10 && percentile < 20;
    else if (cond === 2) return percentile >= 20 && percentile < 90;
    else return percentile >= 90;
  };

  const { name, year, benchmark, category, title, grade, percentile, teacher } =
    icons;

  const getKeys = (arr) => {
    return arr.map((a) => a.key);
  };
  const getOrder = (arr) => {
    return arr.map((a) => a.order);
  };

  const setFilter = (data) => {
    setIcons({
      name: 0,
      year: 0,
      benchmark: 0,
      category: 0,
      title: 0,
      grade: 0,
      percentile: 0,
      teacher: 0,
    });
    setListSearch(filterInput(listSearch, data));
  };

  const searchInput = (arr, word) => {
    return arr.filter(
      (item) =>
        item.StudentName.includes(word.toUpperCase()) ||
        item.Year.toString().toUpperCase().includes(word.toUpperCase()) ||
        item.BenchMark.toUpperCase().includes(word.toUpperCase()) ||
        item.Category.toUpperCase().includes(word.toUpperCase()) ||
        item.Grade.toUpperCase().includes(word.toUpperCase()) ||
        item.Title.toUpperCase().includes(word.toUpperCase()) ||
        item.Percentile.toString().toUpperCase().includes(word.toUpperCase()) ||
        item.Name.toUpperCase().includes(word.toUpperCase()),
    );
  };

  const filterInput = (arr, data) => {
    return arr.filter(
      (item) =>
        (data.Year === ''
          ? true
          : item.Year.toString()
              .toUpperCase()
              .includes(data.Year.toString().toUpperCase())) &&
        (data.BenchMark === ''
          ? true
          : item.BenchMark.toUpperCase().includes(
              data.BenchMark.toUpperCase(),
            )) &&
        (data.Category === ''
          ? true
          : item.Category.toUpperCase().includes(
              data.Category.toUpperCase(),
            )) &&
        (data.Grade === ''
          ? true
          : item.Grade.toUpperCase().includes(data.Grade.toUpperCase())) &&
        (data.Percentile === ''
          ? true
          : percentileCheck(item.Percentile, parseInt(data.Percentile))),
    );
  };

  return (
    <>
      {!reportsLoading ? (
        <div className='mb-3'>
          <div className='d-flex justify-content-between align-items-center'>
            <div className='txt-primary'>Student Grades</div>
            <div className='d-flex'>
              <Search
                setListSearch={setListSearch}
                setSearch={setSearch}
                filter={(e) => {
                  setIcons({
                    name: 0,
                    year: 0,
                    benchmark: 0,
                    category: 0,
                    title: 0,
                    grade: 0,
                    percentile: 0,
                    teacher: 0,
                  });
                  return searchInput(
                    filterInput(formatReports(reports), formData),
                    e.target.value,
                  );
                }}
              />

              <ClassroomStudentFilter
                setFilter={setFilter}
                setListSearch={setListSearch}
                formatReports={formatReports}
                reports={reports}
                formData={formData}
                setFormData={setFormData}
                searchInput={searchInput}
                search={search}
              />
            </div>
          </div>

          <table className='table table-striped'>
            <thead>
              <tr>
                <th
                  scope='col'
                  // onClick={() => {
                  //   if (name === 0) {
                  //     setSortKeys([...sortKeys, { key: 'Name', order: 'asc' }]);
                  //     setIcons({
                  //       ...icons,
                  //       name: 1,
                  //     });
                  //   } else if (name === 1) {
                  //     setSortKeys(
                  //       sortKeys.map((a) => {
                  //         if (a.key === 'Name') return { ...a, order: 'desc' };
                  //         return a;
                  //       }),
                  //     );
                  //     setIcons({
                  //       ...icons,
                  //       name: -1,
                  //     });
                  //   } else {
                  //     setSortKeys(sortKeys.filter((a) => a.key !== 'Name'));
                  //     setIcons({
                  //       ...icons,
                  //       name: 0,
                  //     });
                  //   }
                  // }}
                >
                  Student Name
                  <SortIcon icon={name} />
                </th>
                <th
                  scope='col'
                  // onClick={() => {
                  //   if (year === 0) {
                  //     setSortKeys([...sortKeys, { key: 'Year', order: 'asc' }]);
                  //     setIcons({
                  //       ...icons,
                  //       year: 1,
                  //     });
                  //   } else if (year === 1) {
                  //     setSortKeys(
                  //       sortKeys.map((a) => {
                  //         if (a.key === 'Year') return { ...a, order: 'desc' };
                  //         return a;
                  //       }),
                  //     );
                  //     setIcons({
                  //       ...icons,
                  //       year: -1,
                  //     });
                  //   } else {
                  //     setSortKeys(sortKeys.filter((a) => a.key !== 'Year'));
                  //     setIcons({
                  //       ...icons,
                  //       year: 0,
                  //     });
                  //   }
                  // }}
                >
                  Year
                  <SortIcon icon={year} />
                </th>
                <th
                  scope='col'
                  // onClick={() => {
                  //   if (benchmark === 0) {
                  //     setSortKeys([
                  //       ...sortKeys,
                  //       { key: 'BenchMark', order: 'asc' },
                  //     ]);
                  //     setIcons({
                  //       ...icons,
                  //       benchmark: 1,
                  //     });
                  //   } else if (benchmark === 1) {
                  //     setSortKeys(
                  //       sortKeys.map((a) => {
                  //         if (a.key === 'BenchMark')
                  //           return { ...a, order: 'desc' };
                  //         return a;
                  //       }),
                  //     );
                  //     setIcons({
                  //       ...icons,
                  //       benchmark: -1,
                  //     });
                  //   } else {
                  //     setSortKeys(
                  //       sortKeys.filter((a) => a.key !== 'BenchMark'),
                  //     );
                  //     setIcons({
                  //       ...icons,
                  //       benchmark: 0,
                  //     });
                  //   }
                  // }}
                >
                  Benchmark
                  <SortIcon icon={benchmark} />
                </th>
                <th
                  scope='col'
                  // onClick={() => {
                  //   if (category === 0) {
                  //     setSortKeys([
                  //       ...sortKeys,
                  //       { key: 'Category', order: 'asc' },
                  //     ]);
                  //     setIcons({
                  //       ...icons,
                  //       category: 1,
                  //     });
                  //   } else if (category === 1) {
                  //     setSortKeys(
                  //       sortKeys.map((a) => {
                  //         if (a.key === 'Category')
                  //           return { ...a, order: 'desc' };
                  //         return a;
                  //       }),
                  //     );
                  //     setIcons({
                  //       ...icons,
                  //       category: -1,
                  //     });
                  //   } else {
                  //     setSortKeys(sortKeys.filter((a) => a.key !== 'Category'));
                  //     setIcons({
                  //       ...icons,
                  //       category: 0,
                  //     });
                  //   }
                  // }}
                >
                  Category
                  <SortIcon icon={category} />
                </th>
                <th
                  scope='col'
                  // onClick={() => {
                  //   if (title === 0) {
                  //     setSortKeys([
                  //       ...sortKeys,
                  //       { key: 'Title', order: 'asc' },
                  //     ]);
                  //     setIcons({
                  //       ...icons,
                  //       title: 1,
                  //     });
                  //   } else if (title === 1) {
                  //     setSortKeys(
                  //       sortKeys.map((a) => {
                  //         if (a.key === 'Title') return { ...a, order: 'desc' };
                  //         return a;
                  //       }),
                  //     );
                  //     setIcons({
                  //       ...icons,
                  //       title: -1,
                  //     });
                  //   } else {
                  //     setSortKeys(sortKeys.filter((a) => a.key !== 'Title'));
                  //     setIcons({
                  //       ...icons,
                  //       title: 0,
                  //     });
                  //   }
                  // }}
                >
                  Title
                  <SortIcon icon={title} />
                </th>
                <th
                  scope='col'
                  // onClick={() => {
                  //   if (grade === 0) {
                  //     setSortKeys([
                  //       ...sortKeys,
                  //       { key: 'Grade', order: 'asc' },
                  //     ]);
                  //     setIcons({
                  //       ...icons,
                  //       grade: 1,
                  //     });
                  //   } else if (grade === 1) {
                  //     setSortKeys(
                  //       sortKeys.map((a) => {
                  //         if (a.key === 'Grade') return { ...a, order: 'desc' };
                  //         return a;
                  //       }),
                  //     );
                  //     setIcons({
                  //       ...icons,
                  //       grade: -1,
                  //     });
                  //   } else {
                  //     setSortKeys(sortKeys.filter((a) => a.key !== 'Grade'));
                  //     setIcons({
                  //       ...icons,
                  //       grade: 0,
                  //     });
                  //   }
                  // }}
                >
                  Grade
                  <SortIcon icon={grade} />
                </th>
                <th
                  scope='col'
                  onClick={() => {
                    if (percentile === 0) {
                      setSortKeys([
                        ...sortKeys,
                        { key: 'Percentile', order: 'asc' },
                      ]);
                      setIcons({
                        ...icons,
                        percentile: 1,
                      });
                    } else if (percentile === 1) {
                      setSortKeys(
                        sortKeys.map((a) => {
                          if (a.key === 'Percentile')
                            return { ...a, order: 'desc' };
                          return a;
                        }),
                      );
                      setIcons({
                        ...icons,
                        percentile: -1,
                      });
                    } else {
                      setSortKeys(
                        sortKeys.filter((a) => a.key !== 'Percentile'),
                      );
                      setIcons({
                        ...icons,
                        percentile: 0,
                      });
                    }
                  }}
                >
                  Percentile
                  <SortIcon icon={percentile} />
                </th>
                <th
                  scope='col'
                  // onClick={() => {
                  //   if (teacher === 0) {
                  //     setSortKeys([
                  //       ...sortKeys,
                  //       { key: 'TeacherFirstName', order: 'asc' },
                  //     ]);
                  //     setIcons({
                  //       ...icons,
                  //       teacher: 1,
                  //     });
                  //   } else if (teacher === 1) {
                  //     setSortKeys(
                  //       sortKeys.map((a) => {
                  //         if (a.key === 'TeacherFirstName')
                  //           return { ...a, order: 'desc' };
                  //         return a;
                  //       }),
                  //     );
                  //     setIcons({
                  //       ...icons,
                  //       teacher: -1,
                  //     });
                  //   } else {
                  //     setSortKeys(
                  //       sortKeys.filter((a) => a.key !== 'TeacherFirstName'),
                  //     );
                  //     setIcons({
                  //       ...icons,
                  //       teacher: 0,
                  //     });
                  //   }
                  // }}
                >
                  Teacher
                  <SortIcon icon={teacher} />
                </th>
              </tr>
            </thead>
            <tbody>
              {listSearch
                .filter((item) => item.Percentile !== null)
                .map((item, id) => {
                  return (
                    <tr key={id}>
                      <td>{item.StudentName}</td>
                      <td>
                        {item.Year}
                      </td>
                      <td>{item.BenchMark}</td>
                      <td>{item.Category}</td>
                      <td>{item.Title}</td>
                      <td>{item.Grade}</td>
                      <td>{item.Percentile}</td>
                      <td>
                        {item.TeacherName}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className='d-flex justify-content-center align-items-center h-100'>
          <div className='spinner-border txt-primary' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </div>
        </div>
      )}
    </>
  );
};

export default ClassroomStudentGrid;
