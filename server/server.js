// lecture du .env
require('dotenv').config();

// IMPORTS 
const express = require('express');
const mongoose = require('mongoose');
// routes
const authRoutes = require('./routes/auth');

// initialisation serveur
const app = express();

// pour lire le format json, transforme le json recu en objet js
app.use(express.json());

// permet a express de savoir que les requetes avec /api/auth utilise ce fichier
app.use('/api/auth', authRoutes);

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