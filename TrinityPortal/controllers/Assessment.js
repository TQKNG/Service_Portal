const sql = require("mssql");
const { poolPromise } = require("../config/db");
const { storeImage, retrieveImage } = require("../utils/ImageStorage");

// @route   POST /api/assessments
// @desc    Add User
// @access  public
exports.addAssessment = async (req, res) => {
  try {
    const pool = await poolPromise;
    if (req.body.CategoryID < 5 && req.body.CategoryID > 0) {
      let results = await pool
        .request()
        .input("CategoryID", sql.Int, req.body.CategoryID)
        .input("GradeID", sql.Int, req.body.GradeID)
        .input("Title", sql.VarChar(50), req.body.Title)
        .input("Body", sql.NVarChar(sql.MAX), req.body.Body)
        .input("Groups", sql.Int, req.body.Groups)
        .input("Timer", sql.VarChar(50), req.body.Timer)
        .input("CreatedBy", sql.Int, req.user.UserID)
        .input("aboveBenchmarkMin", sql.Float, req.body.aboveBenchmarkMin)
        .input("aboveBenchmarkMax", sql.Float, req.body.aboveBenchmarkMax)
        .input("atBenchmarkMin", sql.Float, req.body.atBenchmarkMin)
        .input("atBenchmarkMax", sql.Float, req.body.atBenchmarkMax)
        .input("belowBenchmarkMin", sql.Float, req.body.belowBenchmarkMin)
        .input("belowBenchmarkMax", sql.Float, req.body.belowBenchmarkMax)
        .input(
          "wellBelowBenchmarkMin",
          sql.Float,
          req.body.wellBelowBenchmarkMin
        )
        .input(
          "wellBelowBenchmarkMax",
          sql.Float,
          req.body.wellBelowBenchmarkMax
        )
        .input(
          "aboveBenchmarkMin1",
          sql.Float,
          req.body.CategoryID === 4 || req.body.CategoryID === 3
            ? req.body.aboveBenchmarkMin1
            : null
        )
        .input(
          "aboveBenchmarkMax1",
          sql.Float,
          req.body.CategoryID === 4 || req.body.CategoryID === 3
            ? req.body.aboveBenchmarkMax1
            : null
        )
        .input(
          "atBenchmarkMin1",
          sql.Float,
          req.body.CategoryID === 4 || req.body.CategoryID === 3
            ? req.body.atBenchmarkMin1
            : null
        )
        .input(
          "atBenchmarkMax1",
          sql.Float,
          req.body.CategoryID === 4 || req.body.CategoryID === 3
            ? req.body.atBenchmarkMax1
            : null
        )
        .input(
          "belowBenchmarkMin1",
          sql.Float,
          req.body.CategoryID === 4 || req.body.CategoryID === 3
            ? req.body.belowBenchmarkMin1
            : null
        )
        .input(
          "belowBenchmarkMax1",
          sql.Float,
          req.body.CategoryID === 4 || req.body.CategoryID === 3
            ? req.body.belowBenchmarkMax1
            : null
        )
        .input(
          "wellBelowBenchmarkMin1",
          sql.Float,
          req.body.CategoryID === 4 || req.body.CategoryID === 3
            ? req.body.wellBelowBenchmarkMin1
            : null
        )
        .input(
          "wellBelowBenchmarkMax1",
          sql.Float,
          req.body.CategoryID === 4 || req.body.CategoryID === 3
            ? req.body.wellBelowBenchmarkMax1
            : null
        )
        .input("bodyCount", sql.Int, req.body.bodyCount)
        .execute("Reading.Assessment_Insert");
      req.body.SchoolsID.forEach(async (schoolID) => {
        console.log(schoolID);
        await pool
          .request()
          .input("SchoolID", sql.Int, schoolID)
          .input(
            "AssessmentID",
            sql.UniqueIdentifier,
            Object.values(results.recordset[0])[0]
          )
          .execute("Reading.SchoolAssessments_Insert");
      });
      console.log(Object.values(results.recordset[0])[0]);
    } else if (req.body.CategoryID < 7 && req.body.CategoryID > 4) {
      let results = await pool
        .request()
        .input("CategoryID", sql.Int, req.body.CategoryID)
        .input("GradeID", sql.Int, req.body.GradeID)
        .input("Title", sql.VarChar(50), req.body.Title)
        .input("Timer", sql.VarChar(50), req.body.Timer)
        .input("Body", sql.NVarChar(sql.MAX), req.body.Body)
        .input("Solution", sql.NVarChar(sql.MAX), req.body.Solution)
        .input(
          "SolutionDetails",
          sql.NVarChar(sql.MAX),
          req.body.SolutionDetails !== undefined
            ? req.body.SolutionDetails
            : null
        )
        .input(
          "Scores",
          sql.NVarChar(sql.MAX),
          req.body.Scores !== undefined ? req.body.Scores : null
        )
        .input("CreatedBy", sql.Int, req.user.UserID)
        .input("aboveBenchmarkMin", sql.Float, req.body.aboveBenchmarkMin)
        .input("aboveBenchmarkMax", sql.Float, req.body.aboveBenchmarkMax)
        .input("atBenchmarkMin", sql.Float, req.body.atBenchmarkMin)
        .input("atBenchmarkMax", sql.Float, req.body.atBenchmarkMax)
        .input("belowBenchmarkMin", sql.Float, req.body.belowBenchmarkMin)
        .input("belowBenchmarkMax", sql.Float, req.body.belowBenchmarkMax)
        .input(
          "wellBelowBenchmarkMin",
          sql.Float,
          req.body.wellBelowBenchmarkMin
        )
        .input(
          "wellBelowBenchmarkMax",
          sql.Float,
          req.body.wellBelowBenchmarkMax
        )
        .input(
          "aboveBenchmarkMin1",
          sql.Float,
          req.body.CategoryID === 4 || req.body.CategoryID === 3
            ? req.body.aboveBenchmarkMin1
            : null
        )
        .input(
          "aboveBenchmarkMax1",
          sql.Float,
          req.body.CategoryID === 4 || req.body.CategoryID === 3
            ? req.body.aboveBenchmarkMax1
            : null
        )
        .input(
          "atBenchmarkMin1",
          sql.Float,
          req.body.CategoryID === 4 || req.body.CategoryID === 3
            ? req.body.atBenchmarkMin1
            : null
        )
        .input(
          "atBenchmarkMax1",
          sql.Float,
          req.body.CategoryID === 4 || req.body.CategoryID === 3
            ? req.body.atBenchmarkMax1
            : null
        )
        .input(
          "belowBenchmarkMin1",
          sql.Float,
          req.body.CategoryID === 4 || req.body.CategoryID === 3
            ? req.body.belowBenchmarkMin1
            : null
        )
        .input(
          "belowBenchmarkMax1",
          sql.Float,
          req.body.CategoryID === 4 || req.body.CategoryID === 3
            ? req.body.belowBenchmarkMax1
            : null
        )
        .input(
          "wellBelowBenchmarkMin1",
          sql.Float,
          req.body.CategoryID === 4 || req.body.CategoryID === 3
            ? req.body.wellBelowBenchmarkMin1
            : null
        )
        .input(
          "wellBelowBenchmarkMax1",
          sql.Float,
          req.body.CategoryID === 4 || req.body.CategoryID === 3
            ? req.body.wellBelowBenchmarkMax1
            : null
        )
        .execute("BreakUpWord.Assessment_Insert");
      req.body.SchoolsID.forEach(async (schoolID) => {
        console.log(schoolID);
        await pool
          .request()
          .input("SchoolID", sql.Int, schoolID)
          .input(
            "AssessmentID",
            sql.UniqueIdentifier,
            Object.values(results.recordset[0])[0]
          )
          .execute("BreakUpWord.SchoolAssessments_Insert");
      });
      console.log(Object.values(results.recordset[0])[0]);
    }

    // if there is new instruction image, add to the server filesystem
    if (req.body.instructionImg !== null) {
      await storeImage(req.body.instructionImg, req.body.imgFileName);
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// @route   POST /api/assessments
// @desc    Add User
// @access  public
exports.addMulipleAssessment = async (req, res) => {
  try {
    const pool = await poolPromise;
    req.body.assessments.forEach(async (assessment) => {
      if (assessment.CategoryID < 5 && assessment.CategoryID > 0) {
        let results = await pool
          .request()
          .input("CategoryID", sql.Int, assessment.CategoryID)
          .input("GradeID", sql.Int, assessment.GradeID)
          .input("Title", sql.VarChar(50), assessment.Title)
          .input("Body", sql.NVarChar(sql.MAX), assessment.Body)
          .input("Groups", sql.Int, assessment.Groups)
          .input("Timer", sql.VarChar(50), assessment.Timer)
          .input("CreatedBy", sql.Int, req.user.UserID)
          .execute("Reading.Assessment_Insert");
        assessment.SchoolsID.forEach(async (schoolID) => {
          console.log(schoolID);
          await pool
            .request()
            .input("SchoolID", sql.Int, schoolID)
            .input(
              "AssessmentID",
              sql.UniqueIdentifier,
              Object.values(results.recordset[0])[0]
            )
            .execute("Reading.SchoolAssessments_Insert");
        });
      } else if (assessment.CategoryID < 7 && assessment.CategoryID > 4) {
        let results = await pool
          .request()
          .input("CategoryID", sql.Int, assessment.CategoryID)
          .input("GradeID", sql.Int, assessment.GradeID)
          .input("Title", sql.VarChar(50), assessment.Title)
          .input("Timer", sql.VarChar(50), assessment.Timer)
          .input("Body", sql.NVarChar(sql.MAX), assessment.Body)
          .input("Solution", sql.NVarChar(sql.MAX), assessment.Solution)
          .input(
            "SolutionDetails",
            sql.NVarChar(sql.MAX),
            assessment.SolutionDetails !== undefined
              ? assessment.SolutionDetails
              : null
          )
          .input(
            "Scores",
            sql.NVarChar(sql.MAX),
            assessment.Scores !== undefined ? assessment.Scores : null
          )
          .input("CreatedBy", sql.Int, req.user.UserID)
          .execute("BreakUpWord.Assessment_Insert");
        assessment.SchoolsID.forEach(async (schoolID) => {
          console.log(schoolID);
          await pool
            .request()
            .input("SchoolID", sql.Int, schoolID)
            .input(
              "AssessmentID",
              sql.UniqueIdentifier,
              Object.values(results.recordset[0])[0]
            )
            .execute("BreakUpWord.SchoolAssessments_Insert");
        });
      }
    });
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// @route   GET /api/assessments
// @desc    GET Assessments
// @access  public
exports.getAllAssessments = async (req, res) => {
  try {
    console.log("tesst", req.user.UserTypeID, req.user.SchoolID);
    const pool = await poolPromise;

    let results = await pool
      .request()
      .input(
        "SchoolID",
        sql.Int,
        req.user.UserTypeID === 5 || req.user.UserTypeID === 6
          ? "-1"
          : req.user.SchoolID
      )
      .input("AssessmentID", sql.UniqueIdentifier, null)
      .execute("Main.SchoolAssessments_Load");

    console.log("test ASsessment resulte", results.recordset);
    let result = results.recordset;

    if (req.user.UserTypeID === 6) {
      // let schools = JSON.parse("[" + req.params.schoolIds + "]");
      // result = result.filter((assessment) => {
      //   return schools.includes(assessment.SchoolID);
      // });
    }

    res.status(200).json({ success: true, data: results.recordset });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// @route   Post /api/assessments/:id
// @desc    Post Assessment by ID
// @access  public
exports.getAssessmentByID = async (req, res) => {
  try {
    let data = null;
    const pool = await poolPromise;
    if (req.body.CategoryID < 5 && req.body.CategoryID > 0) {
      let results = await pool
        .request()
        .input("AssessmentID", sql.UniqueIdentifier, req.params.id)
        .execute("Reading.Assessment_Load");
      console.log(results);

      if (results.recordset.length === 0) {
        return res
          .status(404)
          .json({ errors: [{ message: "Assessment Not Found" }] });
      }

      console.log(results.recordset);

      let school = await pool
        .request()
        .input("SchoolID", sql.Int, -1)
        .input("AssessmentID", sql.UniqueIdentifier, req.params.id)
        .execute("Reading.SchoolAssessments_Load");

      let schools = [];
      let schoolIDs = [];
      for (let i = 0; i < school.recordset.length; i++) {
        if (
          school.recordset[i].AssessmentID === results.recordset[0].AssessmentID
        ) {
          schools.push({
            SchoolID: school.recordset[i].SchoolID,
            SchoolName: school.recordset[i].SchoolName,
          });
          schoolIDs.push(school.recordset[i].SchoolID);
        }
      }

      data = {
        ...results.recordset[0],
        CreatedBy:
          results.recordset[0].FirstName + " " + results.recordset[0].LastName,

        Schools: schools,
        SchoolIDs: schoolIDs,
      };
    } else if (req.body.CategoryID < 7 && req.body.CategoryID > 4) {
      let results = await pool
        .request()
        .input("AssessmentID", sql.UniqueIdentifier, req.params.id)
        .execute("BreakUpWord.Assessment_Load");

      if (results.recordset.length === 0) {
        return res
          .status(404)
          .json({ errors: [{ message: "Assessment Not Found" }] });
      }

      let school = await pool
        .request()
        .input("SchoolID", sql.Int, -1)
        .input("AssessmentID", sql.UniqueIdentifier, req.params.id)
        .execute("BreakUpWord.SchoolAssessments_Load");

      let schools = [];
      let schoolIDs = [];
      for (let i = 0; i < school.recordset.length; i++) {
        if (
          school.recordset[i].AssessmentID[0] ===
          results.recordset[0].AssessmentID
        ) {
          schools.push({
            SchoolID: school.recordset[i].SchoolID[0],
            SchoolName: school.recordset[i].SchoolName,
          });
          schoolIDs.push(school.recordset[i].SchoolID[0]);
        }
      }

      data = {
        ...results.recordset[0],
        CreatedBy:
          results.recordset[0].FirstName + " " + results.recordset[0].LastName,

        Schools: schools,
        SchoolIDs: schoolIDs,
      };
    }

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

//@route  Get /api/assessments/:CategoryID
//@desc   Get Assessments by CategoryID
//@access public
exports.getAssessmentByCategoryID = async (req, res) => {
  try {
    if (req.params.CategoryID) {
      const instructionImg = await retrieveImage(req.params.CategoryID);
      res.status(200).json({ success: true, data: instructionImg });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// @route   PUT /api/assessments/:id
// @desc    Update Assessment by ID
// @access  public
exports.updateAssessmentByID = async (req, res) => {
  try {
    const pool = await poolPromise;
    if (req.body.CategoryID < 5 && req.body.CategoryID > 0) {
      console.log("Test req.body here", req.body);
      await pool
        .request()
        .input("AssessmentID", sql.UniqueIdentifier, req.params.id)
        .input("CategoryID", sql.Int, req.body.CategoryID)
        .input("GradeID", sql.Int, req.body.GradeID)
        .input("Title", sql.VarChar(50), req.body.Title)
        .input("Body", sql.NVarChar(sql.MAX), req.body.Body)
        .input("Groups", sql.Int, req.body.Groups)
        .input("Timer", sql.VarChar(50), req.body.Timer)
        .input("aboveBenchmarkMin", sql.Float, req.body.aboveBenchmarkMin)
        .input("aboveBenchmarkMax", sql.Float, req.body.aboveBenchmarkMax)
        .input("atBenchmarkMin", sql.Float, req.body.atBenchmarkMin)
        .input("atBenchmarkMax", sql.Float, req.body.atBenchmarkMax)
        .input("belowBenchmarkMin", sql.Float, req.body.belowBenchmarkMin)
        .input("belowBenchmarkMax", sql.Float, req.body.belowBenchmarkMax)
        .input(
          "wellBelowBenchmarkMin",
          sql.Float,
          req.body.wellBelowBenchmarkMin
        )
        .input(
          "wellBelowBenchmarkMax",
          sql.Float,
          req.body.wellBelowBenchmarkMax
        )
        .input(
          "aboveBenchmarkMin1",
          sql.Float,
          req.body.CategoryID === 4 || req.body.CategoryID === 3
            ? req.body.aboveBenchmarkMin1
            : null
        )
        .input(
          "aboveBenchmarkMax1",
          sql.Float,
          req.body.CategoryID === 4 || req.body.CategoryID === 3
            ? req.body.aboveBenchmarkMax1
            : null
        )
        .input(
          "atBenchmarkMin1",
          sql.Float,
          req.body.CategoryID === 4 || req.body.CategoryID === 3
            ? req.body.atBenchmarkMin1
            : null
        )
        .input(
          "atBenchmarkMax1",
          sql.Float,
          req.body.CategoryID === 4 || req.body.CategoryID === 3
            ? req.body.atBenchmarkMax1
            : null
        )
        .input(
          "belowBenchmarkMin1",
          sql.Float,
          req.body.CategoryID === 4 || req.body.CategoryID === 3
            ? req.body.belowBenchmarkMin1
            : null
        )
        .input(
          "belowBenchmarkMax1",
          sql.Float,
          req.body.CategoryID === 4 || req.body.CategoryID === 3
            ? req.body.belowBenchmarkMax1
            : null
        )
        .input(
          "wellBelowBenchmarkMin1",
          sql.Float,
          req.body.CategoryID === 4 || req.body.CategoryID === 3
            ? req.body.wellBelowBenchmarkMin1
            : null
        )
        .input(
          "wellBelowBenchmarkMax1",
          sql.Float,
          req.body.CategoryID === 4 || req.body.CategoryID === 3
            ? req.body.wellBelowBenchmarkMax1
            : null
        )
        .input("bodyCount", sql.Int, req.body.bodyCount)
        .execute("Reading.Assessment_Update");
    } else if (req.body.CategoryID < 7 && req.body.CategoryID > 4) {
      await pool
        .request()
        .input("AssessmentID", sql.UniqueIdentifier, req.params.id)
        .input("GradeID", sql.Int, req.body.GradeID)
        .input("Title", sql.VarChar(50), req.body.Title)
        .input("CategoryID", sql.Int, req.body.CategoryID)
        .input("Timer", sql.VarChar(50), req.body.Timer)
        .input("Body", sql.NVarChar(sql.MAX), req.body.Body)
        .input("Solution", sql.NVarChar(sql.MAX), req.body.Solution)
        .input(
          "SolutionDetails",
          sql.NVarChar(sql.MAX),
          req.body.SolutionDetails
        )
        .input("Scores", sql.NVarChar(sql.MAX), req.body.Scores)
        .input("aboveBenchmarkMin", sql.Float, req.body.aboveBenchmarkMin)
        .input("aboveBenchmarkMax", sql.Float, req.body.aboveBenchmarkMax)
        .input("atBenchmarkMin", sql.Float, req.body.atBenchmarkMin)
        .input("atBenchmarkMax", sql.Float, req.body.atBenchmarkMax)
        .input("belowBenchmarkMin", sql.Float, req.body.belowBenchmarkMin)
        .input("belowBenchmarkMax", sql.Float, req.body.belowBenchmarkMax)
        .input(
          "wellBelowBenchmarkMin",
          sql.Float,
          req.body.wellBelowBenchmarkMin
        )
        .input(
          "wellBelowBenchmarkMax",
          sql.Float,
          req.body.wellBelowBenchmarkMax
        )
        .input(
          "aboveBenchmarkMin1",
          sql.Float,
          req.body.CategoryID === 4 || req.body.CategoryID === 3
            ? req.body.aboveBenchmarkMin1
            : null
        )
        .input(
          "aboveBenchmarkMax1",
          sql.Float,
          req.body.CategoryID === 4 || req.body.CategoryID === 3
            ? req.body.aboveBenchmarkMax1
            : null
        )
        .input(
          "atBenchmarkMin1",
          sql.Float,
          req.body.CategoryID === 4 || req.body.CategoryID === 3
            ? req.body.atBenchmarkMin1
            : null
        )
        .input(
          "atBenchmarkMax1",
          sql.Float,
          req.body.CategoryID === 4 || req.body.CategoryID === 3
            ? req.body.atBenchmarkMax1
            : null
        )
        .input(
          "belowBenchmarkMin1",
          sql.Float,
          req.body.CategoryID === 4 || req.body.CategoryID === 3
            ? req.body.belowBenchmarkMin1
            : null
        )
        .input(
          "belowBenchmarkMax1",
          sql.Float,
          req.body.CategoryID === 4 || req.body.CategoryID === 3
            ? req.body.belowBenchmarkMax1
            : null
        )
        .input(
          "wellBelowBenchmarkMin1",
          sql.Float,
          req.body.CategoryID === 4 || req.body.CategoryID === 3
            ? req.body.wellBelowBenchmarkMin1
            : null
        )
        .input(
          "wellBelowBenchmarkMax1",
          sql.Float,
          req.body.CategoryID === 4 || req.body.CategoryID === 3
            ? req.body.wellBelowBenchmarkMax1
            : null
        )
        .input("bodyCount", sql.Int, req.body.bodyCount)
        .execute("BreakUpWord.Assessment_Update");
    }

    // if there is new instruction image, add to the server filesystem
    if (req.body.instructionImg !== null) {
      await storeImage(req.body.instructionImg, req.body.imgFileName);
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// @route   DELETE /api/assessments/:id
// @desc    DELETE Assessment by ID
// @access  public
exports.removeAssessmentByID = async (req, res) => {
  try {
    const pool = await poolPromise;
    console.log(req.body.CategoryID);
    if (req.body.CategoryID < 5 && req.body.CategoryID > 0) {
      if (req.user.SchoolID === null) {
        await pool
          .request()
          .input("AssessmentID", sql.UniqueIdentifier, req.params.id)
          .input("SchoolID", sql.Int, "-1")
          .execute("Reading.SchoolAssessments_Delete");
        await pool
          .request()
          .input("ResultID", sql.UniqueIdentifier, null)
          .input("SchoolID", sql.Int, -1)
          .input("AssessmentID", sql.UniqueIdentifier, req.params.id)
          //Set 1 from stored procedure
          .execute("Reading.Results_Delete");
      } else {
        console.log(req.params.id, req.user.SchoolID);
        await pool
          .request()
          .input("AssessmentID", sql.UniqueIdentifier, req.params.id)
          .input("SchoolID", sql.Int, req.user.SchoolID)
          .execute("Reading.SchoolAssessments_Delete");
        await pool
          .request()
          .input("ResultID", sql.UniqueIdentifier, null)
          .input("SchoolID", sql.Int, req.user.SchoolID)
          .input("AssessmentID", sql.UniqueIdentifier, req.params.id)
          .execute("Reading.Results_Delete");
      }
    } else if (req.body.CategoryID < 7 && req.body.CategoryID > 4) {
      if (req.user.SchoolID === null) {
        await pool
          .request()
          .input("AssessmentID", sql.UniqueIdentifier, req.params.id)
          .input("SchoolID", sql.Int, "-1")
          .execute("BreakUpWord.SchoolAssessments_Delete");
        await pool
          .request()
          .input("ResultID", sql.UniqueIdentifier, null)
          .input("SchoolID", sql.Int, -1)
          .input("AssessmentID", sql.UniqueIdentifier, req.params.id)
          .execute("BreakUpWord.Results_Delete");
      } else {
        await pool
          .request()
          .input("AssessmentID", sql.UniqueIdentifier, req.params.id)
          .input("SchoolID", sql.Int, req.user.SchoolID)
          .execute("BreakUpWord.SchoolAssessments_Delete");

        await pool
          .request()
          .input("ResultID", sql.UniqueIdentifier, null)
          .input("SchoolID", sql.Int, req.user.SchoolID)
          .input("AssessmentID", sql.UniqueIdentifier, req.params.id)
          .execute("BreakUpWord.Results_Delete");
      }
    } else {
      return res
        .status(500)
        .json({ success: false, error: "Invalid Category" });
    }
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// @route   DELETE /api/assessments/:schoolID/:assessmentID
// @desc    DELETE Assessment by ID
// @access  public
exports.removeSchoolAssessment = async (req, res) => {
  try {
    const pool = await poolPromise;
    if (req.body.CategoryID < 5 && req.body.CategoryID > 0) {
      await pool
        .request()
        .input("AssessmentID", sql.UniqueIdentifier, req.params.AssessmentID)
        .input("SchoolID", sql.Int, req.params.SchoolID)
        .execute("Reading.SchoolAssessments_Delete");
      await pool
        .request()
        .input("ResultID", sql.UniqueIdentifier, null)
        .input("SchoolID", sql.Int, req.params.SchoolID)
        .input("AssessmentID", sql.UniqueIdentifier, req.params.AssessmentID)
        .execute("Reading.Results_Delete");
    } else if (req.body.CategoryID < 7 && req.body.CategoryID > 4) {
      await pool
        .request()
        .input("AssessmentID", sql.UniqueIdentifier, req.params.AssessmentID)
        .input("SchoolID", sql.Int, req.params.SchoolID)
        .execute("BreakUpWord.SchoolAssessments_Delete");
      await pool
        .request()
        .input("ResultID", sql.UniqueIdentifier, null)
        .input("SchoolID", sql.Int, req.params.SchoolID)
        .input("AssessmentID", sql.UniqueIdentifier, req.params.AssessmentID)
        .execute("BreakUpWord.Results_Delete");
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

exports.addSchoolAssessment = async (req, res) => {
  try {
    const pool = await poolPromise;
    if (req.body.CategoryID < 5 && req.body.CategoryID > 0) {
      await pool
        .request()
        .input("SchoolID", sql.Int, req.body.SchoolID)
        .input("AssessmentID", sql.UniqueIdentifier, req.body.AssessmentID)
        .execute("Reading.SchoolAssessments_Insert");
    } else if (req.body.CategoryID < 7 && req.body.CategoryID > 4) {
      await pool
        .request()
        .input("SchoolID", sql.Int, req.body.SchoolID)
        .input("AssessmentID", sql.UniqueIdentifier, req.body.AssessmentID)
        .execute("BreakUpWord.SchoolAssessments_Insert");
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};
