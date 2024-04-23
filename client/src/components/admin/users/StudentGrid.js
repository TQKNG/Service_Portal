import React, { useState, useEffect } from "react";
import Search from "../../layouts/Search";
import StudentFilter from "./StudentFilter";
import _ from "lodash";
import SortIcon from "../../layouts/SortIcon";
import ProgressBarStatus from "../../layouts/PercentileBar";

const StudentGrid = ({ reports, reportsLoading }) => {
  const formatReports = (arr) => {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].CategoryID === 4) {
        let CLS = JSON.parse(JSON.stringify(arr[i])),
          WWR = JSON.parse(JSON.stringify(arr[i]));
        // CLS
        CLS.TotalScore = parseInt((arr[i].TotalScore + "").slice(0, -3));
        CLS.Rank = parseInt((arr[i].Rank + "").slice(0, -4));
        CLS.Percentile = parseInt((arr[i].Percentile + "").slice(0, -3));
        CLS.Category = "Silly Word (CLS)";
        WWR.TotalScore = parseInt((arr[i].TotalScore + "").slice(-3));
        WWR.Rank = parseInt((arr[i].Rank + "").slice(-4));
        WWR.Percentile = parseInt((arr[i].Percentile + "").slice(-3));
        WWR.CategoryID = 7;
        WWR.Category = "Silly Word (WWR)";
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

  const [sortKeys, setSortKeys] = useState([]);

  const [isShowIcon, setIsShowIcon] = useState(null);

  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState({
    Year: "",
    BenchMark: "",
    Category: "",
    Grade: "",
    Percentile: "",
  });

  useEffect(() => {
    if (sortKeys.length > 0) {
      setListSearch(
        _.orderBy(
          searchInput(filterInput(formatReports(reports), formData), search),
          getKeys(sortKeys),
          getOrder(sortKeys)
        )
      );
    } else {
      setListSearch(
        searchInput(filterInput(formatReports(reports), formData), search)
      );
    }
  }, [sortKeys]);

  useEffect(() => {
    if (!reportsLoading) {
      setListSearch(formatReports(reports));
    }
  }, [reportsLoading, setListSearch, reports]);

  const [icons, setIcons] = useState({
    school: 0,
    year: 0,
    benchmark: 0,
    category: 0,
    title: 0,
    grade: 0,
    percentile: 0,
    percentileRank:0,
    teacher: 0,
    risk:0,
    section:0,
    wellBelow:0,
    below:0,
    atBenchmark:0,
    aboveBenchmark:0
  });

  const percentileCheck = (percentile, cond) => {
    if (cond === 0) return percentile < 10;
    else if (cond === 1) return percentile >= 10 && percentile < 20;
    else if (cond === 2) return percentile >= 20 && percentile < 90;
    else return percentile >= 90;
  };

  const {
    school,
    year,
    benchmark,
    category,
    title,
    grade,
    percentile,
    percentileRank,
    teacher,
    score,
    risk,
    rank,
    section,
    wellBelow,
    below,
    atBenchmark,
    aboveBenchmark
  } = icons;

  const getKeys = (arr) => {
    return arr.map((a) => a.key);
  };
  const getOrder = (arr) => {
    return arr.map((a) => a.order);
  };

  const setFilter = (data) => {
    setIcons({
      school: 0,
      year: 0,
      benchmark: 0,
      category: 0,
      title: 0,
      grade: 0,
      percentile: 0,
      teacher: 0,
      score:0,
      rank:0,
      percentileRank:0,
     
    });

    setListSearch(filterInput(listSearch, data));
  };

  const searchInput = (arr, word) => {
    return arr.filter(
      (item) =>
        item.StudentName.includes(word.toUpperCase()) ||
        item.School.toUpperCase().includes(word.toUpperCase()) ||
        item.Year.toString().toUpperCase().includes(word.toUpperCase()) ||
        item.BenchMark.toUpperCase().includes(word.toUpperCase()) ||
        item.Category.toUpperCase().includes(word.toUpperCase()) ||
        item.Grade.toUpperCase().includes(word.toUpperCase()) ||
        item.Title.toUpperCase().includes(word.toUpperCase()) ||
        item.Percentile.toString().toUpperCase().includes(word.toUpperCase())
    );
  };

  const filterInput = (arr, data) => {
    return arr.filter(
      (item) =>
        (data.Year === ""
          ? true
          : item.Year.toString()
              .toUpperCase()
              .includes(data.Year.toString().toUpperCase())) &&
        (data.BenchMark === ""
          ? true
          : item.BenchMark.toUpperCase().includes(
              data.BenchMark.toUpperCase()
            )) &&
        (data.Category === ""
          ? true
          : item.Category.toUpperCase().includes(
              data.Category.toUpperCase()
            )) &&
        (data.Grade === ""
          ? true
          : item.Grade.toUpperCase().includes(data.Grade.toUpperCase())) &&
        (data.Percentile === ""
          ? true
          : percentileCheck(item.Percentile, parseInt(data.Percentile)))
    );
  };

  return (
    <>
      {!reportsLoading ? (
        <div className="mb-3">
          <div className="d-flex justify-content-between align-items-center">
            <div className="txt-primary">Student Grades</div>
            <div className="d-flex">
              <Search
                setListSearch={setListSearch}
                setSearch={setSearch}
                filter={(e) => {
                  setIcons({
                    school: 0,
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
                    e.target.value
                  );
                }}
              />

              <StudentFilter
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

          {/* Option1 */}
          <table className="table table-striped">
            <thead>
              <tr>
                {/* Field: School */}
                <th
                  width="10%"
                  scope="col"
                  onClick={() => {
                    if (school === 0) {
                      setSortKeys([
                        ...sortKeys,
                        { key: "School", order: "asc" },
                      ]);
                      setIcons({
                        ...icons,
                        school: 1,
                      });
                    } else if (school === 1) {
                      setSortKeys(
                        sortKeys.map((a) => {
                          if (a.key === "School")
                            return { ...a, order: "desc" };
                          return a;
                        })
                      );
                      setIcons({
                        ...icons,
                        school: -1,
                      });
                    } else {
                      setSortKeys(sortKeys.filter((a) => a.key !== "School"));
                      setIcons({
                        ...icons,
                        school: 0,
                      });
                    }
                  }}
                  onMouseEnter={() => setIsShowIcon("school")}
                  onMouseLeave={() => setIsShowIcon(null)}
                >
                  School
                  <SortIcon icon={school} isShowIcon={isShowIcon==='school'}/>
                </th>
                {/* Field: Year */}
                <th
                  scope="col"
                  width="10%"
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
                >
                  Year
                  <SortIcon icon={year} />
                </th>
                {/* Field Benchmark */}
                <th
                   width="10%"
                  scope="col"
                  onClick={() => {
                    if (benchmark === 0) {
                      setSortKeys([
                        ...sortKeys,
                        { key: 'BenchMark', order: 'asc' },
                      ]);
                      setIcons({
                        ...icons,
                        benchmark: 1,
                      });
                    } else if (benchmark === 1) {
                      setSortKeys(
                        sortKeys.map((a) => {
                          if (a.key === 'BenchMark')
                            return { ...a, order: 'desc' };
                          return a;
                        }),
                      );
                      setIcons({
                        ...icons,
                        benchmark: -1,
                      });
                    } else {
                      setSortKeys(
                        sortKeys.filter((a) => a.key !== 'BenchMark'),
                      );
                      setIcons({
                        ...icons,
                        benchmark: 0,
                      });
                    }
                  }}
                >
                  Benchmark
                  <SortIcon icon={benchmark} />
                </th>
                {/* Field: Category */}
                <th
                  scope="col"
                  width="10%"
                  onClick={() => {
                    if (category === 0) {
                      setSortKeys([
                        ...sortKeys,
                        { key: 'Category', order: 'asc' },
                      ]);
                      setIcons({
                        ...icons,
                        category: 1,
                      });
                    } else if (category === 1) {
                      setSortKeys(
                        sortKeys.map((a) => {
                          if (a.key === 'Category')
                            return { ...a, order: 'desc' };
                          return a;
                        }),
                      );
                      setIcons({
                        ...icons,
                        category: -1,
                      });
                    } else {
                      setSortKeys(sortKeys.filter((a) => a.key !== 'Category'));
                      setIcons({
                        ...icons,
                        category: 0,
                      });
                    }
                  }}
                >
                  Category
                  <SortIcon icon={category} />
                </th>
                {/* Field: Title */}
                <th
                  scope="col"
                  onClick={() => {
                    if (title === 0) {
                      setSortKeys([
                        ...sortKeys,
                        { key: 'Title', order: 'asc' },
                      ]);
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
                >
                  Title
                  <SortIcon icon={title} />
                </th>
                {/* Field Grade */}
                <th
                   width="10%"
                  scope="col"
                  onClick={() => {
                    if (grade === 0) {
                      setSortKeys([
                        ...sortKeys,
                        { key: 'Grade', order: 'asc' },
                      ]);
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
                      setIcons({
                        ...icons,
                        grade: -1,
                      });
                    } else {
                      setSortKeys(sortKeys.filter((a) => a.key !== 'Grade'));
                      setIcons({
                        ...icons,
                        grade: 0,
                      });
                    }
                  }}
                >
                  Grade
                  <SortIcon icon={grade} />
                </th>
                {/* Field Raw Score */}
                <th
                   width="10%"
                  scope="col"
                  onClick={() => {
                    if (score === 0) {
                      setSortKeys([
                        ...sortKeys,
                        { key: 'Score', order: 'asc' },
                      ]);
                      setIcons({
                        ...icons,
                        score: 1,
                      });
                    } else if (score === 1) {
                      setSortKeys(
                        sortKeys.map((a) => {
                          if (a.key === 'Score')
                            return { ...a, order: 'desc' };
                          return a;
                        }),
                      );
                      setIcons({
                        ...icons,
                        score: -1,
                      });
                    } else {
                      setSortKeys(
                        sortKeys.filter((a) => a.key !== 'Score'),
                      );
                      setIcons({
                        ...icons,
                        score: 0,
                      });
                    }
                  }}
                >
                  Score
                  <SortIcon icon={score} />
                </th>
                {/* Field Percentile */}
                <th
                   width="10%"
                  scope="col"
                  class="text-truncate"
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
                {/* Field: Rank */}
                <th
                   width="10%"
                  scope="col"
                  onClick={() => {
                    if (rank === 0) {
                      setSortKeys([
                        ...sortKeys,
                        { key: 'Rank', order: 'asc' },
                      ]);
                      setIcons({
                        ...icons,
                        rank: 1,
                      });
                    } else if (rank === 1) {
                      setSortKeys(
                        sortKeys.map((a) => {
                          if (a.key === 'Rank')
                            return { ...a, order: 'desc' };
                          return a;
                        }),
                      );
                      setIcons({
                        ...icons,
                        rank: -1,
                      });
                    } else {
                      setSortKeys(
                        sortKeys.filter((a) => a.key !== 'Rank'),
                      );
                      setIcons({
                        ...icons,
                        rank: 0,
                      });
                    }
                  }}
                >
                  Rank
                  <SortIcon icon={rank} />
                </th>
                {/* Field: Percentile Rank */}
                <th
                   width="10%"
                  scope="col"
                  className="text-center"
                  onClick={() => {
                    if (percentileRank === 0) {
                      setSortKeys([
                        ...sortKeys,
                        { key: 'PercentileRank', order: 'asc' },
                      ]);
                      setIcons({
                        ...icons,
                        percentileRank: 1,
                      });
                    } else if (percentileRank=== 1) {
                      setSortKeys(
                        sortKeys.map((a) => {
                          if (a.key === 'PercentileRank')
                            return { ...a, order: 'desc' };
                          return a;
                        }),
                      );
                      setIcons({
                        ...icons,
                        percentileRank: -1,
                      });
                    } else {
                      setSortKeys(
                        sortKeys.filter((a) => a.key !== 'Percentile'),
                      );
                      setIcons({
                        ...icons,
                        percentileRank: 0,
                      });
                    }
                  }}
                >
                  Percentile Rank
                  <SortIcon icon={percentileRank} />
                </th>
                {/* Field: Risk Status */}
                <th
                   width="10%"
                  scope="col"
                  onClick={() => {
                    if (risk === 0) {
                      setSortKeys([
                        ...sortKeys,
                        { key: 'riskStatus', order: 'asc' },
                      ]);
                      setIcons({
                        ...icons,
                        risk: 1,
                      });
                    } else if (risk === 1) {
                      setSortKeys(
                        sortKeys.map((a) => {
                          if (a.key === 'riskStatus')
                            return { ...a, order: 'desc' };
                          return a;
                        }),
                      );
                      setIcons({
                        ...icons,
                        risk: -1,
                      });
                    } else {
                      setSortKeys(
                        sortKeys.filter((a) => a.key !== 'riskStatus'),
                      );
                      setIcons({
                        ...icons,
                        risk: 0,
                      });
                    }
                  }}
                >
                  Benchmark Status
                  <SortIcon icon={risk} />
                </th>
                {/* Field Section */}
                <th
                   width="10%"
                  scope="col"
                  onClick={() => {
                    if (section === 0) {
                      setSortKeys([
                        ...sortKeys,
                        { key: "Section", order: "asc" },
                      ]);
                      setIcons({
                        ...icons,
                        section: 1,
                      });
                    } else if (section === 1) {
                      setSortKeys(
                        sortKeys.map((a) => {
                          if (a.key === "Section")
                            return { ...a, order: "desc" };
                          return a;
                        })
                      );
                      setIcons({
                        ...icons,
                        section: -1,
                      });
                    } else {
                      setSortKeys(
                        sortKeys.filter((a) => a.key !== "Section")
                      );
                      setIcons({
                        ...icons,
                        section: 0,
                      });
                    }
                  }}
                >
                  Section
                  <SortIcon icon={section} />
                </th>
                {/* Field: Teacher */}
                <th
                   width="10%"
                  scope="col"
                  onClick={() => {
                    if (teacher === 0) {
                      setSortKeys([
                        ...sortKeys,
                        { key: 'TeacherFirstName', order: 'asc' },
                      ]);
                      setIcons({
                        ...icons,
                        teacher: 1,
                      });
                    } else if (teacher === 1) {
                      setSortKeys(
                        sortKeys.map((a) => {
                          if (a.key === 'TeacherFirstName')
                            return { ...a, order: 'desc' };
                          return a;
                        }),
                      );
                      setIcons({
                        ...icons,
                        teacher: -1,
                      });
                    } else {
                      setSortKeys(
                        sortKeys.filter((a) => a.key !== 'TeacherFirstName'),
                      );
                      setIcons({
                        ...icons,
                        teacher: 0,
                      });
                    }
                  }}
                >
                  Teacher
                  <SortIcon icon={teacher} />
                </th>
                {/* Field: Well Below Benchmark Range */}
                <th
                   width="10%"
                  scope="col"
                  onClick={() => {
                    if (wellBelow === 0) {
                      setSortKeys([
                        ...sortKeys,
                        { key: 'wellBelowBenchmarkRange', order: 'asc' },
                      ]);
                      setIcons({
                        ...icons,
                        wellBelow: 1,
                      });
                    } else if (wellBelow === 1) {
                      setSortKeys(
                        sortKeys.map((a) => {
                          if (a.key === 'wellBelowBenchmarkRange')
                            return { ...a, order: 'desc' };
                          return a;
                        }),
                      );
                      setIcons({
                        ...icons,
                        wellBelow: -1,
                      });
                    } else {
                      setSortKeys(
                        sortKeys.filter((a) => a.key !== 'wellBelowBenchmarkRange'),
                      );
                      setIcons({
                        ...icons,
                        wellBelow: 0,
                      });
                    }
                  }}
                >
                  Well Below Benmark
                  <SortIcon icon={wellBelow} />
                </th>
                {/* Field: Below Benchmark Range */}
                <th
                   width="10%"
                  scope="col"
                  onClick={() => {
                    if (below === 0) {
                      setSortKeys([
                        ...sortKeys,
                        { key: 'belowBenchmarkRange', order: 'asc' },
                      ]);
                      setIcons({
                        ...icons,
                        below: 1,
                      });
                    } else if (below === 1) {
                      setSortKeys(
                        sortKeys.map((a) => {
                          if (a.key === 'belowBenchmarkRange')
                            return { ...a, order: 'desc' };
                          return a;
                        }),
                      );
                      setIcons({
                        ...icons,
                        below: -1,
                      });
                    } else {
                      setSortKeys(
                        sortKeys.filter((a) => a.key !== 'belowBenchmarkRange'),
                      );
                      setIcons({
                        ...icons,
                        below: 0,
                      });
                    }
                  }}
                >
                  Below Benmark
                  <SortIcon icon={below} />
                </th>
                {/* Field: at Benchmark Range */}
                <th
                   width="10%"
                  scope="col"
                  onClick={() => {
                    if (atBenchmark === 0) {
                      setSortKeys([
                        ...sortKeys,
                        { key: 'atBenchmarkRange', order: 'asc' },
                      ]);
                      setIcons({
                        ...icons,
                        atBenchmark: 1,
                      });
                    } else if (atBenchmark === 1) {
                      setSortKeys(
                        sortKeys.map((a) => {
                          if (a.key === 'atBenchmarkRange')
                            return { ...a, order: 'desc' };
                          return a;
                        }),
                      );
                      setIcons({
                        ...icons,
                        atBenchmark: -1,
                      });
                    } else {
                      setSortKeys(
                        sortKeys.filter((a) => a.key !== 'atBenchmarkRange'),
                      );
                      setIcons({
                        ...icons,
                        atBenchmark: 0,
                      });
                    }
                  }}
                >
                  At Benmark
                  <SortIcon icon={atBenchmark} />
                </th>
                {/* Field: Above Benchmark Range */}
                <th
                   width="10%"
                  scope="col"
                  onClick={() => {
                    if (aboveBenchmark === 0) {
                      setSortKeys([
                        ...sortKeys,
                        { key: 'aboveBenchmarkRange', order: 'asc' },
                      ]);
                      setIcons({
                        ...icons,
                        aboveBenchmark: 1,
                      });
                    } else if (aboveBenchmark === 1) {
                      setSortKeys(
                        sortKeys.map((a) => {
                          if (a.key === 'aboveBenchmarkRange')
                            return { ...a, order: 'desc' };
                          return a;
                        }),
                      );
                      setIcons({
                        ...icons,
                        aboveBenchmark: -1,
                      });
                    } else {
                      setSortKeys(
                        sortKeys.filter((a) => a.key !== 'aboveBenchmarkRange'),
                      );
                      setIcons({
                        ...icons,
                        aboveBenchmark: 0,
                      });
                    }
                  }}
                >
                  Above Benmark
                  <SortIcon icon={aboveBenchmark} />
                </th>
              </tr>
            </thead>
            <tbody>
              {listSearch
                .filter((item) => item.Percentile !== null)
                .map((item, id) => {
                  return (
                    <tr key={id}>
                      <td>{item.School}</td>
                      <td>{item.Year}</td>
                      <td>{item.BenchMark}</td>
                      <td>{item.Category}</td>
                      <td>{item.Title}</td>
                      <td>{item.Grade}</td>
                      <td>{item.RawScore}</td>
                      <td>{item.Percentile}</td>
                      <td>{item.Rank}</td>
                      <td>
                        <ProgressBarStatus
                          calculationType={1}
                          rawScore={item.RawScore}
                          status={item?.PercentileRank}
                        />
                      </td>
                      <td>{item.riskStatus}</td>

                      <td>{item.Section}</td>
                      <td>{item.TeacherName}</td>
                      <td>{item.wellBelowBenchmarkRange}</td>
                      <td>{item.belowBenchmarkRange}</td>
                      <td>{item.atBenchmarkRange}</td>
                      <td>{item.aboveBenchmarkRange}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="d-flex justify-content-center align-items-center h-100">
          <div className="spinner-border txt-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </>
  );
};

export default StudentGrid;
