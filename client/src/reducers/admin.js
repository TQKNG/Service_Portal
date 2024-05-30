import {
  GET_USER,
  GET_USERSLIST,
  CLEAR_USER,
  CLEAR_ADMIN,
  CLEAR_ITEMS,
  GET_RECEPTION,
  GET_RECEPTIONSLIST,
  CLEAR_RECEPTION,
  GET_SONG,
  GET_SONGSLIST,
  CLEAR_SONG,
  GET_BOOK,
  GET_BOOKSLIST,
  CLEAR_BOOK,
  GET_JOKE,
  GET_JOKESLIST,
  CLEAR_JOKE,
  GET_TRIVIA,
  GET_TRIVIASLIST,
  CLEAR_TRIVIA,
  GET_SETTING,
  GET_SETTINGSLIST,
  CLEAR_SETTING,
  GET_LOCATION,
  GET_LOCATIONSLIST,
  CLEAR_LOCATION,
  GET_STATISTICLOG,
  GET_STATISTICLOGSLIST,
  CLEAR_STATISTICLOG,
  GET_SCHEDULE,
  GET_SCHEDULESLIST,
  CLEAR_SCHEDULE,
} from "../actions/types";

const initialState = {
  usersList: [],
  user: null,
  usersListLoading: true,
  userLoading: true,

  resultsList: [],
  result: null,
  resultListLoading: true,
  resultLoading: true,

  receptionsList: [],
  reception: null,
  receptionListLoading: true,
  receptionLoading: true,

  statisticlogsList: [],
  statisticlog: null,
  statisticlogListLoading: true,
  statisticlogLoading: true,

  locationsList: [],
  location: null,
  locationListLoading: true,
  locationLoading: true,

  songsList: [],
  song: null,
  songListLoading: true,
  songLoading: true,

  booksList: [],
  book: null,
  bookListLoading: true,
  bookLoading: true,

  jokesList: [],
  joke: null,
  jokeListLoading: true,
  jokeLoading: true,

  triviasList: [],
  trivia: null,
  triviaListLoading: true,
  triviaLoading: true,

  schedulesList: [],
  schedule: null,
  scheduleListLoading: true,
  scheduleLoading: true,

  settingsList: [],
  setting: null,
  settingListLoading: true,
  settingLoading: true,
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

    case GET_RECEPTIONSLIST:
      console.log("test payload", payload)
      return { ...state, receptionsList: payload, receptionListLoading: false };
    case GET_RECEPTION:
      return { ...state, reception: payload, receptionLoading: false };
    case CLEAR_RECEPTION:
      return { ...state, reception: null, receptionLoading: true };

    case GET_STATISTICLOGSLIST:
      return {
        ...state,
        statisticlogsList: payload,
        statisticlogListLoading: false,
      };
    case GET_STATISTICLOG:
      return { ...state, statisticlog: payload, statisticlogLoading: false };
    case CLEAR_STATISTICLOG:
      return { ...state, statisticlog: null, statisticlogLoading: true };

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

    case GET_JOKESLIST:
      return { ...state, jokesList: payload, jokeListLoading: false };
    case GET_JOKE:
      return { ...state, joke: payload, jokeLoading: false };
    case CLEAR_JOKE:
      return { ...state, joke: null, jokeLoading: true };

    case GET_TRIVIASLIST:
      return { ...state, triviasList: payload, triviaListLoading: false };
    case GET_TRIVIA:
      return { ...state, trivia: payload, triviaLoading: false };
    case CLEAR_TRIVIA:
      return { ...state, trivia: null, triviaLoading: true };

    case GET_SCHEDULESLIST:
      return { ...state, schedulesList: payload, scheduleListLoading: false };
    case GET_SCHEDULE:
      return { ...state, schedule: payload, scheduleLoading: false };
    case CLEAR_SCHEDULE:
      return { ...state, schedule: null, scheduleLoading: true };

    case GET_SETTINGSLIST:
      return { ...state, settingsList: payload, settingListLoading: false };
    case GET_SETTING:
      return { ...state, setting: payload, settingLoading: false };
    case CLEAR_SETTING:
      return { ...state, setting: null, settingLoading: true };

    case GET_LOCATIONSLIST:
      return { ...state, locationsList: payload, locationListLoading: false };
    case GET_LOCATION:
      return { ...state, location: payload, locationLoading: false };
    case CLEAR_LOCATION:
      return { ...state, location: null, locationLoading: true };

    case CLEAR_ADMIN:
      return {
        usersList: [],
        user: null,
        usersListLoading: true,
        userLoading: true,

        receptionsList: [],
        reception: null,
        receptionListLoading: true,
        receptionLoading: true,

        statisticlogsList: [],
        statisticlog: null,
        statisticlogListLoading: true,
        statisticlogLoading: true,

        songsList: [],
        song: null,
        songListLoading: true,
        songLoading: true,

        booksList: [],
        book: null,
        bookListLoading: true,
        bookLoading: true,

        jokesList: [],
        joke: null,
        jokeListLoading: true,
        jokeLoading: true,

        triviasList: [],
        trivia: null,
        triviaListLoading: true,
        triviaLoading: true,

        schedulesList: [],
        schedule: null,
        scheduleListLoading: true,
        scheduleLoading: true,

        settingsList: [],
        setting: null,
        settingListLoading: true,
        settingLoading: true,

        locationsList: [],
        location: null,
        locationListLoading: true,
        locationLoading: true,
      };
    case CLEAR_ITEMS:
      return {
        ...state,
        user: null,
        userLoading: true,

        reception: null,
        receptionLoading: true,

        statisticlog: null,
        statisticlogLoading: true,

        song: null,
        songLoading: true,

        book: null,
        bookLoading: true,

        joke: null,
        jokeLoading: true,

        trivia: null,
        triviaLoading: true,

        schedule: null,
        scheduleLoading: true,

        setting: null,
        settingLoading: true,

        location: null,
        locationLoading: true,
      };
    default:
      return state;
  }
}
