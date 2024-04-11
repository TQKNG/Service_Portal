// @route   POST /api/joke
// @desc    Add Joke

const { sendWebSocketMessage } = require("../utils/webSocketUtils");
const {
  storeImage,
  retrieveImage,
} = require("../utils/storage");


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

      // Save the song data and song logo to server file system
      await storeImage("JokeData", JokeData, Name);
    }
    sendWebSocketMessage({ type: 'dataReceived', data: req.body});
    
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
    let data = [
      {
        JokeID: 1,
        Name: "Why_do_beets_always_win",
        JokeText: "They are un-beet-able.",
        JokeData: "",
      },
      {
        JokeID: 2,
        Name: "Why_did_the_slice_of_bread_get_sent_home_from_school",
        JokeText: "It was feeling crumpy.",
        JokeData: "",
      },
      {
        JokeID: 3,
        Name: "What_do_you_call_a_magic_dog",
        JokeText: "A labracadabrador!",
        JokeData: "",
      },
      {
        JokeID: 4,
        Name: "Why_did_the_robber_jump_in_the_shower",
        JokeText: "He wanted to make a clean getaway!",
        JokeData: "",
      },
    ];

    // Map over data and return an array of promises
    const promises = data.map(async (item) => {
      const jokeData = await retrieveImage("JokeData", item.Name);

      // Assign retrieved values to item properties
      item.JokeData= jokeData;
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