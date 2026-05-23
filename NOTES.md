 # Piscine Mern DAY 04

*Fichier personnel à but de retracer mon apprentissage toute la journée de la piscine.*


### Archictecture du projet
Projet de Blog.
L'app web est séparée en deux entitées autonomes, elles communiquent via API rest (requêtes HTTP asynchrones).
- React.js & vite: gère l'interface user, le routage (react-router-dom), l'état local de lappli

- Express.js & MongoDB: se comporte comme une API RESTFUL (avec routes GET POST PUT DELETE)
- Sécurise l'accès à lespace membre, avec des CRUD (JWT) + hachage de mdp.

### API Express
server/ (express & mdb): machine qui calcule & qui stocke, ne génère plus d'HTML.
Recoit du JSON, traite avec la MDB & trenvoi du JSON. (API RESTFUL)

### INTERFACE CLIENT
client/ (reactjs & vite): interface user, html formulaire, utilise AXIOS pour faire des requêtes HTTP à l'API EXPRESS.


## Installation coté Client
### Mise en place de gitignore
node_modules

### Install Vite
Création du projet
    npm create vite@latest client --template react

Dans le dossier client:
    cd client

Install des outils de navigations & requêtes
    npm install react-router-dom axios

# INSTALL TAILWIND
-Une fois par projet:
    npm install -D tailwindcss@3 postcss autoprefixer

    npx tailwindcss init -p


### Dans src/index.css :
@tailwind base;
@tailwind components;
@tailwind utilities;

## Dans tailwind.config.js :
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

## Installation Côté Serveur

A la racine du projet
Crée dossier : 
    server

Initialisation de Node.js:
    npm init -y

Installation Back-end (API BDD EXPRESS ...) :
    npm install express mongodb mongoose jsonwebtoken bcrypt dotenv

### Configuration Vite
client/vite.config.js:

### Configuration server.js (/server)
Configuration de server.

### Démarrer MongoDB
    sudo systemctl start mongod

### Vérifier qu'il soit bien connecté
    sudo systemctl status mongod

### En cas de problème
Lors du lancement s'il y a un problème de .sock qui ressort, c'est un problème que MBD laisse un fichier verrou qui bloque les connexions.

Lire les logs
    sudo tail -n 20 /var/log/mongodb/mongod.log

Pour terminer le service:
    sudo systemctl stop mongod

Pour supprimer le fichier de communication:
    sudo rm -f /tmp/mongodb-27017.sock

Pour supprimer le fichier verrou
    sudo rm -f /var/lib/mongodb/mongod.lock

### ex_02
Mise en place du dossier models/ (convention de nommage).

Structure MVC
M: modèles, règle de base de la BDD.


### Notions CRUD
Le controleur va :
Create: crée un new user selon models/.

Read: cherche les users dans la BDD pour les envoyer a Reactjs.

Update: modifie/maj le mot de passe d'un utilisateur.

Delete : supprime le compte.


### RAPPEL

### MongoDB
MongoDB est un SGBD (System de gestion de base de donnée) de type NOSQL.
MDB stocke les datas sous forme de documents JSON, dans ce cas BSON.

### MDB Compass (outil pratique visuel)
Permet d'avoir une interface visuelle pour la BDD

install (linux):
    wget https://downloads.mongodb.com/compass/mongodb-compass_1.43.0_amd64.deb

    sudo dpkg -i mongodb-compass_1.43.0_amd64.deb

en cas derreur: 
    sudo apt-get install -f

pour acceder (dans compass) :
    mongodb://127.0.0.1:27042

### Fonction Middleware
Rappel
Du côté logique Front, lorsque un user clique sur le btn envoyer, le navigateur envoi un formulaire compressé qui se nomme x-www-form-urlencoded
Il faut donc le réécrire pour :
- récuperer le formulaire envoyé
- décoder et trier
- traduire et transformer en objet js (express.urlencoded)
- injecter req.body, pour utiliser la route POST


Une fonction middleware est incluse nativement dans le framework, pour l'appeler :
    app.use(express.urlencoded({ extended: true }));
pour que Node.js puisse lire les datas d'un formulaire HTML

extended : true:
est un paramètre de config, indique à Express quel outil de traduction utilisé (qs en interne), qui permet de lire des structures de datas
la norme est de le mettre sur true

### Fonction Middleware pour les API
Le traducteur pour les API, il intercepte les requêtes envoyées en format JSON et les transforme en objet JS utilisable avec :
    req.body

### Bonnes pratiques : logs
C'est mieux d'utiliser des TAGS pour cibler directement la partie du serveur en particulier ou en cas d'erreur. (meilleur débuggage)
ex: [SERVER]


### Incrémentation
Comparé à MySQL (auto_increment), MBD n'a pas d'auto incrémentation, mais génère un champ _id avec une longue chaine de strings : objectid de type *longuechaine*.

