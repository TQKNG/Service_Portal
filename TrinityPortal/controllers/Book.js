const { sendWebSocketMessage } = require("../utils/webSocketUtils");

const{ storeEPUB, retrieveEPUB } = require("../utils/storage");

/**
 * @openapi
 * /api/books:
 *   post:
 *     summary: Add a new book
 *     description: Adds a new book to the portal.
 *     tags:
 *      - Books
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Name:
 *                 type: string
 *               BookData:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successfully added the book.
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
exports.addBook = async (req, res) => {
  try {
    if(req.body){
     
      const {Name, BookData} = req.body;

      // Create new book on Database

      // Save the book data to server file system
      await storeEPUB("BookData", BookData, Name);
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
 * /api/books:
 *   get:
 *     summary: Get all books
 *     description: Retrieves all books from the portal.
 *     tags:
 *      - Books
 *     responses:
 *       '200':
 *         description: Successfully retrieved the books.
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
 *                       BookID:
 *                         type: integer
 *                       Name:
 *                         type: string
 *                       BookData:
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
exports.getBooks = async (req, res) => {
  try {
    let data = [
      {
        BookID: 1,
        Name: "Book_AnneWithEBook",
        BookData: "",
      },
      {
        BookID: 2,
        Name: "Classroom_of_the_Elite_Vol-2",
        BookData: "",
      },
      {
        BookID: 3,
        Name: "Classroom_of_the_Elite_Vol-3",
        BookData: "",
      },
      {
        BookID: 4,
        Name: "Classroom_of_the_Elite_Vol-4.5",
        BookData: "",
      },
    ];

    // Map over data and return an array of promises
    const promises = data.map(async (item) => {
      const book = await retrieveEPUB("BookData", item.Name);

      // Assign retrieved values to item properties
      item.BookData = book;
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