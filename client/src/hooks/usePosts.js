// imports
import { useState, useEffect } from 'react';
import axios from 'axios';
// chercher dans lurl
import { useSearchParams } from 'react-router-dom';

export const usePosts = (login) => {
  // contient les articles de luser (default: aucun)
  const [posts, setPosts] = useState([]);

  // etat qui stocke le chargement
  const [loading, setLoading] = useState(true);

  // etat qui stocke lerreur si la requete echoue
  const [error, setError] = useState(null);

  // useSearchParams: permet de recuperer les parametres de l'URL
  const [searchParams] = useSearchParams();
  // etat qui stocke la value de lurl
  const categoryFilter = searchParams.get('category');

  // cible luser connecte
  const loggedUser = localStorage.getItem('userLogin');

  // verification si luser co est sur son blog
  // compare aussi les min et maj
  const isMyBlog = loggedUser?.toLowerCase() === login?.toLowerCase();
  console.log("Login dans l'URL :", login, "Login utilisateur connecté :", loggedUser);

  // fonction de recuperation des articles 
  const getPosts = async () => {
    try {
      // cible & recupere le token de luser
      const token = localStorage.getItem('token');

      // utilise le path relatif + le token dans le header
      const response = await axios.get('/api/posts/blog/' + login, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // met à jour posts avec les datas recues
      setPosts(response.data);

      // en cas derreur
    } catch (error) {
      console.error("Erreur lors de la récupération des billets :", error);
    }
  };

  // fonction de supression des articles 
  const handleDelete = async (postId) => {
    // securite: confirmation avant suppression
    if (!window.confirm("Es-tu sûre de vouloir supprimer ce billet ?")) {
      return;
    }
    try {
      // cible & recupere le token de luser
      const token = localStorage.getItem('token');
      // utilise le path relatif + le token dans le header
      await axios.delete('/api/posts/' + postId, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // reload les articles
      getPosts();

      // en cas derreur
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      alert("Impossible de supprimer l'article.");
    }
  };


  // se lance au chargement du component
  // permet de faire la demande de la liste des articles a la bdd
  // et verifier quil ny est pas derreur avant
  useEffect(() => {
    const fetchPosts = async () => {
      // relance le charge si le filter est modifié
      setLoading(true);
      try {
        // assemble lurl
        let url = `/api/posts/blog/${login}`;
        // SI la categorie existe alors
        if (categoryFilter) {
          // ajoute à la recherche
          url += `?category=${categoryFilter}`;
        }

        // cible le token de luser
        const token = localStorage.getItem('token');

        // attend & cible lurl & ajoute token dans headers
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });


        // maj les articles correspondant
        setPosts(response.data);

        // en cas derreur
      } catch (err) {
        setError(err);

        // peu importe erreur ou non met fin au loading
      } finally {
        setLoading(false);
      }
    };

    // SI la demande est faite par un user alors
    if (login) {
      fetchPosts();
    }
  }, [login, categoryFilter]);

return { posts, loading, error, getPosts, handleDelete, isMyBlog };
};