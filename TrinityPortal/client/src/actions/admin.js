import {
  GET_USER,
  GET_USERSLIST,
  GET_SCHOOL,
  GET_SCHOOLSLIST,
  CLEAR_SCHOOL,
  GET_RESULTS,
  CLEAR_USER,
  GET_ASSESSMENT,
  GET_ASSESSMENTSLIST,
  CLEAR_ASSESSMENT,
  CLEAR_ADMIN,
  CLEAR_ITEMS,
  GET_RESULT,
  CLEAR_RESULT,
  CLEAR_CLASSROOM,
  GET_CLASSROOMSLIST,
  GET_CLASSROOM,
  GET_REPORT,
  CLEAR_REPORT,
  LOGOUT,
  GET_ASSESSMENTINSTRUCTION,
  GET_OVERALL_RESULTS_CHART,
  GET_OVERALL_RESULTS_BY_ASSESSMENT_CHART,
  GET_OVERALL_RESULTS_PROGRESSION_CHART,
  GET_AVERAGE_SCORE_BENCHMARK_CATEGORY_CHART,
  GET_RECEPTION,
  GET_RECEPTIONSLIST,
  CLEAR_RECEPTION,
  CLEAR_SONG,
  CLEAR_BOOK,
  GET_SONG,
  GET_SONGSLIST,
  GET_BOOK,
  GET_BOOKSLIST,
  GET_JOKE,
  GET_JOKESLIST,
  CLEAR_JOKE,
  GET_TRIVIA,
  GET_TRIVIASLIST,
  CLEAR_TRIVIA
} from "../actions/types";
import { setAlert } from "./alerts";
import { clearAssessmentResult } from "./assessment";
import api from "../utils/api";

export const setUser = (user) => (dispatch) => {
  dispatch({ type: GET_USER, payload: user });
};

export const getUser = (id) => async (dispatch) => {
  try {
    const res = await api.post("/users/get", { UserID: parseInt(id) });
    console.log(res);
    dispatch({ type: GET_USER, payload: res.data.data[0] });
  } catch (error) {
    console.log(error);
    const errors = error.response.data.errors;
    if (errors)
      if (errors[0].msg === "Session Expired") {
        dispatch({ type: LOGOUT });
        dispatch(clearAll());
      }
  }
};

export const loadUsersList =
  (formData = {}) =>
  async (dispatch) => {
    try {
      // const res = await api.post("/users/get", formData);
      // console.log("test resdatata",res.data.data);
      // dispatch({ type: GET_USERSLIST, payload: res.data.data });

      dispatch({type:GET_USERSLIST,payload:  [
        {
          UserID: 1,
          FirstName: "Ziad",
          LastName:"Diab",
          Email: "ziad.diab@globaldws.com",
          UserName: "ziad.diab",
          Role: 1,
          DeviceID: "",
          HarewareID: null,
          ConnectionString: null
        },
        {
          UserID: 2,
          FirstName: "Robot",
          LastName:"1",
          Email: null,
          UserName:null,
          Role: 2,
          DeviceID: "KAZY45672",
          HardwareID: "NBK4436788",
          ConnectionString: "xyahskelwjqkla"
        },
      ]})
    } catch (error) {
      console.log(error);
      const errors = error.response.data.errors;
      if (errors)
        if (errors[0].msg === "Session Expired") {
          dispatch({ type: LOGOUT });
          dispatch(clearAll());
        }
    }
  };

export const updateUser = (userId, formData) => async (dispatch) => {
  try {
    await api.put(`/users/${userId}`, formData);
    dispatch(setAlert("User Updated Successfully", "success"));
    dispatch(loadUsersList());
  } catch (error) {
    console.log(error);
    const errors = error.response.data.errors;
    if (errors)
      if (errors[0].msg === "Session Expired") {
        dispatch({ type: LOGOUT });
        dispatch(clearAll());
      }
  }
};

export const addUser = (formData) => async (dispatch) => {
  try {
    if (formData.UserTypeID === "5") {
      formData = { ...formData, SchoolID: null };
    }

    console.log(formData);
    await api.post("/users", formData);
    dispatch(loadUsersList());
    dispatch(setAlert("User Added Successfully", "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      if (errors[0].msg === "Session Expired") {
        dispatch({ type: LOGOUT });
        dispatch(clearAll());
      } else
        errors.forEach((error) => dispatch(setAlert(error.message, "danger")));
    }
  }
};

export const importUsers = (formData) => async (dispatch) => {
  try {
    await api.post("/users/import", formData);
    dispatch(loadUsersList());
    dispatch(setAlert("Users Imported", "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      if (errors[0].msg === "Session Expired") {
        dispatch({ type: LOGOUT });
        dispatch(clearAll());
      } else
        errors.forEach((error) => dispatch(setAlert(error.message, "danger")));
    }
  }
};

