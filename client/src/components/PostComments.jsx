// composant d'affichage des commentaires dun article
// inspiration skyblog

// imports
import { useState, useEffect } from 'react';
import axios from 'axios';

// declare le component 
// recoit lid de larticle affiche sur la page
const PostComments = ({ postId }) => {
    //  etat qui stocke le tableau coms en bdd (defaut: empty)
    const [comments, setComments] = useState([]);

    // loading: permet de savoir si cest en attente du server
    // defaut: true (car cherche des affichage du component)
    const [loading, setLoading] = useState(true);

    // pour afficher les coms
    // useeffect: se lance dès qu'un component doit apparaitre
    useEffect(() => {
        // attend la reponse de lapi avant de continuer
        const getComments = async () => {
            try {
                /// cible le token
                const token = localStorage.getItem('token');

                // requete get vers lapi pour cibler les coms de larticle precis
                const response = await axios.get(`/api/comments/post/${postId}`, {
                    headers: {
                        // ajoute le token dans headers de la requete
                        Authorization: `Bearer ${token}`
                    }
                });

                // si reponse du server alors stocke les datas dans letat com
                setComments(response.data);

                // en cas derreur
            } catch (error) {
                console.error("Erreur lors de la récupération des commentaires", error);
            } finally {
                // dans le cas dune erreur ou non, le message de chargement disparait
                setLoading(false);
            }
        };

        // démarre la fonction
        getComments();

        // useeffect: se relancera si lid article change
    }, [postId]);

    // function de suppression de com uniquement auteur du post
    const handleDelete = async (commentId) => {
        // sécurite: message de confirmation
        if (!window.confirm("Veux-tu vraiment supprimer ce commentaire ?")) return;

        try {
            // cible le token
            const token = localStorage.getItem('token');

            // envoie requete delete vers api
            // axios: communique avec le server
            await axios.delete(`/api/comments/${commentId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // si cest ok, maj laffichage & refresh les coms
            setComments(comments.filter((comment) => comment._id !== commentId));

            // en cas derreur
        } catch (error) {
            console.error("Erreur lors de la suppression", error);
            // alerte pour luser si pas auteur
            alert("Tu n'as pas l'autorisation de supprimer ce commentaire.");
        }
    };


    // SI la requete charge toujours ALORSS
    if (loading) return <div className="text-center mt-6 text-gray-500 italic">
        {/* affiche message user */}
        Chargement des coms...
    </div>

    return (
        // fond
        <div className="mt-10 max-w-3xl mx-auto">

            {/* header  */}
            {/* comments.length: affiche le nbr de com */}
            <h3 className="text-fuchsia-600 font-bold mb-4 bg-gray-100 p-2 text-center border-t border-b border-gray-200 text-sm">
                Commentaires ({comments.length})
            </h3>

            {/* SIL ya des coms alors */}
            {comments.length === 0 ? (
                // si non affiche txt
                <div className="border border-dashed border-gray-300 p-6 text-center text-gray-500 italic bg-gray-50">
                    Il n'y a pas encore de commentaires. Lâche ton com !
                </div>
            ) : (
                // SI oui affiche coms
                // map: boucle sur le tableau pour afficher les coms
                <div className="space-y-4">
                    {/* commentaires */}
                    {comments.map((comment) => (
                        // key: obligatoire dans une boucle pour react (id unique)
                        <div
                            key={comment._id}
                            className="bg-[#fcfcfc] border border-gray-300 p-3 shadow-sm">

                            {/* auteur + date */}
                            <div className="flex justify-between items-center pb-2 mb-2 border-b border-dashed border-gray-300">
                                <span className="font-bold text-blue-600 hover:underline cursor-pointer text-xs">
                                    {/* SI lauteur est supprimé affiche anonyme */}
                                    xXx-{comment.author?.login || 'Anonyme'}-xXx
                                </span>

                                <span className="text-[10px] text-gray-400">
                                    {/* post.createdat: va chercher la date en bdd */}
                                    {/* tolocaledatestring:  */}
                                    {comment.createdAt
                                        ? new Date(comment.createdAt).toLocaleDateString('fr-FR', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })
                                        // si pas de date alors noté archivé
                                        : 'Date inconnue (Archivé)'
                                    }
                                </span>
                                {/* suppression de com */}
                                <button
                                    onClick={() => handleDelete(comment._id)}
                                    className="text-[10px] text-red-500 hover:text-red-700 font-bold hover:underline"
                                    title="Supprimer ce commentaire">
                                    [X]
                                </button>

                            </div>

                            {/* footer */}
                            <p
                                className="text-gray-800 text-xs whitespace-pre-wrap">
                                {comment.content}
                            </p>

                        </div>
                    ))}

                </div>
            )}
        </div>
    );
};

export default PostComments;