// lecture du .env
require('dotenv').config();

// import 
const express = require('express');
const mongoose = require('mongoose');

// initialisation serveur
const app = express();

// pour lire le format json, transforme le json recu en objet js
app.use(express.json());

// rappel mongoose:
// crée des schémas (ex: user doit avoir un mail un mdp ect... le champ est obligatoire)
// sécurité de passage

// connexion à la BDD
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Failed to connect to MongoDB :', err));

// démarrage du serveur
app.listen(process.env.PORT, () => {
    console.log(`[Express] Succesfully connected on port ${process.env.PORT}`);
});