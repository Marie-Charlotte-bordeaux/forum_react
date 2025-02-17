# Projet Forum - React, Express.js et MongoDB

## Objectif du projet
Réaliser une application web de type forum permettant aux utilisateurs de s'authentifier, de créer des posts avec images, de lire les posts des autres utilisateurs, de commenter les publications et de les ajouter en favoris.

## Technologies utilisées
- **Frontend** : React.js avec React Router et Redux (ou Context API) pour la gestion d'état
- **Backend** : Express.js avec Node.js
- **Base de données** : MongoDB avec Mongoose
- **Authentification** : JSON Web Token (JWT) et bcrypt pour le hachage des mots de passe
- **Stockage des images** : Multer pour le backend

---

## 1. Initialisation du projet
1. **Créer le repository Git** pour la gestion du code source
2. **Installer les dépendances**
   - `npm init -y` et installation de Express, Mongoose, dotenv, bcrypt, JWT, et Multer pour le backend
3. **Structurer l'architecture du projet** :
   - `client/` pour le frontend
   - `server/` pour le backend

---

## 2. Mise en place de l'authentification
### Dans la backend
1. **Créer le modèle utilisateur** avec Mongoose (pseudo, email, mot de passe haché, avatar, description)
2. **Mettre en place l'inscription et la connexion** dans la backend
   - Route `POST /api/auth/register` pour l'inscription
   - Route `POST /api/auth/login` pour la connexion retourner un token JWT
   - Route `GET /api/auth/logout` pour la déconnexion
#### Dans le frontend
1. Implementation des formulaire d'inscription et de connexion
2. **Gérer la persistance de l'utilisateur** sur le frontend avec Context API
3. Permettre la déconnexion
---

## 3. Gestion des posts
1. **Créer le modèle Post** avec Mongoose (titre, contenu, image, auteur, date de création)
2. **Mettre en place les routes backend**
   - `POST /api/posts` : Créer un post (avec image via Multer)
   - `GET /api/posts` : Récupérer tous les posts
   - `GET /api/posts/:id` : Récupérer un post par son ID
   - `DELETE /api/posts/:id` : Supprimer un post (seulement si l'utilisateur est l'auteur)
3. **Mettre en place l'affichage des posts sur le frontend**
   - Page d'accueil listant les posts avec pagination
   - Page détaillée d'un post
   
---

## 4. Gestion des commentaires
1. **Créer le modèle Commentaire** avec Mongoose (contenu, auteur, post associé, date de création)
2. **Mettre en place les routes backend**
   - `POST /api/comments` : Ajouter un commentaire
   - `GET /api/posts/:id/comments` : Récupérer les commentaires d'un post avec pagination
3. **Afficher les commentaires sous chaque post** sur le frontend avec pagination

---

## 5. Fonctionnalité de favoris
1. **Ajouter un champ favoris** à l'utilisateur (tableau d'ID de posts favoris)
2. **Mettre en place les routes backend**
   - `POST /api/users/:id/favorites` : Ajouter/supprimer un post des favoris
   - `GET /api/users/:id/favorites` : Récupérer les favoris d'un utilisateur
3. **Afficher les favoris** sur le frontend dans un onglet dédié

---

## Critères de validation
- **Code propre et bien organisé**
- **Utilisation correcte de React, Express et MongoDB**
- **Authentification fonctionnelle et sécurisée**
- **Possibilité de créer, lire, commenter et mettre en favoris des posts**
- **Interface utilisateur ergonomique et responsive**
