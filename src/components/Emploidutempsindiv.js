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
    <div className="container">
      <h1 className="title">Emplois du Temps de Tous les Gardiens</h1>
      {Object.keys(groupedEmplois).length > 0 ? (
        Object.entries(groupedEmplois).map(([gardienId, data]) => (
          <div key={gardienId} className="form-container">
            <h2 className="form-title" style={{ color: "#3498db" }}>
              Emploi du temps de : {data.nom}
            </h2>
            <ul className="list-disc pl-5">
              {data.emplois.map((emploi, index) => (
                <li key={index} className="mb-2">
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
