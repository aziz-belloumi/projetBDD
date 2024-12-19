import React, { useState, useEffect } from "react";
import axios from "axios";

function Parcelles() {
  const [parcelles, setParcelles] = useState([]);
  const [formData, setFormData] = useState({
    IDParcelle: "",
    IDSecteur: "",
  });

  // Fonction pour récupérer les parcelles
  const fetchParcelles = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/parcelles");
      setParcelles(response.data);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des parcelles :",
        error.message
      );
    }
  };

  // Fonction pour ajouter une parcelle
  const addParcelle = async (e) => {
    e.preventDefault();

    const parsedFormData = {
      IDParcelle: parseInt(formData.IDParcelle, 10),
      IDSecteur: parseInt(formData.IDSecteur, 10),
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/parcelles",
        parsedFormData
      );
      alert(response.data.message);
      setFormData({ IDParcelle: "", IDSecteur: "" });
      fetchParcelles(); // Rafraîchir la liste
    } catch (error) {
      console.error("Erreur lors de l'ajout de la parcelle :", error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    fetchParcelles();
  }, []);

  return (
    <div>
      <h1>Gestion des Parcelles</h1>

      {/* Formulaire */}
      <h2>Ajouter une Parcelle</h2>
      <form onSubmit={addParcelle} style={{ marginBottom: "20px" }}>
        <input
          type="number"
          name="IDParcelle"
          placeholder="ID Parcelle"
          value={formData.IDParcelle}
          onChange={handleChange}
          required
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <input
          type="number"
          name="IDSecteur"
          placeholder="ID Secteur"
          value={formData.IDSecteur}
          onChange={handleChange}
          required
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <button type="submit" style={{ padding: "5px 10px" }}>
          Ajouter
        </button>
      </form>

      {/* Tableau */}
      <h2>Liste des Parcelles</h2>
      <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>ID Parcelle</th>
            <th>ID Secteur</th>
            <th>Nom Secteur</th>
          </tr>
        </thead>
        <tbody>
          {parcelles.length > 0 ? (
            parcelles.map((parcelle) => (
              <tr key={parcelle.idparcelle}>
                <td style={{ padding: "8px" }}>{parcelle.idparcelle}</td>
                <td style={{ padding: "8px" }}>{parcelle.idsecteur}</td>
                <td style={{ padding: "8px" }}>{parcelle.nomsecteur}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" style={{ textAlign: "center", padding: "8px" }}>
                Aucune parcelle disponible
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Parcelles;
