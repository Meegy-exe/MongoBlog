// fichier qui recoit la requete http et qui la transmet a la bonne fonction dans le authcontroller

// imports
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// ajoute /register a lurl pour la fonction dinscription
router.post('/register', authController.register);

// ajoute /login a lurl pour la fonction de connexion
router.post('/login', authController.login);

// export
module.exports = router;