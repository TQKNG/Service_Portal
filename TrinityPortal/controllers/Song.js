const { sendWebSocketMessage } = require("../utils/webSocketUtils");
const {
  storeImage,
  storeAudio,
  retrieveImage,
  retrieveAudio,
} = require("../utils/storage");

// /**
//  * @openapi
//  * /api/songs:
//  *   post:
//  *     summary: Add a new song
//  *     description: Adds a new song to the portal.
//  *     tags:
//  *      - Songs
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               title:
//  *                 type: string
//  *               artist:
//  *                 type: string
//  *     responses:
//  *       '200':
//  *         description: Successfully added the song.
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 success:
//  *                   type: boolean
//  *     security:
//  *       - apiKeyAuth: []
//  */

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
 *     description: Retrieves a list of all songs available in the portal.
 *     tags:
 *       - Songs
 *     responses:
 *       '200':
 *         description: A list of songs.
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
 *                       SongPath:
 *                         type: string
 *                       ImgPath:
 *                         type: string
 *                       Lyrics:
 *                         type: string
 *     security:
 *       - apiKeyAuth: []
 */

exports.getSongs = async (req, res) => {
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

    let data = [
      {
        SongID: 1,
        Name: "Alan_Jackson",
        Lyrics: "Lyrics for Midnight Serenade",
        SongPath:
          "https://trinityvillagestorage.blob.core.windows.net/song/alan_jackson.mp3",
        ImgPath: "https://example.blobstorage.com/images/midnight_serenade.jpg",
        SongLogo: "",
        SongData: "",
      },
      {
        SongID: 2,
        Name: "folk_music",
        Lyrics: "Lyrics for Echoes of Tomorrow",
        SongPath:
          "https://trinityvillagestorage.blob.core.windows.net/song/folk_music.mp3",
        ImgPath:
          "https://example.blobstorage.com/images/echoes_of_tomorrow.jpg",
        SongLogo: "",
        SongData: "",
      },
      {
        SongID: 3,
        Name: "old_fashion",
        Lyrics: "Lyrics for Whispers in the Wind",
        SongPath:
          "https://trinityvillagestorage.blob.core.windows.net/song/old_fashion.mp3",
        ImgPath:
          "https://example.blobstorage.com/images/whispers_in_the_wind.jpg",
        SongLogo: "",
        SongData: "",
      },
      {
        SongID: 4,
        Name: "top_along",
        Lyrics: "Lyrics for Starlit Melodies",
        SongPath:
          "https://trinityvillagestorage.blob.core.windows.net/song/top_along.mp3",
        ImgPath: "https://example.blobstorage.com/images/starlit_melodies.jpg",
        SongLogo: "",
        SongData: "",
      },
    ];

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
