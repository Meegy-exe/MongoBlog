// gère la logique metier & communique avec la BDD pour les categories des articles

// import
const Category = require('../models/Category');

// CREATE
// route pour ajouter une categorie
// admin
exports.createCategory = async (req, res) => {
    try {
        // SI lobjet nexiste pas ou sil na pas le type true (admin) alors
        if (!req.user || req.user.type !== true) {
            // mess erreur
            return res.status(403).json({ message: "Accès refusé : réservé aux administrateurs." });
        }

        // cible les datas recues envoyé par react
        const { name, color } = req.body;

        // cree la categorie
        const newCategory = new Category({
            name,
            color
        });

        // attends la save en bdd
        await newCategory.save();

        // return validation & categorie a react
        res.status(201).json(newCategory);

        // en cas derreur
    } catch (error) {
        console.error(error);
        // erreur 11000: doublon (MDB)
        if (error.code === 11000) {
            return res.status(400).json({ message: "Cette catégorie existe déjà." });
        }
        res.status(500).json({ message: "Erreur serveur lors de la création de la catégorie." });
    }
};

// READ
// route pour recuperer la liste de toutes les categories
exports.getAllCategories = async (req, res) => {
    try {
        // import model post pour compter les cat
        const Post = require('../models/Post');

        // attend cible & recupere
        const categories = await Category.find();

        // boucle map pour compter les posts par cat
        const categoriesWithCount = await Promise.all(
            categories.map(async (cat) => {
                // compte le nbr de documents Post qui ont cet ID de cat
                const count = await Post.countDocuments({ categories: cat._id });

                // return lobjet avec le compteur en plus
                return {
                    _id: cat._id,
                    name: cat.name,
                    slug: cat.slug,
                    color: cat.color,
                    postCount: count
                };
            })
        );

        // return la liste avec postCount
        res.status(200).json(categoriesWithCount);

        // en cas derreur
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur lors de la récupération des catégories." });
    }
};