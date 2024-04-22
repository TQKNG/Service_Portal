const express = require("express");
const {
  addAssessment,
  getAllAssessments,
  getAssessmentByID,
  updateAssessmentByID,
  removeAssessmentByID,
  addMulipleAssessment,
  removeSchoolAssessment,
  addSchoolAssessment,
  getAssessmentByCategoryID,
} = require("../controllers/Assessment");

const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

router.post("/", protect, authorize(5), addAssessment);
router.post("/import", protect, authorize(5), addMulipleAssessment);
router.get("/:schoolIds", protect, authorize(1,3, 4, 5, 6), getAllAssessments);
router.get(
  "/getinstruction/:CategoryID",
  protect,
  authorize(1, 3, 4, 5, 6),
  getAssessmentByCategoryID
);
router.post("/get/:id", protect, authorize(1, 3, 4, 5, 6), getAssessmentByID);
router.put("/:id", protect, authorize(5), updateAssessmentByID);
router.delete("/all/:id", protect, authorize(5), removeAssessmentByID);
router.delete(
  "/school/:SchoolID/:AssessmentID",
  protect,
  authorize(5),
  removeSchoolAssessment
);
router.post("/school", protect, authorize(5), addSchoolAssessment);

module.exports = router;
