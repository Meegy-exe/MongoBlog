// composant daffichage darticles
// inspiration skyblog

// imports
import { useParams, Link } from 'react-router-dom';

// affichage de la date en FR
const PostCard = ({ post }) => {
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
                <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                    {post.content}
                </p>
            </div>

            {/* footer */}
            <footer className="flex justify-between items-center mt-2 pt-2 text-gray-500 border-t border-gray-200 text-[11px]">
                {/* date */}
                <span>@Posté le {dateFr}</span>
            </footer>
        </article>
    );
};

export default PostCard;