export const deleteUser = (userId) => async (dispatch) => {
  try {
    await api.delete(`/users/${userId}`);
    dispatch(loadUsersList());
    dispatch(setAlert("User Deleted Successfully", "info"));
  } catch (error) {
    console.log(error);
    const errors = error.response.data.errors;
    if (errors)
      if (errors[0].msg === "Session Expired") {
        dispatch({ type: LOGOUT });
        dispatch(clearAll());
      }
  }
};

export const setSchool = (school) => (dispatch) => {
  dispatch({ type: GET_SCHOOL, payload: school });
};

export const getSchool = (id) => async (dispatch) => {
  try {
    const res = await api.post("/schools/get", { SchoolID: parseInt(id) });

    dispatch({ type: GET_SCHOOL, payload: res.data.data[0] });
  } catch (error) {
    console.log(error);
    const errors = error.response.data.errors;
    if (errors)
      if (errors[0].msg === "Session Expired") {
        dispatch({ type: LOGOUT });
        dispatch(clearAll());
      }
  }
};

export const loadSchoolsList = (value={}) => async (dispatch) => {
  try {
    const res = await api.post("/schools/get",value);
    dispatch({ type: GET_SCHOOLSLIST, payload: res.data.data });
  } catch (error) {
    console.log(error);
    const errors = error.response.data.errors;
    if (errors)
      if (errors[0].msg === "Session Expired") {
        dispatch({ type: LOGOUT });
        dispatch(clearAll());
      }
  }
};

export const updateSchool = (schoolId, formData) => async (dispatch) => {
  try {
    const result = await api.put(`/schools/${schoolId}`, formData);
    console.log("test result", result)
    dispatch(loadSchoolsList());
    dispatch(setAlert("School updated Successfully", "success"));
  } catch (err) {
    console.log(err);
    const errors = err.response.data.errors;

    if (errors) {
      if (errors[0].msg === "Session Expired") {
        dispatch({ type: LOGOUT });
        dispatch(clearAll());
      } else
        errors.forEach((error) => dispatch(setAlert(error.message, "danger")));
    }
  }
};

export const addSchool = (formData) => async (dispatch) => {
  try {
    await api.post("/schools", formData);
    dispatch(loadSchoolsList());
    dispatch(setAlert("School Added Successfully", "success"));
  } catch (err) {
    console.log(err);
    const errors = err.response.data.errors;

    if (errors) {
      if (errors[0].msg === "Session Expired") {
        dispatch({ type: LOGOUT });
        dispatch(clearAll());
      } else
        errors.forEach((error) => dispatch(setAlert(error.message, "danger")));
    }
  }
};
export const importSchools = (formData) => async (dispatch) => {
  try {
    await api.post("/schools/import", formData);
    dispatch(loadSchoolsList());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      if (errors[0].msg === "Session Expired") {
        dispatch({ type: LOGOUT });
        dispatch(clearAll());
      } else
        errors.forEach((error) => dispatch(setAlert(error.message, "danger")));
    }
    console.log(err);
  }
};

export const deleteSchool = (schoolId) => async (dispatch) => {
  try {
    await api.delete(`/schools/${schoolId}`);
    dispatch(loadSchoolsList());
    dispatch(setAlert("School Deleted Successfully", "info"));
  } catch (error) {
    console.log(error);
    const errors = error.response.data.errors;
    if (errors)
      if (errors[0].msg === "Session Expired") {
        dispatch({ type: LOGOUT });
        dispatch(clearAll());
      }
  }
};

export const loadAssessmentsList = (school = {}) => async (dispatch) => {
  console.log("school TEststt", school)
  try {
    const res = await api.get(`/assessments/${school.schoolIds}`);
    console.log(res.data.data);
    dispatch({ type: GET_ASSESSMENTSLIST, payload: res.data.data });
  } catch (error) {
    console.log(error);
    const errors = error.response.data.errors;
    if (errors)
      if (errors[0].msg === "Session Expired") {
        dispatch({ type: LOGOUT });
        dispatch(clearAll());
      }
  }
};

export const getAssessment = (id, CategoryID) => async (dispatch) => {
  try {
    const res = await api.post(`/assessments/get/${id}`, {
      CategoryID: parseInt(CategoryID),
    });
    dispatch({ type: GET_ASSESSMENT, payload: res.data.data });
  } catch (error) {
    console.log(error);
    const errors = error.response.data.errors;
    if (errors)
      if (errors[0].msg === "Session Expired") {
        dispatch({ type: LOGOUT });
        dispatch(clearAll());
      }
  }
};

export const getAssessmentInstructionByCategoryID =
  (CategoryID) => async (dispatch) => {
    try {
      const res = await api.get(`/assessments/getinstruction/${CategoryID}`);
      dispatch({ type: GET_ASSESSMENTINSTRUCTION, payload: res.data.data });
    } catch (error) {
      console.log(error);
      const errors = error.response.data.errors;
      if (errors)
        if (errors[0].msg === "Session Expired") {
          dispatch({ type: LOGOUT });
          dispatch(clearAll());
        }
    }
  };

