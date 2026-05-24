# Piscine Mern Day 04 & 05
Développement d'un blog : serveur Express API & Front REACTJS. 

**Etudiante :** Alison Dehaies - Promo 2027

## ROADMAP
Mise en place d'une ROADMAP pour montrer (en parti) mon organisation sur le mini projet :
[Consulter la Roadmap du projet](./docs/ROADMAP.md)

### Exercices effectués
    Jour 04 
    [x] Ex01
    [x] Ex02
    [x] Ex03
    [x] Ex04
    [x] Ex05
    
    Jour 05
    [ ] Ex01
    [x] Ex02



------------------------------------------------
          INSTALLATION SOUS LINUX (ubuntu)
------------------------------------------------

## Pré-requis
Pour faire tourner ce projet, vous avez besoin de :
1. **Node.js** (v18+ recommandé)
2. **NPM** (pour gérer les dépendances)
3. **MongoDB** (SGBD NoSQL)
4. **Git** (pour cloner le projet)


------------------------------------------------
          INSTALLER LES DEPENDANCES
------------------------------------------------
## Installation du Client
    cd client
    npm install

## Installation du Serveur
    cd ../server
    npm install

------------------------------------------------
          CONFIGURATION & LANCEMENT
------------------------------------------------

### 1. MongoDB
## Démarrer le service
    sudo systemctl start mongod



------------------------------------------------
          LANCER LES SERVEURS
------------------------------------------------

Dans deux terminaux différents :

Terminal 1 (Serveur API) :

    cd server
    node seed.js
    node server.js

Terminal 2 (Client React):
    cd client
    npm run dev

------------------------------------------------
          DEPANNAGR MONGODB
------------------------------------------------

Si le service MongoDB ne démarre pas :

1. Stopper le service : 

    sudo systemctl stop mongod

2. Nettoyer les fichiers bloquants :

    sudo rm -f /tmp/mongodb-27042.sock
    sudo rm -f /var/lib/mongodb/mongod.lock

3. Relancer : 
    sudo systemctl start mongod
    
    
Assurez-vous d'avoir un fichier .env configuré dans votre dossier server.