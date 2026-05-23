// lecture du .env
require('dotenv').config();

// IMPORTS 
const express = require('express');
const mongoose = require('mongoose');
// routes
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');

// initialisation serveur
const app = express();

// pour lire le format json, transforme le json recu en objet js
app.use(express.json());

// permet a express de savoir que les requetes avec /api/auth utilise ce fichier
app.use('/api/auth', authRoutes);

// permet a express de lier les requetes avec /api/posts au fichier article
app.use('/api/posts', postRoutes);

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