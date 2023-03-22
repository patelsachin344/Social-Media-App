import { FRIENDFAIL, FRIENDLOAD, FRIENDSUCCESS } from "./action";

const initialState = {
  friends: [],
  friendFail: false,
  friendLoad: false,
};

export const friendsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FRIENDSUCCESS: {
      return { ...state, friends: action.payload };
    }
    case FRIENDFAIL: {
      return { ...state, friendFail: true };
    }
    case FRIENDLOAD: {
      return { ...state, friendLoad: true };
    }
    default:
      return state;
  }
};
