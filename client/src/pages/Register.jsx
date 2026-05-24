// page dinscription
// inspiration skyblog

// imports
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    // states pour stocker ce que luser ecrit
    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    // function pour afficher un message erreur au besoin
    const [errorMessage, setErrorMessage] = useState('');

    // usernavigate: permet de rediriger luser dès la connexion
    const navigate = useNavigate();

    // la fonction se declenche quand luser sinscrit
    const handleRegister = async (e) => {
        // empeche le reload de la page
        e.preventDefault();
        // SI les mdps ne correspondent pas alors
        if (password !== passwordConfirm) {
            // mess erreur
            setErrorMessage("Les mots de passe ne correspondent pas.");
            return;
        }

        try {
            // verification via requete post pour savoir si luser nexiste pas deja & peut sinscrire
            const response = await axios.post('/api/auth/register', {
                login,
                email,
                password,
                passwordConfirm
            });

            // redirection vers la page de co
            navigate('/login');

            // en cas derreur
        } catch (err) {
            console.error("Erreur d'inscription :", err);
            // message derreur back ou mess ecrit
            setErrorMessage(err.response?.data?.message || "Une erreur est survenue lors de l'inscription.");
        }
    };

    return (
        // fond du site
        <div className="flex items-center justify-center p-4 min-h-screen bg-[#E9E9E9] font-sans text-xs text-gray-800">

            {/* bloc princiale dinscription */}
            <div className="max-w-md w-full p-8 bg-white border border-gray-300 shadow-sm">
                {/* titre */}
                <h1 className="text-center text-fuchsia-600 font-bold text-lg mb-6 border-b border-gray-200 pb-2">
                    ~ Inscription ~
                </h1>

                {/* en cas derreur affiche un message */}
                {errorMessage && <p className="text-red-500 font-bold mb-4">
                    {errorMessage}
                </p>}

                {/* formulaire inscription */}
                <form
                    onSubmit={handleRegister}
                    className="space-y-4">
                    {/* login */}
                    <div>
                        <label className="block font-bold mb-1">
                            Login :
                        </label>
                        <input
                            className="w-full p-2 border border-gray-300 bg-gray-50 outline-none focus:border-fuchsia-400"
                            type="text"
                            placeholder="Ton login (5 à 20 caractères)"
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                            required
                        />
                    </div>

                    {/* email */}
                    <div>
                        <label className="block font-bold mb-1">
                            Email :
                        </label>
                        <input
                            className="w-full p-2 border border-gray-300 bg-gray-50 outline-none focus:border-fuchsia-400"
                            type="email"
                            placeholder="Ton adresse email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>


                    {/* mdp */}
                    <div>
                        <label className="block font-bold mb-1">
                            Mot de passe :
                        </label>
                        <input
                            className="w-full p-2 border border-gray-300 bg-gray-50 outline-none focus:border-fuchsia-400"
                            type="password"
                            placeholder="Ton mot de passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {/* confirme mdp */}
                    <div>
                        <label
                            className="block font-bold mb-1">
                            Confirmer mot de passe :
                        </label>
                        <input
                            className="w-full p-2 border border-gray-300 bg-gray-50 outline-none focus:border-fuchsia-400"
                            type="password"
                            placeholder="Confirme ton mot de passe"
                            value={passwordConfirm}
                            onChange={(e) => setPasswordConfirm(e.target.value)}
                            required
                        />
                    </div>

                    {/* btn connexion */}
                    <button
                        className="bg-fuchsia-600 text-white font-bold py-2 px-6 mt-4 hover:bg-fuchsia-700"
                        type="submit">
                        S'inscrire
                    </button>
                </form>

                {/* lien co */}
                <div className="mt-6 pt-4 border-t border-dashed border-gray-300">
                    <p className="text-gray-500">
                        Déjà inscrit ?<br></br>
                        <Link to="/login"
                            className="text-blue-600 hover:underline font-bold">
                            Connecte-toi ici
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;