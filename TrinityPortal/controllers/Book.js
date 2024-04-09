const { sendWebSocketMessage } = require("../utils/webSocketUtils");

const{

} = require("../utils/storage");

// /**
//  * @openapi
//  * /api/books:
//  *   post:
//  *     summary: Add a new book
//  *     description: Adds a new song to the portal.
//  *     tags:
//  *      - Books
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
exports.addBook = async (req, res) => {
  try {
    console.log("test my request body", req.body);
    sendWebSocketMessage({ type: 'dataReceived', data: req.body});
    
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};