// règle de base concernant la création dun commentaire

// import bibliotheque pour interagir avec mongodb
const mongoose = require('mongoose');

// crée le schema via mongoose
const commentSchema = new mongoose.Schema({

    // contenu
    content: {
        type: String,
        required: true,
    },

    // relation entre le com et luser qui l'a écrit
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },

    // relation entre le com et son post
    post: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Post'
    },

}, {
    // timestamps en TRUE: dit a mongoose de gerer le temps de maniere automatique
    // createdAT: met la date de creation du com
    // updatedat: maj le com quand il y a une modif
    timestamps: true
});

// export du model
module.exports = mongoose.model("Comment", commentSchema);