export const updateAssessment =
  (assessmentId, formData) => async (dispatch) => {
    try {
      const data = { ...formData, SchoolsID: [...new Set(formData.SchoolsID)] };
      await api.put(`/assessments/${assessmentId}`, data);
      dispatch(loadAssessmentsList());
      dispatch(setAlert("Assessment updated Successfully", "success"));
    } catch (error) {
      console.log(error);
      const errors = error.response.data.errors;
      if (errors)
        if (errors[0].msg === "Session Expired") {
          dispatch({ type: LOGOUT });
          dispatch(clearAll());
        }
    }
  };

export const deleteAssessment =
  (assessmentId, CategoryID) => async (dispatch) => {
    try {
      await api.delete(`/assessments/all/${assessmentId}`, {
        data: {
          CategoryID,
        },
      });
      dispatch(loadAssessmentsList());
      dispatch(setAlert("Assessment Deleted Successfully", "info"));
    } catch (error) {
      console.log(error);
      const errors = error.response.data.errors;
      if (errors)
        if (errors[0].msg === "Session Expired") {
          dispatch({ type: LOGOUT });
          dispatch(clearAll());
        }
    }
  };

export const addAssessment = (formData) => async (dispatch) => {
  try {
    const data = { ...formData, SchoolsID: [...new Set(formData.SchoolsID)] };
    await api.post("/assessments", data);
    dispatch(loadAssessmentsList());
    dispatch(setAlert("Assessment Added Successfully", "success"));
  } catch (error) {
    console.log(error);
    const errors = error.response.data.errors;
    if (errors)
      if (errors[0].msg === "Session Expired") {
        dispatch({ type: LOGOUT });
        dispatch(clearAll());
      }
  }
};

export const setAssessment = (assessment) => (dispatch) => {
  dispatch({ type: GET_ASSESSMENT, payload: assessment });
};

export const importAssessments = (formData) => async (dispatch) => {
  try {
    await api.post("/assessments/import", formData);
    dispatch(loadAssessmentsList());
  } catch (error) {
    console.log(error);
    const errors = error.response.data.errors;
    if (errors)
      if (errors[0].msg === "Session Expired") {
        dispatch({ type: LOGOUT });
        dispatch(clearAll());
      }
  }
};

export const addSchoolAssessment = (formData) => async (dispatch) => {
  try {
    console.log(formData);
    await api.post("/assessments/school", formData);
    dispatch(getAssessment(formData.AssessmentID, formData.CategoryID));
    dispatch(setAlert("Assessment Added to School Successfully", "success"));
  } catch (error) {
    console.log(error);
    const errors = error.response.data.errors;
    if (errors)
      if (errors[0].msg === "Session Expired") {
        dispatch({ type: LOGOUT });
        dispatch(clearAll());
      }
  }
};

export const deleteSchoolAssessment =
  (assessmentId, CategoryID, SchoolID) => async (dispatch) => {
    try {
      await api.delete(`/assessments/school/${SchoolID}/${assessmentId}`, {
        data: {
          CategoryID,
        },
      });
      dispatch(getAssessment(assessmentId, CategoryID));
      dispatch(setAlert("Assessment Deleted from School Successfully", "info"));
    } catch (error) {
      console.log(error);
      const errors = error.response.data.errors;
      if (errors)
        if (errors[0].msg === "Session Expired") {
          dispatch({ type: LOGOUT });
          dispatch(clearAll());
        }
    }
  };

export const setResult = (result) => (dispatch) => {
  dispatch({ type: GET_RESULT, payload: result });
};

