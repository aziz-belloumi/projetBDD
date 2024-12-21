import React, { useState, useEffect } from "react";
import axios from "axios";

function Emploidutempcommun() {
  const [emplois, setEmplois] = useState({});
  const [formData, setFormData] = useState({
    jour: "",
    heure: "",
    idParcelle: "",
    idSecteur: "",
    idGardien: "",
  });

  // Fetch emplois commun
  const fetchEmplois = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/emplois-commun"
      );
      const groupedEmplois = response.data.reduce((acc, emploi) => {
        if (!acc[emploi.nomsecteur]) {
          acc[emploi.nomsecteur] = {};
        }
        if (!acc[emploi.nomsecteur][emploi.jour]) {
          acc[emploi.nomsecteur][emploi.jour] = {};
        }
        if (!acc[emploi.nomsecteur][emploi.jour][emploi.heure]) {
          acc[emploi.nomsecteur][emploi.jour][emploi.heure] = {};
        }
        acc[emploi.nomsecteur][emploi.jour][emploi.heure][emploi.idparcelle] =
          emploi.idgardien;
        return acc;
      }, {});
      setEmplois(groupedEmplois);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des emplois :",
        error.message
      );
    }
  };

  // Add emploi commun
  const addEmploi = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/emplois-commun",
        formData
      );
      alert(response.data.message);
      setFormData({
        jour: "",
        heure: "",
        idParcelle: "",
        idSecteur: "",
        idGardien: "",
      });
      fetchEmplois();
    } catch (error) {
      if (error.response && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        console.error("Erreur lors de l'ajout de l'emploi :", error.message);
      }
    }
  };

  // Handle form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Load emplois on mount
  useEffect(() => {
    fetchEmplois();
  }, []);

  return (
    <div>
      <h1>Gestion des Emplois Commun</h1>

      {/* Form */}
      <form onSubmit={addEmploi} style={{ marginBottom: "20px" }}>
        <select
          name="jour"
          value={formData.jour}
          onChange={handleChange}
          required
          style={{ marginRight: "10px", padding: "5px" }}
        >
          <option value="" disabled>
            Sélectionnez un jour
          </option>
          <option value="Lundi">Lundi</option>
          <option value="Mardi">Mardi</option>
          <option value="Mercredi">Mercredi</option>
          <option value="Jeudi">Jeudi</option>
          <option value="Vendredi">Vendredi</option>
          <option value="Samedi">Samedi</option>
          <option value="Dimanche">Dimanche</option>
        </select>
        <input
          type="time"
          name="heure"
          placeholder="Heure"
          value={formData.heure}
          onChange={handleChange}
          required
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <input
          type="number"
          name="idParcelle"
          placeholder="ID Parcelle"
          value={formData.idParcelle}
          onChange={handleChange}
          required
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <input
          type="number"
          name="idSecteur"
          placeholder="ID Secteur"
          value={formData.idSecteur}
          onChange={handleChange}
          required
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <input
          type="text"
          name="idGardien"
          placeholder="ID Gardien"
          value={formData.idGardien}
          onChange={handleChange}
          required
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <button type="submit" style={{ padding: "5px 10px" }}>
          Ajouter
        </button>
      </form>

      {/* Display emplois */}
      <h2>Emploi Commun</h2>
      {emplois && Object.keys(emplois).length > 0 ? (
        Object.keys(emplois).map((secteur) => (
          <div key={secteur} style={{ marginBottom: "20px" }}>
            <h3>Secteur : {secteur}</h3>
            {Object.keys(emplois[secteur]).map((jour) => (
              <div key={jour}>
                <h4>Jour : {jour}</h4>
                <table
                  border="1"
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    marginBottom: "20px",
                  }}
                >
                  <thead>
                    <tr>
                      <th>Heure</th>
                      {Object.keys(
                        emplois[secteur][jour][
                          Object.keys(emplois[secteur][jour])[0]
                        ] || {}
                      ).map((parcelle) => (
                        <th key={parcelle}>Parcelle {parcelle}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(emplois[secteur][jour]).map((heure) => (
                      <tr key={heure}>
                        <td>{heure}</td>
                        {Object.keys(emplois[secteur][jour][heure] || {}).map(
                          (parcelle) => (
                            <td key={parcelle}>
                              {emplois[secteur][jour][heure][parcelle]}
                            </td>
                          )
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        ))
      ) : (
        <p>Aucun emploi commun disponible</p>
      )}
    </div>
  );
}

export default Emploidutempcommun;
