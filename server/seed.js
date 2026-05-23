// données pour la BDD

// imports
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();
// models
const User = require('./models/User');
const Post = require('./models/Post');

// function pour remplir la bdd de comptes déjà existants
const seedDB = async () => {
    try {
        // connexion a la bdd
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connexion réussie à MongoDB");

        // réinitialisation & suppression des anciennes datas en bdd
        await User.deleteMany();
        await Post.deleteMany();
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
        }
        ];
        // save des comptes dans la bdd
        // insertmany: permet de save un tableau complet dans la bdd
        const savedUsers = await User.insertMany(users);
        console.log("Les utilisateur ont bien été créés.");

        // cible lid des faux comptes
        const meegy = savedUsers.find(user => user.login === "Meegy");
        const marvin = savedUsers.find(user => user.login === "Marvin");

        // creation des faux articles
        const articles = [
            {
                title: "Musique du moment",
                content: "Numb de Linkin Park en boucle...",
                author: marvin._id
            },
            {
                title: "Mon style Dark & Alternatif",
                content: "J'aimerai me définir un style... J'aime bien le noir, le côté dark. Un peu comme dans Arcane. Vous avez des conseils ?",
                author: meegy._id
            },
            {
                title: "MSN me manque",
                content: "Les wizz sur MSN c’était quelque chose 😭",
                author: meegy._id
            },
            {
                title: "Tokyo Hotel ❤️",
                content: "Fan pour toujours !!",
                author: marvin._id
            },
            {
                title: "Lâche tes coms",
                content: "Merci pour les 100 commentaires 😘",
                author: meegy._id
            }
        ];

        await Post.insertMany(articles);
        console.log("Les billets de blog ont bien été créés");

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