// gère la logique metier & communique avec la BDD pour les commentaires

// import
const Post = require('../models/Post');
const Comment = require('../models/Comment');


// READ
// route pour récuperer tous les coms d'un article precis
exports.getPostComments = async (req, res) => {
    try {
        // cible lid de larticle depuis lurl
        const postId = req.params.postId;

        // cible dans la bdd TOUS les coms de larticle
        // sort: permet de trier par ordre chrono (plus recent au plus vieux)
        // post.find: recupere tous les elements qui correspondent au critere
        // populate: remplace lid par le login
        const comments = await Comment.find({ post: postId })
            .sort({ createdAt: -1 })
            .populate('author', 'login');

        // return allposts a react
        res.status(200).json(comments);

        // en cas d'erreur
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Erreur serveur au moment de récupérer les commentaires."
        });
    }
};


// DELETE
// route pour supprimer un com
exports.deleteComment = async (req, res) => {
    try {
        // cible lid du com dans les parametres de lurl
        const commentId = req.params.id;

        // cible lid du luser qui fait la demande
        const userId = req.user.id;

        // findbyid: cherche un element précis
        const comment = await Comment.findById(commentId);
        // SI le com nexiste pas alors
        if (!comment) {
            return res.status(404).json({
                message: "Ce commentaire n'existe pas."
            });
        }

        // findbyid: cherche un element précis
        const post = await Post.findById(comment.post);
        // SI le com nest pas lauteur de luser qui fait la suppression alors
        // tostring: post.author est un objet objectid pour la bdd
        if (post.author.toString() !== userId) {
            return res.status(403).json({
                message: "Vous n'avez pas l'autorisation de supprimer un commentaire sur le billet de quelqu'un d'autre."
            });
        }

        // attend la verification avant de supprimer le com
        await Comment.findByIdAndDelete(commentId);

        // return confirmation de suppression a react
        res.status(200).json({
            message: "Votre commentaire a bien été supprimé."
        });

        // en cas d'erreur
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Erreur serveur au moment de supprimer le commentaire."
        });
    }
};