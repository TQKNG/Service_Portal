// @route   POST /api/trivia
// @desc    Add Trivia

const { sendWebSocketMessage } = require("../utils/webSocketUtils");

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
    console.log("test my request body", req.body);
    sendWebSocketMessage({ type: 'dataReceived', data: req.body});
    
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
    let data = [
      {
        QuestionID: 1,
        QuestionText: "What is the capital of France?",
        Answers: [
          { AnswerID: 1, AnswerText: "Paris", isCorrect: true},
          { AnswerID: 2, AnswerText: "London", isCorrect: false},
          { AnswerID: 3, AnswerText: "Berlin", isCorrect: false},
        ],
      },
      {
        QuestionID: 2,
        QuestionText: "Who wrote 'To Kill a Mockingbird'?",
        Answers: [
          { AnswerID: 1, AnswerText: "Harper Lee", isCorrect: false},
          { AnswerID: 2, AnswerText: "George Orwell", isCorrect: false},
          { AnswerID: 3, AnswerText: "Ernest Hemingway", isCorrect: true}
        ],
      },
      {
        QuestionID: 3,
        QuestionText: "What is the square root of 81?",
        Answers: [
          { AnswerID: 1, AnswerText: "7", isCorrect: false},
          { AnswerID: 2, AnswerText: "8", isCorrect: false},
          { AnswerID: 3, AnswerText: "9", isCorrect: true},
        ],
      },
      {
        QuestionID: 4,
        QuestionText: "Which planet is known as the Red Planet?",
        Answers: [
          { AnswerID: 1, AnswerText: "Mars", isCorrect: true},
          { AnswerID: 2, AnswerText: "Venus", isCorrect: false},
          { AnswerID: 3, AnswerText: "Jupiter", isCorrect: false },
        ],
      }
    ];
    res.status(200).json({
      success: true,
      data
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};