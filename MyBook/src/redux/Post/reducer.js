import {
  POSTFAIL,
  POSTLOAD,
  POSTSUCCESS,
  UPLOADFAIL,
  UPLOADING,
  UPLOADSUCCESS,
} from "./action";

const initialState = {
  posts: [],
  postFail: false,
  postLoad: false,
  uploadFail: false,
  uploading: false,
};

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case POSTSUCCESS: {
      return { ...state, posts: action.payload };
    }
    case POSTFAIL: {
      return { ...state, postFail: true };
    }
    case POSTLOAD: {
      return { ...state, postLoad: true };
    }
    case UPLOADSUCCESS: {
      return state;
    }
    case UPLOADFAIL: {
      return { ...state, uploadFail: true };
    }
    case UPLOADING: {
      return { ...state, uploading: true };
    }
    default:
      return state;
  }
};
