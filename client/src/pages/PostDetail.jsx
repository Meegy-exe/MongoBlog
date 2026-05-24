// page detaillé dun article
// inspiration skyblog

// imports
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
// components
import PostCard from '../components/PostCard';
import PostComments from '../components/PostComments';

const PostDetail = () => {
    // extrait lid depuis ladresse url
    const { id, login } = useParams();
    // states pour stocker  larticle
    const [post, setPost] = useState(null);
    // par defaut la page est en train de charger
    const [loading, setLoading] = useState(true);
    // states pour stocker ce que l'user tape dans le form d edition
    const [editTitle, setEditTitle] = useState("");
    const [editContent, setEditContent] = useState("");
    // states pour stocker letat en edition ou lecture
    const [isEditing, setIsEditing] = useState(false);
    // cible luser connecte
    const loggedUser = localStorage.getItem('userLogin');
    // verification si luser co est sur son blog
    const isMyBlog = loggedUser?.toLowerCase() === login?.toLowerCase();

    useEffect(() => {
        // attend la reponse de lapi avant de continuer
        const getPost = async () => {
            try {
                // cible le token
                const token = localStorage.getItem('token');

                // ajoute le token dans headers de la requete
                const response = await axios.get(`/api/posts/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                // debug: affichage des articles
                console.log("Données reçues du back :", response.data);

                // maj le composant avec les bonnes datas
                setPost(response.data);
                // maj les nouvelles datas de larticle
                setEditTitle(response.data.title);
                setEditContent(response.data.content);

                // en cas derreur
            } catch (error) {
                console.error("Erreur lors de la récupération du billet", error);
            } finally {
                // dans le cas dune erreur ou non, le message de chargement disparait
                setLoading(false);
            }
        };

        getPost();
    }, [id]);

    // fonction de modification (envoi au server)
    const handleUpdate = async (e) => {
        // bloque le reload de la page
        e.preventDefault();

        try {
            // cible le token
            const token = localStorage.getItem('token');

            // envoie requete edition vers api
            // axios: communique avec le server
            const response = await axios.put(`/api/posts/${id}`, {
                title: editTitle,
                content: editContent
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // maj laffiche de larticle & reponse server
            // garde larticle existant remplace titre & content
            setPost({ ...post, title: editTitle, content: editContent });
            // ferme le form
            setIsEditing(false);

        } catch (error) {
            console.error("Erreur lors de la modification", error);
            alert("Tu n'as pas l'autorisation de modifier ce billet.");
        }
    };



    // lors du chargement de larticle
    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-[#E9E9E9] font-sans text-gray-500">
            Chargement du billet...
        </div>
    );

    // en cas derreur
    if (!post) return (
        <div className="min-h-screen flex items-center justify-center bg-[#E9E9E9] font-sans text-red-500 font-bold">
            Erreur 404 : Billet introuvable.
        </div>
    );

    return (
        <div className="min-h-screen p-2 md:p-8 bg-[#E9E9E9] font-sans text-xs text-gray-800">
            <div className="max-w-4xl mx-auto p-6 md:p-10 bg-white border border-gray-300 shadow-sm">
                {/* header btn */}
                <div className="flex justify-between items-center mb-6">
                    {/* btn retour */}
                    <Link to={`/${login}`}
                        className="text-blue-600 hover:underline mb-6 inline-block font-bold">
                        Retour au blog
                    </Link>

                    {/* modifier article */}
                    {/* verification affiche modif que sil est lauteur de larticle */}
                    {isMyBlog && (
                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            className="text-fuchsia-600 font-bold border border-fuchsia-600 px-2 py-1 hover:bg-fuchsia-50 text-[13px]">
                            {isEditing ? "[X] Annuler" : "Modifier le billet"}
                        </button>
                    )}
                </div>

                {/* afficher larticle selon le cas */}
                {/* SI mode edition alors */}
                {isEditing ? (
                    // affiche form modifier
                    <form
                        onSubmit={handleUpdate}
                        className="mb-10 max-w-3xl mx-auto bg-gray-50 p-4 border border-dashed border-gray-400">
                        {/* titre */}
                        <input
                            className="w-full mb-4 p-2 bg-white border border-gray-300 font-bold text-fuchsia-600 text-center text-sm outline-none"
                            type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            required
                        />

                        {/* contenu */}
                        <textarea
                            className="w-full p-2 bg-white border border-gray-300 min-h-[150px] text-gray-800 whitespace-pre-wrap outline-none"
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                            required
                        />

                        {/* btn de validation */}
                        <div className="text-center mt-4">
                            <button type="submit" className="py-2 px-4 bg-fuchsia-600 text-white font-bold text-[13px]">
                                Enregistrer
                            </button>
                        </div>
                    </form>
                ) : (
                    // SI mode lecture alors
                    // affiche l'article en lui passant les infos
                    <PostCard post={post} login={login} isMyBlog={isMyBlog} />
                )}

                {/* coms */}
                <PostComments postId={post._id} />
            </div>
        </div>
    );
};

export default PostDetail;