### Bcrypt
Cryptage n'est pas approprié car avec une clé c'est réversible.
Pour un mdp le bon terme est hachage/hashing.

    npm install bcrypt  

### Démarrer ex 02

    node server.js


### Ex 03

### Route (url avec paramètre)
Pour créer une route dynamique :
    app.get('/shop/:id', ...)
Récupération côté serveur : 
req.params.id
(pour savoir sur quoi luser a cliqué)

### Gérer plusieurs collections
La bdd peut contenir plusieurs collections.
Table actuelle :
collectionUsers = db.collection('users');
Pour recréer une table :
collectionProducts = db.collection('products');

### Install
    npm install bcrypt express mongodb

### Création collection
Se connecter :
    mongosh --port 27042

Switch de collection :
    use mern-pool

Créer une nouvelle table:
    db.createCollection("products")

Pour supprimer une table:
    db.products.drop()

Ex de table:
db.products.insertMany([
    { 
        id: 1, 
        title: "Pain au chocolat sans chocolat", 
        price: 3, 
        description: "Viennoiserie spécialement pour les gourmands en chocolat, garantie 100% sans trace de cacao. Parfait pour le petit-déjeuner." 
    },
    { 
        id: 2, 
        title: "Café au gratin épicé", 
        price: 9, 
        description: "Envie de prendre un café mais aussi envie d'un bon repas ? Le doux mélange des épices avec notre café spécialement récolté en France, vous fera voyager en Suède (vol non inclu)" 
    },
    { 
        id: 3, 
        title: "Boisson au jus de monstre", 
        price: 5, 
        description: "Restaure 50 points de pv instantanément. Idéal pour rester éveillée pendant les sessions de code nocturnes durant une piscine par exemple (testé & approuvé)." 
    }
])

### Ex 04
Justification des choix
id : type number (int)
pour pouvoir l'incrémenter par la suite

title : type string (chaine de chars)
purement du texte (adapté)

price: type number (int)
pour pouvoir faire des calculs (plusieurs produits)

description: type string (chaine de chars)
purement du texte (adapté)

### Express session sécurité acces
protocole http par defant stateless (sans memoire)
oublie lutilisation entre chaque requete
express session :
lors dune connexion reussie, le serveur genere une session unique stockee dans la memoire, utilise cookie crypte avec id session sur le nav user

middleware: a chaque reload ou changement de page le middleware verifie la requete, check cookie et valide/refuse selon lacces de luser admin/membre/null


install 
    npm install express-session

### Sécurité du projet donnéé sensible
module qui permet de lire des var crypté
    npm install dotenv


___________________________________________________________

### Install MongoDB
Il faut importer la clé publique, pour permettre de vérifier l'authenticité des paquets MDB :
    sudo apt-get install gnupg curl

    curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | \
   sudo gpg --output /usr/share/keyrings/mongodb-server-7.0.gpg \
   --dearmor

