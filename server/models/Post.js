// règle de base concernant la création dun post(article/billet)

// import bibliotheque pour interagir avec mongodb
const mongoose = require('mongoose');

// crée le schema via mongoose
const postSchema = new mongoose.Schema({
    // titre
    title: {
        type: String,
        required: true,
        // permet de retirer les espaces en trop
        trim: true
    },

    // contenu
    content: {
        type: String,
        required: true,
    },

    // relation entre l'article et luser qui l'a créé
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },

}, {
    // timestamps en TRUE: dit a mongoose de gerer le temps de maniere automatique
    // createdAT: met la date de creation du post
    // updatedat: maj le post quand il y a une modif
    timestamps: true
});

// export du model
module.exports = mongoose.model("Post", postSchema);