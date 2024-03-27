import {
  GET_USER,
  GET_USERSLIST,
  GET_SCHOOL,
  GET_SCHOOLSLIST,
  GET_RESULT,
  GET_RESULTS,
  CLEAR_SCHOOL,
  CLEAR_USER,
  GET_ASSESSMENT,
  GET_ASSESSMENTSLIST,
  CLEAR_ASSESSMENT,
  CLEAR_ADMIN,
  CLEAR_ITEMS,
  CLEAR_RESULT,
  GET_CLASSROOM,
  GET_CLASSROOMSLIST,
  CLEAR_CLASSROOM,
  GET_RECEPTION,
  GET_RECEPTIONSLIST,
  CLEAR_RECEPTION,
  GET_SONG,
  GET_SONGSLIST,
  CLEAR_SONG,
  GET_BOOK,
  GET_BOOKSLIST,
  CLEAR_BOOK,
  GET_REPORT,
  CLEAR_REPORT,
  GET_ASSESSMENTSINSTRUCTIONLIST,
  GET_ASSESSMENTINSTRUCTION,
  CLEAR_ASSESSMENTINSTRUCTION,
  GET_OVERALL_RESULTS_CHART,
  CLEAR_OVERALL_RESULTS_CHART,
  GET_OVERALL_RESULTS_BY_ASSESSMENT_CHART,
  CLEAR_OVERALL_RESULTS_BY_ASSESSMENT_CHART,
  GET_OVERALL_RESULTS_PROGRESSION_CHART,
  CLEAR_OVERALL_RESULTS_PROGRESSION_CHART,
  GET_AVERAGE_SCORE_BENCHMARK_CATEGORY_CHART,
  CLEAR_AVERAGE_SCORE_BENCHMARK_CATEGORY_CHART,
} from "../actions/types";

const initialState = {
  usersList: [],
  user: null,
  usersListLoading: true,
  userLoading: true,

  schoolsList: [],
  school: null,
  schoolListLoading: true,
  schoolLoading: true,

  assessmentsList: [],
  assessment: null,
  assessmentListLoading: true,
  assessmentLoading: true,

  assessmentsInstructionList: [],
  assessmentInstruction: null,
  assessmentsInstructionListLoading: true,
  assessmentInstructionLoading: true,

  resultsList: [],
  result: null,
  resultListLoading: true,
  resultLoading: true,

  reports: [],
  reportsLoading: true,

  overallResultsChart: [],
  overallResultsChartLoading: true,

  overallResultsByAssessmentChart: [],
  overallResultsChartByAssessmentLoading: true,

  overallResultsProgressionChart: [],
  overallResultsChartProgressionLoading: true,

  averageScorePerBenchmarkCategoryChart: [],
  averageScorePerBenchmarkCategoryChartLoading: true,

  classroomsList: [],
  classroom: null,
  classroomListLoading: true,
  classroomLoading: true,

  receptionsList: [],
  reception: null,
  receptionListLoading: true,
  receptionLoading: true,

  songsList: [],
  song: null,
  songListLoading: true,
  songLoading: true,

  booksList: [],
  book: null,
  bookListLoading: true,
  bookLoading: true,
};

