const sql = require("mssql");
const { poolPromise } = require("../config/db");

// @route   POST /api/school
// @desc    Add User
// @access  public
exports.addSchool = async (req, res) => {
  try {
    const pool = await poolPromise;
    const results = await pool
      .request()
      .input("SchoolID", sql.Int, null)
      .input("Name", sql.VarChar(250), req.body.Name)
      .execute("Shared.Schools_Load");

    console.log(results);

    if (results.recordset.length > 0) {
      return res
        .status(400)
        .json({ errors: [{ message: "School Name is taken" }] });
    }

    await pool
      .request()
      .input("SchoolName", sql.VarChar(250), req.body.Name)
      .input("isDeleted", sql.Bit, 0)
      .execute("Shared.Schools_Insert");

    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// @route   POST /api/school/imports
// @desc    Add Schools
// @access  public
exports.addMultipleSchools = async (req, res) => {
  try {
    let duplicate = false;
    const pool = await poolPromise;
    let arr = req.body.schools;
    for (let i = 0; i < arr.length; i++) {
      const school = arr[i];
      const results = await pool
        .request()
        .input("SchoolID", sql.Int, null)
        .input("Name", sql.VarChar(250), school.SchoolName)
        .execute("Shared.Schools_Load");

      if (results.recordset.length > 0) {
        duplicate = true;
        break;
      }

      await pool
        .request()
        .input("SchoolName", sql.VarChar(250), school.SchoolName)
        .input("isDeleted", sql.Bit, 0)
        .execute("Shared.Schools_Insert");
    }

    if (duplicate) {
      return res
        .status(400)
        .json({ errors: [{ message: "School Name is taken" }] });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// @route   GET /api/school
// @desc    GET Users
// @access  public
exports.getSchools = async (req, res) => {
  try {
    console.log("Test req body", req.body);
    const role = req.user.UserTypeID;
    const pool = await poolPromise;
    let results;

    if (role === 6) {
      results = await pool
        .request()
        .input("SchoolIds", sql.VarChar(250), req.body.schoolIds)
        .execute("Shared.Schools_Load");
    } else {
      results = await pool
        .request()
        .input("SchoolID", sql.Int, req.body.SchoolID)
        .input("Name", sql.VarChar(250), req.body.Name)
        .execute("Shared.Schools_Load");
    }

    res.status(200).json({ success: true, data: results.recordsets[0] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// @route   PUT /api/school/:schoolId
// @desc    Update School
// @access  public
exports.updateSchool = async (req, res) => {
  try {
    const pool = await poolPromise;
    const results = await pool
      .request()
      .input("SchoolID", sql.Int, -1)
      .input("Name", sql.VarChar(250), req.body.Name)
      .execute("Shared.Schools_Load");

    if (results.recordset.length > 0) {
      return res
        .status(400)
        .json({ errors: [{ message: "School Name is taken" }] });
    }
    await pool
      .request()
      .input("SchoolID", sql.Int, req.params.schoolId)
      .input("SchoolName", sql.VarChar(250), req.body.Name)
      .execute("Shared.Schools_Update");

    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// @route   DELETE /api/school/:schoolId
// @desc    delete School
// @access  public
exports.deleteSchool = async (req, res) => {
  try {
    const pool = await poolPromise;
    const results = await pool
      .request()
      .input("SchoolID", sql.Int, req.params.schoolId)
      .execute("Shared.Schools_Delete");

    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};
