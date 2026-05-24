// modele pour les categories des articles

// import bibliotheque pour interagir avec mongodb
const mongoose = require('mongoose');

// creation du schema
const categorySchema = new mongoose.Schema({
    // trim: retire espace en trop
    // nom de la categorie
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    // slug de la categorie (v simplifiée pour url)
    slug: {
        type: String,
        unique: true
    },
    // style par defaut
    color: {
        type: String,
        default: '#888888'
    }
});

// middleware mongoose: s'execute avant la save
// permet de generer un slug a partir du nom
categorySchema.pre('save', function (next) {
    // SI le nom a ete modifie alors
    if (this.isModified('name')) {
        // transforme le nom en slug pour url
        this.slug = this.name
            // transforme les maj en min
            .toLowerCase()
            // remplace tous chars par tiret
            .replace(/[^a-z0-9]+/g, '-')
            // retire les tirets au debut/fin sil y en a
            .replace(/(^-|-$)+/g, '');
    }
    // save
    next();
});

module.exports = mongoose.model('Category', categorySchema);