// page de connexion
// inspiration skyblog

// imports
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    // states pour stocker ce que luser ecrit
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    // function pour afficher un message erreur au besoin
    const [errorMessage, setErrorMessage] = useState('');

    // usernavigate: permet de rediriger luser dès la connexion
    const navigate = useNavigate();

    // la fonction se declenche quand luser se co
    const handleLogin = async (e) => {
        // empeche le reload de la page
        e.preventDefault();
        // reinitialise zone de message derreur
        setErrorMessage('');

        try {
            // verification via requete post pour savoir si luser existe & peut se co
            const response = await axios.post('/api/auth/login', {
                login: login,
                password: password
            });

            // stocke le token en local
            localStorage.setItem('token', response.data.token);

            // save le login pour linterface
            localStorage.setItem('userLogin', login);

            // redirection vers la page du blog de luser
            navigate('/' + login);

            // en cas derreur
        } catch (error) {
            console.error("Erreur de connexion :", error);
            setErrorMessage("Vos identifiants sont incorrects. Vérifiez votre pseudo et votre mot de passe.");
        }
    };

    return (
        // fond du site
        <div className="flex items-center justify-center p-4 min-h-screen bg-[#E9E9E9] font-sans text-xs text-gray-800">

            {/* bloc princiale de connexion */}
            <div className="max-w-md w-full p-8 bg-white border border-gray-300 shadow-sm">
                {/* titre */}
                <h1 className="text-center text-fuchsia-600 font-bold text-lg mb-6 border-b border-gray-200 pb-2">
                    ~ Connexion ~
                </h1>

                {/* en cas derreur affiche un message */}
                {errorMessage && (
                    <div className="text-center px-4 py-2 mb-4 bg-red-100 border border-red-400 text-red-700">
                        {errorMessage}
                    </div>
                )}

                {/* formulaire de connexion */}
                <form onSubmit={handleLogin} className="space-y-4">

                    {/* login */}
                    <div>
                        <label
                            className="block mb-1 font-bold">
                            Login :
                        </label>
                        <input
                            className="w-full border border-gray-300 p-2 bg-gray-50 focus:outline-none focus:border-fuchsia-400"
                            type="text"
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                            placeholder="Ton login"
                            required
                        />
                    </div>

                    {/* mdp */}
                    <div>
                        <label
                            className="block font-bold mb-1">
                            Mot de passe :
                        </label>
                        <input
                            className="w-full border border-gray-300 p-2 bg-gray-50 focus:outline-none focus:border-fuchsia-400"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Ton mot de passe"
                            required
                        />
                    </div>

                    {/* btn connexion */}
                    <div className="pt-4 text-center">
                        <button
                            className="bg-gray-100 border border-gray-300 font-bold py-2 px-6 hover:bg-gray-200 cursor-pointer"
                            type="submit">
                            Se connecter
                        </button>
                    </div>
                </form>
                {/* link vers inscription */}
                <div className="mt-6 pt-4 border-t border-dashed border-gray-300">
                    <p className="text-gray-500 text-center">
                        Pas encore de compte ?<br></br>
                        <Link to="/register"
                            className="text-blue-600 hover:underline font-bold">
                            Inscris-toi ici
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;