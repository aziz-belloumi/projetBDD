import React, { useEffect, useState } from "react";
import axios from "axios";

function Services() {
  const [services, setServices] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = () => {
    axios
      .get("http://localhost:5000/api/services")
      .then((res) => setServices(res.data));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/services", { nom_service: name })
      .then(() => {
        fetchServices();
        alert("Service added!");
      });
  };

  return (
    <div>
      <h2>Services</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Service Name"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit">Add</button>
      </form>

      <h3>Service List</h3>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.service_id}>
              <td>{service.service_id}</td>
              <td>{service.nom_service}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Services;
