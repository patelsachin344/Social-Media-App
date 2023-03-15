import { createContext, useReducer } from "react";
import { authReducer } from "./AuthReducer";

const inti = {
  user: null,
  isLoading: false,
  error: false,
};

export const AuthContext = createContext(inti);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, inti);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isLoading: state.isLoading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
