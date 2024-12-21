import React, { useState, useEffect } from "react";
import axios from "axios";

function Emploidutempsindiv() {
  const [emplois, setEmplois] = useState([]);

  // Fonction pour récupérer tous les emplois
  const fetchEmplois = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/emplois-tous-gardiens"
      );
      setEmplois(response.data);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des emplois :",
        error.message
      );
    }
  };

  // Charger les emplois au premier rendu
  useEffect(() => {
    fetchEmplois();
  }, []);

  // Grouper les emplois par gardien
  const groupByGardien = (emplois) => {
    return emplois.reduce((grouped, emploi) => {
      const gardienId = emploi.idgardien;
      if (!grouped[gardienId]) {
        grouped[gardienId] = {
          nom: `${emploi.nomgardien} ${emploi.prenomgardien}`,
          emplois: [],
        };
      }
      grouped[gardienId].emplois.push(emploi);
      return grouped;
    }, {});
  };

  const groupedEmplois = groupByGardien(emplois);

  return (
    <div>
      <h1>Emplois du Temps de Tous les Gardiens</h1>
      {Object.keys(groupedEmplois).length > 0 ? (
        Object.entries(groupedEmplois).map(([gardienId, data]) => (
          <div
            key={gardienId}
            style={{
              border: "1px solid black",
              padding: "10px",
              marginBottom: "20px",
            }}
          >
            <h2>Emploi du temps de : {data.nom}</h2>
            <ul>
              {data.emplois.map((emploi, index) => (
                <li key={index}>
                  <strong>{emploi.jour} :</strong> secteur {emploi.nomsecteur} :
                  parcelles {emploi.parcelles.join(" - ")}
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>Aucun emploi du temps disponible.</p>
      )}
    </div>
  );
}

export default Emploidutempsindiv;
