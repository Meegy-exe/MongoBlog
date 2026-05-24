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

// POST
// post un com sur un article precis
router.post('/post/:postId', authMiddleware, commentController.createComment);

// PUT
// modifier son propre commentaire (uniquement sur le blog des autres)
router.put('/:id', authMiddleware, commentController.updateComment);


// DELETE
// suppression d'un com
router.delete('/:id', authMiddleware, commentController.deleteComment);


// export
module.exports = router;