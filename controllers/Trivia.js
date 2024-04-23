// @route   POST /api/trivia
// @desc    Add Trivia
const { poolPromise } = require("../config/db");

/**
 * @openapi
 * /api/trivia:
 *   post:
 *     summary: Add a new trivia question
 *     description: Adds a new trivia question to the portal.
 *     tags:
 *      - Trivia
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *               answers:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     text:
 *                       type: string
 *                     isCorrect:
 *                       type: boolean
 *     responses:
 *       '200':
 *         description: Successfully added the trivia question.
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
exports.addTrivia = async (req, res) => {
  try {
    if (req.body) {
      const { QuestionText, Answers } = req.body;

      // Create new song on Database
      const pool = await poolPromise;

      // Check if songs with the same name already exist
      const results = await pool
        .request()
        .input("questionText", QuestionText)
        .execute("dbo.Trivias_Load");

      if (results.recordset.length > 0) {
        return res
          .status(400)
          .json({ success: false, error: "Trivia question already exists" });
      }

      // Insert new trivia question into database
      let record = await pool
        .request()
        .input("questionText", QuestionText)
        .execute("dbo.Trivias_Insert");

      let newlyCreatedID = record.recordset[0].questionID;

      // Insert answers into database
      for (let i = 0; i < Answers.length; i++) {
        await pool
          .request()
          .input("questionID", newlyCreatedID)
          .input("answerID", Answers[i].AnswerID)
          .input("answerText", Answers[i].AnswerText)
          .input("correctAnswerID", Answers[i].isCorrect ? 1 : 0)
          .execute("dbo.TriviaAnswers_Insert");
      }
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

/**
 * @openapi
 * /api/trivias:
 *   get:
 *     summary: Get all trivia questions
 *     description: Retrieves all trivia questions from the portal.
 *     tags:
 *      - Trivia
 *     responses:
 *       '200':
 *         description: Successfully retrieved the trivia questions.
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
 *                       QuestionID:
 *                         type: integer
 *                       QuestionText:
 *                         type: string
 *                       Answers:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             AnswerID:
 *                               type: integer
 *                             AnswerText:
 *                               type: string
 *                             isCorrect:
 *                               type: boolean
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
exports.getTrivias = async (req, res) => {
  try {
    const pool = await poolPromise;
    let results;

    results = await pool.request().execute("dbo.Trivias_Load");

    if (results.recordset.length === 0) {
      return res.status(200).json({ success: true, data: [] });
    }

    let formatData = [];

    // Format json for robot
    let tempQues = {};
    const promises = results.recordset.map(async (trivia) => {
      try {
        // Check if the question already exists
        if (!tempQues[trivia.questionID]) {
          tempQues[trivia.questionID] = {
            QuestionID: trivia.questionID,
            QuestionText: trivia.questionText,
            Answers: [],
          };
        }
        let tempAns = {};
        tempAns.AnswerID = trivia.answerID;
        tempAns.AnswerText = trivia.answerText;
        tempAns.isCorrect = trivia.correctAnswerID;

        tempQues[trivia.questionID].Answers.push(tempAns);

        if (
          !formatData.some(
            (item) => item.QuestionID === tempQues[trivia.questionID].QuestionID
          )
        ) {
          formatData.push(tempQues[trivia.questionID]);
        }
      } catch (err) {
        console.log(err);
      }
    });

    // Wait for all promises to resolve
    await Promise.all(promises);

    res.status(200).json({
      success: true,
      data: formatData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

exports.updateTrivia = async (req, res) => {
  try {
    if (req.body) {
      console.log("request body", req.body);
      const { QuestionID, QuestionText, Answers } = req.body;
    // Update song on Database
    const pool = await poolPromise;

    // Update the question content
     await pool
        .request()
        .input("questionID", QuestionID)
        .input("questionText", QuestionText)
        .execute("dbo.Trivias_Update");

     // Insert answers into database
     for (let i = 0; i < Answers.length; i++) {
      await pool
        .request()
        .input("questionID", QuestionID)
        .input("answerID", Answers[i].AnswerID)
        .input("answerText", Answers[i].AnswerText)
        .input("correctAnswerID", Answers[i].isCorrect ? 1 : 0)
        .execute("dbo.TriviaAnswers_Update");
    }
  }
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

exports.deleteTrivia = async (req, res) => {
  try {
    const pool = await poolPromise;
    const results = await pool
      .request()
      .input("questionID", req.params.questionID)
      .execute("dbo.Trivias_Delete");

    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};
