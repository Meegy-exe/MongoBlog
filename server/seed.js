// données pour la BDD

// imports
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();
// models
const User = require('./models/User');
const Post = require('./models/Post');
const Comment = require('./models/Comment');

// function pour remplir la bdd de comptes déjà existants
const seedDB = async () => {
    try {
        // connexion a la bdd
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connexion réussie à MongoDB");

        // réinitialisation & suppression des anciennes datas en bdd
        await User.deleteMany();
        await Post.deleteMany();
        await Comment.deleteMany();
        console.log("La base de donnée a bien été réinitialisée");

        // hashage mdp
        const salt = await bcrypt.genSalt(10);
        // FAUX mdp, uniquement dans le cadre d'une fausse bdd
        const hashedPassword = await bcrypt.hash("login123", salt);

        // contenu des comptes
        // 1er compte
        const users = [{
            id: 1,
            login: "Meegy",
            email: "meegy@mail.fr",
            password: hashedPassword,
            type: false
        }, {

            // 2eme compte
            id: 2,
            login: "Marvin",
            email: "marvin@mail.fr",
            password: hashedPassword,
            type: false
        }, {
            // 3eme compte
            id: 3,
            login: "AvrilGirl62",
            email: "avril@mail.fr",
            password: hashedPassword,
            type: false
        }
        ];
        // attend lajout des comptes & le tableau retourné dans une const
        // insertmany: permet de save un tableau complet dans la bdd
        const savedUsers = await User.insertMany(users);
        console.log("Les utilisateur ont bien été créés.");

        // cible lid des faux comptes
        const meegy = savedUsers.find(user => user.login === "Meegy");
        const marvin = savedUsers.find(user => user.login === "Marvin");
        const avril = savedUsers.find(user => user.login === "AvrilGirl62");

        // creation des faux articles
        const articles = [
            // meegy
            {
                title: "MSN me manque",
                content: "Les wizz sur MSN c’était quelque chose 😭",
                author: meegy._id
            },
            {
                title: "Lâche tes coms",
                content: "Merci pour les 100 commentaires 😘",
                author: meegy._id
            },
            // marvin
            {
                title: "Tmtc",
                content: "Pas besoin d’en dire plus...",
                author: marvin._id
            },
            {
                title: "Mode emo activé",
                content: "Mon sourire cache beaucoup de choses 💔",
                author: marvin._id
            },
            {
                title: "Tokyo Hotel ❤️",
                content: "Fan pour toujours !!",
                author: marvin._id
            },
            {
                title: "Musique du moment",
                content: "Numb de Linkin Park en boucle...",
                author: marvin._id
            },
            {
                title: "Les vrais savent",
                content: "Ceux qui étaient là en 2008 comprendront 😌",
                author: marvin._id
            },
            {
                title: "Mon Nokia",
                content: "J’ai encore Snake dessus 😂",
                author: marvin._id
            },
        ];
        
        // attend lajout des articles & le tableau retourné dans une const
        const savedPosts = await Post.insertMany(articles);

        // cible lid des faux coms
        const msnPost = savedPosts.find(post => post.title === "MSN me manque");
        const emoPost = savedPosts.find(post => post.title === "Mode emo activé");
        const lacheComsPost = savedPosts.find(post => post.title === "Lâche tes coms");

        // creation de faux coms
        const comments = [
            {
                content: "Grave !! J'ai encore le son en tête 😭",
                author: marvin._id,
                post: msnPost._id
            },
            {
                content: "Moi j'apprends le codage, je vais recoder MSN tu vas voir ! 😎",
                author: meegy._id,
                post: msnPost._id
            },
            {
                content: "Prem's !! 🥇 Rends les coms stp !!",
                author: avril._id,
                post: lacheComsPost._id
            },
            {
                content: "Avec ce look trop dark, on dirait trop Jinx, j'adore 🖤",
                author: meegy._id,
                post: emoPost._id
            }
        ];

        console.log("Les billets de blog ont bien été créés");
        // attend lajout des coms avant de continuer
        await Comment.insertMany(comments);
        console.log("Les commentaires ont bien été créés");

        // deconnexion de la bdd
        mongoose.connection.close();
        console.log("Le seeding est terminé, déconnexion de la BDD.");

        // en cas derreur
    } catch (error) {
        console.error("Erreur lors du seeding :", error);
        mongoose.connection.close();
    }
};

// demarrage de la fonction
seedDB();