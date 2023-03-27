import {
  FRIENDFAIL,
  FRIENDLOAD,
  FRIENDSUCCESS,
  GETALLUSER,
  GETALLUSERFAIL,
  GETCURRENTUSERLOAD,
} from "./action";

const initialState = {
  friends: [],
  friendFail: false,
  friendLoad: false,
  getAllUsers: [],
  getAllUsersFail: false,
  getAllUsersLoad: false,
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
    case GETALLUSER: {
      return { ...state, getAllUsers: action.payload };
    }
    case GETALLUSERFAIL: {
      return { ...state, getAllUsersFail: true };
    }
    case GETCURRENTUSERLOAD: {
      return { ...state, getAllUsersLoad: true };
    }
    default:
      return state;
  }
};
