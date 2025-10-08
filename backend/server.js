/* eslint-disable prettier/prettier */
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 4000;
const DB_PATH = path.join(__dirname, "codes.json");

app.get('/', (req, res) => {
  res.send('Backend attivo!');
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Endpoint per ottenere tutti gli utenti
app.get("/users", (req, res) => {
  const data = JSON.parse(fs.readFileSync(DB_PATH, "utf8"));
  res.json(data);
});

// Endpoint per aggiungere un utente
app.post("/users", (req, res) => {
  const newUser = req.body;

  // Legge il JSON esistente
  const data = JSON.parse(fs.readFileSync(DB_PATH, "utf8"));

  // Aggiunge il nuovo utente
  data.push(newUser);

  // Riscrive il file JSON
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));

  res.status(201).json(newUser);
});

// Endpoint per aggiornare un utente tramite qr_code
app.put("/users/:qr_code", (req, res) => {
  const { qr_code } = req.params;
  const updatedFields = req.body;

  // Legge il JSON
  const data = JSON.parse(fs.readFileSync(DB_PATH, "utf8"));

  // Trova l'indice dell'utente
  const index = data.findIndex(user => user.qr_code === qr_code);
  if (index === -1) {
    return res.status(404).json({ message: "Utente non trovato" });
  }

  // Aggiorna i campi
  data[index] = { ...data[index], ...updatedFields };

  // Riscrive il file JSON
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));

  res.json(data[index]);
});

// Avvia il server
app.listen(PORT, () => {
  console.log(`Server in ascolto su http://localhost:${PORT}`);
}
);
