const sql = require("mssql");
const { poolPromise } = require("../config/db");

// @route   POST /api/assessmentresults
// @desc    Add an assessment result
// @access  public
exports.addAssessmentResult = async (req, res) => {
  try {
    const pool = await poolPromise;
    let results;

    for (let i = 0; i < req.body.StudentIDs.length; i++) {
      let studentID = req.body?.StudentIDs[i];

      if (req.body.CategoryID < 5 && req.body.CategoryID > 0) {
        results = await pool
          .request()
          .input("AssessmentID", sql.UniqueIdentifier, req.body.AssessmentID)
          .input("BenchMarkID", sql.Int, req.body.BenchMarkID)
          .input("StudentID", sql.Int, studentID)
          .input(
            "IncorrectIndex",
            sql.VarChar(sql.MAX),
            req.body.IncorrectIndex !== undefined
              ? req.body.IncorrectIndex
              : null
          )
          .input(
            "CLS",
            sql.VarChar(1000),
            req.body.CLS !== undefined ? req.body.CLS : null
          )
          .input(
            "WWR",
            sql.VarChar(1000),
            req.body.WWR !== undefined ? req.body.WWR : null
          )
          .input(
            "TotalCLS",
            sql.Int,
            req.body.TotalCLS !== undefined ? req.body.TotalCLS : null
          )
          .input(
            "TotalWWR",
            sql.Int,
            req.body.TotalWWR !== undefined ? req.body.TotalWWR : null
          )
          .input(
            "WordReadNumber",
            sql.Int,
            req.body.WordReadNumber !== undefined
              ? req.body.WordReadNumber
              : null
          )
          .input(
            "ErrorNumber",
            sql.Int,
            req.body.ErrorNumber !== undefined ? req.body.ErrorNumber : null
          )
          .input(
            "CWPM",
            sql.Int,
            req.body.CWPM !== undefined ? req.body.CWPM : null
          )
          .input(
            "TotalScore",
            sql.Int,
            req.body.TotalScore !== undefined ? req.body.TotalScore : null
          )
          .input(
            "year",
            sql.Int,
            req.body.Year !== undefined ? req.body.Year : null
          )
          .input(
            "Sounds",
            sql.VarChar(sql.MAX),
            req.body.Sounds !== undefined ? req.body.Sounds : null
          )
          .input(
            "SoundsIndex",
            sql.VarChar(sql.MAX),
            req.body.SoundsIndex !== undefined ? req.body.SoundsIndex : null
          )
          .input(
            "SoundsLength",
            sql.VarChar(sql.MAX),
            req.body.SoundsLength !== undefined ? req.body.SoundsLength : null
          )
          .execute("Reading.Results_Insert");
      } else {
        results = await pool
          .request()
          .input("AssessmentID", sql.UniqueIdentifier, req.body.AssessmentID)
          .input("BenchMarkID", sql.Int, req.body.BenchMarkID)
          .input("StudentID", sql.Int, studentID)
          .input(
            "Scores",
            sql.VarChar(1000),
            req.body.Scores !== undefined ? req.body.Scores : null
          )
          .input(
            "TotalScore",
            sql.Int,
            req.body.TotalScores !== undefined ? req.body.TotalScores : null
          )
          .input(
            "year",
            sql.Int,
            req.body.Year !== undefined ? req.body.Year : null
          )
          .input(
            "Sounds",
            sql.VarChar(sql.MAX),
            req.body.Sounds !== undefined ? req.body.Sounds : null
          )
          .input(
            "SoundsIndex",
            sql.VarChar(sql.MAX),
            req.body.SoundsIndex !== undefined ? req.body.SoundsIndex : null
          )
          .input(
            "SoundsLength",
            sql.VarChar(sql.MAX),
            req.body.SoundsLength !== undefined ? req.body.SoundsLength : null
          )
          .execute("BreakUpWord.Results_Insert");
      }
    }

    if (req.body.StudentIDs.length === 1) {
      res
        .status(200)
        .json({ success: true, data: results.recordset[0].AccessCode });
    } else {
      res
        .status(200)
        .json({ success: true, data: "More than one access codes generated" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// @route   PUT /api/assessmentresults/:id
// @desc    update an assessment result
// @access  public
exports.updateAssessmentResult = async (req, res) => {
  try {
    const pool = await poolPromise;
    let results;
    if (req.body.CategoryID < 5 && req.body.CategoryID > 0) {
      results = await pool
        .request()
        .input("ResultID", sql.UniqueIdentifier, req.params.id)
        .input("AssessmentID", sql.UniqueIdentifier, req.body.AssessmentID)
        .input("StudentID", sql.Int, req.body.StudentID)
        .input("AccessCode", sql.Int, null)
        .input("BenchMarkID", sql.Int, req.body.BenchMarkID)
        .input("IncorrectIndex", sql.VarChar(sql.MAX), req.body.IncorrectIndex)
        .input("CLS", sql.VarChar(1000), req.body.CLS)
        .input("WWR", sql.VarChar(1000), req.body.WWR)
        .input("TotalCLS", sql.Int, req.body.TotalCLS)
        .input("TotalWWR", sql.Int, req.body.TotalWWR)
        .input("WordReadNumber", sql.Int, req.body.WordReadNumber)
        .input("ErrorNumber", sql.Int, req.body.ErrorNumber)
        .input("CWPM", sql.Int, req.body.CWPM)
        .input("year", sql.Int, req.body.year)
        .input("TotalScore", sql.Int, req.body.TotalScore)
        .input("Comment", sql.VarChar(sql.MAX), req.body.Comment)
        .input("Sounds", sql.VarChar(sql.MAX), req.body.Sounds)
        .input("SoundsIndex", sql.VarChar(sql.MAX), req.body.SoundsIndex)
        .input("SoundsLength", sql.VarChar(sql.MAX), req.body.SoundsLength)
        .execute("Reading.Results_Update");
    } else {
      results = await pool
        .request()
        .input("ResultID", sql.UniqueIdentifier, req.params.id)
        .input("AssessmentID", sql.UniqueIdentifier, req.body.AssessmentID)
        .input("StudentID", sql.Int, req.body.StudentID)
        .input("AccessCode", sql.Int, null)
        .input("BenchMarkID", sql.Int, req.body.BenchMarkID)
        .input("Scores", sql.VarChar(1000), req.body.Scores)
        .input("TotalScore", sql.Int, req.body.TotalScore)
        .input("year", sql.Int, req.body.Year)
        .input("Comment", sql.VarChar(sql.MAX), req.body.Comment)
        .input("Sounds", sql.VarChar(sql.MAX), req.body.Sounds)
        .input("SoundsIndex", sql.VarChar(sql.MAX), req.body.SoundsIndex)
        .input("SoundsLength", sql.VarChar(sql.MAX), req.body.SoundsLength)
        .execute("BreakUpWord.Results_Update");
    }
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// @route   GET /api/assessmentresults/:id
// @desc    get an assessment result by id
// @access  public
exports.getAssessmentResults = async (req, res) => {
  try {
    const pool = await poolPromise;

    let results = await pool
      .request()
      .input(
        "SchoolID",
        sql.Int,
        req.user.UserTypeID === 5 || req.user.UserTypeID === 6 ? "-1" : req.params.schoolID
      )
      .execute("Main.Results_Load");

    if (results.recordset.length === 0) {
      return res
        .status(200)
        .json({ errors: [{ message: "School Not Found" }], data: [] });
    }

    let result = results.recordset;


    if(req.user.UserTypeID === 6){
      let schools = JSON.parse("[" + req.user.schoolIds + "]");
  
      result = result.filter((assessmentResult) => {
        return schools.includes(assessmentResult.SchoolID);
      });
      }
        
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// @route   GET /api/assessmentresults/:id
// @desc    get an assessment result by id
// @access  public
exports.getAssessmentResultById = async (req, res) => {
  try {
    let data = { results: null, assessment: null, student: null };
    const pool = await poolPromise;

    let results = await pool
      .request()
      .input("ResultID", sql.UniqueIdentifier, req.params.id)
      .input("AccessCode", sql.Int, "-1")
      .execute("Reading.Results_Load");

    console.log("test Result here", results.recordset);
    const category = results.recordset.length === 0;
    if (results.recordset.length === 0) {
      results = await pool
        .request()
        .input("ResultID", sql.UniqueIdentifier, req.params.id)
        .input("AccessCode", sql.Int, "-1")
        .execute("BreakUpWord.Results_Load");
      if (results.recordset.length === 0) {
        return res
          .status(404)
          .json({ errors: [{ message: "Assessment Not Found" }] });
      }
    }

    data["results"] = results.recordset[0];
    let assessment = await pool
      .request()
      .input("AssessmentID", sql.UniqueIdentifier, data.results.AssessmentID)
      .execute((category ? "BreakUpWord" : "Reading") + ".Assessment_Load");

    data["assessment"] = assessment.recordset[0];

    let user = await pool
      .request()
      .input("UserID", sql.Int, data.results.StudentID)
      .input("SchoolID", sql.Int, -1)
      .input("UserTypeID", sql.Int, -1)
      .input("Email", sql.VarChar(250), -1)
      .input("schoolIds", sql.VarChar(sql.Max), -1)
      .execute("Main.Users_Load");
    data["student"] = user.recordset[0];

    console.log(data);
    data.results["AlternativeID"] = data.student.AlternativeID;

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// @route   GET /api/assessmentresults/code/:code
// @desc    get an assessment result by access code
// @access  public
exports.getAssessmentResultByCode = async (req, res) => {
  try {
    let data = { results: null, assessment: null, student: null };
    const pool = await poolPromise;

    let results = await pool
      .request()
      .input("ResultID", sql.UniqueIdentifier, null)
      .input("AccessCode", sql.Int, req.params.code)
      .execute("Reading.Results_Load");
    const category = results.recordset.length === 0;
    if (results.recordset.length === 0) {
      results = await pool
        .request()
        .input("ResultID", sql.UniqueIdentifier, null)
        .input("AccessCode", sql.Int, req.params.code)
        .execute("BreakUpWord.Results_Load");
      if (results.recordset.length === 0) {
        return res
          .status(404)
          .json({ errors: [{ message: "Assessment Not Found" }] });
      }
    }

    data["results"] = results.recordset[0];
    let assessment = await pool
      .request()
      .input("AssessmentID", sql.UniqueIdentifier, data.results.AssessmentID)
      .execute((category ? "BreakUpWord" : "Reading") + ".Assessment_Load");

    data["assessment"] = assessment.recordset[0];

    let user = await pool
      .request()
      .input("UserID", sql.Int, data.results.StudentID)
      .input("SchoolID", sql.Int, -1)
      .input("UserTypeID", sql.Int, -1)
      .input("Email", sql.VarChar(250), -1)
      .input("schoolIds", sql.VarChar(sql.Max), -1)
      .execute("Main.Users_Load");
    data["student"] = user.recordset[0];

    console.log(data);

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// @route   DELETE /api/assessmentresults/:id
// @desc    get an assessment result by id
// @access  public
exports.deleteAssessmentResult = async (req, res) => {
  try {
    const pool = await poolPromise;

    await pool
      .request()
      .input("ResultID", sql.UniqueIdentifier, req.params.id)
      .input("SchoolID", sql.Int, -1)
      .input("AssessmentID", sql.UniqueIdentifier, null)
      .execute("Reading.Results_Delete");
    await pool
      .request()
      .input("ResultID", sql.UniqueIdentifier, req.params.id)
      .input("SchoolID", sql.Int, -1)
      .input("AssessmentID", sql.UniqueIdentifier, null)
      .execute("BreakUpWord.Results_Delete");

    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

exports.generateReport = async (req, res) => {
  try {
    const pool = await poolPromise;
    const role = req.user.UserTypeID;
    let results;

    
    console.log("test", req.params)
    if (role === 6 && req.params.schoolIds !== "-1"){
      results = await pool
        .request()
        .input("Year", sql.Int, req.params.year)
        .input("BenchmarkID", sql.Int, req.params.benchmark)
        .input("SchoolID", sql.Int, req.params.school)
        .input("GradeID", sql.Int, req.params.grade)
        .input("Section", sql.VarChar(50), req.params.section)
        .input("StudentID", sql.Int, req.params.student)
        .input("TeacherID", sql.Int, req.params.teacher)
        .input("SchoolIds", sql.VarChar(sql.Max), req.params.schoolIds)
        .execute("Main.Reports_Load");
    } else {
      results = await pool
        .request()
        .input("Year", sql.Int, req.params.year)
        .input("BenchmarkID", sql.Int, req.params.benchmark)
        .input("SchoolID", sql.Int, req.params.school)
        .input("GradeID", sql.Int, req.params.grade)
        .input("Section", sql.VarChar(50), req.params.section)
        .input("StudentID", sql.Int, req.params.student)
        .input("TeacherID", sql.Int, req.params.teacher)
        .execute("Main.Reports_Load");
    }

    res.status(200).json({ success: true, data: results.recordset });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// @route   GET /api/assessmentresults/chart1/:id
// @desc    Get chart overall results
// @access  public
exports.getChartOverallResults = async (req, res) => {
  try {
    const pool = await poolPromise;
    const role = req.user.UserTypeID;
    let results;
    if (role === 6 && req.params.schoolIds !== "-1") {
      results = await pool
        .request()
        .input("Year", sql.Int, req.params.year)
        .input("BenchmarkID", sql.Int, req.params.benchmark)
        .input("SchoolID", sql.Int, req.params.school)
        .input("GradeID", sql.Int, req.params.grade)
        .input("Section", sql.VarChar(50), req.params.section)
        .input("StudentID", sql.Int, req.params.student)
        .input("TeacherID", sql.Int, req.params.teacher)
        .input("SchoolIds", sql.VarChar(sql.Max), req.params.schoolIds)
        .execute("Main.Chart_OverallResult_Percentile_Load");
    } else {
      results = await pool
        .request()
        .input("Year", sql.Int, req.params.year)
        .input("BenchmarkID", sql.Int, req.params.benchmark)
        .input("SchoolID", sql.Int, req.params.school)
        .input("GradeID", sql.Int, req.params.grade)
        .input("Section", sql.VarChar(50), req.params.section)
        .input("StudentID", sql.Int, req.params.student)
        .input("TeacherID", sql.Int, req.params.teacher)
        .execute("Main.Chart_OverallResult_Percentile_Load");
    }
    res.status(200).json({ success: true, data: results?.recordsets });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// @route   GET /api/assessmentresults/chart2/:id
// @desc    Get chart overall results by assessment type
// @access  public
exports.getChartOverallResultsByAssessment = async (req, res) => {
  try {
    const pool = await poolPromise;

    const role = req.user.UserTypeID;
    let results;
    if (role === 6 && req.params.schoolIds !== "-1") {
      results = await pool
        .request()
        .input("Year", sql.Int, req.params.year)
        .input("BenchmarkID", sql.Int, req.params.benchmark)
        .input("SchoolID", sql.Int, req.params.school)
        .input("GradeID", sql.Int, req.params.grade)
        .input("Section", sql.VarChar(50), req.params.section)
        .input("StudentID", sql.Int, req.params.student)
        .input("TeacherID", sql.Int, req.params.teacher)
        .input("SchoolIds", sql.VarChar(sql.Max), req.params.schoolIds)
        .execute("Main.Chart_OverallResultByAssessment_Percentile_Load");
    } else {
      results = await pool
        .request()
        .input("Year", sql.Int, req.params.year)
        .input("BenchmarkID", sql.Int, req.params.benchmark)
        .input("SchoolID", sql.Int, req.params.school)
        .input("GradeID", sql.Int, req.params.grade)
        .input("Section", sql.VarChar(50), req.params.section)
        .input("StudentID", sql.Int, req.params.student)
        .input("TeacherID", sql.Int, req.params.teacher)
        .execute("Main.Chart_OverallResultByAssessment_Percentile_Load");
    }
    res.status(200).json({ success: true, data: results?.recordsets });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// @route   GET /api/assessmentresults/chart3/:id
// @desc    Get chart overall results by assessment type
// @access  public
exports.getChartOverallResultsProgression = async (req, res) => {
  try {
    const pool = await poolPromise;
    const role = req.user.UserTypeID;
    let results;

      if (role === 6 && req.params.schoolIds !== "-1") {
        results = await pool
          .request()
          .input("Year", sql.Int, req.params.year)
          .input("BenchmarkID", sql.Int, req.params.benchmark)
          .input("SchoolID", sql.Int, req.params.school)
          .input("GradeID", sql.Int, req.params.grade)
          .input("Section", sql.VarChar(50), req.params.section)
          .input("StudentID", sql.Int, req.params.student)
          .input("TeacherID", sql.Int, req.params.teacher)
          .input("SchoolIds", sql.VarChar(sql.Max), req.params.schoolIds)
          .execute("Main.Chart_OverallResultProgression_Percentile_Load");
      } else {
        results = await pool
          .request()
          .input("Year", sql.Int, req.params.year)
          .input("BenchmarkID", sql.Int, req.params.benchmark)
          .input("SchoolID", sql.Int, req.params.school)
          .input("GradeID", sql.Int, req.params.grade)
          .input("Section", sql.VarChar(50), req.params.section)
          .input("StudentID", sql.Int, req.params.student)
          .input("TeacherID", sql.Int, req.params.teacher)
          .execute("Main.Chart_OverallResultProgression_Percentile_Load");
      }
    res.status(200).json({ success: true, data: results?.recordsets });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

exports.getChartAverageScorePerBenchmarkCategory = async (req, res) => {
  try {
    const pool = await poolPromise;
    let results = await pool
      .request()
      .input("Year", sql.Int, req.params.year)
      .input("BenchmarkID", sql.Int, req.params.benchmark)
      .input("SchoolID", sql.Int, req.params.school)
      .input("GradeID", sql.Int, req.params.grade)
      .input("Section", sql.VarChar(50), req.params.section)
      .input("StudentID", sql.Int, req.params.student)
      .input("TeacherID", sql.Int, req.params.teacher)
      .input("schoolIds", sql.VarChar(sql.Max), -1)
      .execute("Main.Chart_AverageScorePerBenchmarkCategory_Load");
    res.status(200).json({ success: true, data: results?.recordsets[0] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// @route   GET /api/assessmentresults/finalize
// @desc    finalize assessment
// @access  public
exports.finalizeResult = async (req, res) => {
  try {
    console.log("test FInalize body", req.body)
    const pool = await poolPromise;
    for (let i = 0; i < req.body.length; i++) {
      if (req.body[i].CategoryID < 5 && req.body[i].CategoryID > 0) {
        console.log(
          req.body[i].ResultID,
          req.body[i].Rank,
          req.body[i].Percentile
        );
        await pool
          .request()
          .input("ResultID", sql.UniqueIdentifier, req.body[i].ResultID)
          .input("Rank", sql.Int, req.body[i].Rank)
          .input("Percentile", sql.Int, req.body[i].Percentile)
          .input("riskStatus", sql.SmallInt, req.body[i].riskStatus)
          .execute("Reading.Results_Ranking");
      } else {
        console.log(
          req.body[i].ResultID,
          req.body[i].Rank,
          req.body[i].Percentile
        );
        await pool
          .request()
          .input("ResultID", sql.UniqueIdentifier, req.body[i].ResultID)
          .input("Rank", sql.Int, req.body[i].Rank)
          .input("Percentile", sql.Int, req.body[i].Percentile)
          .input("riskStatus", sql.SmallInt, req.body[i].riskStatus)
          .execute("BreakUpWord.Results_Ranking");
      }
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};
