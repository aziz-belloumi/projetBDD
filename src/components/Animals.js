import React, { useEffect, useState } from "react";
import axios from "axios";

function Animals() {
  const [animals, setAnimals] = useState([]);
  const [formData, setFormData] = useState({
    Nom: "",
    Espece: "",
    DateNaissance: "",
    Poids: "",
    Taille: "",
    GroupeSanguin: "",
    IDPere: "",
    IDMere: "",
    DateDeces: "",
    IDParcelle: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/animals", formData);
      alert("Animal added successfully!");
    } catch (error) {
      console.error("Error posting animal:", error);
      alert("Failed to add animal.");
    }
  };

  useEffect(() => {
    fetchAnimals();
  }, []);

  const fetchAnimals = () => {
    axios
      .get("http://localhost:5000/api/animaux") // Adjusted URL for 'animaux' endpoint
      .then((res) => setAnimals(res.data));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Post New Animal</h2>
        <input
          type="text"
          name="Nom"
          placeholder="Nom"
          value={formData.Nom}
          onChange={handleChange}
        />
        <input
          type="text"
          name="Espece"
          placeholder="Espece"
          value={formData.Espece}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="DateNaissance"
          placeholder="Date de Naissance"
          value={formData.DateNaissance}
          onChange={handleChange}
        />
        <input
          type="number"
          step="0.01"
          name="Poids"
          placeholder="Poids (kg)"
          value={formData.Poids}
          onChange={handleChange}
        />
        <input
          type="number"
          step="0.01"
          name="Taille"
          placeholder="Taille (cm)"
          value={formData.Taille}
          onChange={handleChange}
        />
        <input
          type="text"
          name="GroupeSanguin"
          placeholder="Groupe Sanguin"
          value={formData.GroupeSanguin}
          onChange={handleChange}
        />
        <input
          type="number"
          name="IDPere"
          placeholder="ID Père"
          value={formData.IDPere}
          onChange={handleChange}
        />
        <input
          type="number"
          name="IDMere"
          placeholder="ID Mère"
          value={formData.IDMere}
          onChange={handleChange}
        />
        <input
          type="date"
          name="DateDeces"
          placeholder="Date de Décès"
          value={formData.DateDeces}
          onChange={handleChange}
        />
        <input
          type="number"
          name="IDParcelle"
          placeholder="ID Parcelle"
          value={formData.IDParcelle}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit</button>
      </form>
      <h2>Animals</h2>
      <table border="1">
        <thead>
          <tr>
            <th>ID Animal</th>
            <th>Nom</th>
            <th>Espèce</th>
            <th>Parcelle ID</th>
            <th>Date Naissance</th>
            <th>Poids</th>
            <th>Taille</th>
            <th>Groupe Sanguin</th>
            <th>ID Père</th>
            <th>ID Mère</th>
            <th>Date Decés</th>
            <th>ID Parcelle</th>
          </tr>
        </thead>
        <tbody>
          {animals.map((animal) => (
            <tr key={animal.idanimal}>
              {" "}
              {/* Fixed 'id_animal' to match the returned data */}
              <td>{animal.idanimal}</td>
              <td>{animal.nom}</td>
              <td>{animal.espece}</td>
              <td>{animal.idparcelle}</td>{" "}
              {/* Fixed 'id_parcelle' to match the returned data */}
              <td>{animal.datennaissance}</td>{" "}
              {/* If you want to display the birth date */}
              <td>{animal.poids}</td>
              <td>{animal.taille}</td>
              <td>{animal.groupesanguin}</td>
              <td>{animal.idpere}</td>
              <td>{animal.idmere}</td>
              <td>{animal.datedeces}</td>
              <td>{animal.idparcelle}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Animals;
