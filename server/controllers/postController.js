// gère la logique metier & communique avec la BDD pour les articles

// import
const Post = require('../models/Post');

// CREATE
// route dautorisation de creation d'article
exports.createPost = async (req, res) => {
    try {
        // cible les datas recues du form react
        const { title, content } = req.body;

        // cible lid du luser qui fait la demande
        const authorId = req.user.id;

        // assemblage pour la creation du nouvel article
        const newPost = new Post({
            title,
            content,
            author: authorId
        });

        // attend la save avant de continuer
        await newPost.save();

        // return validation user
        res.status(201).json({
            message: "Votre billet a bien été créé.",
            post: newPost
        })

        // en cas d'erreur
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Erreur serveur au moment de la création du billet."
        });
    }
};


// READ
// route pour récuperer tous les articles de luser
exports.getAllPosts = async (req, res) => {
    try {
        // cible lid du luser qui fait la demande
        const userId = req.user.id;

        // cible dans la bdd TOUS les articles de cet user
        // sort: permet de trier par ordre chrono (plus recent au plus vieux)
        // post.find: recupere tous les elements qui correspondent au critere
        const posts = await Post.find({ author: userId }).sort({ createdAt: -1 });

        // return allposts a react
        res.status(200).json(posts);

        // en cas d'erreur
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Erreur serveur au moment de récupérer les billets."
        });
    }
};


// READ
// route pour cibler un article spécifique
exports.getOnePost = async (req, res) => {
    try {
        // cible lid du post dans les parametres de lurl
        const postId = req.params.id;

        // cible le post dans la bdd
        const post = await Post.findById(postId);

        // SI larticle nexiste pas alors
        if (!post) {
            return res.status(404).json({
                message: "Ce billet n'existe pas."
            });
        }

        // return le post a react
        res.status(200).json(post);

        // en cas d'erreur
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Erreur serveur au moment de récupérer le billet."
        });
    }
};


// UPDATE
// route pour modifier un article
exports.updatePost = async (req, res) => {
    try {
        // cible lid du post dans les parametres de lurl
        const postId = req.params.id;

        // cible lid du luser qui fait la demande
        const userId = req.user.id;

        // cible les datas envoyées par le form react
        const { title, content } = req.body;


        // findoneandupdate: cherche un element précis pour le modifier
        const updatedPost = await Post.findOneAndUpdate(
            // cherche avec lid du post et lid de luser
            { _id: postId, author: userId },
            // change titre & contenu
            { title, content },
            // demande a la bdd de renvoyer larticle maj
            { new: true }
        );

        // SI larticle nexiste pas / ou pas lauteur alors
        if (!updatedPost) {
            return res.status(404).json({
                message: "Ce billet n'existe pas ou vous n'avez pas l'autorisation de le modifier."
            });
        }

        // return le post a react
        res.status(200).json({
            post: updatedPost,
            message: "Votre billet a bien été mis à jour."
    });

        // en cas d'erreur
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Erreur serveur au moment de modifier le billet."
        });
    }
};




// DELETE
// route pour supprimer un article
exports.deletePost = async (req, res) => {
    try {
        // cible lid du post dans les parametres de lurl
        const postId = req.params.id;

        // cible lid du luser qui fait la demande
        const userId = req.user.id;

        // findoneandupdate: cherche un element précis pour le supprimer
        const deletedPost = await Post.findOneAndDelete(
            // cherche avec lid du post et lid de luser
            { _id: postId, author: userId },
        );

        // SI larticle nexiste pas / ou pas lauteur alors
        if (!deletedPost) {
            return res.status(404).json({
                message: "Ce billet n'existe pas ou vous n'avez pas l'autorisation de le supprimer."
            });
        }

        // return confirmation de suppression a react
        res.status(200).json({
            message: "Votre billet a bien été supprimé."
    });

        // en cas d'erreur
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Erreur serveur au moment de supprimer le billet."
        });
    }
};