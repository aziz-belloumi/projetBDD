import React, { useState, useEffect } from "react";
import axios from "axios";

function Animals() {
  const [animals, setAnimals] = useState([]);
  const [species, setSpecies] = useState([]);
  const [animalFormData, setAnimalFormData] = useState({
    idanimal: "",
    nom: "",
    idespece: "",
    datenaissance: "",
    poids: "",
    taille: "",
    groupesanguin: "",
    datedeces: "",
    idparent1: "",
    idparent2: "",
  });

  const [speciesFormData, setSpeciesFormData] = useState({
    idespece: "",
    nomespece: "",
    classification: "",
  });

  // Fetch animals and species
  const fetchAnimals = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/animals");
      setAnimals(response.data);
    } catch (error) {
      console.error("Error fetching animals:", error);
    }
  };

  const fetchSpecies = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/especes");
      setSpecies(response.data);
    } catch (error) {
      console.error("Error fetching species:", error);
    }
  };

  // Add a new animal
  const addAnimal = async () => {
    const updatedAnimalData = {
      ...animalFormData,
      poids: animalFormData.poids || 0, // Default to 0 if empty
      taille: animalFormData.taille || 0, // Default to 0 if empty
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/animals",
        updatedAnimalData
      );
      alert(response.data.message);
      fetchAnimals(); // Refresh the animal list
      setAnimalFormData({
        idanimal: "",
        nom: "",
        idespece: "",
        datenaissance: "",
        poids: "",
        taille: "",
        groupesanguin: "",
        datedeces: "",
        idparent1: "",
        idparent2: "",
      });
    } catch (error) {
      console.error("Error adding animal:", error);
    }
  };

  // Add a new species
  const addSpecies = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/especes",
        speciesFormData
      );
      alert(response.data.message);
      fetchSpecies(); // Refresh the species list
      setSpeciesFormData({
        idespece: "",
        nomespece: "",
        classification: "",
      });
    } catch (error) {
      console.error("Error adding species:", error);
    }
  };

  // Update form data
  const handleAnimalChange = (e) => {
    const { name, value } = e.target;
    setAnimalFormData({ ...animalFormData, [name]: value });
  };

  const handleSpeciesChange = (e) => {
    const { name, value } = e.target;
    setSpeciesFormData({ ...speciesFormData, [name]: value });
  };

  // Fetch data on component load
  useEffect(() => {
    fetchAnimals();
    fetchSpecies();
  }, []);

  return (
    <div>
      <h1>Gestion des Animaux et des Espèces</h1>

      {/* Form to add a new species */}

      <div className="form-container">
        <h2 className="form-title">Ajouter une Espèce</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addSpecies();
          }}
          className="form-grid"
        >
          <input
            type="text"
            name="idespece"
            placeholder="ID Espèce"
            value={speciesFormData.idespece}
            onChange={handleSpeciesChange}
            className="form-input"
            required
          />
          <input
            type="text"
            name="nomespece"
            placeholder="Nom de l'Espèce"
            value={speciesFormData.nomespece}
            onChange={handleSpeciesChange}
            className="form-input"
            required
          />
          <select
            name="classification"
            value={speciesFormData.classification}
            onChange={handleSpeciesChange}
            className="form-input"
            required
          >
            <option value="">Sélectionner une Classification</option>
            <option value="Individu">Individu</option>
            <option value="Groupe">Groupe</option>
          </select>
          <button type="submit" className="submit-button">
            Ajouter l'Espèce
          </button>
        </form>
      </div>

      {/* Form to add a new animal */}

      <div className="form-container">
        <h2 className="form-title">Ajouter un Animal</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addAnimal();
          }}
          className="form-grid"
        >
          <input
            type="text"
            name="idanimal"
            placeholder="ID Animal"
            value={animalFormData.idanimal}
            onChange={handleAnimalChange}
            className="form-input"
            required
          />
          <input
            type="text"
            name="nom"
            placeholder="Nom de l'Animal"
            value={animalFormData.nom}
            onChange={handleAnimalChange}
            className="form-input"
            required
          />
          <select
            name="idespece"
            value={animalFormData.idespece}
            onChange={handleAnimalChange}
            className="form-input"
            required
          >
            <option value="">Sélectionner une Espèce</option>
            {species.map((sp) => (
              <option key={sp.idespece} value={sp.idespece}>
                {sp.nomespece}
              </option>
            ))}
          </select>
          <input
            type="date"
            name="datenaissance"
            value={animalFormData.datenaissance}
            onChange={handleAnimalChange}
            className="form-input"
          />
          <input
            type="number"
            name="poids"
            placeholder="Poids"
            value={animalFormData.poids}
            onChange={handleAnimalChange}
            className="form-input"
          />
          <input
            type="number"
            name="taille"
            placeholder="Taille"
            value={animalFormData.taille}
            onChange={handleAnimalChange}
            className="form-input"
          />
          <input
            type="text"
            name="groupesanguin"
            placeholder="Groupe Sanguin"
            value={animalFormData.groupesanguin}
            onChange={handleAnimalChange}
            className="form-input"
          />
          <input
            type="date"
            name="datedeces"
            value={animalFormData.datedeces}
            onChange={handleAnimalChange}
            className="form-input"
          />
          <input
            type="text"
            name="idparent1"
            placeholder="ID Parent 1"
            value={animalFormData.idparent1}
            onChange={handleAnimalChange}
            className="form-input"
          />
          <input
            type="text"
            name="idparent2"
            placeholder="ID Parent 2"
            value={animalFormData.idparent2}
            onChange={handleAnimalChange}
            className="form-input"
          />
          <button type="submit" className="submit-button">
            Ajouter l'Animal
          </button>
        </form>
      </div>

      {/* Tableau Espèces */}
      <div className="form-container">
        <h2 className="form-title">Liste des Espèces</h2>
        <table className="table">
          <thead>
            <tr>
              {species.length > 0 &&
                Object.keys(species[0]).map((key) => (
                  <th key={key}>{key.toUpperCase()}</th>
                ))}
            </tr>
          </thead>
          <tbody>
            {species.map((sp) => (
              <tr key={sp.idespece}>
                {Object.values(sp).map((value, index) => (
                  <td key={index}>{value || "N/A"}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tableau Animaux */}
      <div className="form-container">
        <h2 className="form-title">Liste des Animaux</h2>
        <table className="table">
          <thead>
            <tr>
              {animals.length > 0 &&
                Object.keys(animals[0]).map((key) => (
                  <th key={key}>{key.toUpperCase()}</th>
                ))}
            </tr>
          </thead>
          <tbody>
            {animals.map((animal) => (
              <tr key={animal.idanimal}>
                {Object.values(animal).map((value, index) => (
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

export default Animals;
