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
      let isStartTimeValid = true;
      let isEndTimeValid =true;
      let errorMessages = "";
      const pool = await poolPromise;

      /*
       Step 1: Validation the input field
      1.1 Check if the selected time has already passed the current time
      1.2 Check if the robot is already registed in the database
    */

      // Step 1.1
      if (moment(StartTime).isBefore(moment())) {
        return res.status(200).json({
          success: false,
          error: "Schedule start time has already passed",
        });
      }

      // Step 1.2
      const robotData = await pool
        .request()
        .input("userID", parseInt(Robot))
        .execute("dbo.Users_Load");

      if (robotData.recordset.length === 0) {
        return res.status(200).json({
          success: false,
          error: "Robot is not registered in the database",
        });
      }

      /*
        Step 2: Check if the schedule is valid or not
        2.1 Check if this is the first schedule of the day, allow to add
        2.2 Check if the new schedule start time is between the existing schedules
      */

      // Get all the schedule start time for that date
      const schedules = await pool
        .request()
        .input("startTime", StartTime)
        .input("userID", parseInt(Robot))
        .execute("dbo.Schedules_Load");

      // Filter for the schedule with status 1 or status 5: Only consider new status or schedule set schedules
      let selectedDaySchedule = schedules.recordset.filter((schedule) => {
        if (schedule.statusID === 1 || schedule.statusID === 5) return schedule;
      });

      // Step 2.1
      if (selectedDaySchedule.length === 0) {
        isStartTimeValid = true;
        isEndTimeValid  = true;
        
        // // Retrieve hardwareID
        const hardwareID = robotData.recordset[0].hardwareID;

        // Retrieve map data
        const map = await pool
          .request()
          .input("mapName", hardwareID)
          .execute("dbo.Maps_Load");

        // Retrieve mapID
        const mapID = map.recordset[0].mapID;

        // Add schedule to database
        await pool
          .request()
          .input("userID", parseInt(Robot))
          .input("mapID", mapID) // Hardcoded for now
          .input("locationID", parseInt(Location))
          .input("startTime", StartTime)
          .input("announcement", Announcement)
          .input("duration", parseInt(Duration))
          .execute("dbo.Schedules_Insert");

        // Add schedule to database
        sendWebSocketMessage({
          type: "schedule",
          data: "schedule",
        });
        return res.status(200).json({ success: true, error: null });
      }

      console.log("Test selectedDaySchedule", selectedDaySchedule);
      // Step 2.2
      selectedDaySchedule.forEach((schedule) => {
        const NEW_SCHEDULE_START_TIME = StartTime;
        const BUFFER_TO_LOCATION = 10; // 10 minutes to go to location
        const BUFFER_TO_BASE = 10; // 10 minutes to go back to base
        const NEW_SCHEDULE_DURATION = parseInt(Duration); // duration of the visit
        const VISIT_DURATION =
          NEW_SCHEDULE_DURATION + BUFFER_TO_LOCATION + BUFFER_TO_BASE;
        let newScheduleStartTime = moment(NEW_SCHEDULE_START_TIME);
        let newScheduleEndTime = moment(NEW_SCHEDULE_START_TIME).add(
          VISIT_DURATION,
          "minutes"
        );
        let nextScheduleStartTime = moment(schedule.startTime);
        let nextScheduleEndTime = schedule.actualEndTime
          ? moment(schedule.actualEndTime)
          : moment(schedule.startTime)
              .add(schedule.duration, "minutes")
              .add(BUFFER_TO_LOCATION + BUFFER_TO_BASE, "minutes");

        console.log("test newScheduleStartTime", newScheduleStartTime);
        console.log("Test newScheduleEndTime", newScheduleEndTime);
        console.log("Test nextScheduleStartTime", nextScheduleStartTime);
        console.log("Test nextScheduleEndTime", nextScheduleEndTime);
        // Check if the new schedule start time and end time is between the existing schedule
        if(newScheduleStartTime.isBetween(nextScheduleStartTime,nextScheduleEndTime)){
          isStartTimeValid = false;
        }

        if(newScheduleEndTime.isBetween(nextScheduleStartTime,nextScheduleEndTime)){
          isEndTimeValid = false;
        }

        if(nextScheduleStartTime.isBetween(newScheduleStartTime,newScheduleEndTime)){
          isStartTimeValid = false;
        }

        if(nextScheduleEndTime.isBetween(newScheduleStartTime,newScheduleEndTime)){
          isEndTimeValid = false;
        }
      });


      //ready status
      console.log("Test isScheduleValid", isStartTimeValid, isEndTimeValid, "errorMessages", errorMessages);

      // Check if the schedule is valid or not
      if (!isStartTimeValid || !isEndTimeValid) {
        errorMessages= `Schedule start time is overlapping with existing schedules`
        return res.status(200).json({ success: false, error: errorMessages });
      } else {
        // Add schedule to database
        // Retrieve user data
        const robotData = await pool
          .request()
          .input("userID", parseInt(Robot))
          .execute("dbo.Users_Load");

        // Retrieve hardwareID
        const hardwareID = robotData.recordset[0].hardwareID;

        // Retrieve map data
        const map = await pool
          .request()
          .input("mapName", hardwareID)
          .execute("dbo.Maps_Load");

        // Retrieve mapID
        const mapID = map.recordset[0].mapID;

        // Add schedule to database
        await pool
          .request()
          .input("userID", parseInt(Robot))
          .input("mapID", mapID) // Hardcoded for now
          .input("locationID", parseInt(Location))
          .input("startTime", StartTime)
          .input("announcement", Announcement)
          .input("duration", parseInt(Duration))
          .execute("dbo.Schedules_Insert");

        sendWebSocketMessage({
          type: "schedule",
          data: "schedule",
        });
        return res.status(200).json({ success: true, error: null });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: "Server Error" });
  }
};

