import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createstore,
} from "redux";
import thunk from "redux-thunk";
import { friendsReducer } from "./redux/Friends/reducer";
import { userReducer } from "./redux/Login/reducer";
import { postReducer } from "./redux/Post/reducer";
const reducer = combineReducers({
  user: userReducer,
  post: postReducer,
  friends: friendsReducer,
});

export const store = createstore(reducer, applyMiddleware(thunk));
