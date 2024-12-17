import React, { useEffect, useState } from "react";
import axios from "axios";

function Secteurs() {
  const [secteurs, setSecteurs] = useState([]);
  const [formData, setFormData] = useState({
    nom_secteur: "",
    fonction: "",
    chef_secteur: "",
  });

  useEffect(() => {
    fetchSecteurs();
  }, []);

  const fetchSecteurs = () => {
    axios
      .get("http://localhost:5000/api/secteurs")
      .then((res) => setSecteurs(res.data));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/api/secteurs", formData).then(() => {
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
          name="fonction"
          placeholder="Fonction"
          onChange={handleChange}
          required
        />
        <input
          name="chef_secteur"
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
            <th>Fonction</th>
            <th>Chef Secteur</th>
          </tr>
        </thead>
        <tbody>
          {secteurs.map((sec) => (
            <tr key={sec.id_secteur}>
              <td>{sec.id_secteur}</td>
              <td>{sec.nom_secteur}</td>
              <td>{sec.fonction}</td>
              <td>{sec.chef_secteur}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Secteurs;
