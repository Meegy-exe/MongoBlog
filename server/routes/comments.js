// gere les routes pour les commentaires
// ajout de middleware pour la securite des routes
// evite de pouvoir acces sur une url sans permission

// imports
const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const authMiddleware = require('../middleware/authMiddleware');

// READ
// recuperation de TOUS les coms
router.get('/post/:postId', authMiddleware, commentController.getPostComments);

// DELETE
// suppression d'un com
router.delete('/:id', authMiddleware, commentController.deleteComment);


// export
module.exports = router;