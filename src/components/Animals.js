import React, { useEffect, useState } from "react";
import axios from "axios";

function Animals() {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    fetchAnimals();
  }, []);

  const fetchAnimals = () => {
    axios
      .get("http://localhost:5000/api/animals")
      .then((res) => setAnimals(res.data));
  };

  return (
    <div>
      <h2>Animals</h2>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Espèce</th>
            <th>Parcelle ID</th>
          </tr>
        </thead>
        <tbody>
          {animals.map((animal) => (
            <tr key={animal.id_animal}>
              <td>{animal.id_animal}</td>
              <td>{animal.nom}</td>
              <td>{animal.espece}</td>
              <td>{animal.id_parcelle}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Animals;
