import React, { useEffect, useState } from "react";
import axios from "axios";

function Parcelles() {
  const [parcelles, setParcelles] = useState([]);

  useEffect(() => {
    fetchParcelles();
  }, []);

  const fetchParcelles = () => {
    axios
      .get("http://localhost:5000/api/parcelles") // Adjusted endpoint to fetch parcelles
      .then((res) => setParcelles(res.data));
  };

  return (
    <div>
      <h2>Parcelles</h2>
      <h3>Parcelle List</h3>
      <table border="1">
        <thead>
          <tr>
            <th>ID Parcelle</th> {/* Updated header */}
            <th>Secteur ID</th> {/* Updated header */}
          </tr>
        </thead>
        <tbody>
          {parcelles.map((parcelle) => (
            <tr key={parcelle.idparcelle}> {/* Updated key to match the column name */}
              <td>{parcelle.idparcelle}</td> {/* Updated to match 'idparcelle' */}
              <td>{parcelle.idsecteur}</td> {/* Updated to match 'idsecteur' */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Parcelles;
