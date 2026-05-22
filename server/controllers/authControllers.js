// communique avec la BDD pour savoir si la requete peut etre autorisé

// import
const User = require('../models/User');
const bcrypt = require('bcrypt');

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
        const userAlreadyExists = await User.findOne({ $or: [{ email }, { login } ]});
        // SIL le login/mail est deja pris alors
        if (userAlreadyExists) {
            // return error 400 et message a luser
            return res.status(400).json({ message: "Cet email ou ce login est déjà utilisé."});
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
        res.status(201).json({ message: "Votre compte a bien été créé."})

        // en cas d'erruer
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur au moment de l'inscription." });
    }
};