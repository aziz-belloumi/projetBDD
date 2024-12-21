import React, { useState, useEffect } from "react";
import axios from "axios";

function Employees() {
  const [employes, setEmployes] = useState([]);
  const [formData, setFormData] = useState({
    idemploye: "",
    nom: "",
    prenom: "",
    datenaissance: "",
    lieunaissance: "",
    adresse: "",
    numerotelephone: "",
    numeroavs: "",
    nommarital: "",
    idservice: "",
    tauxoccupation: "",
    grade: "",
    role: "",
  });

  // Fonction pour récupérer les employés (GET)
  const fetchEmployes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/employes");
      setEmployes(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des employés :", error);
    }
  };

  // Fonction pour ajouter un employé (POST)
  const addEmploye = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/employes",
        formData
      );
      alert(response.data.message);
      fetchEmployes(); // Rafraîchir la liste des employés
      setFormData({
        idemploye: "",
        nom: "",
        prenom: "",
        datenaissance: "",
        lieunaissance: "",
        adresse: "",
        numerotelephone: "",
        numeroavs: "",
        nommarital: "",
        idservice: "",
        tauxoccupation: "",
        grade: "",
        role: "",
      });
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'employé :", error);
    }
  };

  // Mettre à jour les données du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Charger les employés au chargement du composant
  useEffect(() => {
    fetchEmployes();
  }, []);

  return (
    <div>
      <h1>Gestion des Employés</h1>

      {/* Formulaire pour ajouter un employé */}
      <h2>Ajouter un Employé</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addEmploye();
        }}
      >
        <input
          type="text"
          name="idemploye"
          placeholder="ID Employé"
          value={formData.idemploye}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="nom"
          placeholder="Nom"
          value={formData.nom}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="prenom"
          placeholder="Prénom"
          value={formData.prenom}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="datenaissance"
          value={formData.datenaissance}
          onChange={handleChange}
        />
        <input
          type="text"
          name="lieunaissance"
          placeholder="Lieu de naissance"
          value={formData.lieunaissance}
          onChange={handleChange}
        />
        <input
          type="text"
          name="adresse"
          placeholder="Adresse"
          value={formData.adresse}
          onChange={handleChange}
        />
        <input
          type="text"
          name="numerotelephone"
          placeholder="Téléphone"
          value={formData.numerotelephone}
          onChange={handleChange}
        />
        <input
          type="text"
          name="numeroavs"
          placeholder="Numéro AVS"
          value={formData.numeroavs}
          onChange={handleChange}
        />
        <input
          type="text"
          name="nommarital"
          placeholder="Nom marital"
          value={formData.nommarital}
          onChange={handleChange}
        />
        <input
          type="number"
          name="idservice"
          placeholder="ID Service"
          value={formData.idservice}
          onChange={handleChange}
        />
        <input
          type="number"
          name="tauxoccupation"
          placeholder="Taux d'occupation (%)"
          value={formData.tauxoccupation}
          onChange={handleChange}
        />
        <input
          type="text"
          name="grade"
          placeholder="Grade"
          value={formData.grade}
          onChange={handleChange}
        />
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
        >
          <option value="">Sélectionner un rôle</option>
          <option value="Vétérinaire">Vétérinaire</option>
          <option value="Infirmier">Infirmier</option>
          <option value="Gardien">Gardien</option>
          <option value="ChefDeSecteur">Chef De Secteur</option>
          <option value="Secrétaire">Secrétaire</option>
          <option value="Comptable">Comptable</option>
          <option value="ChefDuPersonnel">Chef Du Personnel</option>
          <option value="Directeur">Directeur</option>
        </select>
        <button type="submit">Ajouter</button>
      </form>

      {/* Liste des employés */}
      <h2>Liste des Employés</h2>
      <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {/* En-têtes du tableau (les clés de l'objet employe) */}
            {employes.length > 0 &&
              Object.keys(employes[0]).map((key) => (
                <th key={key} style={{ padding: "8px", textAlign: "left" }}>
                  {key.toUpperCase()}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {/* Contenu du tableau */}
          {employes.map((employe) => (
            <tr key={employe.idemploye}>
              {Object.values(employe).map((value, index) => (
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

export default Employees;
