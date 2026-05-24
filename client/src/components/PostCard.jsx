// composant daffichage darticles
// inspiration skyblog

// imports
import { useParams, Link } from 'react-router-dom';

const PostCard = ({ post, login, isMyBlog, handleDelete }) => {
    // affichage de la date en FR
    // post.createdat: va chercher la date en bdd
    // tolocaledatestring: 
    const dateFr = post.createdAt
        ? new Date(post.createdAt).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
        // si pas de date alors noté archivé
        : 'Date inconnue (Archivé)';

    return (
        // bloc article
        <article className="mb-10 max-w-3xl mx-auto">
            {/* partie haut */}
            <header>
                {/* titre billet */}
                <h2 className="mb-4 bg-gray-100 text-center text-fuchsia-600 font-bold p-2 border-t border-b border-gray-200 text-sm">
                    {post.title}
                </h2>
            </header>

            {/* contenu */}
            <div className="p-4 mb-4 min-h-[150px] bg-gray-50 border border-dashed border-gray-300">
                {/* whitespace-pre-wrap: important pour blogs (afficher les espaces) */}
                <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                    {post.content}
                </p>
            </div>

            {/* footer */}
            <footer className="flex flex-col mt-2 pt-2 border-t border-gray-200">
                {/* categories */}
                {/* verifie quelles existent & quelles ne sont pas vide */}
                {post.categories && post.categories.length > 0 && (

                    <div className="flex gap-2 mb-2">
                        {post.categories.map((cat) => (
                            <span
                                className="px-1.5 py-0.5 text-[10px] font-bold uppercase bg-gray-900 border border-gray-600"
                                key={cat._id}
                                // applique color sinon color defaut
                                style={{ backgroundColor: cat.color || '#f472b6' }}>
                                [ {cat.name} ]
                            </span>
                        ))}
                    </div>
                )}

                {/* date */}
                <div className="flex justify-between items-center mt-2">

                    <span className="text-gray-500 text-[11px]">
                        @Posté le {dateFr}
                    </span>

                    {/* btns */}
                    <div className="flex gap-4">
                        <Link
                            className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-blue-600 border border-gray-300 font-bold cursor-pointer transition-colors text-[13px]"
                            to={`/${login}/${post._id}`}>
                            Voir & Commenter
                        </Link>

                        {/* SI la personne sur le blog est le createur du blog */}
                        {isMyBlog && (
                            <button
                                className=" px-3 py-1  bg-gray-100 hover:bg-gray-200 text-red-600 hover:text-red-800 border border-gray-300 font-bold cursor-pointer transition-colors text-[11px]"
                                onClick={() => handleDelete(post._id)}>
                                Supprimer
                            </button>
                        )}
                    </div>
                </div>
            </footer>
        </article>
    );
};

export default PostCard;