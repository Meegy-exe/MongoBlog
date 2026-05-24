// composant pour afficher les categories

// import
import { useParams, Link } from 'react-router-dom';
import { useCategories } from '../hooks/useCategories';

const CategorySidebar = () => {
    // recupere le login de lurl pour savoir quel blog est affiché
    const { login } = useParams();

    // cible le hook pour recuperer la liste des cat
    const { categories, loading, error } = useCategories();
    // SIL y a un chargement alors
    if (loading) return (
        <div className="p-4">
            Chargement...
        </div>
    );

    // SIL y a une erreur alors
    if (error) return (
        <div className="p-4 text-red-500">
            Erreur de chargement
        </div>
    );

    return (

        <aside className="min-h-screen p-4 bg-gray-50 border-r border-gray-200">

            {/* titre */}
            <h3 className="font-bold mb-4 uppercase text-sm text-gray-700">Filtrer par thèmatique</h3>

            <ul className="space-y-2">
                {/* btn retour */}
                <li>
                    <Link
                        className="text-gray-600 hover:text-fuchsia-600 font-semibold"
                        to={`/${login}`}>
                        Afficher tous les billets
                    </Link>
                </li>

                {/* boucle map pour afficher toutes les cats */}
                {categories.map((cat) => (
                    <li key={cat._id}>
                        {/* ajout du slug dans url */}
                        <Link
                            className="block text-blue-500 hover:underline transition-all"
                            to={`/${login}?category=${cat.slug}`}>
                            #{cat.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default CategorySidebar;