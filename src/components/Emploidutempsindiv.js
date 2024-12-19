import React, { useEffect, useState } from "react";
import axios from "axios";

const Emploidutempsindiv = () => {
  const [emplois, setEmplois] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/emplois-du-temps"); // Appel à l'API avec Axios
        console.log("Données reçues :", response.data); // Log des données
        setEmplois(response.data); // Stocker les données dans l'état
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des emplois du temps :",
          error
        );
      }
    };

    fetchData();
  }, []);

  // Grouper les emplois par gardien
  const emploisParGardien = emplois.reduce((acc, emploi) => {
    if (!acc[emploi.nomgardien]) {
      acc[emploi.nomgardien] = [];
    }
    acc[emploi.nomgardien].push(emploi);
    return acc;
  }, {});

  return (
    <div>
      <h1>Emplois du Temps des Gardiens</h1>
      {Object.keys(emploisParGardien).length === 0 ? (
        <p>Aucun emploi du temps à afficher.</p>
      ) : (
        Object.keys(emploisParGardien).map((gardien, index) => (
          <div
            key={index}
            style={{
              border: "1px solid black",
              margin: "10px",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            <h2>Emploi du temps de : {gardien}</h2>
            {emploisParGardien[gardien].map((emploi, idx) => (
              <p key={idx}>
                <strong>{emploi.jour} :</strong> secteur {emploi.nomsecteur},
                parcelles {emploi.parcelles}
              </p>
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default Emploidutempsindiv;
