// communique avec la BDD pour savoir si la requete peut etre autorisé

// import
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// models
const User = require('../models/User');

// route dautorisation de creation de compte
exports.register = async (req, res) => {
    try {
        // cible les datas recues du form react
        const { login, email, password, passwordConfirm } = req.body;
        // salt: terme informatique, valeur ajouté au mdp avant le hachage
        const salt = await bcrypt.genSalt(12);
        // bcrypt: hachage de mdp
        const hashedPassword = await bcrypt.hash(password, salt);

        // standard logique: est ce que le login/mail est deja inscrit
        const userAlreadyExists = await User.findOne({ $or: [{ email }, { login }] });
        // SIL le login/mail est deja pris alors
        if (userAlreadyExists) {
            // return error 400 et message a luser
            return res.status(400).json({ message: "Cet email ou ce login est déjà utilisé." });
        }

        // standard logique: les mdps doivent correspondre
        if (password !== passwordConfirm) {
            return res.status(400).json({ message: "Les mots de passe ne correspondent pas." });
        }

        // assemblage pour la creation du nouveau compte
        const newUser = new User({
            login,
            email,
            password: hashedPassword
        });

        // attend la save avant de continuer
        await newUser.save();

        // return validation user
        res.status(201).json({ message: "Votre compte a bien été créé." })

        // en cas d'erruer
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur au moment de l'inscription." });
    }
};


// route dautorisation de connexion
exports.login = async (req, res) => {
    try {
        // cible les datas recues du form react
        const { login, password } = req.body;

        // standard logique: est ce que le login est bien enregistré
        const user = await User.findOne({ login });
        // SIL nexiste pas alors
        if (!user) {
            // return error 404 et message a luser
            return res.status(404).json({ message: "Ce compte n'existe pas." });
        }

        // standard logique: les mdps doivent correspondre avec celui hashé
        // cible et compare les mdps
        const isPasswordValid = await bcrypt.compare(password, user.password);
        // SILS ne correspondent pas alors
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Votre mot de passe est incorrect." });
        }

        // jwt: token de securité
        // expiration du token en 1h
        const token = jwt.sign({
            id: user._id, type: user.type
        },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // return message validation user avec token
        res.status(200).json({
            message: "Connexion réussie.",
            token,
            user: { login: user.login, type: user.type }
        });

        // en cas d'erreur
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur au moment de la connexion." });
    }
};

// READ
// route pour recuperer les blogs de tous les users
exports.getAllUsers = async (req, res) => {
    try {
        // attend & cible tous les users dans la bdd
        // login en para: permet de return que le login
        const users = await User.find({}, 'login');

        // return la liste a react
        res.status(200).json(users);

        // en cas derreur
    } catch (error) {
        console.error("Erreur récupération utilisateurs :", error);
        res.status(500).json({
            message: "Erreur serveur au moment de récupérer la liste des blogs."
        });
    }
};