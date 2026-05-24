// page daccueil de tous les blogs existant
// inspiration skyblog

// imports
import axios from 'axios';
import { useState, useEffect } from 'react';
// link: permet de naviguer entre les pages sans reload
import { useParams, Link } from 'react-router-dom';

// declaration du component
const Home = () => {
    // etat qui stocke le tableau des users en bdd (defaut: empty)
    const [users, setUsers] = useState([]);

    // etat qui stocke si la personne est un user(token) ou visiteur
    const loggedUser = localStorage.getItem('userLogin');

    // loading: permet de savoir si cest en attente du server
    // defaut: true
    const [loading, setLoading] = useState(true);

    // useeffect: se lance dès qu'un component doit apparaitre
    useEffect(() => {
        // attend la reponse de lapi avant de continuer
        const fetchUsers = async () => {
            try {
                // requete get vers lapi pour cibler tous les users
                // page publique
                const response = await axios.get('/api/auth/users');

                // si reponse du server alors stocke les datas dans letat
                setUsers(response.data);

                // en cas derreur
            } catch (error) {
                console.error("Erreur lors de la récupération des blogs", error);
            } finally {
                // dans le cas dune erreur ou non, le message de chargement disparait
                setLoading(false);
            }
        };

        // démarre la fonction
        fetchUsers();

        // tableau vide: useeffect ne se lance quune fois au chargement
    }, []);

    // SI la requete charge toujours ALORS
    if (loading) return <div className="mt-10 text-center text-gray-500 italic">
        {/* affiche message user */}
        Chargement de la liste des blogs créés sur le site...
    </div>


    return (
        // fond
        <div className="mt-10 max-w-4xl mx-auto p-4">

            {/* header */}
            <h2 className="mb-8 p-3 text-fuchsia-600 font-bold bg-gray-100 text-center border-t border-b border-dashed border-gray-400 shadow-sm text-lg">
                ~ Listes des MongoBlog ~ ({users.length})
            </h2>

            {/* SIL ny a pas encore de blog créé alors */}
            {users.length === 0 ? (
                // affiche txt
                <div className="border border-dashed border-gray-300 p-6 text-center text-gray-500 italic bg-gray-50">
                    Aucun blog n'a été créé pour le moment. Inscris-toi pour être le premier !
                </div>
            ) : (
                // SI oui affiche la liste
                // format de grid
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

                    {/* map: boucle tableau pour afficher les users */}
                    {users.map((user) => (
                        // key: obligatoire dans boucle pour react (id unique)
                        // link: toute la card est entierement cliquable
                        <Link
                            className="bg-[#fcfcfc] border border-gray-300 p-6 text-center shadow-sm hover:border-fuchsia-400 hover:bg-fuchsia-50 cursor-pointer block"
                            key={user._id}
                            // SI luser est co alors
                            // affiche le blog
                            // sinon affiche page login
                            to={loggedUser ? `/${user.login}` : '/login'}>

                            {/* pseudo */}
                            <span className="font-bold text-blue-600 hover:underline text-[15px]">
                                xXx-{user.login}-xXx
                            </span>

                            {/* txt selon le cas */}
                            <p className="text-xs text-gray-400 mt-3 font-bold">
                                {loggedUser ? "[ Visiter le blog ]" : "[ Connecte-toi pour découvrir ce blog ]"}
                            </p>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;