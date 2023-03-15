import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "./context/AuthContextt";
import { Home } from "./pages/Home/Home";
import { Login } from "./pages/Login/Login";
import { Profile } from "./pages/Profile/Profile";
import { Register } from "./pages/Register/Register";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <Routes>
      <Route exact path="/" element={user ? <Home /> : <Register />}></Route>
      <Route
        path="/login"
        element={user ? <Navigate to="/" /> : <Login />}
      ></Route>
      <Route
        path="/register"
        element={user ? <Navigate to="/" /> : <Register />}
      ></Route>
      <Route
        path="/profile/:username"
        element={user ? <Profile /> : <Navigate to="/register" />}
      ></Route>
    </Routes>
  );
}

export default App;
