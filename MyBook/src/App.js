import { useContext } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "./context/AuthContextt";
import { FriendsProfile } from "./pages/FriendsProfile/FriendsProfile";
import { Home } from "./pages/Home/Home";
import { Login } from "./pages/Login/Login";
import { Profile } from "./pages/Profile/Profile";
import { Register } from "./pages/Register/Register";

function App() {
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);
  console.log(currentUser.user ? "true" : "false");
  return (
    <Routes>
      <Route
        exact
        path="/"
        element={currentUser.user ? <Home /> : <Register />}
      ></Route>
      <Route
        path="/login"
        element={currentUser.user ? <Navigate to="/" /> : <Login />}
      ></Route>
      <Route
        path="/register"
        element={currentUser.user ? <Navigate to="/" /> : <Register />}
      ></Route>
      <Route
        path="/profile/:currentUsername"
        element={currentUser.user ? <Profile /> : <Navigate to="/register" />}
      ></Route>
      <Route
        path="/friendsprofile/:friendUsername"
        element={
          currentUser.user ? <FriendsProfile /> : <Navigate to="/register" />
        }
      ></Route>
    </Routes>
  );
}

export default App;