// eslint-disable-next-line
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_USERSLIST:
      return { ...state, usersList: payload, usersListLoading: false };
    case GET_USER:
      return { ...state, user: payload, userLoading: false };
    case CLEAR_USER:
      return { ...state, user: null, userLoading: true };

    case GET_SCHOOLSLIST:
      return { ...state, schoolsList: payload, schoolListLoading: false };
    case GET_SCHOOL:
      return { ...state, school: payload, schoolLoading: false };
    case CLEAR_SCHOOL:
      return { ...state, school: null, schoolLoading: true };

    case GET_CLASSROOMSLIST:
      return { ...state, classroomsList: payload, classroomListLoading: false };
    case GET_CLASSROOM:
      return { ...state, classroom: payload, classroomLoading: false };
    case CLEAR_CLASSROOM:
      return { ...state, classroom: null, classroomLoading: true };

    case GET_RECEPTIONSLIST:
      return { ...state, receptionsList: payload, receptionListLoading: false };
    case GET_RECEPTION:
      return { ...state, reception: payload, receptionLoading: false };
    case CLEAR_RECEPTION:
      return { ...state, reception: null, receptionLoading: true };

    case GET_SONGSLIST:
      return { ...state, songsList: payload, songListLoading: false };
    case GET_SONG:
      return { ...state, song: payload, songLoading: false };
    case CLEAR_SONG:
      return { ...state, song: null, songLoading: true };

    case GET_BOOKSLIST:
      return { ...state, booksList: payload, bookListLoading: false };
    case GET_BOOK:
      return { ...state, book: payload, bookLoading: false };
    case CLEAR_BOOK:
      return { ...state, book: null, bookLoading: true };

    case GET_ASSESSMENTSLIST:
      return {
        ...state,
        assessmentsList: payload,
        assessmentListLoading: false,
      };
    case GET_ASSESSMENT:
      return { ...state, assessment: payload, assessmentLoading: false };
    case CLEAR_ASSESSMENT:
      return { ...state, assessment: null, assessmentLoading: true };
    case GET_ASSESSMENTSINSTRUCTIONLIST:
      return {
        ...state,
        assessmentsInstructionList: payload,
        assessmentsInstructionListLoading: false,
      };
    case GET_ASSESSMENTINSTRUCTION:
      return {
        ...state,
        assessmentInstruction: payload,
        assessmentInstructionLoading: false,
      };
    case CLEAR_ASSESSMENTINSTRUCTION:
      return {
        ...state,
        assessmentInstruction: null,
        assessmentInstructionLoading: true,
      };

    case GET_RESULTS:
      return {
        ...state,
        resultsList: payload,
        resultListLoading: false,
      };
    case GET_RESULT:
      return { ...state, result: payload, resultLoading: false };
    case GET_REPORT:
      return { ...state, reports: payload, reportsLoading: false };
    case CLEAR_REPORT:
      return { ...state, reports: [], reportsLoading: true };
    case GET_OVERALL_RESULTS_CHART:
      return {
        ...state,
        overallResultsChart: payload,
        overallResultsChartLoading: false,
      };
    case CLEAR_OVERALL_RESULTS_CHART:
      return {
        ...state,
        overallResultsChart: [],
        overallResultsChartLoading: true,
      };
    case GET_OVERALL_RESULTS_BY_ASSESSMENT_CHART:
      return {
        ...state,
        overallResultsByAssessmentChart: payload,
        overallResultsChartByAssessmentLoading: false,
      };
    case CLEAR_OVERALL_RESULTS_BY_ASSESSMENT_CHART:
      return {
        ...state,
        overallResultsByAssessmentChart: [],
        overallResultsChartByAssessmentLoading: true,
      };
    case GET_OVERALL_RESULTS_PROGRESSION_CHART:
      return {
        ...state,
        overallResultsProgressionChart: payload,
        overallResultsChartProgressionLoading: false,
      };
    case CLEAR_OVERALL_RESULTS_PROGRESSION_CHART:
      return {
        ...state,
        overallResultsProgressionChart: [],
        overallResultsChartProgressionLoading: true,
      };
    case GET_AVERAGE_SCORE_BENCHMARK_CATEGORY_CHART:
      return {
        ...state,
        averageScorePerBenchmarkCategoryChart: payload,
        averageScorePerBenchmarkCategoryChartLoading: false,
      };
    case CLEAR_AVERAGE_SCORE_BENCHMARK_CATEGORY_CHART:
      return {
        ...state,
        averageScorePerBenchmarkCategoryChart: [],
        averageScorePerBenchmarkCategoryChartLoading: true,
      };
    case CLEAR_RESULT:
      return { ...state, result: null, resultLoading: true };
    case CLEAR_ADMIN:
      return {
        usersList: [],
        user: null,
        usersListLoading: true,
        userLoading: true,

        schoolsList: [],
        school: null,
        schoolListLoading: true,
        schoolLoading: true,

        assessmentsList: [],
        assessment: null,
        assessmentListLoading: true,
        assessmentLoading: true,

        resultsList: [],
        result: null,
        resultListLoading: true,
        resultLoading: true,

        classroomsList: [],
        classroom: null,
        classroomListLoading: true,
        classroomLoading: true,

        reports: [],
        reportsLoading: true,

        overallResultsChart: [],
        overallResultsChartLoading: true,

        overallResultsByAssessmentChart: [],
        overallResultsByAssessmentChartLoading: true,

        overallResultsProgressionChart: [],
        overallResultsChartProgressionLoading: true,

        averageScorePerBenchmarkCategoryChart: [],
        averageScorePerBenchmarkCategoryChartLoading: true,

        receptionsList: [],
        reception: null,
        receptionListLoading: true,
        receptionLoading: true,

        songsList: [],
        song: null,
        songListLoading: true,
        songLoading: true,

        booksList: [],
        book: null,
        bookListLoading: true,
        bookLoading: true,
      };
    case CLEAR_ITEMS:
      return {
        ...state,
        user: null,
        userLoading: true,

        school: null,
        schoolLoading: true,

        assessment: null,
        assessmentLoading: true,

        classroom: null,
        classroomLoading: true,

        reception: null,
        receptionLoading: true,

        song: null,
        songLoading: true,

        book: null,
        bookLoading: true,

        reports: [],
        reportsLoading: true,

        overallResultsChart: [],
        overallResultsChartLoading: true,

        overallResultsByAssessmentChart: [],
        overallResultsByAssessmentChartLoading: true,

        overallResultsProgressionChart: [],
        overallResultsChartProgressionLoading: true,

        averageScorePerBenchmarkCategoryChart: [],
        averageScorePerBenchmarkCategoryChartLoading: true,
      };
    default:
      return state;
  }
}
