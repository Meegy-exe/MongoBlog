// imports
import { useState, useEffect } from 'react';
import axios from 'axios';

export const usePosts = (login) => {
  // contient les articles de luser (default: aucun)
  const [posts, setPosts] = useState([]);

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
    getPosts();
  }, [login]);


  return { posts, getPosts, handleDelete, isMyBlog };
};