exports.getSchedules = async (req, res) => {
  try {
    const pool = await poolPromise;
    let results;

    results = await pool.request().execute("dbo.Schedules_Load");

    // Get schedules for a certain robot
    if (req.query.hardwareID) {
      const user = await pool
        .request()
        .input("hardwareID", req.query.hardwareID)
        .execute("dbo.Users_Load");

      const userID = user.recordset[0].userID;
      results = await pool
        .request()
        .input("userID", userID)
        .execute("dbo.Schedules_Load");
      results.recordset.map((schedule) => {
        if(schedule.statusID === 1)return schedule;
      });
    }

    if (results.recordset.length === 0) {
      return res.status(200).json({ success: true, data: [] });
    }

    // Map over data and return an array of promises
    const promises = results.recordset?.map(async (item) => {
      let convertCordinates = JSON.parse(item.coordinates); // when add location shoud not stringtify
      let location = {
        roomNumber: item.roomNumber,
        description: item.description,
        coordinates: convertCordinates,
      };

      item.location = location;

      delete item.roomNumber;
      delete item.description;
      delete item.coordinates;
    });

    // Wait for all promises to resolve
    await Promise.all(promises);

    console.log("Testst results", results.recordset); 

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
      const { robotUpdate, scheduleID, announcement, actualEndTime, statusID } =
        req.body;
      const pool = await poolPromise;

      console.log("Test actualEndTime",actualEndTime);

      // Update the schedule from the robot
      {
        /* 1: New, 2: Deleted, 3: Cancelled, 4: Completed, 5: Schedule Set */
      }
      if (robotUpdate) {
        if(statusID === 4){
          await pool
          .request()
          .input("scheduleID", scheduleID)
          .input("actualEndtime", actualEndTime)
          .input("statusID", statusID)
          .execute("dbo.Schedules_Update");
        }
        else{
          await pool
          .request()
          .input("scheduleID", scheduleID)
          .input("statusID", statusID)
          .execute("dbo.Schedules_Update");
        }
       
      }

      // Update the announcement/status from the portal
      else {
        await pool
          .request()
          .input("scheduleID", scheduleID)
          .input("announcement", announcement)
          .execute("dbo.Schedules_Update");
      }
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

    sendWebSocketMessage({
      type: "schedule",
      data: "schedule",
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};
