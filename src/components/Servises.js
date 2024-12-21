import React, { useState, useEffect } from "react";
import axios from "axios";

function Services() {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    idservice: "",
    nomservice: "",
  });

  // Fonction pour récupérer les services
  const fetchServices = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/services");
      setServices(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des services :", error);
    }
  };

  // Fonction pour ajouter un service
  const addService = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/services",
        formData
      );
      alert(response.data.message);
      fetchServices(); // Rafraîchir la liste des services
      setFormData({
        idservice: "",
        nomservice: "",
      });
    } catch (error) {
      console.error("Erreur lors de l'ajout du service :", error);
    }
  };

  // Mettre à jour les données du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Charger les services au chargement du composant
  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div>
      <h1>Gestion des Services</h1>

      {/* Formulaire pour ajouter un service */}
      <h2>Ajouter un Service</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addService();
        }}
      >
        <input
          type="number"
          name="idservice"
          placeholder="ID Service"
          value={formData.idservice}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="nomservice"
          placeholder="Nom du Service"
          value={formData.nomservice}
          onChange={handleChange}
          required
        />
        <button type="submit">Ajouter</button>
      </form>

      {/* Liste des services */}
      <h2>Liste des Services</h2>
      <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {/* En-têtes du tableau (les clés de l'objet service) */}
            {services.length > 0 &&
              Object.keys(services[0]).map((key) => (
                <th key={key} style={{ padding: "8px", textAlign: "left" }}>
                  {key.toUpperCase()}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {/* Contenu du tableau */}
          {services.map((service) => (
            <tr key={service.idservice}>
              {Object.values(service).map((value, index) => (
                <td key={index} style={{ padding: "8px" }}>
                  {value || "N/A"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Services;
