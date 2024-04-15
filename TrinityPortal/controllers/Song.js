const { sendWebSocketMessage } = require("../utils/webSocketUtils");
const {
  storeImage,
  storeAudio,
  retrieveImage,
  retrieveAudio,
} = require("../utils/storage");

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
    let data = [
      {
        SongID: 1,
        Name: "Alan_Jackson",
        Lyrics: "Lyrics for Midnight Serenade",
        SongLogo: "",
        SongData: "",
      },
      {
        SongID: 2,
        Name: "folk_music",
        Lyrics: "Lyrics for Echoes of Tomorrow",
        SongLogo: "",
        SongData: "",
      },
      {
        SongID: 3,
        Name: "old_fashion",
        Lyrics: "Lyrics for Whispers in the Wind",
        SongLogo: "",
        SongData: "",
      },
      {
        SongID: 4,
        Name: "top_along",
        Lyrics: "Lyrics for Starlit Melodies",
        SongLogo: "",
        SongData: "",
      },
      {
        SongID: 5,
        Name: "Amazing_Grace",
        Lyrics: "Lyrics for Amazing Grace",
        SongLogo: "",
        SongData: "",
      },
      {
        SongID: 6,
        Name: "After_The_Ball",
        Lyrics: "Lyrics for After The Ball",
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
