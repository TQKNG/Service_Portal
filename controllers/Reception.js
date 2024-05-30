const { poolPromise } = require("../config/db");
const { sendEmailToDept } = require("../utils/sendEmail");
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

      // // Check whether sign in or sign out
      if (InOut) {
        var SignInOutTime = moment.utc().format();
      }

      // // Look for latest visit record
      const pool = await poolPromise;
      let latestVisitRecord = await pool
        .request()
        .input("firstName", FirstName)
        .input("lastName", LastName)
        .input("phoneNumber", PhoneNumber)
        .input("latestVisit", 1)
        .execute("dbo.Visits_Load");

      // // First time visit then insert new record
      if (latestVisitRecord.recordset.length === 0) {
        await pool
          .request()
          .input("firstName", FirstName)
          .input("lastName", LastName)
          .input("phoneNumber", PhoneNumber)
          .input("signInDate", SignInOutTime)
          .input("homeAreas", JSON.stringify(HomeAreas))
          .input("scheduledVisit", ScheduledVisit)
          .input("purpose", Purpose)
          .input("residentName", ResidentName)
          .input("firstVisit", FirstVisit)
          .input("sicknessSymptom", SicknessSymptom)
          .input("acknowledgement", Acknowledgement)
          .input("adminOffices", DepartmentVisit)
          .execute("dbo.Visits_Insert");
      }
      // If there is a record, check if the user has signed in or out
      else if (
        latestVisitRecord.recordset[0].signInDate &&
        latestVisitRecord.recordset[0].signOutDate
      ) {
        await pool
          .request()
          .input("firstName", FirstName)
          .input("lastName", LastName)
          .input("phoneNumber", PhoneNumber)
          .input("signInDate", SignInOutTime)
          .input("homeAreas", JSON.stringify(HomeAreas))
          .input("scheduledVisit", ScheduledVisit)
          .input("purpose", Purpose)
          .input("residentName", ResidentName)
          .input("firstVisit", FirstVisit)
          .input("sicknessSymptom", SicknessSymptom)
          .input("acknowledgement", Acknowledgement)
          .input("adminOffices", DepartmentVisit)
          .execute("dbo.Visits_Insert");
      } else {
        if (
          latestVisitRecord.recordset[0].signInDate &&
          !latestVisitRecord.recordset[0].signOutDate
        ) {
          return res.status(200).json({
            success: false,
            error:
              "You have not signed out yet. Please sign out before continue",
          });
        }
      }

      // // Configure email to be sent
      const settings = await pool
        .request()
        .input("keyword", "AdminOffices")
        .execute("dbo.Settings_Load");

      if (settings.recordset.length > 0) {
        const adminOffices = JSON.parse(settings.recordset[0].valueStr);
        let ccEmail = "";
        let options = {};

        // Check first: Scenarios 3: Sickness symptom
        if (SicknessSymptom === "true") {
          options.emailType = 3;
          options.visitorName = `${FirstName} ${LastName}`;
          options.phoneNumber = PhoneNumber;
        } else {
          // Scenarios 1: Select admin office
          if (DepartmentVisit !== "") {
            office = adminOffices.find(
              (office) => office.title === DepartmentVisit
            );

            ccEmail = office.email;
            options.emailType = 1;
            options.deptName = DepartmentVisit;
            options.cc = ccEmail;
            options.visitorName = `${FirstName} ${LastName}`;
            options.phoneNumber = PhoneNumber;
          }

          // Scenarios 2: First visit  and Caregiver/general visitor
          if (
            FirstVisit === "true" &&
            (Purpose === "Caregiver" || Purpose === "General Visitor")
          ) {
            options.emailType = 2;
            options.visitorName = `${FirstName} ${LastName}`;
            options.phoneNumber = PhoneNumber;
          }
        }

        console.log("test email options", options, ccEmail);
        res.status(200).json({ success: true });

        // Send email to department'
        if (options.email !== null && options.emailType !== 0) {
          await sendEmailToDept(options);
        }
      }
    }
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

    if (results.recordsets.length === 0) {
      return res.status(200).json({ success: true, data: [] });
    }

    let resultsArray = results.recordsets[0].map((result) => {
      const id = result.visitID; // visitID conflict keywords
      delete result.visitID;
      return {...result, id: id };
    });

    // Once all asynchronous operations are complete, send the response
    return res.status(200).json({
      success: true,
      data: resultsArray,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

exports.updateReception = async (req, res) => {
  try {
    console.log("test my request body", req.body, req.params.receptionID);

    // Update from portal-visit module
    if(req.body && req.body.portalUpdate){
      let SignOutTime = moment.utc().format();
      const pool = await poolPromise;
      await pool
        .request()
        .input("visitID", req.body.visitID)
        .input("signOutDate", SignOutTime)
        .execute("dbo.Visits_Update");

      return res.status(200).json({ success: true, error: null });
    }

    // Update from reception form module
    if (req.body) {
      const { FirstName, LastName, PhoneNumber, InOut } = req.body;

      let SignInOutTime; // UTC ISO 8601 format - Current Time

      if (!InOut) {
        SignInOutTime = moment.utc().format();
      }

      const pool = await poolPromise;
      let latestVisitRecord = await pool
        .request()
        .input("firstName", FirstName)
        .input("lastName", LastName)
        .input("phoneNumber", PhoneNumber)
        .input("latestVisit", 1)
        .execute("dbo.Visits_Load");

      // First time visit then insert new record
      if (latestVisitRecord.recordset.length === 0) {
        return res.status(200).json({
          success: false,
          error:
            "Your name was not found! Please check the spelling of your name.",
        });
      } else {
        if (
          latestVisitRecord.recordset[0].signInDate &&
          latestVisitRecord.recordset[0].signOutDate
        ) {
          return res.status(200).json({
            success: false,
            error: "You have not signed in yet. Please sign in before continue",
          });
        } else {
          await pool
            .request()
            .input("visitID", latestVisitRecord.recordset[0].visitID)
            .input("signOutDate", SignInOutTime)
            .execute("dbo.Visits_Update");
          res.status(200).json({ success: true, error: null });
        }
      }
    } else {
      res.status(200).json({ success: false, error: "Bad Request" });
    }
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
