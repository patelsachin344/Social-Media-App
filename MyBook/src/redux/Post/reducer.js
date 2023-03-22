import { POSTFAIL, POSTLOAD, POSTSUCCESS } from "./action";

const initialState = {
  post: [],
  postFail: false,
  postLoad: false,
};

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case POSTSUCCESS: {
      return { ...state, post: action.payload };
    }
    case POSTFAIL: {
      return { ...state, postFail: true };
    }
    case POSTLOAD: {
      return { ...state, postLoad: true };
    }
    default:
      return state;
  }
};
