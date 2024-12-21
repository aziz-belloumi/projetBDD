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
      <h1>Animals and Species Management</h1>

      {/* Form to add a new species */}
      <h2>Add a New Species</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addSpecies();
        }}
      >
        <input
          type="text"
          name="idespece"
          placeholder="Species ID"
          value={speciesFormData.idespece}
          onChange={handleSpeciesChange}
          required
        />
        <input
          type="text"
          name="nomespece"
          placeholder="Species Name"
          value={speciesFormData.nomespece}
          onChange={handleSpeciesChange}
          required
        />
        <select
          name="classification"
          value={speciesFormData.classification}
          onChange={handleSpeciesChange}
          required
        >
          <option value="">Select Classification</option>
          <option value="Individu">Individu</option>
          <option value="Groupe">Groupe</option>
        </select>
        <button type="submit">Add Species</button>
      </form>

      {/* Form to add a new animal */}
      <h2>Add a New Animal</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addAnimal();
        }}
      >
        <input
          type="text"
          name="idanimal"
          placeholder="Animal ID"
          value={animalFormData.idanimal}
          onChange={handleAnimalChange}
          required
        />
        <input
          type="text"
          name="nom"
          placeholder="Animal Name"
          value={animalFormData.nom}
          onChange={handleAnimalChange}
          required
        />
        <select
          name="idespece"
          value={animalFormData.idespece}
          onChange={handleAnimalChange}
          required
        >
          <option value="">Select Species</option>
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
        />
        <input
          type="number"
          name="poids"
          placeholder="Weight"
          value={animalFormData.poids}
          onChange={handleAnimalChange}
        />
        <input
          type="number"
          name="taille"
          placeholder="Height"
          value={animalFormData.taille}
          onChange={handleAnimalChange}
        />
        <input
          type="text"
          name="groupesanguin"
          placeholder="Blood Group"
          value={animalFormData.groupesanguin}
          onChange={handleAnimalChange}
        />
        <input
          type="date"
          name="datedeces"
          value={animalFormData.datedeces}
          onChange={handleAnimalChange}
        />
        <input
          type="text"
          name="idparent1"
          placeholder="Parent1 ID"
          value={animalFormData.idparent1}
          onChange={handleAnimalChange}
        />
        <input
          type="text"
          name="idparent2"
          placeholder="Parent2 ID"
          value={animalFormData.idparent2}
          onChange={handleAnimalChange}
        />
        <button type="submit">Add Animal</button>
      </form>

      {/* Display species */}
      <h2>Species List</h2>
      <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
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

      {/* Display animals */}
      <h2>Animal List</h2>
      <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
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
  );
}

export default Animals;
