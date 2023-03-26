import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";

import { FriendsProfile } from "./pages/FriendsProfile/FriendsProfile";
import { Home } from "./pages/Home/Home";
import { Login } from "./pages/Login/Login";
import { Profile } from "./pages/Profile/Profile";
import { Register } from "./pages/Register/Register";
import { getCurrentUser, logedinUser } from "./redux/Login/action";

function App() {
  const { currentUser, logedinUserId } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  console.log(currentUser, "from app");
  console.log(logedinUserId?.user?._id, "from app");
  console.log(currentUser.user ? "true" : "false");

  useEffect(() => {
    dispatch(logedinUser());
    dispatch(getCurrentUser(logedinUserId.user?._id));
  }, []);
  useEffect(() => {
    dispatch(getCurrentUser(logedinUserId.user?._id));
  }, [logedinUserId]);

  return (
    <Routes>
      <Route
        exact
        path="/"
        element={currentUser.username ? <Home /> : <Login />}
      ></Route>
      <Route
        path="/login"
        element={currentUser.username ? <Navigate to="/" /> : <Login />}
      ></Route>
      <Route
        path="/register"
        element={currentUser.username ? <Navigate to="/" /> : <Register />}
      ></Route>
      <Route
        path="/profile/:currentUsername"
        element={currentUser.username ? <Profile /> : <Navigate to="/login" />}
      ></Route>
      <Route
        path="/friendsprofile/:friendUsername"
        element={
          currentUser.username ? <FriendsProfile /> : <Navigate to="/login" />
        }
      ></Route>
    </Routes>
  );
}

export default App;
