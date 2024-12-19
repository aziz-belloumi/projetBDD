import React, { useState, useEffect } from "react";
import axios from "axios";

function Secteurs() {
  const [secteurs, setSecteurs] = useState([]);
  const [formData, setFormData] = useState({
    IDSecteur: "",
    NomSecteur: "",
    IDChefDeSecteur: "",
  });

  // Fonction pour récupérer les secteurs (GET)
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

  // Fonction pour ajouter un secteur (POST)
  const addSecteur = async (e) => {
    e.preventDefault();

    // Validation simple
    if (
      !formData.IDSecteur ||
      !formData.NomSecteur ||
      !formData.IDChefDeSecteur
    ) {
      alert("Tous les champs sont requis !");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/secteurs",
        formData
      );
      alert(response.data.message);
      setFormData({ IDSecteur: "", NomSecteur: "", IDChefDeSecteur: "" }); // Réinitialiser le formulaire
      fetchSecteurs(); // Rafraîchir la liste des secteurs
    } catch (error) {
      console.error("Erreur lors de l'ajout du secteur :", error.message);
    }
  };

  // Mettre à jour les champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Charger les secteurs au premier rendu
  useEffect(() => {
    fetchSecteurs();
  }, []);

  return (
    <div>
      <h1>Gestion des Secteurs</h1>

      {/* Formulaire pour ajouter un secteur */}
      <h2>Ajouter un Secteur</h2>
      <form onSubmit={addSecteur} style={{ marginBottom: "20px" }}>
        <input
          type="number"
          name="IDSecteur"
          placeholder="ID Secteur"
          value={formData.IDSecteur}
          onChange={handleChange}
          required
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <input
          type="text"
          name="NomSecteur"
          placeholder="Nom du Secteur"
          value={formData.NomSecteur}
          onChange={handleChange}
          required
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <input
          type="text"
          name="IDChefDeSecteur"
          placeholder="ID Chef de Secteur"
          value={formData.IDChefDeSecteur}
          onChange={handleChange}
          required
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <button type="submit" style={{ padding: "5px 10px" }}>
          Ajouter
        </button>
      </form>

      {/* Tableau pour afficher les secteurs */}
      <h2>Liste des Secteurs</h2>
      <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
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
              <td style={{ padding: "8px" }}>{secteur.idsecteur}</td>
              <td style={{ padding: "8px" }}>{secteur.nomsecteur}</td>
              <td style={{ padding: "8px" }}>{secteur.idchefdesecteur}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Secteurs;
