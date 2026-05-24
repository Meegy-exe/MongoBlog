// composant navigation
// inspiration skyblog

// imports
import { useNavigate, Link } from 'react-router-dom';

const Navbar = () => {
    // permet de rediriger luser
    const navigate = useNavigate();

    // recupere le login de luser
    const loggedUser = localStorage.getItem('userLogin');

    // function de deconnexion
    const handleLogout = () => {
        // vide le cache (supprime token)
        localStorage.removeItem('token');
        localStorage.removeItem('userLogin');
        // redirige vers co
        navigate('/login');
    };

    return (
        // bloc principal
        <div className="space-x-6 p-3 bg-gray-100 border-b border-dashed border-gray-400 text-center text-[15px] font-bold shadow-sm">

            {/* accueil de tous les blogs */}
            {/* warning a relier apres */}
            <Link to="/" className="text-fuchsia-600 hover:underline">
                [ Accueil ]
            </Link>

            {/* securite */}
            {/* SI luser est co alors */}
            {loggedUser ? (
                // affiche les liens des autres pages
                <>
                    {/* blog user co */}
                    <Link
                        className="text-blue-600 hover:underline"
                        to={`/${loggedUser}`}>
                        [ Mon Blog ]
                    </Link>

                    {/* btn deconnexion */}
                    <button
                        className="text-red-500 hover:underline cursor-pointer font-bold"
                        onClick={handleLogout}>
                        [ Déconnexion ]
                    </button>
                </>
            ) : (
                <>
                    {/* SI pas co alors */}
                    {/* affiche connexion */}
                    <Link
                        className="text-blue-600 hover:underline"
                        to="/login">
                        [ Connecte-toi ]
                    </Link>
                    {/* affiche inscription */}
                    <Link
                        className="text-blue-600 hover:underline"
                        to="/register">
                        [ Crée ton blog ]
                    </Link>
                </>
            )}
        </div>
    );
};

export default Navbar;