# 🐾 Zoo Management System

A full-stack web application designed for comprehensive zoo administration and database management. The system allows zoo administrators and personnel to manage employees, departments, sectors, enclosures, animal records with genealogical lineage, species taxonomy, and complex keeper scheduling with automated conflict validation.

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Architecture & Tech Stack](#-architecture--tech-stack)
- [Key Features & Modules](#-key-features--modules)
- [Database Schema (PostgreSQL)](#-database-schema-postgresql)
  - [Entity Relationship Overview](#entity-relationship-overview)
  - [SQL Initialization Script](#sql-initialization-script)
- [API Reference](#-api-reference)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Database Configuration](#database-configuration)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Business Rules & Validation](#-business-rules--validation)
- [License](#-license)

---

## 🔭 Overview

The **Zoo Management System** is built to replace manual record-keeping with an interconnected relational database management interface. It tracks:

1. **Human Resources**: Staff records, specialized zoo roles (veterinarians, keepers, sector heads), work rates, and department assignments.
2. **Infrastructure**: Zoo sectors, parcel enclosures, and sector leadership.
3. **Fauna & Taxonomy**: Animals, species classification (*Individu* vs. *Groupe*), vital statistics, and parentage (pedigree/lineage tracking).
4. **Operations & Scheduling**: Keeper duty assignments across sectors and enclosures with real-time rule verification preventing double-booking and cross-sector assignment conflicts on the same day.

---

## 🛠 Architecture & Tech Stack

### Frontend
- **Framework**: [React 19](https://react.dev/)
- **Routing**: [React Router v7](https://reactrouter.com/) (`react-router-dom`)
- **HTTP Client**: [Axios](https://axios-http.com/) & Native Fetch API
- **Styling**: Vanilla CSS3 (Modular layout with CSS Grid & Flexbox)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js 4](https://expressjs.com/)
- **Database Driver**: [`pg`](https://node-postgres.com/) (node-postgres)
- **Middleware**: `cors`, `express.json()`

### Database
- **Database Engine**: [PostgreSQL](https://www.postgresql.org/) (Database: `zoo`)

---

## ✨ Key Features & Modules

| Module | Route | Description |
|---|---|---|
| **Employees** (`Employees.js`) | `/employees` | Register and list zoo employees with comprehensive data (AVS number, marital status, birth info, contact, rate of occupation, grade, and role). |
| **Services** (`Services.js`) | `/services` | Manage zoo organizational units and departments (e.g., Veterinary, Administration, Keepers). |
| **Secteurs** (`Secteurs.js`) | `/secteurs` | Configure zoo sectors and assign designated sector supervisors (*Chef de Secteur*). |
| **Parcelles** (`Parcelles.js`) | `/parcelles` | Register physical enclosures/parcels and link them to their respective sectors. |
| **Animals & Species** (`Animals.js`) | `/animals` | Dual management interface: register species taxonomies (*Individu* / *Groupe*) and individual animals (weight, height, blood group, birth/death dates, Parent 1 and Parent 2 IDs). |
| **Emploi du Temps Commun** (`Emploidutempcommun.js`) | `/emploicommun` | Global shift matrix view showing scheduled keepers by sector, day, hour, and enclosure. Features constraint verification upon assignment. |
| **Emploi du Temps Individuel** (`Emploidutempsindiv.js`) | `/emploiindiv` | Consolidated individual agenda for each keeper grouping assigned days, sectors, and ordered lists of visited enclosures. |

---

## 🗄 Database Schema (PostgreSQL)

### Entity Relationship Overview

- **`Service`** `(1) ── (N)` **`Employe`**
- **`Employe`** `(1) ── (N)` **`Secteur`** (as *Chef de Secteur*)
- **`Secteur`** `(1) ── (N)` **`Parcelle`**
- **`Espece`** `(1) ── (N)` **`Animal`**
- **`Animal`** `(2) ── (N)` **`Animal`** (as *idparent1*, *idparent2*)
- **`EmploiDuTemps`**: Junction table relating **`Employe`** (Gardien), **`Secteur`**, **`Parcelle`**, **`Jour`**, and **`Heure`**.

### SQL Initialization Script

Run the following SQL script in your PostgreSQL database (`zoo`) to create all necessary tables and relationships:

```sql
-- Database creation (if not already existing)
-- CREATE DATABASE zoo;
-- \c zoo;

-- 1. Services table
CREATE TABLE IF NOT EXISTS service (
    idservice INT PRIMARY KEY,
    nomservice VARCHAR(100) NOT NULL
);

-- 2. Employees table
CREATE TABLE IF NOT EXISTS employe (
    idemploye VARCHAR(50) PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    datenaissance DATE,
    lieunaissance VARCHAR(100),
    adresse VARCHAR(255),
    numerotelephone VARCHAR(50),
    numeroavs VARCHAR(50),
    nommarital VARCHAR(100),
    idservice INT REFERENCES service(idservice) ON DELETE SET NULL,
    tauxoccupation NUMERIC(5, 2),
    grade VARCHAR(50),
    role VARCHAR(50) NOT NULL
);

-- 3. Sectors table
CREATE TABLE IF NOT EXISTS secteur (
    idsecteur INT PRIMARY KEY,
    nomsecteur VARCHAR(100) NOT NULL,
    idchefdesecteur VARCHAR(50) REFERENCES employe(idemploye) ON DELETE SET NULL
);

-- 4. Parcels / Enclosures table
CREATE TABLE IF NOT EXISTS parcelle (
    idparcelle INT PRIMARY KEY,
    idsecteur INT NOT NULL REFERENCES secteur(idsecteur) ON DELETE CASCADE
);

-- 5. Species table
CREATE TABLE IF NOT EXISTS espece (
    idespece VARCHAR(50) PRIMARY KEY,
    nomespece VARCHAR(100) NOT NULL,
    classification VARCHAR(50) NOT NULL -- 'Individu' or 'Groupe'
);

-- 6. Animals table
CREATE TABLE IF NOT EXISTS animal (
    idanimal VARCHAR(50) PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    idespece VARCHAR(50) REFERENCES espece(idespece) ON DELETE SET NULL,
    datenaissance DATE,
    poids NUMERIC(8, 2),
    taille NUMERIC(8, 2),
    groupesanguin VARCHAR(20),
    datedeces DATE,
    idparent1 VARCHAR(50) REFERENCES animal(idanimal) ON DELETE SET NULL,
    idparent2 VARCHAR(50) REFERENCES animal(idanimal) ON DELETE SET NULL
);

-- 7. Keeper Schedules table
CREATE TABLE IF NOT EXISTS emploidutemps (
    jour VARCHAR(20) NOT NULL,
    heure VARCHAR(20) NOT NULL,
    idparcelle INT NOT NULL REFERENCES parcelle(idparcelle) ON DELETE CASCADE,
    idsecteur INT NOT NULL REFERENCES secteur(idsecteur) ON DELETE CASCADE,
    idgardien VARCHAR(50) NOT NULL REFERENCES employe(idemploye) ON DELETE CASCADE,
    PRIMARY KEY (jour, heure, idparcelle, idgardien)
);
```

---

## 📡 API Reference

The backend exposes a RESTful API listening on `http://localhost:5000`:

### Employees (`/api/employes`)
- `GET /api/employes` — Retrieve all registered employees.
- `POST /api/employes` — Register a new employee.
  - **Body (JSON)**: `idemploye`, `nom`, `prenom`, `datenaissance`, `lieunaissance`, `adresse`, `numerotelephone`, `numeroavs`, `nommarital`, `idservice`, `tauxoccupation`, `grade`, `role`.

### Services (`/api/services`)
- `GET /api/services` — Retrieve all departments/services ordered by ID.
- `POST /api/services` — Add a new department.
  - **Body (JSON)**: `idservice`, `nomservice`.

### Secteurs (`/api/secteurs`)
- `GET /api/secteurs` — Retrieve all zoo sectors.
- `POST /api/secteurs` — Add a new sector.
  - **Body (JSON)**: `IDSecteur`, `NomSecteur`, `IDChefDeSecteur`.

### Parcelles (`/api/parcelles`)
- `GET /api/parcelles` — Retrieve all parcels joined with their respective sector name.
- `POST /api/parcelles` — Add a new parcel.
  - **Body (JSON)**: `IDParcelle`, `IDSecteur`.

### Animals & Species (`/api/animals`, `/api/especes`)
- `GET /api/animals` — Retrieve all animals with their species name resolved.
- `POST /api/animals` — Register an animal record with optional parent references.
  - **Body (JSON)**: `idanimal`, `nom`, `idespece`, `datenaissance`, `poids`, `taille`, `groupesanguin`, `datedeces`, `idparent1`, `idparent2`.
- `GET /api/especes` — Retrieve all species and taxonomic classifications.
- `POST /api/especes` — Create a new species record.
  - **Body (JSON)**: `idespece`, `nomespece`, `classification`.

### Schedules (`/api/emplois-commun`, `/api/emplois-tous-gardiens`)
- `GET /api/emplois-commun` — Retrieve master schedule entries sorted by day and time slot.
- `POST /api/emplois-commun` — Assign a keeper to a parcel and sector for a given day and hour. Includes validation logic.
  - **Body (JSON)**: `jour`, `heure`, `idParcelle`, `idSecteur`, `idGardien`.
- `GET /api/emplois-tous-gardiens` — Aggregated schedule grouped by keeper and day with visited parcels array (`ARRAY_AGG`).

---

## 📂 Project Structure

```text
projetBDD/
├── backend/
│   └── server.js               # Express server, PostgreSQL connection, and REST API routes
├── public/
│   ├── favicon.ico
│   ├── index.html              # HTML5 root template
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── Animals.js          # Animal and species forms & listings
│   │   ├── Emploidutempcommun.js # Master schedule matrix view & assignment
│   │   ├── Emploidutempsindiv.js  # Individual schedule view per keeper
│   │   ├── Employees.css       # Unified design & form styles for components
│   │   ├── Employees.js        # Staff management and role assignments
│   │   ├── Parcelles.js        # Parcel/enclosure management
│   │   ├── Secteurs.js         # Sector management and sector heads
│   │   └── Services.js         # Department / service management
│   ├── App.css                 # Main application navigation & theme styles
│   ├── App.js                  # Navigation router and view container
│   ├── index.css               # Global reset styles
│   └── index.js                # React application entry point
├── package.json                # Project dependencies and npm scripts
└── README.md                   # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (version 18 or newer recommended)
- [npm](https://www.npmjs.com/) (bundled with Node.js)
- [PostgreSQL](https://www.postgresql.org/) (version 14 or newer)

---

### Database Configuration

1. Start your PostgreSQL service.
2. Open `psql` or pgAdmin and create the database:
   ```sql
   CREATE DATABASE zoo;
   ```
3. Run the SQL initialization script provided in the [SQL Initialization Script](#sql-initialization-script) section.
4. Verify your PostgreSQL connection parameters in [backend/server.js](file:///c:/Users/bello/Desktop/projetBDD/backend/server.js):
   ```javascript
   const db = new Client({
     host: "localhost",
     user: "postgres",     // Your PostgreSQL username
     password: "your_password", // Your PostgreSQL password
     database: "zoo",      // Database name
   });
   ```

---

### Backend Setup

1. Install project dependencies in the project root:
   ```bash
   npm install
   ```

2. Start the backend API server:
   ```bash
   node backend/server.js
   ```
   The backend server will run at `http://localhost:5000`. You should see:
   ```text
   Connected to PostgreSQL Database!
   Server is running on http://localhost:5000
   ```

---

### Frontend Setup

In a separate terminal window, start the React application:

```bash
npm start
```

The browser will automatically open [http://localhost:3000](http://localhost:3000).

---

## ⚖️ Business Rules & Validation

The application enforces specific domain rules at the database and API level:

1. **Sector Exclusivity per Day**:
   - A keeper (`Gardien`) can only be assigned to a single sector per day. Attempting to assign them to an enclosure belonging to a different sector on the same day is rejected with a `400 Bad Request` error.
2. **Time Slot Conflict Prevention**:
   - A keeper cannot be assigned to more than one parcel at the exact same hour on the same day.
3. **Role-Based Categorization**:
   - Employees are classified into predefined roles: *Vétérinaire*, *Infirmier*, *Gardien*, *ChefDeSecteur*, *Secrétaire*, *Comptable*, *ChefDuPersonnel*, and *Directeur*.
4. **Pedigree Lineage Tracking**:
   - Animal records optionally reference `idparent1` and `idparent2`, enabling ancestry tracking and genealogical queries.

---

## 📄 License

This project is developed for educational and database management coursework purposes.