Il faut ajouter le dépot aux sources ubuntu pour permettre au système :
- accès au logiciel (pour avoir le logiciel complet)
- version exacte (sur les depots de bases c'est souvent des vieilles v)
- maj de sécurité (permet d'avoir les dernieres correction de bug)
    echo "deb [ signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

Mettre à jour les paquets système & install MongoDB
    sudo apt-get update
    sudo apt-get install -y mongodb-org

Configurer le service pour le lancement automatique au démarrage
    sudo systemctl enable mongod


### Configurer le port
Pour le modifier il faut accéder au fichier de configuration de MDB :
    sudo nano /etc/mongod.conf

Puis modifier la ligne du port.

Lancer le serveur MDB pour valider les changements
    sudo systemctl restart mongod

    Vérifier le statut
sudo systemctl status mongod    

Doit affcher statut actif dans le terminal:
    Active: active (running) since Tue 2026-05-19 11:14:14 CEST; 6s ago


### Base de donnée mern-pool
L'interpréteur de BDD se nomme mongosh (MDB Shell).
Pour se connecter au serveur :
    mongosh --port 27042
Le terminal doit renvoyer un message, par défaut l'invité de commande renvoie que la connection est faite sur une BDD nommée test.

### Créer la BDD
Cette commande sert à créer la base de donnée avec le nom choisi (un peu comme git checkout -b), elle crée et switch sur celle ci
    use mern-pool

La BDD créée n'apparait pas encore dans la liste, MBD attend de recevoir la première collection (en gros table), ou un document contenant des données.

### Consulter la liste des BDD
    show dbs


### Collection (table)
Par défaut, il est possible d'integrer un document json dans une collection (table), pour respecter les regles, il faut utiliser un validator avec la norme jsonSchema.

Si une data ne rentre pas dans ce schéma lors des méthodes insertOne ou updateOne, MDB refuse la commande & return une erreur.

### Syntaxe 
    BSON    
    -chaine de caractères: string
    - boolean: bool
    - entier : int
    - décimaux: decimal

### Contrainte
- required : liste les champs obligatoires qui sont toujours presents 
- enum : liste stricte de values textuelles pour etre valider (ex: validated, in progress, rejected)
- pattern : expression régulière pour valider le format (regex, ou comme pour les champs mail)

Création de la collection students
en commencant par :
    db.createCollection("NOMTABLE")

id : doit être de type « int »
lastname : doit être de type « string »
firstname : doit être de type « string »
email : doit respecter cette regex : ^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$
phone : doit respecter la syntaxe d'un numéro de téléphone
validated : doit pouvoir contenir ces valeurs suivantes seulement : « in progress », « validated », «
rejected »
admin : doit être un booléen

### Vérification
Après avoir créer la collectionn, MDD renvoi { ok: 1}.

### Pour modifier une collection
    db.runCommand

### Pour supprmimer une collection
    db.students.drop()
doit renvoyer true


### Analogie de l'exercice
Node.js: serveur, s'occupe de gérer les commandes
MongoDB: base de donnée, contenant toutes les datas
Package mongodb: contient les accès et communique entre le serveur et la bdd

Node.js & MDB sont des prorammes différents, nativemment node ne peut pas communiquer avec la bdd

Le package mongodb est un driver, quand il est installé il rend possible la communication et permet dutiliser des fonctions js pour gerer la bdd


### Route Get
Affiche la page avec le formulaire HTML à l'user.

### Route POST
Réceptionne les datas du champs de formulaire.
Connexion avec la BDD.
Renseigner les datas dans la BDD.

### Typage
Les collections sont strictes :
- id doit être un entier (int)
- admin doit être un booléen (bool)
Pour associer correctement un formuaire HTML & la collection, il faut transformer/traduire chaque data.



___________________________________________

J'ai restructuré l'oganisation, j'ai sorti les fichiers des dossiers par pratique pour la communication avec la BDD.
Suite à quoi j'ai refait linstall :
    npm init -y
    npm install express mongodb

Pour corriger l'erreur de la collection créé sans filtre stricte :
(supprime et se ferme)
    mongosh --port 27042 mern-pool --eval "db.students.drop()"

Relancer le script:
    mongosh --port 27042 mern-pool ex_03.js

+ 

Lancer node:
    node ex_05.js

### En cas de problème de connexion avec la BDD :
    sudo rm /tmp/mongodb-27042.sock

Pour supprimer les MBD (erreur 48):
    sudo killall mongod

Erreur code 100 (ne sauvegarde pas au bon endroit):
    mkdir data

Relancer la BDD :
    mongod --port 27042 --dbpath ./data

Doit afficher cette ligne si c'est bon :
    "msg":"Waiting for connections","attr":{"port":27042,"ssl":"off"}
    "msg":"mongod startup complete"

Dans un autre terminal :
    node ex_05.js

Doit renvoyer :
Le serveur écoute les requêtes.

#### ex_6 
### Filtrer datas
Pour cibler certaines documents, il faut cibler un objet de rêquete avec la méthode .find()
Syntaxe :
    const query = { champ: "target_value"};

### Trier datas
Pour ordonner les datas de la BDD, il faut utiliser la méthode .sort()
1 : ordre croissant
-1 : ordre décroissant

### Chainage des méthodes
Pour enchainer les opérations survenu sur le curseur avant de transformer le resultat final en tableau JS
    const students = await collection.find(query).sort(sortOrder).toArray();

### Point important
MDB est sensible à la casse, la moindre majuscule ou minuscule différent peut casser le formulaire HTML.

### METHODES GET POST PUT DELETE
Test du module & du serveur Express
Association des actions CRUD à sa méthode HTTP:
-    app.post(): associer CREATE(insertOne)
-    app.get(): associer READ(find)
-    app.put(): associer UPDATE(updateOne et pour cibler un document via lid avec $set)
-    app.delete(): associer DELETE(deleteOne)

### Opérateurs de recherche
- $or: permet de chercher sur plusieurs champs (firstname ou laster ou.... utile pour une recherche avec plusieurs catégories)
- $regex: permet de faire des recherches (utile pour les suggestions de recherche, comme dans la barre de recherche du projet connect'in)
- $gt: ou greater than permet de ne recuperer que les datas dont la valeur est supérieur à un nombre precis

### Accès depuis
Coté node.js, récupère la value avec req.query.tri
http://localhost:4242/?tri=firstname


### Exemple concret
Lire la commande d'un client
const sortBy = req.query.tri;

Préparer la note de commande
let sortingOptions = {};

Sécurité que le plat existe sur la carte (evite linjection de code)
if (sortBy === "id" || sortBy === "lastname" || sortBy === "firstname")

Adapte le bon pour la cuisine
sortingOptions[sortBy] = 1;







## Documentation
https://www.w3schools.com/mongodb/mongodb_get_started.php

(intéressante mais longue)
https://youtu.be/jrkD9aZ_VWI?is=d4R5JA_xT-CQS7tW

https://www.youtube.com/watch?v=SNgaUYu5o1o