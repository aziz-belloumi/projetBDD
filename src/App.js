import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Employees from "./components/Employees";
import Services from "./components/Services";
import Secteurs from "./components/Secteurs";
import Parcelles from "./components/Parcelles";
import Animals from "./components/Animals";

function App() {
  return (
    <Router>
      <div>
        <h1>Zoo Management System</h1>
        <nav>
          <ul>
            <li>
              <Link to="/employees">Employees</Link>
            </li>
            <li>
              <Link to="/services">Services</Link>
            </li>
            <li>
              <Link to="/secteurs">Secteurs</Link>
            </li>
            <li>
              <Link to="/parcelles">Parcelles</Link>
            </li>
            <li>
              <Link to="/animals">Animals</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/employees" element={<Employees />} />
          <Route path="/services" element={<Services />} />
          <Route path="/secteurs" element={<Secteurs />} />
          <Route path="/parcelles" element={<Parcelles />} />
          <Route path="/animals" element={<Animals />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
