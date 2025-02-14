import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Employees.css"; // Utilise le même CSS que le composant Employees

function Secteurs() {
  const [secteurs, setSecteurs] = useState([]);
  const [formData, setFormData] = useState({
    IDSecteur: "",
    NomSecteur: "",
    IDChefDeSecteur: "",
  });

  const fetchSecteurs = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/secteurs");
      setSecteurs(response.data);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des secteurs :",
        error.message
      );
    }
  };

  const addSecteur = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/secteurs",
        formData
      );
      alert(response.data.message);
      setFormData({ IDSecteur: "", NomSecteur: "", IDChefDeSecteur: "" });
      fetchSecteurs();
    } catch (error) {
      console.error("Erreur lors de l'ajout du secteur :", error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    fetchSecteurs();
  }, []);

  return (
    <div className="container">
      <h1 className="title">Gestion des Secteurs</h1>

      <div className="form-container">
        <h2 className="form-title">Ajouter un Secteur</h2>
        <form onSubmit={addSecteur}>
          <div className="form-grid">
            <input
              type="number"
              name="IDSecteur"
              placeholder="ID Secteur"
              value={formData.IDSecteur}
              onChange={handleChange}
              className="form-input"
              required
            />
            <input
              type="text"
              name="NomSecteur"
              placeholder="Nom du Secteur"
              value={formData.NomSecteur}
              onChange={handleChange}
              className="form-input"
              required
            />
            <input
              type="text"
              name="IDChefDeSecteur"
              placeholder="ID Chef de Secteur"
              value={formData.IDChefDeSecteur}
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

      <div className="form-container1">
        <h2 className="form-title">Liste des Secteurs</h2>
        <table className="table">
          <thead>
            <tr>
              <th>ID Secteur</th>
              <th>Nom Secteur</th>
              <th>ID Chef de Secteur</th>
            </tr>
          </thead>
          <tbody>
            {secteurs.map((secteur) => (
              <tr key={secteur.idsecteur}>
                <td>{secteur.idsecteur}</td>
                <td>{secteur.nomsecteur}</td>
                <td>{secteur.idchefdesecteur}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Secteurs;
