// composant de creation darticle
// inspiration skyblog

// imports
import { useState } from 'react';
import axios from 'axios';
// hooks
import { useCategories } from '../hooks/useCategories';

// onPostCreated:
// permet de communiquer avec le composant Blog.jsx quun article a ete créé
const CreatePost = ({ onPostCreated }) => {
    // states pour stocker ce que luser ecrit
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    // cible les 
    const { categories } = useCategories();
    // etat qui stocke les cat selectionnées
    const [selectedCategories, setSelectedCategories] = useState([]);

    // case à cocher pour selectionner les cat
    const handleCategoryChange = (categoryId) => {
        setSelectedCategories((prevSelected) => {
            // SI la cat est deja cochée alors
            if (prevSelected.includes(categoryId)) {
                // maj le tableau pour la retirer
                return prevSelected.filter(id => id !== categoryId);
                // sinon
            } else {
                // crée le tableau avec le nouvel ID
                return [...prevSelected, categoryId];
            }
        });
    };

    // la fonction se declenche quand luser envoie le form de co
    const handleSubmit = async (e) => {
        // empeche le reload de la page
        e.preventDefault();
        // reinitialise zone de message derreur
        setErrorMessage('');

        try {
            // cible le token
            const token = localStorage.getItem('token');

            // envoie titre & contenu a la route /posts
            // axios: communique avec le server
            await axios.post('/api/posts', {
                title: title,
                content: content,
                categories: selectedCategories
            }, {
                // transmet le token pour verifier les droits
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            // vide les champs du formulaire
            setTitle('');
            setContent('');
            setSelectedCategories([]);

            // maj du coté Blog.jsx
            if (onPostCreated) {
                onPostCreated();
            }

            // en cas derreur
        } catch (error) {
            console.error("Erreur lors de la création du billet :", error);
            setErrorMessage("Impossible de publier le billet.");
        }
    };

    return (
        // fond
        <div className="mb-8 p-4 bg-white border border-gray-300 shadow-sm">
            {/* titre */}
            <h3 className="mb-4 pb-2 font-bold text-fuchsia-600 border-b border-gray-200">
                Écrire un nouveau billet
            </h3>

            {/* en cas derreur affiche un message */}
            {errorMessage && (
                <div className="text-center text-red-700 bg-red-100 p-2 mb-4 border border-red-400">
                    {errorMessage}
                </div>
            )}

            {/* formulaire de creation */}
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* titre */}
                <div>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Titre de ton billet"
                        className="w-full border border-gray-300 p-2 bg-gray-50 focus:outline-none focus:border-fuchsia-400 font-bold"
                        required
                    />
                </div>

                {/* contenu */}
                <div>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Raconte ta vie ici..."
                        className="min-h-[120px] resize-y w-full border border-gray-300 p-2 bg-gray-50 focus:outline-none focus:border-fuchsia-400"
                        required
                    />
                </div>

                {/* categorie */}
                {/* verifie quelle existe & quelle nest pas vide */}
                {categories && categories.length > 0 && (
                    <div className="bg-gray-50 p-2 border border-gray-200">

                        <span className="text-xs font-bold text-gray-600 uppercase block mb-2">
                            Personnalise ton billet en ajoutant des thèmes :
                        </span>

                        {/* wrap pour afficher */}
                        <div className="flex flex-wrap gap-3">
                            {/* boucle map pour afficher toutes cats */}
                            {categories.map((cat) => (
                                <label 
                                className="flex items-center space-x-1 cursor-pointer text-[13px] text-gray-700"
                                key={cat._id}>
                                    <input
                                        className="text-fuchsia-600 cursor-pointer"
                                        type="checkbox"
                                        checked={selectedCategories.includes(cat._id)}
                                        onChange={() => handleCategoryChange(cat._id)}
                                    />
                                    <span>{cat.name}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                )}

                {/* btn publier */}
                <div className="text-right">
                    <button
                        type="submit"
                        className="bg-gray-100 border border-gray-300 font-bold py-1 px-4 hover:bg-gray-200 cursor-pointer text-fuchsia-700">
                        Publier
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreatePost;