import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import ReactDOM from "react-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap/dist/js/bootstrap.js';
import User from "./pages/User";
import Task from "./pages/Task";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route exact path="*" element={<User />} />
        <Route exact path="/task" element={<Task />} />
        <Route exact path="/task/:schedule" element={<Task />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
