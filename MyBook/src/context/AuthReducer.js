export const authReducer = (state, action) => {
  switch (action.type) {
    case "LoginLoading": {
      return {
        user: null,
        isLoading: true,
        error: false,
      };
    }
    case "LoginSuccess": {
      return {
        user: action.payload,
        isLoading: false,
        error: false,
      };
    }
    case "LoginError": {
      return {
        user: null,
        isLoading: false,
        error: action.payload,
      };
    }
    case "FollowSuccess": {
      return {
        ...state,
        user: {
          ...state.user,
          followings: [...state.user.followings, action.payload],
        },
      };
    }
    case "UnFollowSuccess": {
      return {
        ...state,
        user: {
          ...state.user,
          followings: state.user.followings?.filter(
            (following) => following !== action.payload
          ),
        },
      };
    }

    default: {
      return state;
    }
  }
};
