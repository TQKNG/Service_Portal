const { sendWebSocketMessage } = require("../utils/webSocketUtils");

const { storeImage, retrieveImage } = require("../utils/storage");
const { splitText } = require("../utils/TextFormatter");

const { poolPromise } = require("../config/db");

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
    if (req.body) {
      const { Name, BookText, TextCount, BookCover } = req.body;

      const wordPerPage = 50;


      // Split the book text into pages
      let bookData = splitText(BookText, wordPerPage);

      console.log("Test Book Data", bookData);

      // Create new song on Database
      const pool = await poolPromise;

      // Check if songs with the same name already exist
      const results = await pool
        .request()
        .input("bookName", Name)
        .execute("dbo.Books_Load");

      if (results.recordset.length > 0) {
        return res
          .status(400)
          .json({ success: false, error: "Book already exists" });
      }

      // Insert new book into database
      let record = await pool
        .request()
        .input("bookName", Name)
        .input("imagePath", "")
        .execute("dbo.Books_Insert");

      let newlyCreatedID = record.recordset[0].readBookID;

      // Save the book data to server file system
      const imgPath = await storeImage("BookCover", BookCover, newlyCreatedID);

      if (!imgPath) {
        return res.status(500).json({ success: false, error: "Server Error" });
      }

      // Update the path for new book cover into database
      await pool
        .request()
        .input("readBookID", newlyCreatedID)
        .input("imagePath", imgPath)
        .execute("dbo.Books_Update");

      // Add new pages to the database
      for (let i = 0; i < bookData.length; i++) {
        await pool
          .request()
          .input("readBookID", newlyCreatedID)
          .input("pageText", bookData[i].text)
          .execute("dbo.BookPages_Insert");
      }
      sendWebSocketMessage({ type: "dataReceived", data: req.body });
    }
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
    const pool = await poolPromise;
    let results;

    results = await pool.request().execute("dbo.Books_Load");

    if (results.recordset.length === 0) {
      return res.status(200).json({ success: true, data: [] });
    }

     // Map over data and return an array of promises
     const promises = results.recordset.map(async (item) => {
      let cover = "";

      // Retrieve book cover image
      if (item.imagePath !== "") {
        cover = await retrieveImage("BookCover", item.readBookID);
      }

      // Retrive Book Pages and convert to text
      let pages = await pool
        .request()
        .input("readBookID", item.readBookID)
        .execute("dbo.BookPages_Load");

      console.log("Pages", pages.recordset)

      // Concatenate all pages text
      let bookText = "";
      pages.recordset.forEach((page) => {
        bookText += page.pageText;
      });

      // Format json format for robot
      item.BookID = item.readBookID;
      item.Name = item.bookName;
      item.BookText = bookText;
      item.BookCover = cover;

      delete item.readBookID;
      delete item.bookName;
      delete item.imagePath;
      delete item.isDeleted;
      delete item.mediaType;
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


exports.updateBook = async (req, res) => {
  try {
    if (req.body) {
      const { BookID, Name, BookText, TextCount, BookCover } = req.body;

      // const wordPerPage = 50;

      // // Split the book text into pages
      // let bookData = splitText(BookText, wordPerPage);

      // console.log("Test Book Data", bookData);

      // Create new song on Database
      const pool = await poolPromise;

      if(BookCover !== ""){
        var imgPath = await storeImage("BookCover", BookCover, BookID);
      }

      await pool
        .request()
        .input("readBookID", BookID)
        .input("bookName", Name)
        .input("imagePath", imgPath)
        .execute("dbo.Books_Update");
    }
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const pool = await poolPromise;
    const results = await pool
      .request()
      .input("readBookID", req.params.bookID)
      .execute("dbo.Books_Delete");

    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};
