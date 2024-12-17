import React, { useEffect, useState } from "react";
import axios from "axios";

function Animals() {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    fetchAnimals();
  }, []);

  const fetchAnimals = () => {
    axios
      .get("http://localhost:5000/api/animaux") // Adjusted URL for 'animaux' endpoint
      .then((res) => setAnimals(res.data));
  };

  return (
    <div>
      <h2>Animals</h2>
      <table border="1">
        <thead>
          <tr>
            <th>ID Animal</th>
            <th>Nom</th>
            <th>Espèce</th>
            <th>Parcelle ID</th>
            <th>Date Naissance</th>
            <th>Poids</th>
            <th>Taille</th>
            <th>Groupe Sanguin</th>
            <th>ID Père</th>
            <th>ID Mère</th>
            <th>Date Decés</th>
            <th>ID Parcelle</th>
          </tr>
        </thead>
        <tbody>
          {animals.map((animal) => (
            <tr key={animal.idanimal}> {/* Fixed 'id_animal' to match the returned data */}
              <td>{animal.idanimal}</td>
              <td>{animal.nom}</td>
              <td>{animal.espece}</td>
              <td>{animal.idparcelle}</td> {/* Fixed 'id_parcelle' to match the returned data */}
              <td>{animal.datennaissance}</td> {/* If you want to display the birth date */}
              <td>{animal.poids}</td>
              <td>{animal.taille}</td>
              <td>{animal.groupesanguin}</td>
              <td>{animal.idpere}</td>
              <td>{animal.idmere}</td>
              <td>{animal.datedeces}</td>
              <td>{animal.idparcelle}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Animals;
