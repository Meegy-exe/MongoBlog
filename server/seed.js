// données pour la BDD

// imports
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();
// models
const User = require('./models/User');
const Post = require('./models/Post');
const Comment = require('./models/Comment');
const Category = require('./models/Category');

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
        await Category.deleteMany();
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

        // creation des categories
        const categories = [
            { name: "Nostalgie", slug: "nostalgie", color: "#fca5a5" },
            { name: "Mood", slug: "mood", color: "#a5b4fc" },
            { name: "Musique", slug: "musique", color: "#fbbf24" },
            { name: "Délires", slug: "delires", color: "#f472b6" }
        ];

        // attend & save les categories
        const savedCategories = await Category.insertMany(categories);

        // cible lid des cat & associes aux articles
        const nostalgie = savedCategories.find(category => category.name === "Nostalgie");
        const mood = savedCategories.find(category => category.name === "Mood");
        const musique = savedCategories.find(category => category.name === "Musique");
        const delires = savedCategories.find(category => category.name === "Délires");

        // creation des faux articles
        const articles = [
            // meegy
            {
                title: "MSN me manque",
                content: "Les wizz sur MSN c’était quelque chose 😭",
                author: meegy._id,
                categories: [nostalgie._id]
            },
            {
                title: "Lâche tes coms",
                content: "Merci pour les 100 commentaires 😘",
                author: meegy._id,
                categories: [delires._id]
            },
            // marvin
            {
                title: "Tmtc",
                content: "Pas besoin d’en dire plus...",
                author: marvin._id,
                categories: [mood._id]
            },
            {
                title: "Mode emo activé",
                content: "Mon sourire cache beaucoup de choses 💔",
                author: marvin._id,
                categories: [mood._id]
            },
            {
                title: "Tokyo Hotel ❤️",
                content: "Fan pour toujours !!",
                author: marvin._id,
                categories: [musique._id]
            },
            {
                title: "Musique du moment",
                content: "Numb de Linkin Park en boucle...",
                author: marvin._id,
                categories: [musique._id, mood._id]
            },
            {
                title: "Les vrais savent",
                content: "Ceux qui étaient là en 2008 comprendront 😌",
                author: marvin._id,
                categories: [nostalgie._id]
            },
            {
                title: "Mon Nokia",
                content: "J’ai encore Snake dessus 😂",
                author: marvin._id,
                categories: [nostalgie._id, delires._id]
            },
            // avril
            {
                title: "Black & Pink : Mon univers 🖤",
                content: "Personne ne me comprend vraiment, mais ma musique et mon style disent tout. Avril Lavigne pour toujours !",
                author: avril._id,
                categories: [musique._id, mood._id]
            },
        ];

        // attend lajout des articles & le tableau retourné dans une const
        const savedPosts = await Post.insertMany(articles);

        // cible lid des faux articles
        const msnPost = savedPosts.find(post => post.title === "MSN me manque");
        const emoPost = savedPosts.find(post => post.title === "Mode emo activé");
        const lacheComsPost = savedPosts.find(post => post.title === "Lâche tes coms");
        const avrilPost = savedPosts.find(post => post.title === "Black & Pink : Mon univers 🖤");

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
            },
            {
                content: "Tellement d'accord avec toi, ce style est juste trop beau ! <3",
                author: meegy._id,
                post: avrilPost._id
            },
            {
                content: "Trop stylé ton post, tu as trop raison !",
                author: marvin._id,
                post: avrilPost._id
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