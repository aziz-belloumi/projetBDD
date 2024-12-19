import React, { useEffect, useState } from "react";
import axios from "axios";

const Animals = () => {
  const [animals, setAnimals] = useState([]);
  const [species, setSpecies] = useState([]);
  const [animalForm, setAnimalForm] = useState({
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
  const [speciesForm, setSpeciesForm] = useState({
    idespece: "",
    nomespece: "",
    classification: "",
  });

  // Fetch all animals and species
  useEffect(() => {
    fetchAnimals();
    fetchSpecies();
  }, []);

  const fetchAnimals = async () => {
    try {
      const response = await axios.get("/api/animals");
      setAnimals(response.data);
    } catch (error) {
      console.error("Error fetching animals:", error);
    }
  };

  const fetchSpecies = async () => {
    try {
      const response = await axios.get("/api/especes");
      setSpecies(response.data);
    } catch (error) {
      console.error("Error fetching species:", error);
    }
  };

  const handleAnimalChange = (e) => {
    const { name, value } = e.target;
    setAnimalForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSpeciesChange = (e) => {
    const { name, value } = e.target;
    setSpeciesForm((prev) => ({ ...prev, [name]: value }));
  };

  const addAnimal = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/animals", animalForm);
      alert(response.data.message);
      fetchAnimals();
      setAnimalForm({
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
      alert("Failed to add animal.");
    }
  };

  const addSpecies = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/especes", speciesForm);
      alert(response.data.message);
      fetchSpecies();
      setSpeciesForm({
        idespece: "",
        nomespece: "",
        classification: "",
      });
    } catch (error) {
      console.error("Error adding species:", error);
      alert("Failed to add species.");
    }
  };

  return (
    <div>
      <h1>Animal and Species Manager</h1>

      {/* Add Species */}
      <div>
        <h2>Add New Species</h2>
        <form onSubmit={addSpecies}>
          <input
            type="text"
            name="idespece"
            placeholder="Species ID"
            value={speciesForm.idespece}
            onChange={handleSpeciesChange}
            required
          />
          <input
            type="text"
            name="nomespece"
            placeholder="Species Name"
            value={speciesForm.nomespece}
            onChange={handleSpeciesChange}
            required
          />
          <input
            type="text"
            name="classification"
            placeholder="Classification"
            value={speciesForm.classification}
            onChange={handleSpeciesChange}
            required
          />
          <button type="submit">Add Species</button>
        </form>
      </div>

      {/* Add Animal */}
      <div>
        <h2>Add New Animal</h2>
        <form onSubmit={addAnimal}>
          <input
            type="text"
            name="idanimal"
            placeholder="Animal ID"
            value={animalForm.idanimal}
            onChange={handleAnimalChange}
            required
          />
          <input
            type="text"
            name="nom"
            placeholder="Animal Name"
            value={animalForm.nom}
            onChange={handleAnimalChange}
            required
          />
          <select
            name="idespece"
            value={animalForm.idespece}
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
            value={animalForm.datenaissance}
            onChange={handleAnimalChange}
          />
          <input
            type="number"
            step="0.01"
            name="poids"
            placeholder="Weight"
            value={animalForm.poids}
            onChange={handleAnimalChange}
          />
          <input
            type="number"
            step="0.01"
            name="taille"
            placeholder="Size"
            value={animalForm.taille}
            onChange={handleAnimalChange}
          />
          <input
            type="text"
            name="groupesanguin"
            placeholder="Blood Group"
            value={animalForm.groupesanguin}
            onChange={handleAnimalChange}
          />
          <input
            type="date"
            name="datedeces"
            value={animalForm.datedeces}
            onChange={handleAnimalChange}
          />
          <input
            type="text"
            name="idparent1"
            placeholder="Parent 1 ID"
            value={animalForm.idparent1}
            onChange={handleAnimalChange}
          />
          <input
            type="text"
            name="idparent2"
            placeholder="Parent 2 ID"
            value={animalForm.idparent2}
            onChange={handleAnimalChange}
          />
          <button type="submit">Add Animal</button>
        </form>
      </div>

      {/* Display Species */}
      <div>
        <h2>All Species</h2>
        <ul>
          {species.map((sp) => (
            <li key={sp.idespece}>
              {sp.idespece} - {sp.nomespece} ({sp.classification})
            </li>
          ))}
        </ul>
      </div>

      {/* Display Animals */}
      <div>
        <h2>All Animals</h2>
        <ul>
          {animals.map((animal) => (
            <li key={animal.idanimal}>
              {animal.idanimal} - {animal.nom} ({animal.nomespece})
              {animal.datenaissance && ` - Born: ${animal.datenaissance}`}
              {animal.datedeces && ` - Died: ${animal.datedeces}`}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Animals;
