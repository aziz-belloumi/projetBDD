import React, { useEffect, useState } from "react";
import axios from "axios";

function Secteurs() {
  const [secteurs, setSecteurs] = useState([]);
  const [formData, setFormData] = useState({
    nomsecteur: "",
    description: "", // Adjusted for 'description' column
    codechef: "", // Adjusted for 'CodeChef' (foreign key to Employe)
  });

  useEffect(() => {
    fetchSecteurs();
  }, []);

  const fetchSecteurs = () => {
    axios
      .get("http://localhost:5000/api/secteurs") // Ensure the correct endpoint for fetching secteurs
      .then((res) => setSecteurs(res.data));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/secteurs", formData) // Corrected the POST request to match schema
      .then(() => {
        fetchSecteurs();
        alert("Secteur added!");
      });
  };

  return (
    <div>
      <h2>Secteurs</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="nom_secteur"
          placeholder="Nom Secteur"
          onChange={handleChange}
          required
        />
        <input
          name="description"
          placeholder="Description"
          onChange={handleChange}
        />
        <input
          name="code_chef"
          placeholder="Chef Secteur Code"
          onChange={handleChange}
          required
        />
        <button type="submit">Add</button>
      </form>

      <h3>Secteur List</h3>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Description</th> {/* Updated column header */}
            <th>Chef Secteur</th> {/* Updated to match the 'CodeChef' column */}
          </tr>
        </thead>
        <tbody>
          {secteurs.map((sec) => (
            <tr key={sec.idsecteur}> {/* Fixed the 'id_secteur' to 'idsecteur' */}
              <td>{sec.idsecteur}</td> {/* Updated to match 'idsecteur' */}
              <td>{sec.nomsecteur}</td> {/* Updated to match 'nomsecteur' */}
              <td>{sec.description}</td> {/* Added description column */}
              <td>{sec.codechef}</td> {/* Updated to match 'codechef' */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Secteurs;
