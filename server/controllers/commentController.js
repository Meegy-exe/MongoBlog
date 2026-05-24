// gère la logique metier & communique avec la BDD pour les commentaires

// import
const Post = require('../models/Post');
const Comment = require('../models/Comment');


// CREATE
// route pour poster un com
exports.createComment = async (req, res) => {
    try {
        // cible lid de larticle depuis lurl
        const postId = req.params.postId;

        // cible lid du luser qui fait la demande
        const userId = req.user.id;

        // cible le contenu du com envoyé par react
        const { content } = req.body;

        // attend et cible larticle pour avoir son auteur
        const post = await Post.findById(postId);

        // SI larticle nexiste pas alors
        if (!post) {
            // mess erreur
            return res.status(404).json({ message: "Erreur : ce billet n'existe pas." });
        }

        // securité: lauteur de larticle ne peut pas s auto commenter ni supp
        if (post.author.toString() === userId) {
            return res.status(403).json({
                message: "Tu n'as pas le droit de commenter ton propre billet."
            });
        }

        // etat pour stocker les data du com
        const newComment = new Comment({
            content,
            author: userId,
            post: postId
        });

        // attend la save en bdd
        await newComment.save();

        // recupere le login de l'auteur du com, pour lafficher sans realod
        await newComment.populate('author', 'login');

        // return validation & com a react
        res.status(201).json(newComment);

        // en cas d'erreur
    } catch (error) {
        console.error("Erreur création commentaire :", error);
        res.status(500).json({
            message: "Erreur serveur au moment d'ajouter le commentaire."
        });
    }
};

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



// UPDATE
// route pour modifier un com (auteur uniquement)
exports.updateComment = async (req, res) => {
    try {
        // cible lid du com dans les parametres de lurl
        const commentId = req.params.id;

        // cible lid du luser qui fait la demande
        const userId = req.user.id;

        // cible les datas envoyées par le form react
        const { content } = req.body;

        // attend & cible le com en bdd
        const comment = await Comment.findById(commentId);

        // SI le com nexiste pas
        if (!comment) {
            return res.status(404).json({
                message: "Erreur : ce commentaire n'existe pas."
            });
        }

        // attend & cible larticle relié au com
        const post = await Post.findById(comment.post);

        // SI luser nest pas lauteur du com alors
        // il na pas le droit de modif les coms des autres
        if (comment.author.toString() !== userId) {
            // return mess erreur
            return res.status(403).json({
                message: "Tu n'as pas l'autorisation de modifier le commentaire de quelqu'un d'autre."
            });
        }

        // SI lauteur est sur son blog
        // il na pas le droit de modif des coms sur son blog
        if (post.author.toString() === userId) {
            return res.status(403).json({
                message: "Tu ne peux pas modifier de commentaires sur ton propre blog."
            });
        }

        // maj du contenu du com
        comment.content = content;

        // attend la save en bdd
        await comment.save();

        // recupere le login pour laffichage react
        await comment.populate('author', 'login');


        // return le post a react
        res.status(200).json({
            message: "Ton commentaire a bien été modifié.",
            comment: comment
        });

        // en cas d'erreur
    } catch (error) {
        console.error("Erreur modification commentaire :", error);
        res.status(500).json({
            message: "Erreur serveur au moment de modifier le commentaire."
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