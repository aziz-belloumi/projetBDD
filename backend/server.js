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
  password: "fedikh09", // Update with your PostgreSQL password
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

// Add a new employee
app.post("/api/employes", (req, res) => {
  console.log("Incoming Data:", req.body);

  const {
    idemploye,
    nom,
    prenom,
    datenaissance,
    lieunaissance,
    adresse,
    numerotelephone,
    numeroavs,
    nommarital,
    idservice,
    tauxoccupation,
    grade,
    role,
  } = req.body;

  const query = `
    INSERT INTO employe (
      idemploye, nom, prenom, datenaissance, lieunaissance,
      adresse, numerotelephone, numeroavs, nommarital, 
      idservice, tauxoccupation, grade, role
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
    RETURNING *;  -- Return the inserted row
  `;

  db.query(
    query,
    [
      idemploye,
      nom,
      prenom,
      datenaissance || null,
      lieunaissance || null,
      adresse || null,
      numerotelephone || null,
      numeroavs || null,
      nommarital || null,
      idservice || null,
      tauxoccupation || null,
      grade || null,
      role || null,
    ],
    (err, result) => {
      if (err) {
        console.error("Error executing query:", err.message);
        return res.status(500).json({ error: err.message });
      }
      res.json({
        message: "Employe added successfully!",
        result: result.rows[0],
      });
    }
  );
});

