const express = require("express");
const {
  getAssessmentResultByCode,
  getAssessmentResultById,
  addAssessmentResult,
  updateAssessmentResult,
  getAssessmentResults,
  deleteAssessmentResult,
  generateReport,
  getChartOverallResults,
  finalizeResult,
  getChartOverallResultsByAssessment,
  getChartOverallResultsProgression,
  getChartAverageScorePerBenchmarkCategory,
} = require("../controllers/AssessmentResult");

const { protect, authorize } = require("../middleware/auth");
const { getClassrooms } = require("../controllers/Classroom");

const router = express.Router();

router.get("/:id", protect, authorize(1, 3, 4, 5,6), getAssessmentResultById);
router.get("/code/:code", getAssessmentResultByCode);
router.get(
  "/all/:schoolID",
  protect,
  authorize(1, 3, 4, 5,6),
  getAssessmentResults
);
router.post("/", protect, authorize(1, 3, 4, 5,6), addAssessmentResult);

router.put("/:id", protect, authorize(1, 3, 4, 5,6), updateAssessmentResult);
router.delete("/:id", protect, authorize(1, 3, 4, 5,6), deleteAssessmentResult);

// router.get(
//   '/reports/:school/:year/:student/:teacher/',
//   protect,
//   authorize(1, 3, 4, 5,6),
//   generateReport,
// );
router.get(
  "/reports/:year/:benchmark/:school/:grade/:section/:student/:teacher/:schoolIds",
  protect,
  authorize(1, 3, 4, 5, 6),
  generateReport
);

router.get(
  "/chart1/:year/:benchmark/:school/:grade/:section/:student/:teacher/:schoolIds",
  protect,
  authorize(1, 3, 4, 5, 6),
  getChartOverallResults
);
router.get(
  "/chart2/:year/:benchmark/:school/:grade/:section/:student/:teacher/:schoolIds",
  protect,
  authorize(1, 3, 4, 5, 6),
  getChartOverallResultsByAssessment
);
router.get(
  "/chart3/:year/:benchmark/:school/:grade/:section/:student/:teacher/:schoolIds",
  protect,
  authorize(1, 3, 4, 5, 6),
  getChartOverallResultsProgression
);
router.get(
  "/chart4/:year/:benchmark/:school/:grade/:section/:student/:teacher/",
  protect,
  authorize(1, 3, 4, 5, 6),
  getChartAverageScorePerBenchmarkCategory
);

router.post("/finalize", protect, authorize(1, 3, 4, 5,6), finalizeResult);

module.exports = router;
