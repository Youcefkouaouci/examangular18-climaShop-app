# ClimaShop - Application Angular 18

## 🎓 Contexte de Réalisation

Ce projet a été **réalisé dans le cadre de ma formation de Développeur Web et Mobile** chez Human Booster. Il s’inscrit dans la **préparation à l’évaluation Angular** et a pour objectif de mettre en pratique les compétences acquises en développement frontend avec **Angular 18**, **TypeScript** et **Tailwind CSS**.

## 🏢 Description

ClimaShop est une application web moderne simulant la vitrine d’une startup spécialisée dans les équipements de climatisation et ventilation. Elle permet de consulter un catalogue de produits avec un **système de filtrage**, dans une interface claire, responsive et animée.

## 🚀 Fonctionnalités Implémentées

### ✅ Pages Principales

- **Page d'accueil** (`/accueil`) : Présentation institutionnelle avec hero section, avantages, statistiques et call-to-action
- **Page articles** (`/articles`) : Catalogue des produits avec système de filtrage

### ✅ Système de Filtrage

- **Recherche par titre** : Recherche en temps réel sur le nom et la description
- **Filtrage par prix maximum**
- **Affichage des promotions uniquement**
- **Filtres réactifs** avec mise à jour dynamique

### ✅ Affichage des Produits

- Cartes produits : image, titre, description, prix, caractéristiques
- Promotions : badges visuels et prix barrés
- Icônes Material pour les features
- Design responsive

## 🛠️ Technologies Utilisées

### Frontend

- Angular 18 avec **composants standalone**
- TypeScript (mode strict)
- Reactive Forms pour la gestion des filtres
- RxJS pour les observables
- Tailwind CSS
- Material Icons (Google)

### Architecture

- Séparation claire : `services`, `components`, `models`
- Interfaces typées (`Product`, `Feature`)
- Routing Angular
- Service dédié pour la gestion des données produits

## 📁 Structure du Projet

```
src/
│
├── app/
│   ├── components/
│   │   └── navbar/           # Composant de navigation
│   │   └── accueil/          # Composant de la page d'accueil institutionnelle
│   │   └── articles/         # Composant de la page catalogue avec filtres
│   │
│   ├── services/
│   │   └── product.service.ts # Service de gestion des produits
│   │
│   └── models/
│       ├── product.ts        # Interface Product
│       └── feature.ts        # Interface Feature
│
├── styles.css                # Styles Tailwind + personnalisés
└── index.html                # HTML principal avec Material Icons
```

## 🔧 Installation et Lancement

```bash
# Installation
npm install

# Lancement en mode développement
ng serve
# ou
npm start

# Build production
ng build
```

---

_Développé avec ❤️ par Youcef KOUAOUCI - FORMATION ASSURÉE PAR HUMAN BOOSTER SOUS L'ENCADREMENT DU FORMATEUR GAETAN THOMAS_
