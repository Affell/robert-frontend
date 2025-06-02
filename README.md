# Robert AI - Site Frontend

Un site web professionnel pour Robert AI, votre assistant IA intelligent.

## 🚀 Fonctionnalités

- **Design moderne** : Interface inspirée de Claude avec un design professionnel
- **Interface de chat** : Chat en temps réel avec simulation de réponses IA
- **Responsive** : Optimisé pour desktop, tablette et mobile
- **Animations fluides** : Utilisation de Framer Motion pour des transitions élégantes
- **SEO optimisé** : Métadonnées et structure optimisées pour les moteurs de recherche

## 🛠️ Technologies utilisées

- **React 19** avec TypeScript
- **Vite** pour le build et le développement
- **Framer Motion** pour les animations
- **Lucide React** pour les icônes
- **CSS personnalisé** avec variables CSS

## 📦 Installation

1. Clonez le repository :
```bash
git clone <repository-url>
cd robert-frontend/site
```

2. Installez les dépendances :
```bash
npm install
```

3. Démarrez le serveur de développement :
```bash
npm run dev
```

4. Ouvrez [http://localhost:5173](http://localhost:5173) dans votre navigateur.

## 🏗️ Scripts disponibles

- `npm run dev` : Lance le serveur de développement
- `npm run build` : Build l'application pour la production
- `npm run preview` : Prévisualise le build de production
- `npm run lint` : Vérifie le code avec ESLint

## 📁 Structure du projet

```
src/
├── components/           # Composants React
│   ├── Header.tsx       # Header avec navigation
│   ├── Hero.tsx         # Section d'accueil
│   ├── ChatInterface.tsx # Interface de chat
│   ├── Footer.tsx       # Footer du site
│   └── *.css           # Styles des composants
├── App.tsx             # Composant principal
├── main.tsx           # Point d'entrée
└── index.css          # Styles globaux
```

## 🎨 Palette de couleurs

- **Primary** : `#1e1e1e` - Noir principal
- **Accent** : `#f97316` - Orange (inspiré de Claude)
- **Background** : `#000000` - Noir pur
- **Surface** : `#111111` - Gris très foncé
- **Text Primary** : `#ffffff` - Blanc
- **Text Secondary** : `#a1a1aa` - Gris clair

## 📱 Responsive Design

Le site est entièrement responsive avec des breakpoints pour :
- Desktop (1200px+)
- Tablette (768px - 1199px)
- Mobile (320px - 767px)

## 🚀 Déploiement

Pour déployer en production :

```bash
npm run build
```

Les fichiers de production seront générés dans le dossier `dist/`.

## 📄 Licence

Ce projet est sous licence MIT.
