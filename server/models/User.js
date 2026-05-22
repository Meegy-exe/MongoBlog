// règle de base concernant la création dun user

// import bibliotheque pour interagir avec mongodb
const mongoose = require('mongoose');

// regex: verifie que la forme est valide (mail@mail.fr)

// crée le schema via mongoose
const userSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true,
        unique: true,
        minLength: 5,
        maxLength: 20
    },

    email: {
        type: String,
        required: true,
        unique: true,
        // regex
        match: [/^\S+@\S+\.\S+$/, 'Veuillez entrer une adresse email valide']

    },
    password: {
        type: String,
        required: true
    },

    // par defaut = membre strict (pas admin)
    type: {
        type: Boolean,
        default: false
    }
}, {
    // timestamps en TRUE: dit a mongoose de gerer le temps de maniere automatique
    // createdAT: met la date de creation du compte
    // updatedat: maj luser quand il y a une modif
    timestamps: true
});

// export du model
module.exports = mongoose.model("User", userSchema);