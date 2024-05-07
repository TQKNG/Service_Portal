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
      let startTimeCheck = false;
      let endTimeCheck = false;
      let errorMessages = "";
      const pool = await poolPromise;

      // Get all the schedule start time for that date
      const schedules = await pool
        .request()
        .input("startTime", StartTime)
        .input("userID", parseInt(Robot))
        .execute("dbo.Schedules_Load");

      /*
       Buffer time: 10 min
       start time: 2:00 pm
      duration: 30 min
      free from: 2:30pm -10 min = 2:20pm 
      free to: 2:30pm + 30 min + 10 min = 3:10pm
      
      */

      let selectedDaySchedule = schedules.recordset.map((schedule) => {
        return schedule;
      });

      // Check if this is the first schedule of the day, allow to add
      if (selectedDaySchedule.length === 0) {
        startTimeCheck = true;
        endTimeCheck = true;

        // Retrieve user data
        const robotData =
          await pool
          .request()
          .input("userID", parseInt(Robot))
          .execute("dbo.Users_Load");

        // Retrieve hardwareID
        const hardwareID = robotData.recordset[0].hardwareID;

        // Retrieve map data
        const map =
          await pool
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
        console.log("Final Status check", scheduleCheck, errorMessages);

        // Add schedule to database
        sendWebSocketMessage({
          type: "schedule",
          data: "schedule",
        });
        return res.status(200).json({ success: true, error: null });
      }

      // Otherwise, go through each start time, add buffer and check againt the new schedule
      selectedDaySchedule = selectedDaySchedule.map((schedule) => {
        let bufferTime = 10; // buffer for delay
        let coolDownTime = 30; // time break between schedules
        let duration = Duration; // buffer for time taken to complete a schedule

        /*
        scheduleStartTime logic:
          - Regardless of the actual start time, we will use the start time - buffer time
        */
        let scheduleStartTime = moment(schedule.startTime).subtract(
          bufferTime,
          "minutes"
        );

        /*
        scheduleEndTime logic:
          - If schedule is not completed, start time  + duration + buffer time + cool down time
          - If schedule is completed, actual end time + buffer time + cool down time
        */

        let scheduleEndTime =
          schedule.statusID < 4
            ? moment(schedule.startTime)
                .add(schedule.duration, "minutes")
                .add(coolDownTime + bufferTime, "minutes")
            : moment(schedule.actualEndTime).add(
                coolDownTime + bufferTime,
                "minutes"
              );

        /*
        newScheduleStartTime logic:
          - Regardless of the actual start time since it will be managed under previous end buffer
        */
        let newScheduleStartTime = moment(StartTime);

        /*
        newScheduleEndTime logic:
          - Start time + duration + buffer time + cool down time
        */
        let newScheduleEndTime = moment(StartTime)
          .add(duration, "minutes")
          .add(coolDownTime + bufferTime, "minutes");

        // Check if the new schedule start time is between the existing schedule
        if (
          newScheduleStartTime.isBetween(scheduleStartTime, scheduleEndTime)
        ) {
          startTimeCheck = false;
          errorMessages =
            "Schedule start time conflict with existing schedules";
        } else {
          startTimeCheck = true;
        }

        // Check if the new schedule end time is between the existing schedule
        if (newScheduleEndTime.isBetween(scheduleStartTime, scheduleEndTime)) {
          endTimeCheck = false;
          errorMessages = "Schedule end time conflict with existing schedules";
        } else {
          endTimeCheck = true;
        }

        if (startTimeCheck && endTimeCheck) {
          return;
        }
      });

      console.log("Test Schedule", startTimeCheck, endTimeCheck, errorMessages);
      // Check if the schedule is valid or not
      if (!startTimeCheck || !endTimeCheck) {
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
        console.log("Final Status check", scheduleCheck, errorMessages);

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
        coordinates: convertCordinates,
      };

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
      console.log("Test res bobbb", req.body);
      const { robotUpdate, scheduleID, announcement, actualEndTime, statusID } =
        req.body;
      const pool = await poolPromise;

      // Update the schedule from the robot
      if (robotUpdate) {
        await pool
          .request()
          .input("scheduleID", scheduleID)
          .input("actualEndtime", actualEndTime)
          .input("statusID", statusID)
          .execute("dbo.Schedules_Update");
      }
      // Update the announcement/status from the portal
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
