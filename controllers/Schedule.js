  const { poolPromise } = require("../config/db");
  
  
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
        const { Name, ScheduleText, ScheduleData } = req.body;
       // Create new song on Database
       const pool = await poolPromise;
  
       // Check if songs with the same name already exist
       const results = await pool
         .request()
         .input("scheduleName", Name)
         .execute("dbo.Schedules_Load");
  
       if (results.recordset.length > 0) {
         return res
           .status(400)
           .json({ success: false, error: "Schedule already exists" });
       }
  
        // Insert new song into database
        let record = await pool
          .request()
          .input("scheduleName", Name)
          .input("schedulePath", "")
          .input("scheduleText", ScheduleText)
          .execute("dbo.Schedules_Insert");
  
      }
      
      res.status(200).json({ success: true });
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
  
      if(results.recordset.length === 0) {
        return res.status(200).json({ success: true, data: [] });
      }
  
       // Map over data and return an array of promises
       const promises = results.recordset.map(async (item) => {
  
        // Format json format for robot
        item.ScheduleID = item.laughScheduleID;
        item.Name = item.scheduleName;
        item.ScheduleData = "";
        item.ScheduleText = item.scheduleText;
      
  
        delete item.laughScheduleID;
        delete item.scheduleName;
        delete item.schedulePath;
        delete item.isDeleted;
        delete item.mediaType;
        delete item.scheduleText;
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
  
  exports.updateSchedule= async (req, res) => {
    try {
      if (req.body) {
        const { ScheduleID, Name, ScheduleText, ScheduleData } = req.body;
  
        const pool = await poolPromise;
  
        await pool
          .request()
          .input("laughScheduleID", ScheduleID)
          .input("scheduleName", Name)
          .input("scheduleText", ScheduleText)
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
        .input("laughScheduleID", req.params.scheduleID)
        .execute("dbo.Schedules_Delete");
  
      res.status(200).json({ success: true });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error: "Server Error" });
    }
  };
  