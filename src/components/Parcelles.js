import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Employees.css"; // Utilise le même CSS que le composant Employees

function Parcelles() {
  const [parcelles, setParcelles] = useState([]);
  const [formData, setFormData] = useState({ IDParcelle: "", IDSecteur: "" });

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
      fetchParcelles();
    } catch (error) {
      console.error("Erreur lors de l'ajout de la parcelle :", error.message);
    }
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  useEffect(() => {
    fetchParcelles();
  }, []);

  return (
    <div className="container">
      <h1 className="title">Gestion des Parcelles</h1>

      <div className="form-container">
        <h2 className="form-title">Ajouter une Parcelle</h2>
        <form onSubmit={addParcelle}>
          <div className="form-grid">
            <input
              type="number"
              name="IDParcelle"
              placeholder="ID Parcelle"
              value={formData.IDParcelle}
              onChange={handleChange}
              className="form-input"
              required
            />
            <input
              type="number"
              name="IDSecteur"
              placeholder="ID Secteur"
              value={formData.IDSecteur}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <button type="submit" className="submit-button">
            Ajouter
          </button>
        </form>
      </div>

      <div className="form-container">
        <h2 className="form-title">Liste des Parcelles</h2>
        <table className="table">
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
                  <td>{parcelle.idparcelle}</td>
                  <td>{parcelle.idsecteur}</td>
                  <td>{parcelle.nomsecteur}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  Aucune parcelle disponible
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Parcelles;
