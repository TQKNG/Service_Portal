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
      const pool = await poolPromise;

      // Check if songs with the same name already exist
      const results = await pool
        .request()
        .input("songName", Name)
        .execute("dbo.Songs_Load");

      if (results.recordset.length > 0) {
        return res
          .status(400)
          .json({ success: false, error: "Song already exists" });
      }

      // Insert new song into database
      let record = await pool
        .request()
        .input("songName", Name)
        .input("songPath", "")
        .input("imagePath", "")
        .input("lyrics", Lyrics)
        .execute("dbo.Songs_Insert");

      let newlyCreatedID = record.recordset[0].singSongID;

      // Save the song data and song logo to server file system
      const imgPath = await storeImage("SongLogo", SongLogo, newlyCreatedID);
      const songPath = await storeAudio("SongAudio", SongData, newlyCreatedID);

      if (!imgPath || !songPath) {
        return res.status(500).json({ success: false, error: "Server Error" });
      }
      // Update the path for new song into database
      await pool
        .request()
        .input("singSongID", newlyCreatedID)
        .input("songPath", songPath)
        .input("imagePath", imgPath)
        .execute("dbo.Songs_Update");
    }

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

    // Get a specify song
    console.log("req.params.songID", req.params.songID);
    if (req.params.songID) {
      results = await pool
        .request()
        .input("singSongID", req.params.songID)
        .execute("dbo.Songs_Load");
    } else {
      results = await pool.request().execute("dbo.Songs_Load");
    }

    if (results.recordset.length === 0) {
      return res.status(200).json({ success: true, data: [] });
    }

    // Map over data and return an array of promises
    const promises = results.recordset.map(async (item) => {
      let audio = "";
      let logo = "";

      // Retrieve song audio
      if (item.songPath !== "") {
        audio = await retrieveAudio("SongAudio", item.singSongID);
      }

      // Retrieve song logo
      if (item.imagePath !== "") {
        logo = await retrieveImage("SongLogo", item.singSongID);
      }

      // Format json format for robot
      item.SongID = item.singSongID;
      item.Name = item.songName;
      
      // Only add lyrics if requesting the song by song ID is provided
      // if(req.params.songID){
      //   item.Lyrics = item.lyrics;
      // }
      item.Lyrics = item.lyrics;

      item.SongLogo = logo;
      item.SongData = audio;

      delete item.singSongID;
      delete item.songName;
      delete item.songPath;
      delete item.imagePath;
      delete item.isDeleted;
      delete item.mediaType;
      delete item.lyrics;
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

exports.updateSong = async (req, res) => {
  try {
    if (req.body) {
      const { SongID, Name, Lyrics, SongData, SongLogo } = req.body;

      const pool = await poolPromise;

      if (
        SongData !== "" &&
        (SongData.includes("data:application/octet-stream") ||
          SongData.includes("data:audio/mpeg"))
      ) {
        var songPath = await storeAudio("SongAudio", SongData, SongID);
      }

      if (SongLogo !== "" && SongLogo.includes("data:image/png")) {
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

exports.deleteSong = async (req, res) => {
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
