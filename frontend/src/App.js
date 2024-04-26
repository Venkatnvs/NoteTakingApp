import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"; // Import Routes and Route from react-router-dom
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import NoteList from "./components/NoteList";
import NoteViewEdit from "./components/NoteViewEdit";
import Login from "./components/Login";
import Register from "./components/Register";
import "./components/css/App.css";

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const PrivateRoute = ({ children }) => {
    return authenticated ? <>{children}</> : <Navigate to="/login" />;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="main">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/notes" element={<PrivateRoute><NoteList /></PrivateRoute>} />
          <Route path="/note/*" element={<PrivateRoute><NoteViewEdit /></PrivateRoute>} />
          <Route path="/" element={<PrivateRoute> <Navigate to='/notes'/></PrivateRoute>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;