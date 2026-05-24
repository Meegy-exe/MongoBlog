// composant d'affichage des commentaires dun article
// inspiration skyblog

// imports
import { useState, useEffect } from 'react';
import axios from 'axios';
// pour recup le login dans lurl
import { useParams } from 'react-router-dom';

// declare le component 
// recoit lid de larticle affiche sur la page
const PostComments = ({ postId }) => {
    // recupere le login de lurl pour savoir quel blog est affiché
    const { login } = useParams();

    //  etat qui stocke le tableau coms en bdd (defaut: empty)
    const [comments, setComments] = useState([]);

    // loading: permet de savoir si cest en attente du server
    // defaut: true (car cherche des affichage du component)
    const [loading, setLoading] = useState(true);

    // etat qui stoke le text du com
    const [newComment, setNewComment] = useState("");

    // etat pour savoir quel com luser modifie (stocke lid du com)
    const [editingCommentId, setEditingCommentId] = useState(null);

    // etat pour stocker le text en cours de modif
    const [editContent, setEditContent] = useState("");

    // cible le login de luser co
    // verif si cest le blog de luser co
    const loggedUser = localStorage.getItem('userLogin');
    // compare aussi les min & maj
    const isMyBlog = loggedUser?.toLowerCase() === login?.toLowerCase();

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

    // function poster un com
    const handlePostComment = async (e) => {
        // bloque le reload de la page
        e.preventDefault();
        try {
            // cible le token
            const token = localStorage.getItem('token');

            // envoie requete post vers api
            // axios: communique avec le server
            const response = await axios.post(`/api/comments/post/${postId}`,
                { content: newComment },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            // maj laffichage : met le com au debut du tableau
            setComments([response.data, ...comments]);

            // reinitialise le champs text
            setNewComment('');

            // en cas derreur
        } catch (error) {
            console.error("Erreur lors de l'ajout du com", error);
            // affiche le message derreur du back OU un mess par defaut
            alert(error.response?.data?.message || "Erreur : impossible d'ajouter le commentaire.");
        }
    };

    // function pour modifier un com 
    const handleUpdateComment = async (e, commentId) => {
        // bloque le reload
        e.preventDefault();

        try {
            // cible le token
            const token = localStorage.getItem('token');

            // envoie requete put vers api
            // axios: communique avec le server
            await axios.put(`/api/comments/${commentId}`,
                { content: editContent },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            // maj laffichage map: boucle sur les coms 
            setComments(comments.map((comment) =>
                // SI le com est modifié, il est maj sinon laisse tel quel
                comment._id === commentId ? { ...comment, content: editContent } : comment
            ));

            // reinitialise les etats pour fermer ledition
            setEditingCommentId(null);
            setEditContent('');

            // en cas derreur
        } catch (error) {
            console.error("Erreur lors de la modification", error);
            // mess back ou mess defaut
            alert(error.response?.data?.message || "Erreur : impossible de modifier ce commentaire.");
        }
    };

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

            {/* SI luser nest pas sur son blog alors */}
            {!isMyBlog && (
                // affiche form ajout com
                <form
                    className="mb-6 bg-gray-50 p-4 border border-dashed border-gray-300"
                    onSubmit={handlePostComment}>

                    <p className="font-bold text-fuchsia-600 mb-2 text-center">~ Lâche ton com ~</p>

                    {/* contenu */}
                    <textarea
                        className="w-full min-h-[80px] p-2 border border-gray-300 outline-none focus:border-fuchsia-400"
                        placeholder="Ecris ton commentaire"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        required
                    />

                    {/* btn */}
                    <div className="text-right mt-2">
                        <button
                            className="py-1 px-4 bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold cursor-pointer"
                            type="submit">
                            Poster
                        </button>
                    </div>
                </form>
            )}

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
                    {comments.map((comment) => {
                        // verifie si luser co est lauteur du com specifique
                        // lowercase: compare min et maj aussi
                        const isCommentAuthor = loggedUser?.toLowerCase() === comment.author?.login?.toLowerCase();

                        return (
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

                                    <div className="flex items-center space-x-3">
                                        <span className="text-[13px] text-gray-400">
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

                                        {/* SI luser est lauteur du com & quil nest pas sur son blog alors */}
                                        {isCommentAuthor && !isMyBlog && (
                                            // affiche btn modifier
                                            <button
                                                onClick={() => {
                                                    // ouvre ledition
                                                    setEditingCommentId(comment._id);
                                                    setEditContent(comment.content);
                                                }}
                                                className="text-[13px] text-orange-500 hover:text-orange-700 font-bold hover:underline"
                                                title="Modifier ce commentaire">
                                                [Modifier]
                                            </button>
                                        )}

                                        {/* suppression de com */}
                                        {/* SI cest le blog de luser alors */}
                                        {isMyBlog && (
                                            // affiche suppression
                                            <button
                                                className="text-[13px] text-red-500 hover:text-red-700 font-bold hover:underline"
                                                onClick={() => handleDelete(comment._id)}
                                                title="Supprimer ce commentaire">
                                                [X]
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* footer */}
                                {/* SI luser est dans ledition alors */}
                                {editingCommentId === comment._id ? (
                                    // affiche form de modif
                                    <form
                                        onSubmit={(e) => handleUpdateComment(e, comment._id)}
                                        className="mt-2">
                                        {/* contenu */}
                                        <textarea
                                            className="w-full min-h-[60px] p-2 border border-gray-300 outline-none focus:border-orange-400 text-xs"
                                            value={editContent}
                                            onChange={(e) => setEditContent(e.target.value)}
                                            required
                                        />

                                        {/* btn annuler */}
                                        <div className="text-right mt-1 space-x-2">
                                            <button
                                                className="text-[13px] bg-gray-200 hover:bg-gray-300 px-2 py-1 font-bold cursor-pointer"
                                                type="button"
                                                onClick={() => setEditingCommentId(null)}>
                                                Annuler
                                            </button>

                                            {/* btn valider */}
                                            <button
                                                className="text-[13px] bg-orange-500 hover:bg-orange-600 text-white px-2 py-1 font-bold cursor-pointer"
                                                type="submit">
                                                Valider
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    // SI normal alors
                                    //  affiche le texte classique
                                    <p className="text-gray-800 text-xs whitespace-pre-wrap">
                                        {comment.content}
                                    </p>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default PostComments;