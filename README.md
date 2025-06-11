# Robert AI - Frontend

Ce dépôt contient l’interface web de **Robert AI**, un assistant conversationnel écrit en React et TypeScript. L’application permet aux utilisateurs de chatter avec le bot, de consulter leur historique et de gérer leur compte.

## Sommaire
- [Fonctionnalités principales](#fonctionnalités-principales)
- [Architecture](#architecture)
- [Installation](#installation)
- [Variables d’environnement](#variables-denvironnement)
- [Commandes npm](#commandes-npm)
- [Docker](#docker)
- [Déploiement manuel](#déploiement-manuel)

## Fonctionnalités principales
- **Chat en temps réel** avec animation de saisie et historique des messages
- **Authentification** (inscription, connexion et vérification de jeton)
- **Gestion des sessions de chat** stockées côté API
- **Mode invité** avec sauvegarde locale en `localStorage`
- **Pages additionnelles** : présentation, tarifs, aide, extension Chrome, etc.
- **Design responsive** optimisé pour mobile, tablette et desktop
- **Animations** grâce à Framer Motion et icônes via Lucide

## Architecture
Le point d’entrée de l’application se trouve dans [`main.tsx`](src/main.tsx) qui rend le composant [`App.tsx`](src/App.tsx). Ce dernier déclare toutes les routes à l’aide de `react-router-dom` et entoure l’application d’un contexte d’authentification.

L’arborescence `src/` est organisée ainsi :

```
src/
├── components/      # Composants réutilisables (Header, Footer, Chat...)
├── views/           # Pages accessibles via le router
├── core/            # Logique métier (API, auth, hooks)
├── assets/          # Images et ressources statiques
├── styles/          # Fichier CSS global
```

### Authentification
Le contexte d’authentification est géré dans [`AuthContext.tsx`](src/core/auth/AuthContext.tsx). Il stocke le jeton dans `localStorage` et expose les méthodes `login`, `logout` et `verifyToken` pour valider la session auprès de l’API.

### Gestion des conversations
Les hooks [`useChat`](src/core/hooks/useChat.tsx) et [`useChatSessions`](src/core/hooks/useChatSessions.tsx) pilotent les échanges avec le bot et l’API. Ils permettent de créer des sessions, d’ajouter des messages et de récupérer l’historique.

### Appels API
Tous les appels réseau passent par [`fetch.tsx`](src/core/api/fetch.tsx) qui centralise `GET`, `POST` et `DELETE` avec la base d’URL définie dans [`global.tsx`](src/core/config/global.tsx).

## Installation
1. Clonez le dépôt et installez les dépendances :
   ```bash
   git clone <repository-url>
   cd robert-frontend
   npm install
   ```
2. Lancez le serveur de développement :
   ```bash
   npm run dev
   ```
   L’application est alors accessible sur [http://localhost:5173](http://localhost:5173).

## Variables d’environnement
L’URL de l’API peut être surchargée via `VITE_API_URL`. Par défaut, elle pointe vers `https://api.robertai.fr` comme indiqué dans [`global.tsx`](src/core/config/global.tsx).

Créez un fichier `.env` à la racine si vous souhaitez personnaliser cette valeur :
```bash
VITE_API_URL=https://mon-api.local
```

## Commandes npm
- `npm run dev` : démarre le serveur Vite pour le développement
- `npm run build` : génère la version de production dans `dist/`
- `npm run preview` : sert localement le build de production
- `npm run lint` : exécute ESLint sur l’ensemble du projet

## Docker
Un `Dockerfile` est fourni pour construire une image prête à être déployée. La construction se fait en deux étapes :
1. compilation de l’application avec Node
2. déploiement des fichiers statiques via Nginx

Pour créer l’image puis lancer un conteneur :
```bash
docker build -t robert-frontend .
docker run -p 8080:80 robert-frontend
```

## Déploiement manuel
Sans Docker, générez simplement le build puis servez le dossier `dist/` avec le serveur statique de votre choix :
```bash
npm run build
# puis
npx serve -s dist
```

---
Ce projet est publié sous licence MIT.
