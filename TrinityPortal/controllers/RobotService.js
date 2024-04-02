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
    // console.log("test my request body", req.body);
    // sendWebSocketMessage({ type: "dataReceived", data: req.body });

    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

/**
 * @openapi
 * /api/robotservices/map:
 *   get:
 *     summary: Get all maps
 *     description: Retrieves a list of all maps path available in the portal.
 *     tags:
 *       - Robot Services
 *          - Map
 *     responses:
 *       '200':
 *         description: A list of maps.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       mapID:
 *                         type: integer
 *                       userID:
 *                         type: string
 *                       mapName:
 *                         type: string
 *                       mapPath:
 *                         type: string
 *
 *     security:
 *       - apiKeyAuth: []
 */

exports.getMaps = async (req, res) => {
  try {
    // console.log("Test req body", req.body);
    // const role = req.user.UserTypeID;
    // const pool = await poolPromise;
    // let results;

    // if (role === 6) {
    //   results = await pool
    //     .request()
    //     .input("SchoolIds", sql.VarChar(250), req.body.schoolIds)
    //     .execute("Shared.Schools_Load");
    // } else {
    //   results = await pool
    //     .request()
    //     .input("SchoolID", sql.Int, req.body.SchoolID)
    //     .input("Name", sql.VarChar(250), req.body.Name)
    //     .execute("Shared.Schools_Load");
    // }

    res.status(200).json({
      success: true,
      data: [
        {
          mapID: 1,
          userID: 1,
          mapName: "Test Map 1",
          mapPath:
            "https://example.blobstorage.com/images/midnight_serenade.jpg",
        },
        {
          mapID: 2,
          userID: 1,
          mapName: "Test Map 2",
          mapPath:
            "https://example.blobstorage.com/images/midnight_serenade.jpg",
        },
        {
          mapID: 3,
          userID: 1,
          mapName: "Test Map 3",
          mapPath:
            "https://example.blobstorage.com/images/midnight_serenade.jpg",
        },
        {
          mapID: 4,
          userID: 1,
          mapName: "Test Map 4",
          mapPath:
            "https://example.blobstorage.com/images/midnight_serenade.jpg",
        },
      ],
    });
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
    // console.log("test my request body", req.body);
    // sendWebSocketMessage({ type: "dataReceived", data: req.body });

    res.status(200).json({ success: true });
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
exports.getLocations = async (req, res) => {
  try {
    // console.log("Test req body", req.body);
    // const role = req.user.UserTypeID;
    // const pool = await poolPromise;
    // let results;

    // if (role === 6) {
    //   results = await pool
    //     .request()
    //     .input("SchoolIds", sql.VarChar(250), req.body.schoolIds)
    //     .execute("Shared.Schools_Load");
    // } else {
    //   results = await pool
    //     .request()
    //     .input("SchoolID", sql.Int, req.body.SchoolID)
    //     .input("Name", sql.VarChar(250), req.body.Name)
    //     .execute("Shared.Schools_Load");
    // }

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