// ------------------ Service ------------------
// Fetch all services
app.get("/api/services", (req, res) => {
  db.query("SELECT * FROM service", (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results.rows); // Use results.rows in PostgreSQL
  });
});
// Add a new service
app.post("/api/services", (req, res) => {
  console.log("Incoming Data:", req.body);

  const { idservice, nomservice } = req.body;

  const query = `
    INSERT INTO service (
      idservice, nomservice
    ) VALUES ($1, $2)
    RETURNING *;  -- Return the inserted row
  `;

  db.query(query, [idservice, nomservice], (err, result) => {
    if (err) {
      console.error("Error executing query:", err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json({
      message: "Service added successfully!",
      result: result.rows[0],
    });
  });
});
//secteur
// Route POST pour ajouter un secteur
app.post("/api/secteurs", async (req, res) => {
  const { IDSecteur, NomSecteur, IDChefDeSecteur } = req.body;

  // Vérification des champs requis
  if (!IDSecteur || !NomSecteur || !IDChefDeSecteur) {
    return res.status(400).json({ message: "Tous les champs sont requis." });
  }

  try {
    const sql = `
      INSERT INTO Secteur (IDSecteur, NomSecteur, IDChefDeSecteur) 
      VALUES ($1, $2, $3) 
      RETURNING *;
    `;
    const result = await db.query(sql, [
      IDSecteur,
      NomSecteur,
      IDChefDeSecteur,
    ]);

    res.status(201).json({
      message: "Secteur ajouté avec succès",
      secteur: result.rows[0],
    });
  } catch (err) {
    console.error("Erreur SQL :", err.message);
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
});
app.get("/api/secteurs", async (req, res) => {
  try {
    const query = "SELECT * FROM Secteur";
    const result = await db.query(query);
    res.status(200).json(result.rows); // Retourner les lignes de la table Secteur
  } catch (err) {
    console.error("Erreur SQL :", err.message);
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
});
//les parcelles
// GET : Récupérer toutes les parcelles
app.post("/api/parcelles", async (req, res) => {
  const { IDParcelle, IDSecteur } = req.body;

  // Vérification des champs
  if (!IDParcelle || !IDSecteur) {
    return res
      .status(400)
      .json({ message: "IDParcelle et IDSecteur sont requis." });
  }

  try {
    const query = `
      INSERT INTO Parcelle (IDParcelle, IDSecteur) 
      VALUES ($1, $2) 
      RETURNING *;
    `;
    const result = await db.query(query, [IDParcelle, IDSecteur]);

    res.status(201).json({
      message: "Parcelle ajoutée avec succès",
      parcelle: result.rows[0],
    });
  } catch (err) {
    console.error("Erreur SQL :", err.message);
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
});

// Route GET pour récupérer les parcelles avec le nom du secteur
app.get("/api/parcelles", async (req, res) => {
  try {
    const query = `
      SELECT Parcelle.IDParcelle, Parcelle.IDSecteur, Secteur.NomSecteur
      FROM Parcelle
      INNER JOIN Secteur ON Parcelle.IDSecteur = Secteur.IDSecteur
      ORDER BY Parcelle.IDParcelle;
    `;
    const result = await db.query(query);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Erreur SQL :", err.message);
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
});
// ------------------ Emplois Commun ------------------
// Add emploi commun
app.post("/api/emplois-commun", async (req, res) => {
  const { jour, heure, idParcelle, idSecteur, idGardien } = req.body;

  if (!jour || !heure || !idParcelle || !idSecteur || !idGardien) {
    return res.status(400).json({ message: "Tous les champs sont requis." });
  }

  try {
    // Vérifier si un autre gardien travaille dans la même parcelle au même moment
    const checkQuery = `
      SELECT * FROM EmploiDuTemps
      WHERE Jour = $1 AND Heure = $2 AND IDParcelle = $3
    `;
    const checkResult = await db.query(checkQuery, [jour, heure, idParcelle]);

    if (checkResult.rows.length > 0) {
      return res.status(400).json({
        message:
          "Un autre gardien travaille déjà dans cette parcelle à cette heure.",
      });
    }

    const query = `
      INSERT INTO EmploiDuTemps (Jour, Heure, IDParcelle, IDSecteur, IDGardien)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const result = await db.query(query, [
      jour,
      heure,
      idParcelle,
      idSecteur,
      idGardien,
    ]);

    res.status(201).json({
      message: "Emploi commun ajouté avec succès",
      emploi: result.rows[0],
    });
  } catch (err) {
    console.error("Erreur SQL :", err.message);
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
});

// Get emplois commun
app.get("/api/emplois-commun", async (req, res) => {
  try {
    const query = `
      SELECT e.jour, e.heure, p.idparcelle, s.nomsecteur, e.idgardien
      FROM EmploiDuTemps e
      JOIN Parcelle p ON e.idparcelle = p.idparcelle
      JOIN Secteur s ON e.idsecteur = s.idsecteur
      ORDER BY e.jour, e.heure;
    `;
    const result = await db.query(query);
    res.status(200).json(result.rows); // Vérifiez ici si `result.rows` contient bien `idgardien`
  } catch (err) {
    console.error("Erreur SQL :", err.message);
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
});
//emploi idiv

// Route pour récupérer l'emploi du temps d'un gardien
app.get("/emplois-du-temps", async (req, res) => {
  try {
    const result = await db.query(`
      SELECT 
          e.IDGardien,
          emp.Nom || ' ' || emp.Prenom AS NomGardien,
          e.Jour,
          s.NomSecteur,
          STRING_AGG(p.IDParcelle::VARCHAR, ' - ') AS Parcelles
      FROM 
          EmploiDuTemps e
      JOIN 
          Parcelle p ON e.IDParcelle = p.IDParcelle
      JOIN 
          Secteur s ON e.IDSecteur = s.IDSecteur
      JOIN 
          Employe emp ON e.IDGardien = emp.IDEmploye
      GROUP BY 
          e.IDGardien, emp.Nom, emp.Prenom, e.Jour, s.NomSecteur
      ORDER BY 
          e.IDGardien, e.Jour;
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des emplois du temps." });
  }
});

// Get all animals with species name instead of ID
app.get("/api/animals", (req, res) => {
  const query = `
    SELECT 
      a.idanimal, 
      a.nom, 
      e.nomespece, 
      a.datenaissance, 
      a.poids, 
      a.taille, 
      a.groupesanguin, 
      a.datedeces, 
      a.idparent1, 
      a.idparent2
    FROM 
      animal a
    LEFT JOIN 
      espece e 
    ON 
      a.idespece = e.idespece;
  `;

  db.query(query, (err, result) => {
    if (err) {
      console.error("Error fetching animals:", err.message);
      return res.status(500).json({ error: "Failed to fetch animals." });
    }
    res.json(result.rows); // Assuming you're using PostgreSQL
  });
});

// Create a new animal
app.post("/api/animals", (req, res) => {
  const {
    idanimal,
    nom,
    idespece,
    datenaissance,
    poids,
    taille,
    groupesanguin,
    datedeces,
    idparent1,
    idparent2,
  } = req.body;

  const query = `
    INSERT INTO animal (
      idanimal, nom, idespece, datenaissance, poids, taille, groupesanguin, datedeces, idparent1, idparent2
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING *;
  `;

  db.query(
    query,
    [
      idanimal,
      nom,
      idespece,
      datenaissance,
      poids,
      taille,
      groupesanguin,
      datedeces,
      idparent1,
      idparent2,
    ],
    (err, result) => {
      if (err) {
        console.error("Error adding animal:", err.message);
        return res.status(500).json({ error: "Failed to add animal." });
      }
      res.json({
        message: "Animal added successfully!",
        result: result.rows[0],
      });
    }
  );
});

// get all species
app.get("/api/especes", (req, res) => {
  const query = `
    SELECT 
      idespece, 
      nomespece, 
      classification 
    FROM 
      espece;
  `;

  db.query(query, (err, result) => {
    if (err) {
      console.error("Error fetching species:", err.message);
      return res.status(500).json({ error: "Failed to fetch species." });
    }
    res.json(result.rows); // Assuming you're using PostgreSQL
  });
});
//create new specie
app.post("/api/especes", (req, res) => {
  const { idespece, nomespece, classification } = req.body;

  const query = `
    INSERT INTO espece (
      idespece, nomespece, classification
    ) VALUES ($1, $2, $3)
    RETURNING *;
  `;

  db.query(query, [idespece, nomespece, classification], (err, result) => {
    if (err) {
      console.error("Error adding species:", err.message);
      return res.status(500).json({ error: "Failed to add species." });
    }
    res.json({
      message: "Species added successfully!",
      result: result.rows[0],
    });
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
