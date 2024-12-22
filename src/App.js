import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import Employees from "./components/Employees";
import Secteurs from "./components/Secteurs";
import Parcelles from "./components/Parcelles";
import Animals from "./components/Animals";
import Emploidutempcommun from "./components/Emploidutempcommun";
import Emploidutempsindiv from "./components/Emploidutempsindiv";
import Services from "./components/Services";
import './App.css'; // Assuming you have a CSS file for styling

function App() {
  return (
    <Router>
      <div className="app-container">
        <header>
          <h1>Zoo Management System</h1>
        </header>
        <nav className="navbar">
          <ul>
            <li>
              <NavLink to="/employees" className="nav-link" activeClassName="active-link">Employees</NavLink>
            </li>
            <li>
              <NavLink to="/services" className="nav-link" activeClassName="active-link">Services</NavLink>
            </li>
            <li>
              <NavLink to="/secteurs" className="nav-link" activeClassName="active-link">Secteurs</NavLink>
            </li>
            <li>
              <NavLink to="/parcelles" className="nav-link" activeClassName="active-link">Parcelles</NavLink>
            </li>
            <li>
              <NavLink to="/animals" className="nav-link" activeClassName="active-link">Animals</NavLink>
            </li>
            <li>
              <NavLink to="/emploicommun" className="nav-link" activeClassName="active-link">Emploi Commun</NavLink>
            </li>
            <li>
              <NavLink to="/emploiindiv" className="nav-link" activeClassName="active-link">Emploi Individuel</NavLink>
            </li>
          </ul>
        </nav>
        <main>
          <Routes>
            <Route path="/employees" element={<Employees />} />
            <Route path="/secteurs" element={<Secteurs />} />
            <Route path="/parcelles" element={<Parcelles />} />
            <Route path="/animals" element={<Animals />} />
            <Route path="/emploicommun" element={<Emploidutempcommun />} />
            <Route path="/emploiindiv" element={<Emploidutempsindiv />} />
            <Route path="/services" element={<Services />} />
            <Route path="*" element={<h2>Page Not Found</h2>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
