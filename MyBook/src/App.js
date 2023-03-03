import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Login } from "./pages/Login/Login";
import { Profile } from "./pages/Profile/Profile";
import { Register } from "./pages/Register/Register";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/profile/:username" element={<Profile />}></Route>
    </Routes>
  );
}

export default App;
