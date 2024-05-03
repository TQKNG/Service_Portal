const { poolPromise } = require("../config/db");
const moment = require("moment");
const { sendWebSocketMessage } = require("../utils/webSocketUtils");

/**
 * @openapi
 * /api/schedules:
 *   post:
 *     summary: Add a new schedule
 *     description: Adds a new schedule to the portal.
 *     tags:
 *      - Schedules
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Name:
 *                 type: string
 *               ScheduleText:
 *                 type: string
 *               ScheduleData:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successfully added the schedule.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *       '500':
 *         description: Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 error:
 *                   type: string
 *     security:
 *       - apiKeyAuth: []
 */
exports.addSchedule = async (req, res) => {
  try {
    if (req.body) {
      const { Robot, Location, Duration, Announcement, StartTime } = req.body;

      console.log("TESST", req.body);
      const pool = await poolPromise;


      // Get all the schedule start time for that date
      const schedules = await pool
        .request()
        .input("startTime", StartTime)
        .input("userID", parseInt(Robot))
        .execute("dbo.Schedules_Load");

      let timeSlots = schedules.recordset.map((schedule) => {
        return schedule.startTime;
      });

      console.log("timeSlots", timeSlots);
      

      /*
       Buffer time: 10 min
       start time: 2:00 pm
      duration: 30 min
      free from: 2:30pm -10 min = 2:20pm 
      free to: 2:30pm + 30 min + 10 min = 3:10pm
      
      */
      // Schedule 1: start time: 8:00 , duration: 30 min, ETE: 8:30, ActualETE: 8:35, Status: Completed

      // Schedule 2: start time: 9:05 , duration: 15 min, ETE: 9:20, ActualETE: null, Status: In Progress

      // Schedule 3: start time: 9:20 + 30 + 10 buffer = 10:00, duration: 20 min, ETE: 10:20, ActualETE: null, Status: Not Started

      // // Retrieve user data
      // const robotData = 
      //   await pool
      //   .request()
      //   .input("userID", parseInt(Robot))
      //   .execute("dbo.Users_Load");

      // // Retrieve hardwareID
      // const hardwareID = robotData.recordset[0].hardwareID;

      // // Retrieve map data
      // const map = 
      //   await pool
      //   .request()
      //   .input("mapName", hardwareID)
      //   .execute("dbo.Maps_Load");

      // // Retrieve mapID 
      // const mapID = map.recordset[0].mapID;
    
      // // Add schedule to database
      // await pool
      // .request()
      // .input("userID", parseInt(Robot))
      // .input("mapID", mapID) // Hardcoded for now
      // .input("locationID", parseInt(Location))
      // .input("startTime", StartTime)
      // .input("announcement", Announcement)
      // .input("duration", parseInt(Duration))
      // .execute("dbo.Schedules_Insert");

  
    }

    res.status(200).json({ success: true });

    sendWebSocketMessage({
      type: "schedule",
      data: "schedule",
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

exports.getSchedules = async (req, res) => {
  try {
    const pool = await poolPromise;
    let results;

    results = await pool.request().execute("dbo.Schedules_Load");

    // Get schedules for a certain robot
    if(req.query.hardwareID){
      const user = await pool.request().input("hardwareID", req.query.hardwareID).execute("dbo.Users_Load");
      
      const userID = user.recordset[0].userID;
      results = await pool.request().input("userID", userID).execute("dbo.Schedules_Load");
    }

    if (results.recordset.length === 0) {
      return res.status(200).json({ success: true, data: [] });
    }

    // Map over data and return an array of promises
    const promises = results.recordset?.map(async (item) => {
      let convertCordinates = JSON.parse(JSON.parse(item.coordinates)); // when add location shoud not stringtify
      let location = {
        roomNumber: item.roomNumber,
        description: item.description,
        coordinates: convertCordinates
      }

      item.location = location;

      delete item.roomNumber;
      delete item.description;
      delete item.coordinates;
    });

    // Wait for all promises to resolve
    await Promise.all(promises);

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

exports.updateSchedule = async (req, res) => {
  try {
    if (req.body) {
      const { ScheduleID, Announcement, ActualEndTime, statusID } = req.body;

      console.log("TEST body", req.body);

      const pool = await poolPromise;

      await pool
        .request()
        .input("scheduleID", ScheduleID)
        .input("actualEndtime", ActualEndTime)
        .input("announcement", Announcement)
        .input("statusID", statusID)
        .execute("dbo.Schedules_Update");
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

exports.deleteSchedule = async (req, res) => {
  try {
    const pool = await poolPromise;
    const results = await pool
      .request()
      .input("scheduleID", req.params.scheduleID)
      .execute("dbo.Schedules_Delete");

    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};
