import React, { useState, useEffect } from "react";
import axios from "axios";

function Emploidutempcommun() {
  const [emplois, setEmplois] = useState({});
  const [formData, setFormData] = useState({
    jour: "Lundi",
    heure: "08:00",
    idParcelle: "",
    idSecteur: "",
    idGardien: "",
  });

  // Fonction pour récupérer les emplois communs
  const fetchEmplois = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/emplois-commun"
      );
      const emploisOrganises = {};

      // Organiser les emplois par secteur, jour et parcelle
      response.data.forEach((emploi) => {
        if (!emploisOrganises[emploi.nomsecteur]) {
          emploisOrganises[emploi.nomsecteur] = {};
        }
        if (!emploisOrganises[emploi.nomsecteur][emploi.jour]) {
          emploisOrganises[emploi.nomsecteur][emploi.jour] = {};
        }
        if (
          !emploisOrganises[emploi.nomsecteur][emploi.jour][emploi.idparcelle]
        ) {
          emploisOrganises[emploi.nomsecteur][emploi.jour][emploi.idparcelle] =
            [];
        }
        emploisOrganises[emploi.nomsecteur][emploi.jour][
          emploi.idparcelle
        ].push({
          heure: emploi.heure,
          idGardien: emploi.idgardien,
        });
      });

      setEmplois(emploisOrganises);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des emplois :",
        error.message
      );
    }
  };

  // Fonction pour ajouter un emploi commun
  const addEmploi = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/emplois-commun", formData);
      alert("Emploi ajouté avec succès !");
      fetchEmplois(); // Rafraîchir la liste des emplois
      setFormData({
        jour: "Lundi",
        heure: "08:00",
        idParcelle: "",
        idSecteur: "",
        idGardien: "",
      });
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'emploi :", error.message);
    }
  };

  // Mettre à jour les champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Charger les emplois au premier rendu
  useEffect(() => {
    fetchEmplois();
  }, []);

  return (
    <div>
      <h1>Emploi du Temps Commun</h1>

      {/* Formulaire pour ajouter un emploi */}
      <form onSubmit={addEmploi} style={{ marginBottom: "20px" }}>
        <select
          name="jour"
          value={formData.jour}
          onChange={handleChange}
          required
        >
          <option value="Lundi">Lundi</option>
          <option value="Mardi">Mardi</option>
          <option value="Mercredi">Mercredi</option>
          <option value="Jeudi">Jeudi</option>
          <option value="Vendredi">Vendredi</option>
        </select>
        <input
          type="time"
          name="heure"
          value={formData.heure}
          onChange={handleChange}
          required
          style={{ marginRight: "10px" }}
        />
        <input
          type="number"
          name="idParcelle"
          placeholder="ID Parcelle"
          value={formData.idParcelle}
          onChange={handleChange}
          required
          style={{ marginRight: "10px" }}
        />
        <input
          type="number"
          name="idSecteur"
          placeholder="ID Secteur"
          value={formData.idSecteur}
          onChange={handleChange}
          required
          style={{ marginRight: "10px" }}
        />
        <input
          type="text"
          name="idGardien"
          placeholder="ID Gardien"
          value={formData.idGardien}
          onChange={handleChange}
          required
          style={{ marginRight: "10px" }}
        />
        <button type="submit">Ajouter</button>
      </form>

      {/* Affichage des emplois */}
      {emplois && Object.keys(emplois).length > 0 ? (
        Object.keys(emplois).map((secteur) => (
          <div key={secteur} style={{ marginBottom: "20px" }}>
            <h2>Secteur {secteur}</h2>
            {Object.keys(emplois[secteur]).map((jour) => (
              <div key={jour} style={{ marginBottom: "10px" }}>
                <h3>{jour}</h3>
                <table
                  border="1"
                  style={{ width: "100%", borderCollapse: "collapse" }}
                >
                  <thead>
                    <tr>
                      <th>Heure</th>
                      {Object.keys(emplois[secteur][jour]).map((parcelle) => (
                        <th key={parcelle}>Parcelle {parcelle}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[...Array(4)].map((_, i) => {
                      const hour = 8 + i; // Heures de 08h à 12h
                      const formattedHour = `${hour}:00-${hour + 1}:00`;
                      return (
                        <tr key={i}>
                          <td>{formattedHour}</td>
                          {Object.keys(emplois[secteur][jour]).map(
                            (parcelle) => {
                              const emploi = emplois[secteur][jour][
                                parcelle
                              ].find((e) => e.heure === `${hour}:00:00`);
                              return (
                                <td
                                  key={parcelle}
                                  style={{ textAlign: "center" }}
                                >
                                  {emploi ? emploi.idGardien : ""}
                                </td>
                              );
                            }
                          )}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        ))
      ) : (
        <p>Aucun emploi disponible</p>
      )}
    </div>
  );
}

export default Emploidutempcommun;
