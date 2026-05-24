// import
import { useState, useEffect } from 'react';
import axios from 'axios';

// hook custom pour gerer la recuperation des categories
export const useCategories = () => {
    // etat qui stocke les categories recuperees (defaut: empty)
    const [categories, setCategories] = useState([]);
    // etat qui stocke le chargement
    const [loading, setLoading] = useState(true);
    // etat qui stocke lerreur si la requete echoue
    const [error, setError] = useState(null);

    // se lance au chargement du component
    useEffect(() => {
        // appel api
        const fetchCategories = async () => {
            try {
                // attend & cible les cat
                const response = await axios.get('/api/categories');
                // maj la liste des cat
                setCategories(response.data);

                // en cas derreur
            } catch (err) {
                setError(err);
                // peu importe erreur ou non met fin au loading
            } finally {
                setLoading(false);
            }
        };

        // appel la fonction
        fetchCategories();
    }, 
    // sexecute quune fois
    []);

    return { categories, loading, error };
};