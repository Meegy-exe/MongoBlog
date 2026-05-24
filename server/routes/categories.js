// gere la route pour la categories des articles

// imports
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const authMiddleware = require('../middleware/authMiddleware');

// POST
// route pour ajouter une categorie
router.post('/', authMiddleware, categoryController.createCategory);

// GET
// route pour recuperer toutes les categories
router.get('/', categoryController.getAllCategories);

// export
module.exports = router;