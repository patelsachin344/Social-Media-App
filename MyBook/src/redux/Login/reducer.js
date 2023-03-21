import {
  GETSINGLEUSER,
  LOGINFAIL,
  LOGINLOAD,
  LOGINSUCCESS,
  SIGNUPFAIL,
  SIGNUPLOAD,
  SIGNUPSUCCESS,
} from "./action";

const initialState = {
  currentUser: {},
  getUser: {},
  loading: false,
  error: false,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGINSUCCESS: {
      return { ...state, currentUser: action.payload };
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
    default: {
      return state;
    }
  }
};
