const { poolPromise } = require("../config/db");
const moment = require("moment");

exports.addReception = async (req, res) => {
  try {
    console.log("test my request body2", req.body);

    if (req.body) {
      const {
        FirstName,
        LastName,
        PhoneNumber,
        InOut,
        HomeAreas,
        ScheduledVisit,
        Purpose,
        ResidentName,
        FirstVisit,
        SicknessSymptom,
        Acknowledgement,
        DepartmentVisit,
      } = req.body;

      if (InOut) {
        var SignInOutTime = moment.utc().format();
      }

      const pool = await poolPromise;
      let visitRecord = await pool
        .request()
        .input("firstName", FirstName)
        .input("lastName", LastName)
        .input("phoneNumber", PhoneNumber)
        .execute("dbo.Visits_Load");

      // First time visit then insert new record
      // if (visitRecord.recordset.length === 0) {
      //   await pool
      //     .request()
      //     .input("firstName", FirstName)
      //     .input("lastName", LastName)
      //     .input("phoneNumber", PhoneNumber)
      //     .input("signInDate", SignInOutTime)
      //     .input("homeAreas", JSON.stringify(HomeAreas))
      //     .input("scheduledVisit", ScheduledVisit)
      //     .input("purpose", Purpose)
      //     .input("residentName", ResidentName)
      //     .input("firstVisit", FirstVisit)
      //     .input("sicknessSymptom", SicknessSymptom)
      //     .input("acknowledgement", Acknowledgement)
      //     .input("departmentVisit", DepartmentVisit)
      //     .execute("dbo.Visits_Insert");
      // }

      // Not First time visit then check for the latest record

      // if there sign in but no sign out then do not allow to sign in again

      // otherwise allow to sign in and persist the new record to db
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

exports.getReceptions = async (req, res) => {
  try {
    const pool = await poolPromise;
    let results;

    results = await pool.request().execute("dbo.Visits_Load");

    if (results.recordset.length === 0) {
      return res.status(200).json({ success: true, data: [] });
    }

    // Once all asynchronous operations are complete, send the response
    res.status(200).json({
      success: true,
      data: results.recordset,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

exports.updateReception = async (req, res) => {
  try {
    if (req.body) {
      const { SongID, Name, Lyrics, SongData, SongLogo } = req.body;

      const pool = await poolPromise;

      if (SongData !== "") {
        var songPath = await storeAudio("SongAudio", SongData, SongID);
      }

      if (SongLogo !== "") {
        var imgPath = await storeImage("SongLogo", SongLogo, SongID);
      }

      await pool
        .request()
        .input("singSongID", SongID)
        .input("songName", Name)
        .input("songPath", songPath)
        .input("imagePath", imgPath)
        .input("lyrics", Lyrics)
        .execute("dbo.Songs_Update");
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

exports.deleteReception = async (req, res) => {
  try {
    const pool = await poolPromise;
    const results = await pool
      .request()
      .input("singSongID", req.params.songID)
      .execute("dbo.Songs_Delete");

    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};
