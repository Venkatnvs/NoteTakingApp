import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NoteList from "./components/NoteList";
import NoteViewEdit from "./components/NoteViewEdit";
import Login from "./components/Login";
import Register from "./components/Register";
import "./components/css/App.css";
import Header from "./components/Header_Nav";
import AuthRoutes from "./AuthRoutes";

const App = () => {

  return (
    <Router>
      <div className="main">
        <Header />
        <Routes>
          <Route element={<AuthRoutes/>}>
            <Route path="/notes" element={<NoteList />} />
            <Route path="/notes/:id" element={<NoteViewEdit />} />
          </Route>
          <Route exact path="/" element={<Navigate to='/notes'/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;