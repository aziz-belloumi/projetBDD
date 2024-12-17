const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // Update with your MySQL username
  password: "", // Update with your MySQL password
  database: "zoo_management",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL Database!");
});

// ------------------ Employees ------------------
// Fetch all employees
app.get("/api/employees", (req, res) => {
  db.query("SELECT * FROM Employe", (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Add a new employee
app.post("/api/employees", (req, res) => {
  console.log("Incoming Data:", req.body);

  const {
    code_employe,
    nom,
    prenom,
    date_naissance,
    lieu_naissance,
    adresse,
    numero_telephone,
    numero_AVS,
    nom_marital,
    service_id,
    taux_occupation,
    grade,
  } = req.body;

  const query = `
    INSERT INTO Employe (
      code_employe, nom, prenom, date_naissance, lieu_naissance,
      adresse, numero_telephone, numero_AVS, nom_marital, 
      service_id, taux_occupation, grade
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [
      code_employe,
      nom,
      prenom,
      date_naissance || null,
      lieu_naissance || null,
      adresse || null,
      numero_telephone || null,
      numero_AVS || null,
      nom_marital || null,
      service_id || null,
      taux_occupation || null,
      grade || null,
    ],
    (err, result) => {
      if (err) {
        console.error("Error executing query:", err.message);
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: "Employee added successfully!", result });
    }
  );
});

// ------------------ Services ------------------
// Fetch all services
app.get("/api/services", (req, res) => {
  db.query("SELECT * FROM Service", (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Add a new service
app.post("/api/services", (req, res) => {
  const { nom_service } = req.body;
  db.query(
    "INSERT INTO Service (nom_service) VALUES (?)",
    [nom_service],
    (err) => {
      if (err) return res.status(500).send(err);
      res.json({ message: "Service added successfully!" });
    }
  );
});

// ------------------ Secteurs ------------------
// Fetch all secteurs
app.get("/api/secteurs", (req, res) => {
  db.query("SELECT * FROM Secteur", (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Add a new secteur
app.post("/api/secteurs", (req, res) => {
  const { nom_secteur, fonction, chef_secteur } = req.body;
  db.query(
    "INSERT INTO Secteur (nom_secteur, fonction, chef_secteur) VALUES (?, ?, ?)",
    [nom_secteur, fonction, chef_secteur],
    (err) => {
      if (err) return res.status(500).send(err);
      res.json({ message: "Secteur added successfully!" });
    }
  );
});

// ------------------ Parcelles ------------------
// Fetch all parcelles
app.get("/api/parcelles", (req, res) => {
  db.query("SELECT * FROM Parcelle", (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// ------------------ Animals ------------------
// Fetch all animals
app.get("/api/animals", (req, res) => {
  db.query("SELECT * FROM Animal", (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
