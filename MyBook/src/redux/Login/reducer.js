import {
  GETSINGLEUSER,
  GETSINGLEUSERBYUSERNAME,
  LOGINFAIL,
  LOGINLOAD,
  LOGINSUCCESS,
  SIGNUPFAIL,
  SIGNUPLOAD,
  SIGNUPSUCCESS,
  UPLOADUSERIMG,
} from "./action";

const initialState = {
  currentUser: {},
  getUser: {},
  getUserByUsername: {},
  loading: false,
  error: false,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGINSUCCESS: {
      return { ...state, currentUser: action.payload, loading: false };
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
    case GETSINGLEUSER: {
      return { ...state, getUser: action.payload };
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
