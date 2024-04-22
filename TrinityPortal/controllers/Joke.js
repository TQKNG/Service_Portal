// @route   POST /api/joke
// @desc    Add Joke

const { sendWebSocketMessage } = require("../utils/webSocketUtils");
const {
  storeImage,
  retrieveImage,
} = require("../utils/storage");
const { poolPromise } = require("../config/db");


/**
 * @openapi
 * /api/jokes:
 *   post:
 *     summary: Add a new joke
 *     description: Adds a new joke to the portal.
 *     tags:
 *      - Jokes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Name:
 *                 type: string
 *               JokeText:
 *                 type: string
 *               JokeData:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successfully added the joke.
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
exports.addJoke = async (req, res) => {
  try {

    if (req.body) {
      const { Name, JokeText, JokeData } = req.body;
     // Create new song on Database
     const pool = await poolPromise;

     // Check if songs with the same name already exist
     const results = await pool
       .request()
       .input("jokeName", Name)
       .execute("dbo.Jokes_Load");

     if (results.recordset.length > 0) {
       return res
         .status(400)
         .json({ success: false, error: "Joke already exists" });
     }

      // Insert new song into database
      let record = await pool
        .request()
        .input("jokeName", Name)
        .input("jokePath", "")
        .input("jokeText", JokeText)
        .execute("dbo.Jokes_Insert");


      // Logic to add joke logo
      // let newlyCreatedID = record.recordset[0].laughJokeID;
      // // Save the song data and song logo to server file system
      // const imgPath = await storeImage("JokeLogo", JokeData, newlyCreatedID);

      // if (!imgPath) {
      //   return res.status(500).json({ success: false, error: "Server Error" });
      // }
      // Update the path for new song into database
      // await pool
      //   .request()
      //   .input("laughJokeID", newlyCreatedID)
      //   .input("jokePath", imgPath)
      //   .input("jokeName", Name)
      //   .input("jokeText", JokeText)
      //   .execute("dbo.Jokes_Update");
    }
    // sendWebSocketMessage({ type: 'dataReceived', data: req.body});
    
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

/**
 * @openapi
 * /api/jokes:
 *   get:
 *     summary: Get all jokes
 *     description: Retrieves all jokes from the portal.
 *     tags:
 *      - Jokes
 *     responses:
 *       '200':
 *         description: Successfully retrieved the jokes.
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
 *                       JokeID:
 *                         type: integer
 *                       Name:
 *                         type: string
 *                       JokeText:
 *                         type: string
 *                       JokeData:
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
exports.getJokes = async (req, res) => {
  try {
    const pool = await poolPromise;
    let results;

    results = await pool.request().execute("dbo.Jokes_Load");

    if(results.recordset.length === 0) {
      return res.status(200).json({ success: true, data: [] });
    }

     // Map over data and return an array of promises
     const promises = results.recordset.map(async (item) => {
      // let logo = "";

      // // Retrieve song logo
      // if (item.jokePath !== "") {
      //   logo = await retrieveImage("JokeLogo", item.laughJokeID);
      // }

      // Format json format for robot
      item.JokeID = item.laughJokeID;
      item.Name = item.jokeName;
      item.JokeData = "";
      item.JokeText = item.jokeText;
    

      delete item.laughJokeID;
      delete item.jokeName;
      delete item.jokePath;
      delete item.isDeleted;
      delete item.mediaType;
      delete item.jokeText;
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

exports.updateJoke= async (req, res) => {
  try {
    if (req.body) {
      const { JokeID, Name, JokeText, JokeData } = req.body;

      const pool = await poolPromise;

      await pool
        .request()
        .input("laughJokeID", JokeID)
        .input("jokeName", Name)
        .input("jokeText", JokeText)
        .execute("dbo.Jokes_Update");
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};


exports.deleteJoke = async (req, res) => {
  try {
    const pool = await poolPromise;
    const results = await pool
      .request()
      .input("laughJokeID", req.params.jokeID)
      .execute("dbo.Jokes_Delete");

    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};
