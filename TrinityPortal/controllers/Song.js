const { sendWebSocketMessage } = require("../utils/webSocketUtils");
const {
  storeImage,
  storeAudio,
  retrieveImage,
  retrieveAudio,
} = require("../utils/storage");
const { poolPromise } = require("../config/db");


/**
 * @openapi
 * /api/songs:
 *   post:
 *     summary: Add a new song
 *     description: Adds a new song to the portal.
 *     tags:
 *      - Songs
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Name:
 *                 type: string
 *               Lyrics:
 *                 type: string
 *               SongData:
 *                 type: string
 *               SongLogo:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successfully added the song.
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

exports.addSong = async (req, res) => {
  try {
    if (req.body) {
      const { Name, Lyrics, SongData, SongLogo } = req.body;
      // Create new song on Database

      // Save the song data and song logo to server file system
      await storeImage("SongLogo", SongLogo, Name);
      await storeAudio("SongAudio", SongData, Name);
    }
    sendWebSocketMessage({ type: "dataReceived", data: req.body });

    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

/**
 * @openapi
 * /api/songs:
 *   get:
 *     summary: Get all songs
 *     description: Retrieves all songs from the portal.
 *     tags:
 *      - Songs
 *     responses:
 *       '200':
 *         description: Successfully retrieved the songs.
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
 *                       SongID:
 *                         type: integer
 *                       Name:
 *                         type: string
 *                       Lyrics:
 *                         type: string
 *                       SongLogo:
 *                         type: string
 *                       SongData:
 *                         type: string
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

exports.getSongs = async (req, res) => {
  try {
    const pool = await poolPromise;
    let results;

    results = await pool.request().execute("dbo.Songs_Load");

    if(results.recordset.length === 0) {
      return res.status(200).json({ success: true, data: [] });
    }



    // Map over data and return an array of promises
    const promises = data.map(async (item) => {
      const logo = await retrieveImage("SongLogo", item.Name);
      const audio = await retrieveAudio("SongAudio", item.Name);

      // Assign retrieved values to item properties
      item.SongLogo = logo;
      item.SongData = audio;
    });

    // Wait for all promises to resolve
    await Promise.all(promises);

    // Once all asynchronous operations are complete, send the response
    res.status(200).json({
      success: true,
      data
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};
