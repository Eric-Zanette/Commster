import Login from "./pages/Login";
import Market from "./pages/Market";
import Post from "./pages/Post";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import { UsersProvider } from "./context/UserContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Item from "./pages/Item";
import Cart from "./pages/Cart";
import Listings from "./pages/Listings";

function App() {
  return (
    <>
      <UsersProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/market" element={<Market />} />
            <Route path="/sell" element={<Post />} />
            <Route path="/listings" element={<Listings />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/item/:id" element={<Item />} />
          </Routes>
        </Router>
      </UsersProvider>
    </>
  );
}

export default App;
