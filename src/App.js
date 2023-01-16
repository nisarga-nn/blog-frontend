import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import ListBlogs from "./components/ListBlogs";
import AddBlog from "./components/AddBlog";
import Login from "./components/Login";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import EditBlog from "./components/EditBlog";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<ListBlogs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/add" element={<AddBlog />} />
            <Route path="/edit/:id" element={<EditBlog />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
