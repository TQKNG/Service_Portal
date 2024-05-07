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
  GET_STATISTICLOG,
  GET_STATISTICLOGSLIST,
  CLEAR_STATISTICLOG,
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
  CLEAR_TRIVIA,
  GET_SETTING,
  GET_SETTINGSLIST,
  CLEAR_SETTING,
  CLEAR_SCHEDULE,
  GET_SCHEDULESLIST,
  GET_LOCATIONSLIST,
  GET_SCHEDULE,
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
      const res = await api.post("/users/get", formData);
      console.log("test resdatata", res.data.data);
      dispatch({ type: GET_USERSLIST, payload: res.data.data });
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

export const loadSchoolsList =
  (value = {}) =>
  async (dispatch) => {
    try {
      const res = await api.post("/schools/get", value);
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
    console.log("test result", result);
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

export const loadAssessmentsList =
  (school = {}) =>
  async (dispatch) => {
    console.log("school TEststt", school);
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
export const loadReceptionsList =
  (value = {}) =>
  async (dispatch) => {
    try {
      const res = await api.get("/receptions");
      dispatch({ type: GET_RECEPTIONSLIST, payload: res.data.data });
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

export const updateReception =
  (receptionID = null, formData) =>
  async (dispatch) => {
    try {
      const result = await api.put(`/receptions/${receptionID}`, formData);
      if (result.data.success) {
        dispatch(loadReceptionsList());
        // dispatch(setAlert("A Visit Updated Successfully", "success"));
      }
      return result.data;
    } catch (err) {
      console.log(err);
      const errors = err.response.data.errors;

      if (errors) {
        if (errors[0].msg === "Session Expired") {
          dispatch({ type: LOGOUT });
          dispatch(clearAll());
        } else
          errors.forEach((error) =>
            dispatch(setAlert(error.message, "danger"))
          );
      }
    }
  };

export const addReception = (formData) => async (dispatch) => {
  try {
    const result = await api.post("/receptions", formData);
    if (result.data.success) {
      dispatch(loadReceptionsList());
      // dispatch(setAlert("A Visit Added Successfully", "success"));
    }
    return result.data;
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
    const res = await api.get(`/songs/${id}`);
    dispatch({ type: GET_SONG, payload: res.data.data[0] });
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
export const loadSongsList =
  (value = {}) =>
  async (dispatch) => {
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

export const updateSong = (songID, formData) => async (dispatch) => {
  try {
    const result = await api.put(`/songs/${songID}`, formData);
    console.log("test result", result);
    dispatch(loadSongsList());
    dispatch(setAlert("Song updated Successfully", "success"));
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
    dispatch(loadSongsList());
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

export const deleteSong = (songID) => async (dispatch) => {
  try {
    await api.delete(`/songs/${songID}`);
    dispatch(loadSongsList());
    dispatch(setAlert("Song Deleted Successfully", "info"));
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
export const loadBooksList =
  (value = {}) =>
  async (dispatch) => {
    try {
      const res = await api.get("/books");
      dispatch({ type: GET_BOOKSLIST, payload: res.data.data });
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

export const updateBook = (bookID, formData) => async (dispatch) => {
  try {
    const result = await api.put(`/books/${bookID}`, formData);
    dispatch(loadBooksList());
    dispatch(setAlert("Book updated Successfully", "success"));
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
    await api.post("/books", formData);
    dispatch(loadBooksList());
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

export const deleteBook = (bookID) => async (dispatch) => {
  try {
    await api.delete(`/books/${bookID}`);
    dispatch(loadBooksList());
    dispatch(setAlert("Book Deleted Successfully", "info"));
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

// Setting
export const loadSettingsList = () => async (dispatch) => {
  try {
    console.log("test iam here");
    const res = await api.get("/settings");
    dispatch({ type: GET_SETTINGSLIST, payload: res.data.data });
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

export const updateSetting = (formData) => async (dispatch) => {
  try {
    const result = await api.put(`/settings`, formData);
    dispatch(loadSettingsList());
    dispatch(setAlert("Settings updated Successfully", "success"));
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
export const loadJokesList =
  (value = {}) =>
  async (dispatch) => {
    try {
      const res = await api.get("/jokes", value);
      dispatch({ type: GET_JOKESLIST, payload: res.data.data });
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

export const updateJoke = (jokeID, formData) => async (dispatch) => {
  try {
    const result = await api.put(`/jokes/${jokeID}`, formData);
    dispatch(loadJokesList());
    dispatch(setAlert("Joke updated Successfully", "success"));
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
    await api.post("/jokes", formData);
    dispatch(loadJokesList());
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

export const deleteJoke = (jokeID) => async (dispatch) => {
  try {
    await api.delete(`/jokes/${jokeID}`);
    dispatch(loadJokesList());
    dispatch(setAlert("Joke Deleted Successfully", "info"));
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
export const loadTriviasList =
  (value = {}) =>
  async (dispatch) => {
    try {
      const res = await api.get("/trivias");
      dispatch({ type: GET_TRIVIASLIST, payload: res.data.data });
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

export const updateTrivia = (questionID, formData) => async (dispatch) => {
  try {
    await api.put(`/trivias/${questionID}`, formData);
    dispatch(loadTriviasList());
    dispatch(setAlert("Trivia updated Successfully", "success"));
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
    await api.post("/trivias", formData).then(() => {
      dispatch(loadTriviasList());
      dispatch(setAlert("Trivia Added Successfully", "success"));
    });
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

export const deleteTrivia = (triviaID) => async (dispatch) => {
  try {
    await api.delete(`/trivias/${triviaID}`);
    dispatch(loadTriviasList());
    dispatch(setAlert("Trivia Deleted Successfully", "info"));
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

// Schedule
export const setSchedule = (schedule) => (dispatch) => {
  dispatch({ type: GET_SCHEDULE, payload: schedule });
};

export const getSchedule = (id) => async (dispatch) => {
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
export const loadSchedulesList =
  (value = {}) =>
  async (dispatch) => {
    try {
      const res = await api.get("/schedules");
      dispatch({ type: GET_SCHEDULESLIST, payload: res.data.data });
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

export const updateSchedule = (scheduleID, formData) => async (dispatch) => {
  try {
    const result = await api.put(`/schedules/${scheduleID}`, formData);
    dispatch(loadSchedulesList());
    dispatch(setAlert("Schedule updated Successfully", "success"));
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

export const addSchedule = (formData) => async (dispatch) => {
  try {
    const result =  await api.post("/schedules", formData);

    console.log("my eeee result", result);

    if(result.data.success){
      dispatch(loadSchedulesList());
      dispatch(setAlert("Schedule Added Successfully", "success"));
      return result.data;
    }
    else{
      return result.data;
    }
   
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

export const deleteSchedule = (scheduleID) => async (dispatch) => {
  try {
    await api.delete(`/schedules/${scheduleID}`);
    dispatch(loadSchedulesList());
    dispatch(setAlert("Schedule Deleted Successfully", "info"));
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
  (
    year,
    benchmarkID,
    schoolID,
    gradeID,
    sectionID,
    studentID,
    teacherID,
    schoolIds
  ) =>
  async (dispatch) => {
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

export const getChartOverallResults =
  (
    year,
    benchmarkID,
    schoolID,
    gradeID,
    sectionID,
    studentID,
    teacherID,
    schoolIds
  ) =>
  async (dispatch) => {
    try {
      const res = await api.get(
        `/assessmentresults/chart1/${year}/${benchmarkID}/${schoolID}/${gradeID}/${sectionID}/${studentID}/${teacherID}/${schoolIds}`
      );
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

export const getChartOverallByAssessmentResults =
  (
    year,
    benchmarkID,
    schoolID,
    gradeID,
    sectionID,
    studentID,
    teacherID,
    schoolIds
  ) =>
  async (dispatch) => {
    try {
      const res = await api.get(
        `/assessmentresults/chart2/${year}/${benchmarkID}/${schoolID}/${gradeID}/${sectionID}/${studentID}/${teacherID}/${schoolIds}`
      );
      dispatch({
        type: GET_OVERALL_RESULTS_BY_ASSESSMENT_CHART,
        payload: res.data.data,
      });
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

export const getChartOverallProgression =
  (
    year,
    benchmarkID,
    schoolID,
    gradeID,
    sectionID,
    studentID,
    teacherID,
    schoolIds
  ) =>
  async (dispatch) => {
    try {
      const res = await api.get(
        `/assessmentresults/chart3/${year}/${benchmarkID}/${schoolID}/${gradeID}/${sectionID}/${studentID}/${teacherID}/${schoolIds}`
      );
      dispatch({
        type: GET_OVERALL_RESULTS_PROGRESSION_CHART,
        payload: res.data.data,
      });
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

export const getChartAverageScorePerBenchmarkCategory =
  (
    year,
    benchmarkID,
    schoolID,
    gradeID,
    sectionID,
    studentID,
    teacherID,
    schoolIds
  ) =>
  async (dispatch) => {
    try {
      const res = await api.get(
        `/assessmentresults/chart4/${year}/${benchmarkID}/${schoolID}/${gradeID}/${sectionID}/${studentID}/${teacherID}`
      );
      dispatch({
        type: GET_AVERAGE_SCORE_BENCHMARK_CATEGORY_CHART,
        payload: res.data.data,
      });
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
    console.log("test resultId", resultId, schoolID);
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
    console.log("test formData", formData);
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

export const loadStatisticLogsList =
  (value = {}) =>
  async (dispatch) => {
    try {
      const res = await api.get("/robotservices/statisticLogs", value);
      dispatch({ type: GET_STATISTICLOGSLIST, payload: res.data.data });
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

export const loadLocationsList =
  (formData = {}) =>
  async (dispatch) => {
    try {
      console.log("test formData", formData);
      const res = await api.post("/robotservices/get/locations", formData);
      console.log("test resdatata", res.data.data);
      dispatch({ type: GET_LOCATIONSLIST, payload: res.data.data });
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

export const clearSchedule = () => (dispatch) => {
  dispatch({ type: CLEAR_SCHEDULE });
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
