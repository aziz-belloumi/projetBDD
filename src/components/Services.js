import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Employees.css"; // Utilise le même CSS que le composant Employees

function Services() {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    idservice: "",
    nomservice: "",
  });

  const fetchServices = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/services");
      setServices(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des services :", error);
    }
  };

  const addService = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/services",
        formData
      );
      alert(response.data.message);
      fetchServices();
      setFormData({ idservice: "", nomservice: "" });
    } catch (error) {
      console.error("Erreur lors de l'ajout du service :", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="container">
      <h1 className="title">Gestion des Services</h1>
      <div className="form-container">
        <h2 className="form-title">Ajouter un Service</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addService();
          }}
        >
          <div className="form-grid">
            <input
              type="number"
              name="idservice"
              placeholder="ID Service"
              value={formData.idservice}
              onChange={handleChange}
              className="form-input"
              required
            />
            <input
              type="text"
              name="nomservice"
              placeholder="Nom du Service"
              value={formData.nomservice}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <button type="submit" className="submit-button">
            Ajouter le Service
          </button>
        </form>
      </div>

      <div className="form-container1">
        <h2 className="form-title">Liste des Services</h2>
        <table className="table">
          <thead>
            <tr>
              {services.length > 0 &&
                Object.keys(services[0]).map((key) => (
                  <th key={key}>{key.toUpperCase()}</th>
                ))}
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.idservice}>
                {Object.values(service).map((value, index) => (
                  <td key={index}>{value || "N/A"}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Services;
