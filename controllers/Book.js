
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
      const { Name, BookText, TextCount, BookCover, BookLastPage } = req.body;

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
        .input("bookText", BookText)
        .input("imagePath", "")
        .input("imageLastPath", "")
        .execute("dbo.Books_Insert");

      let newlyCreatedID = record.recordset[0].readBookID;

      // Save the book data to server file system
      const imgPath = await storeImage("BookCover", BookCover, newlyCreatedID);

      const lastImgPath = await storeImage("BookLastPage", BookLastPage, newlyCreatedID);

      if (!imgPath || !lastImgPath) {
        return res.status(500).json({ success: false, error: "Server Error" });
      }

      // Update the path for new book cover into database
      await pool
        .request()
        .input("readBookID", newlyCreatedID)
        .input("imagePath", imgPath)
        .input("imageLastPath", lastImgPath)
        .execute("dbo.Books_Update");

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
      let lastPage ="";

      // Retrieve book cover image
      if (item.imagePath !== "") {
        cover = await retrieveImage("BookCover", item.readBookID);
      }

      // Retrive Book Pages 
      if(item.imageLastPath !== "") {
        lastPage = await retrieveImage("BookLastPage", item.readBookID);
      }

      // Format json format for robot
      item.BookID = item.readBookID;
      item.Name = item.bookName;
      item.BookText = item.bookText;
      item.BookCover = cover;
      item.BookLastPage = lastPage;

      delete item.readBookID;
      delete item.bookName;
      delete item.bookText;
      delete item.imagePath;
      delete item.imageLastPath;
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
      const { BookID, Name, BookText, BookCover, BookLastPage } = req.body;

      // Create new song on Database
      const pool = await poolPromise;

      if(BookCover !== ""){
        var imgPath = await storeImage("BookCover", BookCover, BookID);
      }

      if(BookLastPage !== ""){
        var lastImgPath = await storeImage("BookLastPage", BookLastPage, BookID);
      }

      await pool
        .request()
        .input("readBookID", BookID)
        .input("bookName", Name)
        .input("bookText", BookText)
        .input("imagePath", imgPath)
        .input("imageLastPath", lastImgPath)
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
