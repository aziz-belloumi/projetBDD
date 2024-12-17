import React, { useEffect, useState } from "react";
import axios from "axios";

function Secteurs() {
  const [secteurs, setSecteurs] = useState([]);
  const [formData, setFormData] = useState({
    NomSecteur: "",
    Description: "",
    CodeChef: "", 
  });

  useEffect(() => {
    fetchSecteurs();
  }, []);

  const fetchSecteurs = () => {
    axios
      .get("http://localhost:5000/api/secteurs")
      .then((res) => setSecteurs(res.data));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/secteurs", formData)
      .then(() => {
        fetchSecteurs(); // Refresh data
        alert("Secteur added successfully!");
      })
      .catch((error) => {
        console.error("Error adding secteur:", error.response || error.message);
        alert("Failed to add secteur. Please check your input and try again.");
      });
  };

  return (
    <div>
      <h2>Secteurs</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="NomSecteur"
          placeholder="Nom du Secteur"
          value={formData.NomSecteur}
          onChange={(e) =>
            setFormData({ ...formData, NomSecteur: e.target.value })
          }
        />

        <textarea
          name="Description"
          placeholder="Description"
          value={formData.Description}
          onChange={(e) =>
            setFormData({ ...formData, Description: e.target.value })
          }
        />

        <input
          type="text"
          name="CodeChef"
          placeholder="Code Chef"
          value={formData.CodeChef}
          onChange={(e) =>
            setFormData({ ...formData, CodeChef: e.target.value })
          }
        />

        <button type="submit">Add</button>
      </form>

      <h3>Secteur List</h3>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Description</th> {/* Updated column header */}
            <th>Chef Secteur</th> {/* Updated to match the 'CodeChef' column */}
          </tr>
        </thead>
        <tbody>
          {secteurs.map((sec) => (
            <tr key={sec.idsecteur}>
              {" "}
              {/* Fixed the 'id_secteur' to 'idsecteur' */}
              <td>{sec.idsecteur}</td> {/* Updated to match 'idsecteur' */}
              <td>{sec.nomsecteur}</td> {/* Updated to match 'nomsecteur' */}
              <td>{sec.description}</td> {/* Added description column */}
              <td>{sec.codechef}</td> {/* Updated to match 'codechef' */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Secteurs;
