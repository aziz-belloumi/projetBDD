import React, { useEffect, useState } from "react";
import axios from "axios";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    code_employe: "",
    nom: "",
    prenom: "",
    date_naissance: "",
    lieu_naissance: "",
    adresse: "",
    numero_telephone: "",
    numero_AVS: "",
    nom_marital: "",
    service_id: "",
    taux_occupation: "",
    grade: "",
  });

  // Fetch employees
  useEffect(() => {
    axios.get("http://localhost:5000/api/employees").then((res) => {
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
      .post("http://localhost:5000/api/employees", formData)
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
          name="code_employe"
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
          name="date_naissance"
          placeholder="Date de Naissance"
          type="date"
          onChange={handleChange}
        />
        <input
          name="lieu_naissance"
          placeholder="Lieu de Naissance"
          onChange={handleChange}
        />
        <input name="adresse" placeholder="Adresse" onChange={handleChange} />
        <input
          name="numero_telephone"
          placeholder="Numéro de Téléphone"
          onChange={handleChange}
        />
        <input
          name="numero_AVS"
          placeholder="Numéro AVS"
          onChange={handleChange}
        />
        <input
          name="nom_marital"
          placeholder="Nom Marital"
          onChange={handleChange}
        />
        <input
          name="service_id"
          placeholder="Service ID"
          type="number"
          onChange={handleChange}
          required
        />
        <input
          name="taux_occupation"
          placeholder="Taux Occupation"
          type="number"
          step="0.01"
          onChange={handleChange}
        />
        <input name="grade" placeholder="Grade" onChange={handleChange} />
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
            <th>Taux Occupation</th>
            <th>Grade</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.code_employe}>
              <td>{emp.code_employe}</td>
              <td>{emp.nom}</td>
              <td>{emp.prenom}</td>
              <td>{emp.date_naissance || "N/A"}</td>
              <td>{emp.lieu_naissance || "N/A"}</td>
              <td>{emp.adresse || "N/A"}</td>
              <td>{emp.numero_telephone || "N/A"}</td>
              <td>{emp.numero_AVS || "N/A"}</td>
              <td>{emp.nom_marital || "N/A"}</td>
              <td>{emp.service_id}</td>
              <td>{emp.taux_occupation || "N/A"}</td>
              <td>{emp.grade || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Employees;
