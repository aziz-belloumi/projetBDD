import React, { useState, useEffect } from "react";
import "./Employees.css";

const ROLES = [
  "Vétérinaire",
  "Infirmier",
  "Gardien",
  "ChefDeSecteur",
  "Secrétaire",
  "Comptable",
  "ChefDuPersonnel",
  "Directeur"
];

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    idemploye: "",
    nom: "",
    prenom: "",
    datenaissance: "",
    lieunaissance: "",
    adresse: "",
    numerotelephone: "",
    numeroavs: "",
    nommarital: "",
    idservice: "",
    tauxoccupation: "",
    grade: "",
    role: "",
  });

  const fetchEmployees = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/employes");
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des employés:", error);
    }
  };

  const addEmployee = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/employes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      alert(data.message);
      if (response.ok) {
        fetchEmployees();
        setFormData({
          idemploye: "",
          nom: "",
          prenom: "",
          datenaissance: "",
          lieunaissance: "",
          adresse: "",
          numerotelephone: "",
          numeroavs: "",
          nommarital: "",
          idservice: "",
          tauxoccupation: "",
          grade: "",
          role: "",
        });
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'employé:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="container">
      <h1 className="title">Gestion des Employés</h1>

      <div className="form-container">
        <h2 className="form-title">Ajouter un Employé</h2>
        <form onSubmit={addEmployee}>
          <div className="form-grid">
            <input
              type="text"
              name="idemploye"
              placeholder="ID Employé"
              value={formData.idemploye}
              onChange={handleChange}
              className="form-input"
              required
            />
            <input
              type="text"
              name="nom"
              placeholder="Nom"
              value={formData.nom}
              onChange={handleChange}
              className="form-input"
              required
            />
            <input
              type="text"
              name="prenom"
              placeholder="Prénom"
              value={formData.prenom}
              onChange={handleChange}
              className="form-input"
              required
            />
            <input
              type="date"
              name="datenaissance"
              value={formData.datenaissance}
              onChange={handleChange}
              className="form-input"
            />
            <input
              type="text"
              name="lieunaissance"
              placeholder="Lieu de naissance"
              value={formData.lieunaissance}
              onChange={handleChange}
              className="form-input"
            />
            <input
              type="text"
              name="adresse"
              placeholder="Adresse"
              value={formData.adresse}
              onChange={handleChange}
              className="form-input"
            />
            <input
              type="text"
              name="numerotelephone"
              placeholder="Téléphone"
              value={formData.numerotelephone}
              onChange={handleChange}
              className="form-input"
            />
            <input
              type="text"
              name="numeroavs"
              placeholder="Numéro AVS"
              value={formData.numeroavs}
              onChange={handleChange}
              className="form-input"
            />
            <input
              type="text"
              name="nommarital"
              placeholder="Nom marital"
              value={formData.nommarital}
              onChange={handleChange}
              className="form-input"
            />
            <input
              type="number"
              name="idservice"
              placeholder="ID Service"
              value={formData.idservice}
              onChange={handleChange}
              className="form-input"
            />
            <input
              type="number"
              name="tauxoccupation"
              placeholder="Taux d'occupation (%)"
              value={formData.tauxoccupation}
              onChange={handleChange}
              className="form-input"
            />
            <input
              type="text"
              name="grade"
              placeholder="Grade"
              value={formData.grade}
              onChange={handleChange}
              className="form-input"
            />
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">Sélectionner un rôle</option>
              {ROLES.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="submit-button">
            Ajouter l'employé
          </button>
        </form>
      </div>

      <div className="table-container">
        <h2 className="form-title">Liste des Employés</h2>
        <table className="table">
          <thead>
            <tr>
              {employees.length > 0 && Object.keys(employees[0]).map((key) => (
                <th key={key}>{key.toUpperCase()}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.idemploye}>
                {Object.values(employee).map((value, index) => (
                  <td key={index}>{value || "N/A"}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Employees;