import React, { useEffect, useState } from "react";
import axios from "axios";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    codeemploye: "",
    nom: "",
    prenom: "",
    datenaissance: "",
    lieunaissance: "",
    adresse: "",
    numerotelephone: "",
    numeroAVS: "",
    nommarital: "",
    typeservice: "", // Updated to match PostgreSQL column 'TypeService'
    poste: "",
  });

  // Fetch employees
  useEffect(() => {
    axios.get("http://localhost:5000/api/employes") // Adjusted the endpoint for 'employes'
      .then((res) => {
        setEmployees(res.data);
      });
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData); // Verify form data before sending

    axios
      .post("http://localhost:5000/api/employes", formData)
      .then(() => {
        alert("Employee added successfully!");
        window.location.reload();
      })
      .catch((err) => {
        console.error("Error adding employee:", err.response || err.message);
      });
  };

  return (
    <div>
      <h2>Employees</h2>

      {/* Form to Add Employee */}
      <form onSubmit={handleSubmit}>
        <input
          name="codeemploye"
          placeholder="Code Employe"
          onChange={handleChange}
          required
        />
        <input name="nom" placeholder="Nom" onChange={handleChange} required />
        <input
          name="prenom"
          placeholder="Prenom"
          onChange={handleChange}
          required
        />
        <input
          name="datenaissance"
          placeholder="Date de Naissance"
          type="date"
          onChange={handleChange}
        />
        <input
          name="lieunaissance"
          placeholder="Lieu de Naissance"
          onChange={handleChange}
        />
        <input name="adresse" placeholder="Adresse" onChange={handleChange} />
        <input
          name="numerotelephone"
          placeholder="Numéro de Téléphone"
          onChange={handleChange}
        />
        <input
          name="numeroAVS"
          placeholder="Numéro AVS"
          onChange={handleChange}
        />
        <input
          name="nommarital"
          placeholder="Nom Marital"
          onChange={handleChange}
        />
        <input
          name="typeservice"
          placeholder="Type de Service (Administratif, Surveillance, Medical)"
          onChange={handleChange}
          required
        />
        <input
          name="poste"
          placeholder="Poste"
          onChange={handleChange}
          required
        />
        <button type="submit">Add Employee</button>
      </form>

      {/* Display Employees */}
      <h3>Employee List</h3>
      <table border="1">
        <thead>
          <tr>
            <th>Code</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Date Naissance</th>
            <th>Lieu Naissance</th>
            <th>Adresse</th>
            <th>Téléphone</th>
            <th>AVS</th>
            <th>Nom Marital</th>
            <th>Service</th>
            <th>Poste</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.code_employe}>
              <td>{emp.codeemploye}</td>
              <td>{emp.nom}</td>
              <td>{emp.prenom}</td>
              <td>{emp.datenaissance || "N/A"}</td>
              <td>{emp.lieunaissance || "N/A"}</td>
              <td>{emp.adresse || "N/A"}</td>
              <td>{emp.numerotelephone || "N/A"}</td>
              <td>{emp.numeroavs || "N/A"}</td>
              <td>{emp.nommarital || "N/A"}</td>
              <td>{emp.typeservice || "N/A"}</td>
              <td>{emp.poste || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Employees;
