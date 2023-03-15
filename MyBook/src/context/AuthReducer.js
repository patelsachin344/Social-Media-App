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

    default: {
      return state;
    }
  }
};
