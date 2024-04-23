const sql = require("mssql");
const { poolPromise } = require("../config/db");

// @route   POST /api/classrooms
// @desc    Add classroom
// @access  public
exports.addClassroom = async (req, res) => {
  try {
    const pool = await poolPromise;

    console.log(req.body.Year);

    let results = await pool
      .request()
      .input("SchoolID", sql.Int, req.body.SchoolID)
      .input("Year", sql.Int, req.body.Year)
      .input("GradeID", sql.Int, req.body.GradeID)
      .input("TeacherID", sql.Int, req.body.TeacherID)
      .input("Section", sql.VarChar(250), req.body.Section)
      .input("Remarks", sql.VarChar(250), req.body.Remarks)
      .input("isDeleted", sql.Bit, 0)
      .execute("Main.Classrooms_Insert");

    console.log(req.body.Students);

    for (let i = 0; i < req.body.Students.length; i++) {
      await pool
        .request()
        .input("StudentID", sql.Int, req.body.Students[i])
        .input("ClassroomID", sql.Int, results.recordset[0].ClassroomID)
        .execute("Main.ClassroomStudents_Insert");
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// @route   GET /api/classrooms
// @desc    GET classrooms
// @access  public
exports.getClassrooms = async (req, res) => {
  try {
    let data = {};
    const pool = await poolPromise;
    const classroom = await pool
      .request()
      .input(
        "ClassroomID",
        sql.Int,
        req.body.ClassroomID !== undefined ? req.body.ClassroomID : -1
      )
      .execute("Main.Classrooms_Load");

    data = classroom.recordset;
    if (req.body.ClassroomID !== undefined) {
      const students = await pool
        .request()
        .input(
          "ClassroomID",
          sql.Int,
          req.body.ClassroomID !== undefined ? req.body.ClassroomID : -1
        )
        .input("StudentID", sql.Int, -1)
        .execute("Main.ClassroomStudents_Load");
      data = { ...data[0], Students: students.recordset };
    } else {
     

      if (req.user.UserTypeID === 6) {
        let schools = JSON.parse("[" + req.user.schoolIds + "]");

        data = data.filter((assessmentResult) => {
          return schools.includes(assessmentResult.SchoolID);
        });
      }
    }

    res.status(200).json({ success: true, data: data});
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// @route   PUT /api/classrooms/:classroomId
// @desc    Update classroom
// @access  public
exports.updateClassroom = async (req, res) => {
  try {
    const pool = await poolPromise;
    await pool
      .request()
      .input("ClassroomID", sql.Int, req.params.classroomId)
      .input("SchoolID", sql.Int, req.body.SchoolID)
      .input("Year", sql.Int, req.body.Year)
      .input("GradeID", sql.Int, req.body.GradeID)
      .input("TeacherID", sql.Int, req.body.TeacherID)
      .input("Section", sql.VarChar(250), req.body.Section)
      .input("Remarks", sql.VarChar(250), req.body.Remarks)
      .execute("Main.Classrooms_Update");

    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// @route   Post /api/classrooms/students
// @desc    Update classroom
// @access  public
exports.addClassroomStudent = async (req, res) => {
  try {
    const pool = await poolPromise;

    await pool
      .request()
      .input("ClassroomID", sql.Int, req.body.ClassroomID)
      .input("StudentID", sql.Int, req.body.StudentID)
      .execute("Main.ClassroomStudents_Insert");

    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// @route   Delete /api/classrooms/students/:studentId
// @desc    Update classroom
// @access  public
exports.deleteClassroomStudent = async (req, res) => {
  try {
    const pool = await poolPromise;
    await pool
      .request()
      .input("ClassroomStudentID", sql.UniqueIdentifier, req.params.studentId)
      .execute("Main.ClassroomStudents_Delete");

    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// @route   DELETE /api/classrooms/:classroomId
// @desc    delete classroom
// @access  public
exports.deleteClassroom = async (req, res) => {
  try {
    const pool = await poolPromise;
    await pool
      .request()
      .input("ClassroomID", sql.Int, req.params.classroomId)
      .execute("Main.Classrooms_Delete");

    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};
