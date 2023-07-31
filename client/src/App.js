import Login from "./pages/Login";
import Market from "./pages/Market";
import Post from "./pages/Post";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import { UsersProvider } from "./context/UserContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <UsersProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/market" element={<Market />} />
            <Route path="/post" element={<Post />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Router>
      </UsersProvider>
    </>
  );
}

export default App;