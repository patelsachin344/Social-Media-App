import {
  GETCURRENTUSER,
  GETSINGLEUSERBYUSERNAME,
  LOGINFAIL,
  LOGINLOAD,
  LOGINSUCCESS,
  LOGINTRUE,
  SIGNUPFAIL,
  SIGNUPLOAD,
  SIGNUPSUCCESS,
  UPLOADUSERIMG,
} from "./action";

const initialState = {
  currentUser: {},
  logedinUserId: {},
  getUser: {},
  getUserByUsername: {},
  loading: false,
  error: false,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGINSUCCESS: {
      return { ...state, logedinUserId: action.payload };
    }
    case GETCURRENTUSER: {
      return { ...state, currentUser: action.payload };
    }
    case LOGINTRUE: {
      return state;
    }
    case LOGINFAIL: {
      return { ...state, error: true };
    }
    case LOGINLOAD: {
      return { ...state, loading: true };
    }
    case SIGNUPSUCCESS: {
      return state;
    }
    case SIGNUPFAIL: {
      return { ...state, error: true };
    }
    case SIGNUPLOAD: {
      return { ...state, loading: true };
    }

    case GETSINGLEUSERBYUSERNAME: {
      return { ...state, getUserByUsername: action.payload };
    }
    case UPLOADUSERIMG: {
      return state;
    }
    default: {
      return state;
    }
  }
};
