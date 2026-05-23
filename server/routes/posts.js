// gere les routes pour les articles
// ajout de middleware pour la securite des routes
// evite de pouvoir acces sur une url sans permission

// imports
const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');

// CREATE
// creation d'un article
router.post('/', authMiddleware, postController.createPost);

// READ
// recuperation de TOUS les articles
router.get('/', authMiddleware, postController.getAllPosts);

// READ
// recuparation d UN article précis
router.get('/:id', authMiddleware, postController.getOnePost);

// UPDATE
// modification un article
router.put('/:id', authMiddleware, postController.updatePost);

// DELETE
// suppression d'un article
router.delete('/:id', authMiddleware, postController.deletePost);



// export
module.exports = router;