export const getResult = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/assessmentresults/${id}`);
    console.log(res.data.data);
    dispatch({ type: GET_RESULT, payload: res.data.data.results });
  } catch (error) {
    console.log(error);
    const errors = error.response.data.errors;
    if (errors)
      if (errors[0].msg === "Session Expired") {
        dispatch({ type: LOGOUT });
        dispatch(clearAll());
      }
  }
};


// Reception
export const setReception = (reception) => (dispatch) => {
  dispatch({ type: GET_RECEPTION, payload: reception });
};

export const getReception = (id) => async (dispatch) => {
  try {
    // const res = await api.post("/schools/get", { SchoolID: parseInt(id) });

    // dispatch({ type: GET_SCHOOL, payload: res.data.data[0] });
  } catch (error) {
    console.log(error);
    const errors = error.response.data.errors;
    if (errors)
      if (errors[0].msg === "Session Expired") {
        dispatch({ type: LOGOUT });
        dispatch(clearAll());
      }
  }
};

// Reception
export const loadReceptionsList = (value={}) => async (dispatch) => {
  try {
    // const res = await api.post("/schools/get",value);
    // dispatch({ type: GET_SCHOOLSLIST, payload: res.data.data });
    dispatch({type:GET_RECEPTIONSLIST,payload:  [
      {
        InOutID: 1,
        DateTime: "2024-03-16T12:34:56.789Z",
        FullName: "Ziad Diab",
        ClockIn: null,
        ClockOut: null,
        Status: 0,
      },
      {
        InOutID: 2,
        DateTime: "2024-03-17T08:20:30.123Z",
        FullName: "Khanh Nguyen",
        ClockIn: "2024-03-17T08:21:30.123Z",
        ClockOut: null,
        Status: 1,
      },
      {
        InOutID: 3,
        DateTime: "2024-03-18T10:15:00.456Z",
        FullName: "Alan Pintor",
        ClockIn: "2024-03-18T10:16:00.456Z",
        ClockOut: null,
        Status: 2,
      },
      {
        InOutID: 4,
        DateTime: "2024-03-19T11:45:00.789Z",
        FullName: "Alok Rathava",
        ClockIn: "2024-03-19T11:46:00.789Z",
        ClockOut: "2024-03-19T19:15:00.000Z",
        Status: 3,
      },
    ]})
  } catch (error) {
    console.log(error);
    const errors = error.response.data.errors;
    if (errors)
      if (errors[0].msg === "Session Expired") {
        dispatch({ type: LOGOUT });
        dispatch(clearAll());
      }
  }
};

export const updateReception = (schoolId, formData) => async (dispatch) => {
  try {
    // const result = await api.put(`/schools/${schoolId}`, formData);
    // console.log("test result", result)
    // dispatch(loadSchoolsList());
    // dispatch(setAlert("School updated Successfully", "success"));
  } catch (err) {
    console.log(err);
    const errors = err.response.data.errors;

    if (errors) {
      if (errors[0].msg === "Session Expired") {
        dispatch({ type: LOGOUT });
        dispatch(clearAll());
      } else
        errors.forEach((error) => dispatch(setAlert(error.message, "danger")));
    }
  }
};

export const addReception = (formData) => async (dispatch) => {
  try {
    // await api.post("/schools", formData);
    // dispatch(loadSchoolsList());
    // dispatch(setAlert("School Added Successfully", "success"));
  } catch (err) {
    console.log(err);
    const errors = err.response.data.errors;

    if (errors) {
      if (errors[0].msg === "Session Expired") {
        dispatch({ type: LOGOUT });
        dispatch(clearAll());
      } else
        errors.forEach((error) => dispatch(setAlert(error.message, "danger")));
    }
  }
};

export const deleteReception = (schoolId) => async (dispatch) => {
  try {
    // await api.delete(`/schools/${schoolId}`);
    // dispatch(loadSchoolsList());
    // dispatch(setAlert("School Deleted Successfully", "info"));
  } catch (error) {
    console.log(error);
    const errors = error.response.data.errors;
    if (errors)
      if (errors[0].msg === "Session Expired") {
        dispatch({ type: LOGOUT });
        dispatch(clearAll());
      }
  }
};


// Song
export const setSong = (song) => (dispatch) => {
  dispatch({ type: GET_SONG, payload: song });
};

export const getSong = (id) => async (dispatch) => {
  try {
    // const res = await api.post("/schools/get", { SchoolID: parseInt(id) });

    // dispatch({ type: GET_SCHOOL, payload: res.data.data[0] });
  } catch (error) {
    console.log(error);
    const errors = error.response.data.errors;
    if (errors)
      if (errors[0].msg === "Session Expired") {
        dispatch({ type: LOGOUT });
        dispatch(clearAll());
      }
  }
};
export const loadSongsList = (value={}) => async (dispatch) => {
  try {
    // const res = await api.post("/songs/get",value);
    const res = await api.get("/songs");
    dispatch({ type: GET_SONGSLIST, payload: res.data.data });
   
  } catch (error) {
    console.log(error);
    const errors = error.response.data.errors;
    if (errors)
      if (errors[0].msg === "Session Expired") {
        dispatch({ type: LOGOUT });
        dispatch(clearAll());
      }
  }
};

export const updateSong = (schoolId, formData) => async (dispatch) => {
  try {
    // const result = await api.put(`/schools/${schoolId}`, formData);
    // console.log("test result", result)
    // dispatch(loadSchoolsList());
    // dispatch(setAlert("School updated Successfully", "success"));
  } catch (err) {
    console.log(err);
    const errors = err.response.data.errors;

    if (errors) {
      if (errors[0].msg === "Session Expired") {
        dispatch({ type: LOGOUT });
        dispatch(clearAll());
      } else
        errors.forEach((error) => dispatch(setAlert(error.message, "danger")));
    }
  }
};

export const addSong = (formData) => async (dispatch) => {
  try {
    await api.post("/songs", formData);
    // dispatch(loadSchoolsList());
    dispatch(setAlert("Song Added Successfully", "success"));
  } catch (err) {
    console.log(err);
    const errors = err.response.data.errors;

    if (errors) {
      if (errors[0].msg === "Session Expired") {
        dispatch({ type: LOGOUT });
        dispatch(clearAll());
      } else
        errors.forEach((error) => dispatch(setAlert(error.message, "danger")));
    }
  }
};

export const deleteSong = (schoolId) => async (dispatch) => {
  try {
    // await api.delete(`/schools/${schoolId}`);
    // dispatch(loadSchoolsList());
    // dispatch(setAlert("School Deleted Successfully", "info"));
  } catch (error) {
    console.log(error);
    const errors = error.response.data.errors;
    if (errors)
      if (errors[0].msg === "Session Expired") {
        dispatch({ type: LOGOUT });
        dispatch(clearAll());
      }
  }
};

// Book
export const setBook = (book) => (dispatch) => {
  dispatch({ type: GET_BOOK, payload: book });
};

export const getBook = (id) => async (dispatch) => {
  try {
    // const res = await api.post("/schools/get", { SchoolID: parseInt(id) });

    // dispatch({ type: GET_SCHOOL, payload: res.data.data[0] });
  } catch (error) {
    console.log(error);
    const errors = error.response.data.errors;
    if (errors)
      if (errors[0].msg === "Session Expired") {
        dispatch({ type: LOGOUT });
        dispatch(clearAll());
      }
  }
};
export const loadBooksList = (value={}) => async (dispatch) => {
  try {
    // const res = await api.post("/schools/get",value);
    // dispatch({ type: GET_SCHOOLSLIST, payload: res.data.data });
    dispatch({type:GET_BOOKSLIST,payload:  [
      {
        BookID: 1,
        Name: "The Magic Tree",
      },
      {
        BookID: 2,
        Name: "Winter Fairy",
      },
      {
        BookID: 3,
        Name: "The Enchanted Ones",
      },
      {
        BookID: 4,
        Name: "Starlit Melodies",
      },
    ]})
  } catch (error) {
    console.log(error);
    const errors = error.response.data.errors;
    if (errors)
      if (errors[0].msg === "Session Expired") {
        dispatch({ type: LOGOUT });
        dispatch(clearAll());
      }
  }
};

export const updateBook = (schoolId, formData) => async (dispatch) => {
  try {
    // const result = await api.put(`/schools/${schoolId}`, formData);
    // console.log("test result", result)
    // dispatch(loadSchoolsList());
    // dispatch(setAlert("School updated Successfully", "success"));
  } catch (err) {
    console.log(err);
    const errors = err.response.data.errors;

    if (errors) {
      if (errors[0].msg === "Session Expired") {
        dispatch({ type: LOGOUT });
        dispatch(clearAll());
      } else
        errors.forEach((error) => dispatch(setAlert(error.message, "danger")));
    }
  }
};

export const addBook = (formData) => async (dispatch) => {
  try {
    await api.post("/books", {formData});
    // dispatch(loadSchoolsList());
    dispatch(setAlert("Book Added Successfully", "success"));
  } catch (err) {
    console.log(err);
    const errors = err.response.data.errors;

    if (errors) {
      if (errors[0].msg === "Session Expired") {
        dispatch({ type: LOGOUT });
        dispatch(clearAll());
      } else
        errors.forEach((error) => dispatch(setAlert(error.message, "danger")));
    }
  }
};

export const deleteBook = (schoolId) => async (dispatch) => {
  try {
    // await api.delete(`/schools/${schoolId}`);
    // dispatch(loadSchoolsList());
    // dispatch(setAlert("School Deleted Successfully", "info"));
  } catch (error) {
    console.log(error);
    const errors = error.response.data.errors;
    if (errors)
      if (errors[0].msg === "Session Expired") {
        dispatch({ type: LOGOUT });
        dispatch(clearAll());
      }
  }
};


// Joke
export const setJoke = (book) => (dispatch) => {
  dispatch({ type: GET_JOKE, payload: book });
};

export const getJoke = (id) => async (dispatch) => {
  try {
    // const res = await api.post("/schools/get", { SchoolID: parseInt(id) });

    // dispatch({ type: GET_SCHOOL, payload: res.data.data[0] });
  } catch (error) {
    console.log(error);
    const errors = error.response.data.errors;
    if (errors)
      if (errors[0].msg === "Session Expired") {
        dispatch({ type: LOGOUT });
        dispatch(clearAll());
      }
  }
};
export const loadJokesList = (value={}) => async (dispatch) => {
  try {
    // const res = await api.post("/schools/get",value);
    // dispatch({ type: GET_SCHOOLSLIST, payload: res.data.data });
    dispatch({type:GET_JOKESLIST,payload:  [
      {
        JokeID: 1,
        Name: "Breakfast Joke",
      },
      {
        JokeID: 2,
        Name: "Lunch Joke",
      },
      {
        JokeID: 3,
        Name: "Dinner Joke",
      },
      {
        JokeID: 4,
        Name: "Supper Joke",
      },
    ]})
  } catch (error) {
    console.log(error);
    const errors = error.response.data.errors;
    if (errors)
      if (errors[0].msg === "Session Expired") {
        dispatch({ type: LOGOUT });
        dispatch(clearAll());
      }
  }
};

export const updateJoke = (schoolId, formData) => async (dispatch) => {
  try {
    // const result = await api.put(`/schools/${schoolId}`, formData);
    // console.log("test result", result)
    // dispatch(loadSchoolsList());
    // dispatch(setAlert("School updated Successfully", "success"));
  } catch (err) {
    console.log(err);
    const errors = err.response.data.errors;

    if (errors) {
      if (errors[0].msg === "Session Expired") {
        dispatch({ type: LOGOUT });
        dispatch(clearAll());
      } else
        errors.forEach((error) => dispatch(setAlert(error.message, "danger")));
    }
  }
};

export const addJoke = (formData) => async (dispatch) => {
  try {
    await api.post("/jokes", { JokeID: 19, Name: "New Joke Test" });
    // dispatch(loadSchoolsList());
    dispatch(setAlert("Joke Added Successfully", "success"));
  } catch (err) {
    console.log(err);
    const errors = err.response.data.errors;

    if (errors) {
      if (errors[0].msg === "Session Expired") {
        dispatch({ type: LOGOUT });
        dispatch(clearAll());
      } else
        errors.forEach((error) => dispatch(setAlert(error.message, "danger")));
    }
  }
};

export const deleteJoke = (schoolId) => async (dispatch) => {
  try {
    // await api.delete(`/schools/${schoolId}`);
    // dispatch(loadSchoolsList());
    // dispatch(setAlert("School Deleted Successfully", "info"));
  } catch (error) {
    console.log(error);
    const errors = error.response.data.errors;
    if (errors)
      if (errors[0].msg === "Session Expired") {
        dispatch({ type: LOGOUT });
        dispatch(clearAll());
      }
  }
};

// Trivia
export const setTrivia = (trivia) => (dispatch) => {
  dispatch({ type: GET_TRIVIA, payload: trivia });
};

export const getTrivia = (id) => async (dispatch) => {
  try {
    // const res = await api.post("/schools/get", { SchoolID: parseInt(id) });

    // dispatch({ type: GET_SCHOOL, payload: res.data.data[0] });
  } catch (error) {
    console.log(error);
    const errors = error.response.data.errors;
    if (errors)
      if (errors[0].msg === "Session Expired") {
        dispatch({ type: LOGOUT });
        dispatch(clearAll());
      }
  }
};
export const loadTriviasList = (value={}) => async (dispatch) => {
  try {
    // const res = await api.post("/schools/get",value);
    // dispatch({ type: GET_SCHOOLSLIST, payload: res.data.data });
    dispatch({type:GET_TRIVIASLIST,payload:  [
      {
        TriviaID: 1,
        Name: "Breakfast Trivia",
      },
      {
        TriviaID: 2,
        Name: "Lunch Trivia",
      },
      {
        TriviaID: 3,
        Name: "Dinner Trivia",
      },
      {
        TriviaID: 4,
        Name: "Supper Trivia",
      },
    ]})
  } catch (error) {
    console.log(error);
    const errors = error.response.data.errors;
    if (errors)
      if (errors[0].msg === "Session Expired") {
        dispatch({ type: LOGOUT });
        dispatch(clearAll());
      }
  }
};

export const updateTrivia = (schoolId, formData) => async (dispatch) => {
  try {
    // const result = await api.put(`/schools/${schoolId}`, formData);
    // console.log("test result", result)
    // dispatch(loadSchoolsList());
    // dispatch(setAlert("School updated Successfully", "success"));
  } catch (err) {
    console.log(err);
    const errors = err.response.data.errors;

    if (errors) {
      if (errors[0].msg === "Session Expired") {
        dispatch({ type: LOGOUT });
        dispatch(clearAll());
      } else
        errors.forEach((error) => dispatch(setAlert(error.message, "danger")));
    }
  }
};

export const addTrivia = (formData) => async (dispatch) => {
  try {
    await api.post("/trivias", { TriviaID: 19, Name: "New Trivia Test" });
    // dispatch(loadSchoolsList());
    dispatch(setAlert("Trivia Added Successfully", "success"));
  } catch (err) {
    console.log(err);
    const errors = err.response.data.errors;

    if (errors) {
      if (errors[0].msg === "Session Expired") {
        dispatch({ type: LOGOUT });
        dispatch(clearAll());
      } else
        errors.forEach((error) => dispatch(setAlert(error.message, "danger")));
    }
  }
};

export const deleteTrivia = (schoolId) => async (dispatch) => {
  try {
    // await api.delete(`/schools/${schoolId}`);
    // dispatch(loadSchoolsList());
    // dispatch(setAlert("School Deleted Successfully", "info"));
  } catch (error) {
    console.log(error);
    const errors = error.response.data.errors;
    if (errors)
      if (errors[0].msg === "Session Expired") {
        dispatch({ type: LOGOUT });
        dispatch(clearAll());
      }
  }
};


export const generateReport =
  ( year, benchmarkID, schoolID, gradeID,sectionID, studentID, teacherID, schoolIds) => async (dispatch) => {
    try {
      const res = await api.get(
        `/assessmentresults/reports/${year}/${benchmarkID}/${schoolID}/${gradeID}/${sectionID}/${studentID}/${teacherID}/${schoolIds}`
      );
      console.log(res.data.data);
      dispatch({ type: GET_REPORT, payload: res.data.data });
    } catch (error) {
      console.log(error);
      const errors = error.response.data.errors;
      if (errors)
        if (errors[0].msg === "Session Expired") {
          dispatch({ type: LOGOUT });
          dispatch(clearAll());
        }
    }
  };

export const getChartOverallResults = (year, benchmarkID, schoolID, gradeID,sectionID, studentID, teacherID, schoolIds) => async (dispatch) => {
  try {
    const res = await api.get(`/assessmentresults/chart1/${year}/${benchmarkID}/${schoolID}/${gradeID}/${sectionID}/${studentID}/${teacherID}/${schoolIds}`);
    dispatch({ type: GET_OVERALL_RESULTS_CHART, payload: res.data.data });
  } catch (error) {
    console.log(error);
    const errors = error.response.data.errors;
    if (errors)
      if (errors[0].msg === "Session Expired") {
        dispatch({ type: LOGOUT });
        dispatch(clearAll());
      }
  }
};

export const getChartOverallByAssessmentResults = (year, benchmarkID, schoolID, gradeID,sectionID, studentID, teacherID, schoolIds) => async (dispatch) => {
  try {
    const res = await api.get(`/assessmentresults/chart2/${year}/${benchmarkID}/${schoolID}/${gradeID}/${sectionID}/${studentID}/${teacherID}/${schoolIds}`);
    dispatch({ type: GET_OVERALL_RESULTS_BY_ASSESSMENT_CHART, payload: res.data.data });
  } catch (error) {
    console.log(error);
    const errors = error.response.data.errors;
    if (errors)
      if (errors[0].msg === "Session Expired") {
        dispatch({ type: LOGOUT });
        dispatch(clearAll());
      }
  }
};

export const getChartOverallProgression = (year, benchmarkID, schoolID, gradeID,sectionID, studentID, teacherID, schoolIds) => async (dispatch) => {
  try {
    const res = await api.get(`/assessmentresults/chart3/${year}/${benchmarkID}/${schoolID}/${gradeID}/${sectionID}/${studentID}/${teacherID}/${schoolIds}`);
    dispatch({ type: GET_OVERALL_RESULTS_PROGRESSION_CHART, payload: res.data.data });
  } catch (error) {
    console.log(error);
    const errors = error.response.data.errors;
    if (errors)
      if (errors[0].msg === "Session Expired") {
        dispatch({ type: LOGOUT });
        dispatch(clearAll());
      }
  }
};

export const getChartAverageScorePerBenchmarkCategory = (year, benchmarkID, schoolID, gradeID,sectionID, studentID, teacherID, schoolIds) => async (dispatch) => {
  try {
    const res = await api.get(`/assessmentresults/chart4/${year}/${benchmarkID}/${schoolID}/${gradeID}/${sectionID}/${studentID}/${teacherID}`);
    dispatch({ type: GET_AVERAGE_SCORE_BENCHMARK_CATEGORY_CHART, payload: res.data.data });
  } catch (error) {
    console.log(error);
    const errors = error.response.data.errors;
    if (errors)
      if (errors[0].msg === "Session Expired") {
        dispatch({ type: LOGOUT });
        dispatch(clearAll());
      }
  }
};

export const loadResultsList = (schoolID) => async (dispatch) => {
  try {
    const res = await api.get(`/assessmentresults/all/${schoolID}`);
    dispatch({ type: GET_RESULTS, payload: res.data.data });
  } catch (error) {
    console.log(error);
    const errors = error.response.data.errors;
    if (errors)
      if (errors[0].msg === "Session Expired") {
        dispatch({ type: LOGOUT });
        dispatch(clearAll());
      }
  }
};

export const deleteResult = (resultId, schoolID) => async (dispatch) => {
  try {
    console.log("test resultId", resultId, schoolID)
    await api.delete(`/assessmentresults/${resultId}`);
    dispatch(loadResultsList(schoolID));
    dispatch(setAlert("Result Deleted Successfully", "info"));
  } catch (error) {
    console.log(error);
    const errors = error.response.data.errors;
    if (errors)
      if (errors[0].msg === "Session Expired") {
        dispatch({ type: LOGOUT });
        dispatch(clearAll());
      }
  }
};

export const setClassroom = (classroom) => (dispatch) => {
  dispatch({ type: GET_CLASSROOM, payload: classroom });
};

export const getClassroom = (id) => async (dispatch) => {
  try {
    const res = await api.post("/classrooms/get", {
      ClassroomID: parseInt(id),
    });
    console.log(res);
    dispatch({ type: GET_CLASSROOM, payload: res.data.data });
  } catch (error) {
    console.log(error);
    const errors = error.response.data.errors;
    if (errors)
      if (errors[0].msg === "Session Expired") {
        dispatch({ type: LOGOUT });
        dispatch(clearAll());
      }
  }
};

export const loadClassroomsList =
  (formData = {}) =>
  async (dispatch) => {
    try {
      const res = await api.post("/classrooms/get", formData);
      console.log(res.data.data);
      dispatch({ type: GET_CLASSROOMSLIST, payload: res.data.data });
    } catch (error) {
      console.log(error);
      const errors = error.response.data.errors;
      if (errors)
        if (errors[0].msg === "Session Expired") {
          dispatch({ type: LOGOUT });
          dispatch(clearAll());
        }
    }
  };

export const updateClassroom = (classroomId, formData) => async (dispatch) => {
  try {
    await api.put(`/classrooms/${classroomId}`, formData);
    dispatch(setAlert("Classroom Updated Successfully", "success"));
    dispatch(loadClassroomsList());
  } catch (error) {
    console.log(error);
    const errors = error.response.data.errors;
    if (errors)
      if (errors[0].msg === "Session Expired") {
        dispatch({ type: LOGOUT });
        dispatch(clearAll());
      }
  }
};

export const addClassroomStudent = (formData) => async (dispatch) => {
  try {
    await api.post("/classrooms/student", formData);
    dispatch(getClassroom(formData.ClassroomID));
    dispatch(setAlert("Student Added Successfully to Classroom", "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      if (errors[0].msg === "Session Expired") {
        dispatch({ type: LOGOUT });
        dispatch(clearAll());
      } else
        errors.forEach((error) => dispatch(setAlert(error.message, "danger")));
    }
  }
};

export const deleteClassroomStudent = (studentId) => async (dispatch) => {
  try {
    await api.delete(`/classrooms/student/${studentId}`);
    dispatch(loadClassroomsList());
    dispatch(setAlert("Student removed Successfully from class", "info"));
  } catch (error) {
    console.log(error);
    const errors = error.response.data.errors;
    if (errors)
      if (errors[0].msg === "Session Expired") {
        dispatch({ type: LOGOUT });
        dispatch(clearAll());
      }
  }
};

export const addClassroom = (formData) => async (dispatch) => {
  try {
    await api.post("/classrooms", formData);
    dispatch(loadClassroomsList());
    dispatch(setAlert("Classroom Added Successfully", "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      if (errors[0].msg === "Session Expired") {
        dispatch({ type: LOGOUT });
        dispatch(clearAll());
      } else
        errors.forEach((error) => dispatch(setAlert(error.message, "danger")));
    }
  }
};

export const finalizeAssessment = (formData) => async (dispatch) => {
  try {
    console.log("test formData", formData)
    await api.post("/assessmentresults/finalize", formData);
    dispatch(loadClassroomsList());
    dispatch(setAlert("Assessment Finalized", "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      if (errors[0].msg === "Session Expired") {
        dispatch({ type: LOGOUT });
        dispatch(clearAll());
      } else
        errors.forEach((error) => dispatch(setAlert(error.message, "danger")));
    }
  }
};

export const deleteClassroom = (classroomId) => async (dispatch) => {
  try {
    await api.delete(`/classrooms/${classroomId}`);
    dispatch(loadClassroomsList());
    dispatch(setAlert("Classroom Deleted Successfully", "info"));
  } catch (error) {
    console.log(error);
    const errors = error.response.data.errors;
    if (errors)
      if (errors[0].msg === "Session Expired") {
        dispatch({ type: LOGOUT });
        dispatch(clearAll());
      }
  }
};

export const clearUser = () => (dispatch) => {
  dispatch({ type: CLEAR_USER });
};

export const clearReport = () => (dispatch) => {
  dispatch({ type: CLEAR_REPORT });
};

export const clearResult = () => (dispatch) => {
  dispatch({ type: CLEAR_RESULT });
  dispatch(clearAssessmentResult());
};
export const clearSchool = () => (dispatch) => {
  dispatch({ type: CLEAR_SCHOOL });
};

export const clearReception = () => (dispatch) => {
  dispatch({ type: CLEAR_RECEPTION });
};

export const clearSong = () => (dispatch) => {
  dispatch({ type: CLEAR_SONG });
};

export const clearBook = () => (dispatch) => {
  dispatch({ type: CLEAR_BOOK });
};

export const clearJoke = () => (dispatch) => {
  dispatch({ type: CLEAR_JOKE });
};

export const clearTrivia = () => (dispatch) => {
  dispatch({ type: CLEAR_TRIVIA });
};


export const clearAssessment = () => (dispatch) => {
  dispatch({ type: CLEAR_ASSESSMENT });
};

export const clearClassroom = () => (dispatch) => {
  dispatch({ type: CLEAR_CLASSROOM });
};

export const clearAll = () => (dispatch) => {
  dispatch({ type: CLEAR_ADMIN });
  dispatch(clearAssessmentResult());
};

export const clearItems = () => (dispatch) => {
  dispatch({ type: CLEAR_ITEMS });
};
