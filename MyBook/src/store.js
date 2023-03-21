import { applyMiddleware, legacy_createStore as createstore } from "redux";
import thunk from "redux-thunk";
import { userReducer } from "./redux/Login/reducer";

export const store = createstore(userReducer, applyMiddleware(thunk));
