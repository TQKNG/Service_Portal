const { storeJson, retrieveJson } = require("../utils/storage");

const { poolPromise } = require("../config/db");
const moment = require("moment");
/**
 * @openapi
 * /api/robotservices/map:
 *   post:
 *     summary: Add a new map
 *     description: Adds a new map to the database.
 *     tags:
 *       - Robot Services
 *          - Map
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mapName:
 *                 type: string
 *               mapData:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successfully added the map.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *     security:
 *       - apiKeyAuth: []
 */

exports.addMap = async (req, res) => {
  try {
    // Construct a new map
    const newMap = {
      mapName: req.body.mapName,
      mapData: req.body.mapData,
    };

    // Save the map to file server
    // if there is new instruction image, add to the server filesystem
    if (req.body.mapData !== null) {
      const pool = await poolPromise;

      // Check if robot is already registered
      let results = await pool
        .request()
        .input("hardwareID", req.body.mapName)
        .execute("dbo.Users_Load");

      if (results.recordset.length) {
        // Where/sublocation to store the file
        let subloc = "Map";
        await storeJson(subloc, newMap, req.body.mapName);
      }
      else{
        res.status(400).json({ success: false, error: "Hardware ID not found in the database" });
      }
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

/**
 * @openapi
 * /api/robotservices/map/{id}:
 *   get:
 *     summary: Get a map based on id
 *     description: Retrieves a map by match its id and the filename
 *     tags:
 *       - Robot Services
 *          - Map
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *         description: The name of the map.
 *
 *     responses:
 *       '200':
 *         description: the map data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                     type: object
 *                     properties:
 *                       mapName:
 *                         type: string
 *                       mapData:
 *                         type: string
 *
 *     security:
 *       - apiKeyAuth: []
 */

exports.getMaps = async (req, res) => {
  try {
    let retrieveData = await retrieveJson("Map", req.params.id);
    if(retrieveData === null){
      res.status(400).json({ success: false, error: "Map not found" });
    }

    res.status(200).json({ success: true, data: retrieveData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

/**
 * @openapi
 * /api/robotservices/location:
 *   post:
 *     summary: Add location points
 *     description: Adds new location points to the database.
 *     tags:
 *       - Robot Services
 *          - Location
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   roomNumber:
 *                     type: integer
 *                     description: The room number.
 *                   description:
 *                     type: string
 *                     description: The description of the room.
 *                   coordinates:
 *                     type: object
 *                     properties:
 *                       rotation:
 *                         type: object
 *                         properties:
 *                           pitch:
 *                             type: number
 *                             description: The pitch rotation.
 *                           roll:
 *                             type: number
 *                             description: The roll rotation.
 *                           yaw:
 *                             type: number
 *                             description: The yaw rotation.
 *                       x_location:
 *                         type: number
 *                         description: The x-coordinate location.
 *                       y_location:
 *                         type: number
 *                         description: The y-coordinate location.
 *                       yaw_location:
 *                         type: number
 *                         description: The yaw coordinate location.
 *     responses:
 *       '200':
 *         description: Successfully added the location.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *     security:
 *       - apiKeyAuth: []
 */

exports.addLocation = async (req, res) => {
  try {
    if (req.body) {
      console.log("Test req body", req.body);
      const { hardwareID, locations } = req.body;
      const pool = await poolPromise;
      let userID = null;
      // lookup userID from hardwareID on database
      if (hardwareID) {
        let results = await pool
          .request()
          .input("hardwareID", hardwareID)
          .execute("dbo.Users_Load");

        if (results.recordset.length) {
          userID = results.recordset[0].userID;
        } else {
          res.status(400).json({
            success: false,
            error: "Hardware ID not found in the database",
          });
        }
      } else {
        res.status(400).json({
          success: false,
          error: "Please provide hardware ID to proceed",
        });
      }

      if (userID) {
        let convertedLocations = JSON.parse(locations);
        for (let i = 0; i < convertedLocations.length; i++) {
          const { roomNumber, description, coordinates } =
            convertedLocations[i];
          if (coordinates !== null) {
            await pool
              .request()
              .input("userID", userID)
              .input("roomNumber", roomNumber)
              .input("description", description)
              .input("coordinates", JSON.stringify(coordinates))
              .execute("dbo.Locations_Insert");
          }
        }
        res
          .status(200)
          .json({ success: true, message: "Successfully added the location" });
      }
      res.status(400).json({ success: false, error: "Bad Request" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};


exports.getLocations = async (req, res) => {
  try {
    const pool = await poolPromise;
    let results;
    console.log("tesdsgfdsfgsfs", req.body.userID)

    
    // Get a specify song
    if (req.body.userID && req.body.userID !== "") {
      results = await pool
        .request()
        .input("userID", req.body.userID)
        .execute("dbo.Locations_Load");
    } else {
      console.log("tesdsgfdsfgsfs")
      results = await pool.request().execute("dbo.Locations_Load");
    }

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

/**
 * @openapi
 * /api/robotservices/location:
 *   get:
 *     summary: Get all locations
 *     description: Retrieves a list of all locations from the portal.
 *     tags:
 *       - Robot Services
 *          - Location
 *     responses:
 *       '200':
 *         description: A list of locations.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   roomNumber:
 *                     type: integer
 *                     description: The room number.
 *                   description:
 *                     type: string
 *                     description: The description of the room.
 *                   coordinates:
 *                     type: object
 *                     properties:
 *                       rotation:
 *                         type: object
 *                         properties:
 *                           pitch:
 *                             type: number
 *                             description: The pitch rotation.
 *                           roll:
 *                             type: number
 *                             description: The roll rotation.
 *                           yaw:
 *                             type: number
 *                             description: The yaw rotation.
 *                       x_location:
 *                         type: number
 *                         description: The x-coordinate location.
 *                       y_location:
 *                         type: number
 *                         description: The y-coordinate location.
 *                       yaw_location:
 *                         type: number
 *                         description: The yaw coordinate location.
 *     security:
 *       - apiKeyAuth: []
 */
exports.getSchedules = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: [
        {
          roomNumber: 234,
          description: "busy",
          coordinates: {
            rotation: {
              pitch: 0.0,
              roll: 0.0,
              yaw: 0.72924143,
            },
            x_location: 0.0,
            y_location: 0.0,
            yaw_location: 0.72924143,
          },
        },

        {
          roomNumber: 235,
          description: "quiet",
          coordinates: {
            rotation: {
              pitch: 0.0,
              roll: 0.0,
              yaw: 0.72924143,
            },
            x_location: 1.0,
            y_location: 1.0,
            yaw_location: 1.0,
          },
        },

        {
          roomNumber: 236,
          description: "occupied",
          coordinates: {
            rotation: {
              pitch: 0.0,
              roll: 0.0,
              yaw: 0.72924143,
            },
            x_location: 2.0,
            y_location: 2.0,
            yaw_location: 2.0,
          },
        },
      ],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

exports.addStatisticLogs = async (req, res) => {
  try {
    if (req.body.length) {
      for (let i = 0; i < req.body.length; i++) {
        const { userID, actionID, actionType, startTime, endTime } =
          req.body[i];

        // Convert Datetime to UTC ISO 8601 format
        const startDateTime = moment.utc(startTime).format();
        const endDateTime = moment.utc(endTime).format();

        // look up for user ID from Hardware ID

        const pool = await poolPromise;
        await pool
          .request()
          .input("actionID", actionID)
          .input("actionType", actionType)
          .input("startTime", startDateTime)
          .input("endTime", endDateTime)
          .execute("dbo.StatisticLogs_Insert");
      }
      res.status(200).json({ success: true });
    }
    res.status(400).json({ success: false, error: "Bad Request" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

exports.getStatisticLogs = async (req, res) => {
  try {
    const pool = await poolPromise;
    let results;
    results = await pool.request().execute("dbo.StatisticLogs_Load");

    res.status(200).json({ success: true, data: results.recordset });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};
