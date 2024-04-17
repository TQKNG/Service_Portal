const { sendWebSocketMessage } = require("../utils/webSocketUtils");

const{ storeImage, retrieveImage } = require("../utils/storage");
const { splitText } = require("../utils/TextFormatter");

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
     
      const {Name, BookText, TextCount, BookCover} = req.body;

      let bookData =  splitText(BookText, 50);

      console.log("test Book Data", bookData)

      // Create new book on Database

      // Save the book data to server file system
      if(BookCover && BookCover !== ""){
        await storeImage("BookCover", BookCover, Name);
      }
      else{
        console.log("No book cover found");
      }
   
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
        Name: "Design of Books",
        BookText: "Test book text 1",
        BookCover:"",
        TextCount:500
      },
    ];

    // Map over data and return an array of promises
    const promises = data.map(async (item) => {
      const BookCover = await retrieveImage("BookCover", item.Name);

      // Assign retrieved values to item properties
      item.BookCover = BookCover;
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