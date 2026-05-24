// gere la vérification du token pour sécuriser les routes
// (empeche lacces dune url en la tapant)

// import
const jwt = require('jsonwebtoken');


// export du middleware
module.exports = (req, res, next) => {
    try {
        // cible le header dautorisation de la requete http
        const authHeader = req.headers.authorization;
        // SIL ny a pas de header ou quil ne commence pas par bearer alors
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            // return error 401 et message a luser
            return res.status(401).json({ message: "Accès refusé : token manquant." });
        }

        // cible le token et l'extrait de la string
        const token = authHeader.split(' ')[1];

        // verification que le token est bien valide avec la clé
        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);

        // cree un req.user & stocke lid pour lenvoyer au controller
        req.user = { 
            id: verifiedToken.id 
        };

        // seulement si tout est valide alors autorise la suite avec controller
        next();


        // en cas d'erreur
    } catch (error) {
        console.error(error);
        res.status(401).json({ 
            message: "Requête non authentifiée : token invalide ou expiré." 
        });
    }
};