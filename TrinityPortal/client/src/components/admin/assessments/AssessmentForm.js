import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useHistory, Redirect } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import AssessmentFormTypes from "./AssessmentFormTypes";
import AssessmentFormBody from "./AssessmentFormBody";
import {
  addAssessment,
  updateAssessment,
  clearAssessment,
  deleteAssessment,
  getAssessmentInstructionByCategoryID,
} from "../../../actions/admin";
import AssessmentFormSchools from "./AssessmentFormSchools";
import { useDropzone } from "react-dropzone";

const AssessmentForm = ({
  assessment,
  addAssessment,
  updateAssessment,
  clearAssessment,
  user,
  schoolsList,
  deleteAssessment,
}) => {
  const hist = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const instructionImg = useSelector(
    (state) => state.admin.assessmentInstruction
  );
  const LoadBodyItems = (data) => {
    let arr = [];
    let TotalWord = 0;

    if (data === null) return "";
    else if (data.Body === undefined) {
      return "";
    } else if (data.Solution === undefined) {
      return data.Body;
    }

    if (data.SolutionDetails !== null) {
      const Body = data.Body.split(",");
      const Solution = data.Solution.split(",");
      const SolutionDetails = data.SolutionDetails.split(",");
      const Scores = data.Scores.split(",");

      TotalWord = Body.length;

      for (let i = 0; i < Body.length; i++) {
        arr.push({
          Word: Body[i],
          Solution: Solution[i],
          SolutionDetails: SolutionDetails[i],
          Scores: Scores[i],
        });
      }
    } else {
      const Body = data.Body.split(",");
      const Solution = data.Solution.split(",");
      const Scores = data.Scores.split(",");

      TotalWord = Body.length;

      for (let i = 0; i < Body.length; i++) {
        arr.push({
          Word: Body[i],
          Solution: Solution[i],
          SolutionDetails: "",
          Scores: Scores[i],
        });
      }
    }

    return arr;
  };

  const countWords = (text) => {
    const words = text.trim().split(/\s+/);
    return words.filter((word) => word !== "").length;
  };

  const [formData, setFormData] = useState({
    AssessmentID:
      assessment === null
        ? ""
        : assessment.AssessmentID !== undefined
        ? assessment.AssessmentID
        : "",
    CategoryID:
      assessment === null
        ? 1
        : assessment.CategoryID !== undefined
        ? assessment.CategoryID
        : 1,
    GradeID:
      assessment === null
        ? 1
        : assessment.GradeID !== undefined
        ? assessment.GradeID
        : 1,
    Title:
      assessment === null
        ? ""
        : assessment.Title !== undefined
        ? assessment.Title
        : "",
    Groups:
      assessment === null
        ? 1
        : assessment.Groups !== undefined
        ? assessment.Groups
        : 1,
    Timer:
      assessment === null
        ? 1
        : assessment.Timer !== undefined
        ? assessment.Timer
        : 1,
    aboveBenchmarkMin:
      assessment === null
        ? 68
        : assessment.aboveBenchmarkMin !== undefined
        ? assessment.aboveBenchmarkMin
        : 68,
    aboveBenchmarkMax: 100,
    atBenchmarkMin:
      assessment === null
        ? 52
        : assessment.atBenchmarkMin !== undefined
        ? assessment.atBenchmarkMin
        : 52,
    atBenchmarkMax:
      assessment === null
        ? 67
        : assessment.atBenchmarkMax !== undefined
        ? assessment.atBenchmarkMax
        : 67,
    belowBenchmarkMin:
      assessment === null
        ? 37
        : assessment.belowBenchmarkMin !== undefined
        ? assessment.belowBenchmarkMin
        : 37,
    belowBenchmarkMax:
      assessment === null
        ? 51
        : assessment.belowBenchmarkMax !== undefined
        ? assessment.belowBenchmarkMax
        : 51,
    wellBelowBenchmarkMin: 0,
    wellBelowBenchmarkMax:
      assessment === null
        ? 36
        : assessment.wellBelowBenchmarkMax !== undefined
        ? assessment.wellBelowBenchmarkMax
        : 36,
    // Second cutpoints setting for CategoryID 4
    aboveBenchmarkMin1:
      assessment === null
        ? 68
        : assessment.aboveBenchmarkMin !== undefined
        ? assessment.aboveBenchmarkMin
        : 68,
    aboveBenchmarkMax1: 100,
    atBenchmarkMin1:
      assessment === null
        ? 52
        : assessment.atBenchmarkMin1 !== undefined
        ? assessment.atBenchmarkMin1
        : 52,
    atBenchmarkMax1:
      assessment === null
        ? 67
        : assessment.atBenchmarkMax1 !== undefined
        ? assessment.atBenchmarkMax1
        : 67,
    belowBenchmarkMin1:
      assessment === null
        ? 37
        : assessment.belowBenchmarkMin1 !== undefined
        ? assessment.belowBenchmarkMin1
        : 37,
    belowBenchmarkMax1:
      assessment === null
        ? 51
        : assessment.belowBenchmarkMax1 !== undefined
        ? assessment.belowBenchmarkMax1
        : 51,
    wellBelowBenchmarkMin1: 0,
    wellBelowBenchmarkMax1:
      assessment === null
        ? 36
        : assessment.wellBelowBenchmarkMax1 !== undefined
        ? assessment.wellBelowBenchmarkMax1
        : 36,
    instructionImg: null,
    imgFileName: null,
    Body: LoadBodyItems(assessment),
    SchoolsID: !location.pathname.includes("edit")
      ? user.SchoolID === null
        ? [1]
        : [user.SchoolID]
      : assessment === null
      ? []
      : assessment.SchoolIDs,
    bodyCount:
      assessment === null
        ? 0
        : assessment.bodyCount !== undefined
        ? assessment.bodyCount
        : 0,
  });
  const [fileName, setFileName] = useState();

  useEffect(() => {
    if (formData.CategoryID) {
      dispatch(getAssessmentInstructionByCategoryID(formData.CategoryID));
    }
  }, [formData.CategoryID]);

  const onDrop = useCallback((acceptedFiles, event) => {
    if (acceptedFiles.length > 0) {
      setFileName(acceptedFiles[0].name);

      // Read file data
      const reader = new FileReader();
      reader.onload = () => {
        // Update image file in state
        setFormData((prevFormData) => ({
          ...prevFormData,
          instructionImg: reader.result,
          imgFileName: acceptedFiles[0].name,
        }));
      };
      reader.readAsDataURL(acceptedFiles[0]);
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const onChange = (e) => {
    const newFormData = { ...formData, [e.target.id]: e.target.value };

    // If the max value of a benchmark changes, update the min value of the next benchmark
    switch (e.target.id) {
      case "wellBelowBenchmarkMax":
        newFormData.belowBenchmarkMin = parseInt(e.target.value) + 1;
        break;
      case "wellBelowBenchmarkMax1":
        newFormData.belowBenchmarkMin1 = parseInt(e.target.value) + 1;
        break;
      case "belowBenchmarkMax":
        newFormData.atBenchmarkMin = parseInt(e.target.value) + 1;
        break;
      case "belowBenchmarkMax1":
        newFormData.atBenchmarkMin1 = parseInt(e.target.value) + 1;
        break;
      case "atBenchmarkMax":
        newFormData.aboveBenchmarkMin = parseInt(e.target.value) + 1;
        break;
      case "atBenchmarkMax1":
        newFormData.aboveBenchmarkMin1 = parseInt(e.target.value) + 1;
        break;
      case "Body":
        newFormData.bodyCount = countWords(e.target.value);
      default:
        break;
    }

    setFormData(newFormData);
  };

  // Handle wrong input when completing a field input
  const onBlur = (e) => {
    switch (e.target.id) {
      case "wellBelowBenchmarkMax":
        if (
          parseInt(e.target.value) <= parseInt(formData.wellBelowBenchmarkMin)
        ) {
          alert("Max value cannot be less than or equal to Min value");
          e.target.value = "";
        }
        break;
      case "belowBenchmarkMax":
        if (parseInt(e.target.value) <= parseInt(formData.belowBenchmarkMin)) {
          alert("Max value cannot be less than or equal to Min value");
          e.target.value = "";
        }
        break;
      case "atBenchmarkMax":
        if (parseInt(e.target.value) <= parseInt(formData.atBenchmarkMin)) {
          alert("Max value cannot be less than or equal to Min value");
          e.target.value = "";
        }
        break;
      case "wellBelowBenchmarkMax1":
        if (
          parseInt(e.target.value) <= parseInt(formData.wellBelowBenchmarkMin1)
        ) {
          alert("Max value cannot be less than or equal to Min value");
          e.target.value = "";
        }
        break;
      case "belowBenchmarkMax1":
        if (parseInt(e.target.value) <= parseInt(formData.belowBenchmarkMin1)) {
          alert("Max value cannot be less than or equal to Min value");
          e.target.value = "";
        }
        break;
      case "atBenchmarkMax1":
        if (parseInt(e.target.value) <= parseInt(formData.atBenchmarkMin1)) {
          alert("Max value cannot be less than or equal to Min value");
          e.target.value = "";
        }
        break;
      default:
        break;
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);
    // If the assessment is not Silly word - Category 4 and Story Reading, no need the 2nd set of cutpoints
    if (CategoryID !== 3 && CategoryID !== 4) {
      delete formData.aboveBenchmarkMin1;
      delete formData.aboveBenchmarkMax1;
      delete formData.atBenchmarkMin1;
      delete formData.atBenchmarkMax1;
      delete formData.belowBenchmarkMin1;
      delete formData.belowBenchmarkMax1;
      delete formData.wellBelowBenchmarkMin1;
      delete formData.wellBelowBenchmarkMax1;
    }

    console.log("Test my form Data", formData);
    if (CategoryID === 3) {
      let HTMLText = Body.split(" ").join("&nbsp;");
      if (location.pathname.includes("edit")) {
        if (user.UserTypeID === 5) {
          updateAssessment(formData.AssessmentID, {
            ...formData,
            Body: HTMLText,
          });
        } else {
          deleteAssessment(formData.AssessmentID, assessment.CategoryID).then(
            () => {
              addAssessment({
                ...formData,
                Body: HTMLText,
                SchoolsID: [user.SchoolID],
              });
            }
          );
        }
      } else if (location.pathname.includes("add")) {
        addAssessment({ ...formData, Body: HTMLText });
      }
    } else if (CategoryID === 5) {
      let data = { ...formData };
      delete data.Groups;
      data.Solution = "";
      data.Scores = "";
      data.Body = "";
      for (let i = 0; i < formData.Body.length; i++) {
        if (i !== formData.Body.length - 1) {
          data.Body += formData.Body[i].Word + ",";
          data.Solution += formData.Body[i].Solution + ",";
          data.Scores += formData.Body[i].Scores + ",";
        } else {
          data.Body += formData.Body[i].Word;
          data.Solution += formData.Body[i].Solution;
          data.Scores += formData.Body[i].Scores;
        }
      }
      console.log(data);
      if (location.pathname.includes("edit")) {
        if (user.UserTypeID === 5)
          updateAssessment(formData.AssessmentID, data);
        else {
          deleteAssessment(formData.AssessmentID, assessment.CategoryID).then(
            () => {
              addAssessment({ ...data, SchoolsID: [user.SchoolID] });
            }
          );
        }
      } else if (location.pathname.includes("add")) {
        addAssessment(data);
      }
    } else if (CategoryID === 6) {
      let data = { ...formData };
      delete data.Groups;

      data.Solution = "";
      data.Scores = "";
      data.SolutionDetails = "";
      data.Body = "";
      for (let i = 0; i < formData.Body.length; i++) {
        if (i !== formData.Body.length - 1) {
          data.Body += formData.Body[i].Word + ",";
          data.Solution += formData.Body[i].Solution + ",";
          data.Scores += formData.Body[i].Scores + ",";
          data.SolutionDetails += formData.Body[i].SolutionDetails + ",";
        } else {
          data.Body += formData.Body[i].Word;
          data.Solution += formData.Body[i].Solution;
          data.Scores += formData.Body[i].Scores;
          data.SolutionDetails += formData.Body[i].SolutionDetails;
        }
      }
      if (location.pathname.includes("edit")) {
        if (user.UserTypeID === 5)
          updateAssessment(formData.AssessmentID, data);
        else {
          deleteAssessment(formData.AssessmentID, assessment.CategoryID).then(
            () => {
              addAssessment({ ...data, SchoolsID: [user.SchoolID] });
            }
          );
        }
      } else if (location.pathname.includes("add")) {
        addAssessment(data);
      }
    } else {
      if (location.pathname.includes("edit")) {
        if (user.UserTypeID === 5)
          updateAssessment(formData.AssessmentID, formData);
        else {
          deleteAssessment(formData.AssessmentID, assessment.CategoryID).then(
            () => {
              addAssessment({ ...formData, SchoolsID: [user.SchoolID] });
            }
          );
        }
      } else if (location.pathname.includes("add")) {
        addAssessment(formData);
      }
    }
    console.log(formData);

    hist.push("/admin/assessments");
    clearAssessment();
  };

  const {
    GradeID,
    CategoryID,
    Title,
    Timer,
    aboveBenchmarkMin,
    aboveBenchmarkMax,
    atBenchmarkMin,
    atBenchmarkMax,
    belowBenchmarkMin,
    belowBenchmarkMax,
    wellBelowBenchmarkMin,
    wellBelowBenchmarkMax,
    aboveBenchmarkMin1,
    aboveBenchmarkMax1,
    atBenchmarkMin1,
    atBenchmarkMax1,
    belowBenchmarkMin1,
    belowBenchmarkMax1,
    wellBelowBenchmarkMin1,
    wellBelowBenchmarkMax1,
    Body,
    Groups,
  } = formData;

  if (schoolsList.length === 0 && !location.pathname.includes("edit"))
    return <Redirect to="/admin/assessments" />;

  if (assessment === null && location.pathname.includes("edit"))
    return <Redirect to="/admin/assessments" />;
  return (
    <div className="p-sm-5 p-2 w-100  dashboard-margin mx-lg-auto container">
      <div className="mb-3 ">
        <h6 className="txt-primary-light">
          {user.UserType} / Assessments / Assessment
        </h6>

        <div className="d-sm-flex  w-100 align-items-center justify-content-between">
          <div className="d-flex mb-2 mb-sm-0">
            <div
              className="admin-back mx-2 rounded-circle d-flex align-items-center justify-content-center txt-primary"
              onClick={() => {
                hist.goBack();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                className="bi bi-arrow-left-short"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
                />
              </svg>
            </div>
            <h4 className="m-0">
              {location.pathname.includes("add") ? "Create Assessment" : "Edit"}
            </h4>
          </div>
        </div>
      </div>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="card w-100 p-2 p-sm-3 p-lg-4 shadow-lg border-0 mb-2">
          <h6 className="m-0">Class Information</h6>
          <div className="w-100 g-3 overflow-hidden">
            <div className="w-100 row g-2 my-2">
              <div className="col-auto">
                <label for="inputGrade">
                  <b>Grade</b>
                </label>
                <select
                  className="form-select form-control border-primary"
                  aria-label="Default select example"
                  value={GradeID}
                  id="GradeID"
                  onChange={(e) => onChange(e)}
                >
                  <option value={1}>Grade 1</option>
                  <option value={2}>Grade 2</option>
                  <option value={3}>Grade 3</option>
                  <option value={4}>Grade 4</option>
                  <option value={5}>Grade 5</option>
                  <option value={6}>Grade 6</option>
                  <option value={7}>Other</option>
                </select>
              </div>
              <div className="col-auto">
                <label for="Title">
                  <b>Title</b>
                </label>
                <input
                  type="Text"
                  class="form-control border-primary"
                  placeholder="Please enter a title"
                  id="Title"
                  required
                  value={Title}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className="col-auto">
                <label for="Timer">
                  <b>Timer (Mins)</b>
                </label>
                <input
                  type="number"
                  class="form-control border-primary "
                  id="Timer"
                  step="1"
                  min="1"
                  value={Timer}
                  required
                  onChange={(e) => onChange(e)}
                />
              </div>
              {CategoryID < 5 && (
                <div className="col-auto">
                  <label for="Groups">
                    <b>Groups</b>
                  </label>
                  <input
                    type="number"
                    class="form-control border-primary"
                    id="Groups"
                    step="1"
                    min="1"
                    required
                    value={CategoryID === 3 ? 1 : Groups}
                    readOnly={CategoryID === 3}
                    onChange={(e) => onChange(e)}
                  />
                </div>
              )}
            </div>
            <div className="w-100 row g-2 my-2">
              {user.UserTypeID === 5 &&
                schoolsList.length !== 0 &&
                !location.pathname.includes("edit") && (
                  <AssessmentFormSchools
                    schoolsList={schoolsList.sort((a, b) => {
                      const nameA = a.Name;
                      const nameB = b.Name;

                      if (nameA < nameB) {
                        return -1;
                      }
                      if (nameA > nameB) {
                        return 1;
                      }
                      return 0;
                    })}
                    setFormData={setFormData}
                    formData={formData}
                  />
                )}
            </div>
          </div>
        </div>
        <div className="card w-100 p-2 p-sm-3 p-lg-4 shadow-lg border-0 mb-2">
          <h6 className="m-0">Benchmark Status Setting</h6>
          <div className="w-100 g-3 overflow-hidden">
            {/* Cut-point Original */}
            <div className="w-100 row g-4 my-2">
              <div className="col-3 m-0">
                <label for="wellBelow">
                  <b>Well Below Benchmark</b>
                </label>
                <div className="d-flex gap-2">
                  <div className="d-flex flex-column w-50">
                    {/* <div>Min</div> */}
                    {CategoryID === 4 ? (
                      <div className="border-bottom">CLS</div>
                    ) : CategoryID === 3 ? (
                      <div className="border-bottom">Total Word Correct</div>
                    ) : (
                      <div className="border-bottom">Cutpoint</div>
                    )}
                    <input
                      hidden
                      type="number"
                      class="form-control border-primary "
                      id="wellBelowBenchmarkMin"
                      step="1"
                      min="1"
                      onKeyDown={(e) =>
                        ["e", "E", "+", "-"].includes(e.key) &&
                        e.preventDefault()
                      }
                      value={wellBelowBenchmarkMin}
                      readOnly={true}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                  <div className="d-flex flex-column w-50">
                    <div>Max</div>
                    <input
                      type="number"
                      class="form-control border-primary "
                      id="wellBelowBenchmarkMax"
                      step="1"
                      min="1"
                      onKeyDown={(e) =>
                        ["e", "E", "+", "-"].includes(e.key) &&
                        e.preventDefault()
                      }
                      value={wellBelowBenchmarkMax}
                      required
                      onChange={(e) => onChange(e)}
                      onBlur={(e) => onBlur(e)}
                    />
                  </div>
                </div>
              </div>
              <div className="col-3 m-0">
                <label for="belowBenchmark">
                  <b>Below Benchmark</b>
                </label>
                <div className="d-flex gap-2">
                  <div className="d-flex flex-column">
                    <div>Min</div>
                    <input
                      width="10px"
                      type="number"
                      class="form-control border-primary "
                      id="belowBenchmarkMin"
                      step="1"
                      min="1"
                      onKeyDown={(e) =>
                        ["e", "E", "+", "-"].includes(e.key) &&
                        e.preventDefault()
                      }
                      value={belowBenchmarkMin}
                      required
                      readOnly={true}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                  <div className="d-flex flex-column">
                    <div>Max</div>
                    <input
                      type="number"
                      class="form-control border-primary "
                      id="belowBenchmarkMax"
                      step="1"
                      min="1"
                      onKeyDown={(e) =>
                        ["e", "E", "+", "-"].includes(e.key) &&
                        e.preventDefault()
                      }
                      value={belowBenchmarkMax}
                      required
                      onChange={(e) => onChange(e)}
                      onBlur={(e) => onBlur(e)}
                    />
                  </div>
                </div>
              </div>
              <div className="col-3 m-0">
                <label for="atBenchmark">
                  <b>At Benckmark</b>
                </label>
                <div className="d-flex gap-2">
                  <div className="d-flex flex-column">
                    <div>Min</div>
                    <input
                      type="number"
                      class="form-control border-primary "
                      id="atBenchmarkMin"
                      step="1"
                      min="1"
                      onKeyDown={(e) =>
                        ["e", "E", "+", "-"].includes(e.key) &&
                        e.preventDefault()
                      }
                      value={atBenchmarkMin}
                      required
                      readOnly={true}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                  <div className="d-flex flex-column">
                    <div>Max</div>
                    <input
                      type="number"
                      class="form-control border-primary "
                      id="atBenchmarkMax"
                      step="1"
                      min="1"
                      onKeyDown={(e) =>
                        ["e", "E", "+", "-"].includes(e.key) &&
                        e.preventDefault()
                      }
                      value={atBenchmarkMax}
                      required
                      onChange={(e) => onChange(e)}
                      onBlur={(e) => onBlur(e)}
                    />
                  </div>
                </div>
              </div>
              <div className="col-3 m-0">
                <label for="AboveBenchmark">
                  <b>Above Benchmark</b>
                </label>
                <div className="d-flex gap-2">
                  <div className="d-flex flex-column w-50">
                    <div>Min</div>
                    <input
                      width="10px"
                      type="number"
                      className="form-control border-primary "
                      id="aboveBenchmarkMin"
                      step="1"
                      min="1"
                      onKeyDown={(e) =>
                        ["e", "E", "+", "-"].includes(e.key) &&
                        e.preventDefault()
                      }
                      value={aboveBenchmarkMin}
                      required
                      readOnly={true}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                  <div className="d-flex flex-column w-50">
                    {/* <div>Max</div> */}
                    <input
                      hidden
                      type="number"
                      class="form-control border-primary "
                      id="aboveBenchmarkMax"
                      step="1"
                      min="1"
                      onKeyDown={(e) =>
                        ["e", "E", "+", "-"].includes(e.key) &&
                        e.preventDefault()
                      }
                      value={aboveBenchmarkMax}
                      onChange={(e) => onChange(e)}
                      onBlur={(e) => onBlur(e)}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Cut-point Silly Words */}
            {CategoryID === 4 && (
              <div className="w-100 row g-4 my-2">
                <div className="col-3 m-0">
                  <label for="wellBelow">
                    <b>Well Below Benchmark</b>
                  </label>
                  <div className="d-flex gap-2">
                    <div className="d-flex flex-column w-50">
                      {/* <div>Min</div> */}
                      {CategoryID === 4 ? (
                        <div className="border-bottom">CWR</div>
                      ) : (
                        <div className="border-bottom">Cutpoint</div>
                      )}
                      <input
                        hidden
                        width="10px"
                        type="number"
                        class="form-control border-primary "
                        id="wellBelowBenchmarkMin1"
                        step="1"
                        min="1"
                        onKeyDown={(e) =>
                          ["e", "E", "+", "-"].includes(e.key) &&
                          e.preventDefault()
                        }
                        value={wellBelowBenchmarkMin1}
                        readOnly={true}
                        onChange={(e) => onChange(e)}
                      />
                    </div>
                    <div className="d-flex flex-column w-50">
                      <div>Max</div>
                      <input
                        type="number"
                        class="form-control border-primary "
                        id="wellBelowBenchmarkMax1"
                        step="1"
                        min="1"
                        onKeyDown={(e) =>
                          ["e", "E", "+", "-"].includes(e.key) &&
                          e.preventDefault()
                        }
                        value={wellBelowBenchmarkMax1}
                        required
                        onChange={(e) => onChange(e)}
                        onBlur={(e) => onBlur(e)}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-3 m-0">
                  <label for="belowBenchmark1">
                    <b>Below Benchmark</b>
                  </label>
                  <div className="d-flex gap-2">
                    <div className="d-flex flex-column">
                      <div>Min</div>
                      <input
                        width="10px"
                        type="number"
                        class="form-control border-primary "
                        id="belowBenchmarkMin1"
                        step="1"
                        min="1"
                        onKeyDown={(e) =>
                          ["e", "E", "+", "-"].includes(e.key) &&
                          e.preventDefault()
                        }
                        value={belowBenchmarkMin1}
                        required
                        readOnly={true}
                        onChange={(e) => onChange(e)}
                      />
                    </div>
                    <div className="d-flex flex-column">
                      <div>Max</div>
                      <input
                        type="number"
                        class="form-control border-primary "
                        id="belowBenchmarkMax1"
                        step="1"
                        min="1"
                        onKeyDown={(e) =>
                          ["e", "E", "+", "-"].includes(e.key) &&
                          e.preventDefault()
                        }
                        value={belowBenchmarkMax1}
                        required
                        onChange={(e) => onChange(e)}
                        onBlur={(e) => onBlur(e)}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-3 m-0">
                  <label for="atBenchmark1">
                    <b>At Benckmark</b>
                  </label>
                  <div className="d-flex gap-2">
                    <div className="d-flex flex-column">
                      <div>Min</div>
                      <input
                        type="number"
                        class="form-control border-primary "
                        id="atBenchmarkMin1"
                        step="1"
                        min="1"
                        onKeyDown={(e) =>
                          ["e", "E", "+", "-"].includes(e.key) &&
                          e.preventDefault()
                        }
                        value={atBenchmarkMin1}
                        required
                        readOnly={true}
                        onChange={(e) => onChange(e)}
                      />
                    </div>
                    <div className="d-flex flex-column">
                      <div>Max</div>
                      <input
                        type="number"
                        class="form-control border-primary "
                        id="atBenchmarkMax1"
                        step="1"
                        min="1"
                        onKeyDown={(e) =>
                          ["e", "E", "+", "-"].includes(e.key) &&
                          e.preventDefault()
                        }
                        value={atBenchmarkMax1}
                        required
                        onChange={(e) => onChange(e)}
                        onBlur={(e) => onBlur(e)}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-3 m-0">
                  <label for="AboveBenchmark1">
                    <b>Above Benchmark</b>
                  </label>
                  <div className="d-flex gap-2">
                    <div className="d-flex flex-column w-50">
                      <div>Min</div>
                      <input
                        width="10px"
                        type="number"
                        className="form-control border-primary "
                        id="aboveBenchmarkMin"
                        step="1"
                        min="1"
                        onKeyDown={(e) =>
                          ["e", "E", "+", "-"].includes(e.key) &&
                          e.preventDefault()
                        }
                        value={aboveBenchmarkMin1}
                        required
                        readOnly={true}
                        onChange={(e) => onChange(e)}
                      />
                    </div>
                    <div className="d-flex flex-column">
                      {/* <div>Max</div> */}
                      <input
                        hidden
                        type="number"
                        class="form-control border-primary w-50"
                        id="aboveBenchmarkMax1"
                        step="1"
                        min="1"
                        onKeyDown={(e) =>
                          ["e", "E", "+", "-"].includes(e.key) &&
                          e.preventDefault()
                        }
                        value={aboveBenchmarkMax1}
                        onChange={(e) => onChange(e)}
                        onBlur={(e) => onBlur(e)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Cut-point Story Reading */}
            {CategoryID === 3 && (
              <div className="w-100 row g-4 my-2">
                <div className="col-3 m-0">
                  <label for="wellBelow">
                    <b>Well Below Benchmark</b>
                  </label>
                  <div className="d-flex gap-2">
                    <div className="d-flex flex-column w-50">
                      {/* <div>Min</div> */}
                      {CategoryID === 3 ? (
                        <div className="border-bottom">Accuracy %</div>
                      ) : (
                        <div className="border-bottom">Cutpoint</div>
                      )}
                      <input
                        hidden
                        width="10px"
                        type="number"
                        class="form-control border-primary "
                        id="wellBelowBenchmarkMin1"
                        step="1"
                        min="1"
                        onKeyDown={(e) =>
                          ["e", "E", "+", "-"].includes(e.key) &&
                          e.preventDefault()
                        }
                        value={wellBelowBenchmarkMin1}
                        readOnly={true}
                        onChange={(e) => onChange(e)}
                      />
                    </div>
                    <div className="d-flex flex-column w-50">
                      <div>Max</div>
                      <input
                        type="number"
                        class="form-control border-primary "
                        id="wellBelowBenchmarkMax1"
                        step="1"
                        min="1"
                        onKeyDown={(e) =>
                          ["e", "E", "+", "-"].includes(e.key) &&
                          e.preventDefault()
                        }
                        value={wellBelowBenchmarkMax1}
                        required
                        onChange={(e) => onChange(e)}
                        onBlur={(e) => onBlur(e)}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-3 m-0">
                  <label for="belowBenchmark1">
                    <b>Below Benchmark</b>
                  </label>
                  <div className="d-flex gap-2">
                    <div className="d-flex flex-column">
                      <div>Min</div>
                      <input
                        width="10px"
                        type="number"
                        class="form-control border-primary "
                        id="belowBenchmarkMin1"
                        step="1"
                        min="1"
                        onKeyDown={(e) =>
                          ["e", "E", "+", "-"].includes(e.key) &&
                          e.preventDefault()
                        }
                        value={belowBenchmarkMin1}
                        required
                        readOnly={true}
                        onChange={(e) => onChange(e)}
                      />
                    </div>
                    <div className="d-flex flex-column">
                      <div>Max</div>
                      <input
                        type="number"
                        class="form-control border-primary "
                        id="belowBenchmarkMax1"
                        step="1"
                        min="1"
                        onKeyDown={(e) =>
                          ["e", "E", "+", "-"].includes(e.key) &&
                          e.preventDefault()
                        }
                        value={belowBenchmarkMax1}
                        required
                        onChange={(e) => onChange(e)}
                        onBlur={(e) => onBlur(e)}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-3 m-0">
                  <label for="atBenchmark1">
                    <b>At Benckmark</b>
                  </label>
                  <div className="d-flex gap-2">
                    <div className="d-flex flex-column">
                      <div>Min</div>
                      <input
                        type="number"
                        class="form-control border-primary "
                        id="atBenchmarkMin1"
                        step="1"
                        min="1"
                        onKeyDown={(e) =>
                          ["e", "E", "+", "-"].includes(e.key) &&
                          e.preventDefault()
                        }
                        value={atBenchmarkMin1}
                        required
                        readOnly={true}
                        onChange={(e) => onChange(e)}
                      />
                    </div>
                    <div className="d-flex flex-column">
                      <div>Max</div>
                      <input
                        type="number"
                        class="form-control border-primary "
                        id="atBenchmarkMax1"
                        step="1"
                        min="1"
                        onKeyDown={(e) =>
                          ["e", "E", "+", "-"].includes(e.key) &&
                          e.preventDefault()
                        }
                        value={atBenchmarkMax1}
                        required
                        onChange={(e) => onChange(e)}
                        onBlur={(e) => onBlur(e)}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-3 m-0">
                  <label for="AboveBenchmark1">
                    <b>Above Benchmark</b>
                  </label>
                  <div className="d-flex gap-2">
                    <div className="d-flex flex-column w-50">
                      <div>Min</div>
                      <input
                        width="10px"
                        type="number"
                        className="form-control border-primary "
                        id="aboveBenchmarkMin"
                        step="1"
                        min="1"
                        onKeyDown={(e) =>
                          ["e", "E", "+", "-"].includes(e.key) &&
                          e.preventDefault()
                        }
                        value={aboveBenchmarkMin1}
                        required
                        readOnly={true}
                        onChange={(e) => onChange(e)}
                      />
                    </div>
                    <div className="d-flex flex-column">
                      {/* <div>Max</div> */}
                      <input
                        hidden
                        type="number"
                        class="form-control border-primary w-50"
                        id="aboveBenchmarkMax1"
                        step="1"
                        min="1"
                        onKeyDown={(e) =>
                          ["e", "E", "+", "-"].includes(e.key) &&
                          e.preventDefault()
                        }
                        value={aboveBenchmarkMax1}
                        onChange={(e) => onChange(e)}
                        onBlur={(e) => onBlur(e)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <AssessmentFormTypes
          formData={formData}
          setFormData={setFormData}
          edit={location.pathname.includes("edit")}
        />
        <div className="card w-100 p-2 p-sm-3 p-lg-4 shadow-lg border-0  mb-2 ">
          {true && (
            <div class="accordion shadow border-0" id="directions">
              <div class="accordion-item border-0">
                <h2 class="accordion-header" id="headingOne">
                  <button
                    class="accordion-button focus-primary"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    Directions
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  class="accordion-collapse collapse "
                  aria-labelledby="headingOne"
                  data-bs-parent="#directions"
                >
                  <div class="accordion-body text-center">
                    {/* Upload Image Area */}
                    <div className="d-flex justify-content-end">
                      <div
                        className="w-100 p-3 border border-primary rounded "
                        {...getRootProps({
                          onClick: (event) => console.log(event),
                          role: "button",
                          "aria-label": "drag and drop area",
                        })}
                      >
                        <input {...getInputProps()} />
                        <div className="d-flex flex-column align-items-center gap-2">
                          <div className="bg-light-green rounded-circle flex-shrink-0 text-center d-flex align-items-center justify-content-center admin-assessments-type">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              width="60px"
                              fill="none"
                            >
                              <path
                                stroke="white"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M19 2v3m0 3V5m0 0h3m-3 0h-3"
                              />
                              <path
                                fill="white"
                                fill-rule="evenodd"
                                d="M13 2H5a3 3 0 0 0-3 3v10.5c0 .086.011.17.032.25A1 1 0 0 0 2 16v3a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3v-7a1 1 0 0 0-.032-.25A1 1 0 0 0 22 11.5V11h-2v.016c-4.297.139-7.4 1.174-9.58 2.623.826.293 1.75.71 2.656 1.256 1.399.84 2.821 2.02 3.778 3.583a1 1 0 1 1-1.706 1.044c-.736-1.203-1.878-2.178-3.102-2.913-1.222-.734-2.465-1.192-3.327-1.392a15.466 15.466 0 0 0-3.703-.386h-.022c-.348.005-.68.02-.994.045V5a1 1 0 0 1 1-1h8V2zM8.5 6a2.68 2.68 0 0 0-1.522.488C6.408 6.898 6 7.574 6 8.5c0 .926.408 1.601.978 2.011A2.674 2.674 0 0 0 8.5 11c.41 0 1.003-.115 1.522-.489.57-.41.978-1.085.978-2.011 0-.926-.408-1.601-.978-2.012A2.674 2.674 0 0 0 8.5 6z"
                                clip-rule="evenodd"
                              />
                            </svg>
                          </div>
                          {fileName ? (
                            <>
                              <div>{fileName}</div>
                            </>
                          ) : (
                            <>
                              {isDragActive ? (
                                <div>Drop the image here ...</div>
                              ) : (
                                <div>
                                  Drag and drop instruction here, or click to
                                  select image
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <img
                      //src={process.env.PUBLIC_URL + `/images/${CategoryID}.png`} // Old logic: Use static img from public folder cant dynamically change
                      src={`data:image/png;base64,${instructionImg}`}
                      alt=""
                      srcset=""
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          <AssessmentFormBody
            formData={formData}
            setFormData={setFormData}
            onChange={onChange}
          />
          <div className="d-flex align-items-center justify-content-end mb-2 gap-2 p-2">
            <button type="submit" className="button-primary btn-block btn px-5">
              Save
            </button>

            {/* Delete Button */}
            {/* Delete Modal */}
            {user.UserTypeID === 5 && assessment && (
              <>
                <div
                  className="modal fade"
                  id="deleteassessment"
                  aria-labelledby="deleteassessmentLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="deleteassessmentLabel">
                          Delete Assessment
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        Are you sure you want to delete this assessment?
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          className="btn button-primary"
                          onClick={() => {
                            deleteAssessment(
                              formData.AssessmentID,
                              assessment.CategoryID
                            );
                            hist.push("/admin/assessments");
                            clearAssessment();
                          }}
                          data-bs-dismiss="modal"
                        >
                          Confirm
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="btn btn-danger d-flex align-items-center px-4 mx-3"
                  data-bs-toggle="modal"
                  data-bs-target="#deleteassessment"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-trash-fill button-child"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                  </svg>
                  Delete
                </div>
              </>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

AssessmentForm.propTypes = {
  assessment: PropTypes.object,
  addAssessment: PropTypes.func.isRequired,
  updateAssessment: PropTypes.func.isRequired,
  clearAssessment: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  schoolsList: PropTypes.array.isRequired,
  deleteAssessment: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  assessment: state.admin.assessment,
  user: state.auth.user,
  schoolsList: state.admin.schoolsList,
});

export default connect(mapStateToProps, {
  addAssessment,
  updateAssessment,
  clearAssessment,
  deleteAssessment,
})(AssessmentForm);
