import React, { useEffect, useState } from "react";
import axios from "axios";

function Parcelles() {
  const [parcelles, setParcelles] = useState([]);

  useEffect(() => {
    fetchParcelles();
  }, []);

  const fetchParcelles = () => {
    axios
      .get("http://localhost:5000/api/parcelles")
      .then((res) => setParcelles(res.data));
  };

  return (
    <div>
      <h2>Parcelles</h2>
      <h3>Parcelle List</h3>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Secteur ID</th>
          </tr>
        </thead>
        <tbody>
          {parcelles.map((parcelle) => (
            <tr key={parcelle.id_parcelle}>
              <td>{parcelle.id_parcelle}</td>
              <td>{parcelle.id_secteur}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Parcelles;
