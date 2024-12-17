const express = require("express");
const { Client } = require("pg"); // Import PostgreSQL client
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const db = new Client({
  host: "localhost",
  user: "postgres", // Update with your PostgreSQL username
  password: "aziz1234", // Update with your PostgreSQL password
  database: "zoo", // Your PostgreSQL database name
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to PostgreSQL Database!");
});

// ------------------ Employe ------------------
// Fetch all employees
app.get("/api/employes", (req, res) => {
  db.query("SELECT * FROM employe", (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results.rows); // Use results.rows in PostgreSQL
  });
});

// Add a new employe
app.post("/api/employes", (req, res) => {
  console.log("Incoming Data:", req.body);

  const {
    codeemploye,
    nom,
    prenom,
    datenaissance,
    lieunaissance,
    adresse,
    numerotelephone,
    numeroAVS,
    nommarital,
    typeservice,
    poste,
  } = req.body;

  const query = `
    INSERT INTO employe (
      codeemploye, nom, prenom, datenaissance, lieunaissance,
      adresse, numerotelephone, numeroAVS, nommarital, 
      typeservice, poste
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    RETURNING *;  -- Return the inserted row
  `;

  db.query(
    query,
    [
      codeemploye,
      nom,
      prenom,
      datenaissance || null,
      lieunaissance || null,
      adresse || null,
      numerotelephone || null,
      numeroAVS || null,
      nommarital || null,
      typeservice || null,
      poste || null,
    ],
    (err, result) => {
      if (err) {
        console.error("Error executing query:", err.message);
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: "Employe added successfully!", result: result.rows[0] });
    }
  );
});


// ------------------ Service ------------------
// Fetch all services
app.get("/api/services", (req, res) => {
  db.query("SELECT * FROM service", (err, results) => {
    if (err) {
      console.error("Error fetching services:", err.message);
      return res.status(500).send(err);
    }
    res.json(results.rows); // Return the data from PostgreSQL
  });
});


// ------------------ Secteur ------------------
// Fetch all secteurs
app.get("/api/secteurs", (req, res) => {
  db.query("SELECT * FROM secteur", (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results.rows); // Use results.rows in PostgreSQL
  });
});

// Add a new secteur
app.post("/api/secteurs", (req, res) => {
  const { nomsecteur, description, codechef } = req.body;
  db.query(
    "INSERT INTO secteur (nom_secteur, description, code_chef) VALUES ($1, $2, $3) RETURNING *",
    [nomsecteur, description, codechef],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({ message: "Secteur added successfully!", secteur: result.rows[0] });
    }
  );
});

// ------------------ Parcelle ------------------
// Fetch all parcelles
app.get("/api/parcelles", (req, res) => {
  db.query("SELECT * FROM parcelle", (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results.rows); // Use results.rows in PostgreSQL
  });
});

// ------------------ Animal ------------------
// Fetch all animals
app.get("/api/animaux", (req, res) => {
  db.query("SELECT * FROM animal", (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results.rows); // Use results.rows in PostgreSQL
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
