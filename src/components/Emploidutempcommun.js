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
      <div className="form-container">
        <h2 className="form-title">Ajouter un Emploi Commun</h2>
        <form onSubmit={addEmploi} className="form-grid">
          <select
            name="jour"
            value={formData.jour}
            onChange={handleChange}
            className="form-input"
            required
          >
            <option value="">Sélectionnez un jour</option>
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
            className="form-input"
            required
          />
          <input
            type="number"
            name="idParcelle"
            placeholder="ID Parcelle"
            value={formData.idParcelle}
            onChange={handleChange}
            className="form-input"
            required
          />
          <input
            type="number"
            name="idSecteur"
            placeholder="ID Secteur"
            value={formData.idSecteur}
            onChange={handleChange}
            className="form-input"
            required
          />
          <input
            type="text"
            name="idGardien"
            placeholder="ID Gardien"
            value={formData.idGardien}
            onChange={handleChange}
            className="form-input"
            required
          />
          <button type="submit" className="submit-button">
            Ajouter
          </button>
        </form>
      </div>

      {/* Display emplois */}
      <div className="form-container">
        <h2 className="form-title">Emploi Commun</h2>
        {emplois && Object.keys(emplois).length > 0 ? (
          Object.keys(emplois).map((secteur) => (
            <div key={secteur} className="sector-section">
              <h3 className="sector-title ">Secteur : {secteur}</h3>
              {Object.keys(emplois[secteur]).map((jour) => (
                <div key={jour} className="day-section">
                  <h4 className="day-title">Jour : {jour}</h4>
                  <table className="table">
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
    </div>
  );
}

export default Emploidutempcommun;
