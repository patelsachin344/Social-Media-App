import { LIKEFAIL, LIKELOAD, LIKESUCCESS } from "./action";

const initialState = {
  failLike: false,
  loadLike: false,
};

export const likeReducer = (state = initialState, action) => {
  switch (action.type) {
    case LIKESUCCESS: {
      return state;
    }
    case LIKEFAIL: {
      return { ...state, failLike: true };
    }
    case LIKELOAD: {
      return { ...state, loadLike: true };
    }
    default:
      return state;
  }
};
