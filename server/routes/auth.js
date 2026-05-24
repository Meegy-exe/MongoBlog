// fichier qui recoit la requete http et qui la transmet a la bonne fonction dans le authcontroller

// imports
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// POST
// ajoute /register a lurl pour la fonction dinscription
router.post('/register', authController.register);

// POST
// ajoute /login a lurl pour la fonction de connexion
router.post('/login', authController.login);

// GET
// route pour recuperer la liste de tous les blogs
// en dehors des middlewares car public
router.get('/users', authController.getAllUsers);

// export
module.exports = router;