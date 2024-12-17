import React, { useEffect, useState } from "react";
import axios from "axios";

function Parcelles() {
  const [parcelles, setParcelles] = useState([]);
  const [formData, setFormData] = useState({
    IDSecteur: "",
    NumeroParcelle: "",
  });

  useEffect(() => {
    fetchParcelles();
  }, []);

  // Fetch existing parcelles
  const fetchParcelles = () => {
    axios
      .get("http://localhost:5000/api/parcelles")
      .then((res) => setParcelles(res.data))
      .catch((err) => console.error("Error fetching parcelles:", err));
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission to add parcelle
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/parcelles", formData) // Adjusted to match your API
      .then(() => {
        fetchParcelles(); // Refresh the parcelle list
        alert("Parcelle added successfully!");
        setFormData({ IDSecteur: "", NumeroParcelle: "" }); // Reset the form
      })
      .catch((err) => {
        console.error("Error adding parcelle:", err);
        alert("Failed to add parcelle.");
      });
  };

  return (
    <div>
      <h2>Parcelles</h2>

      {/* Form to Add Parcelle */}
      <h3>Add New Parcelle</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>IDSecteur:</label>
          <input
            type="number"
            name="IDSecteur"
            value={formData.IDSecteur}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>NumeroParcelle:</label>
          <input
            type="number"
            name="NumeroParcelle"
            value={formData.NumeroParcelle}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Add Parcelle</button>
      </form>

      {/* Table to Display Parcelles */}
      <h3>Parcelle List</h3>
      <table border="1">
        <thead>
          <tr>
            <th>ID Parcelle</th>
            <th>Secteur ID</th>
            <th>Numero Parcelle</th>
          </tr>
        </thead>
        <tbody>
          {parcelles.map((parcelle) => (
            <tr key={parcelle.idparcelle}>
              <td>{parcelle.idparcelle}</td>
              <td>{parcelle.idsecteur}</td>
              <td>{parcelle.numeroparcelle}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Parcelles;
