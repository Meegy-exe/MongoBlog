### D04_ex_01
Installation & initialisation du projet
Push sur la main

### D04_ex_02
Mise en place du dossier models/ (convention de nommage).
Structure MVC
M: modèles, règle de base de la BDD.
Création des routes.
Push sur la feat/ex_02
Merge sur la develop

### d04_ex_03
Mise en place du système de blog (article...)
Structure MVC.
Models:
- Création Post.js: modèle de l'article d'un blog & ce qu'il peut contenir
- Création Comment.js: modèle des commentaires & sa relation avec l'article


- Création du postController.js: permet de CRUD les articles
- Création du commentController.js: permet de CRUD les com


Routes:
- Creation de la route POST
- Creation de la route COMMENT

Mise en place de middleware.


Partie Front:
Mise en place de react-router-dom pour naviguer entre les pages du blog

Création des components :
- 
Leger style avec Tailwind.


## Strucure des pages
- Page d'accueil :
    http://localhost:4242
    liste tous les blogs existants

- Page inscription :
    http://localhost:4242/register
    permet de se créer un compte/blog

- Page connexion
    http://localhost:4242/login
    permet de se connecter

- Page blog
    http://localhost:4242/:login
    si cest le blog de luser:
    permet de voir son blog, le modifier ect
    si c'est un visiteur:
    permet de consulter

- Page article
    http://localhost:4242/:id_billet
    permet de voir un article et ses commentaires

- Page création d'article
    http://localhost:4242/
    permet de creer un nouvel article

Mise en place d'un seeder
Dans /server:
    node seed.js


### d04_ex_04
Client:
- Création du formulaire de création de com
/!\ ne doit apparaitre que sur un blog visité

- Création route d'un blog visité
- Création route d'un article spécifique d'un blog visité
/!\ la navigation entre les blogs ne doit pas redemander de connexion

Server:
- Creation route POST: permet aux users de mettre des coms
/!\ le propre user du blog ne peut pas modifier ou creer de com


### d04_ex_05
Client:
- Creation d'une page d'accueil regroupant tous les blogs existants

Server: 
- READ ; pour cibler tous les blogs

### Bonus D04:
Le bonus n'a pas été fait.

### D05_ex_01
L'exo 1 n'est pas fait pour le moment.

### D05_ex_02
Server:
- Création d'un model pour les catégories d'articles.

- Création du controller pour récuperer la listes des catégories

- Création de la route categories

Mise à jour de la seed.js.

Client:
- Création d'un formulaire pour ajout de catégories sur la création d'un article.

- Création de la listes des catégories pour filtrer lors de la recherche d'un article