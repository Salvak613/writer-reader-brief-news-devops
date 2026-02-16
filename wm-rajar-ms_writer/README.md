# World News – Writer

## Présentation du projet

Ce dépôt correspond à la **partie “Writer”** du prototype *World News*, développé dans le cadre d’un exercice pédagogique visant à valider la pertinence d’une **architecture microservices** en remplacement d’une application monolithique.

Le groupe **World News** est un acteur international de la presse produisant des contenus d’actualité à forte volumétrie. L’application existante, monolithique, présente aujourd’hui des limites en matière de maintenabilité, de scalabilité et de travail en équipe. Ce prototype a pour objectif de démontrer, sur un périmètre fonctionnel restreint, les bénéfices d’une architecture plus modulaire.

Ce dépôt implémente le périmètre **Writer (Journalistes)**, à savoir :

* La gestion des articles (création, modification, consultation)
* L’association des articles à des catégories

Il s’inscrit dans une architecture globale comprenant une autre partie **Reader**, développée par une équipe distincte ([voir le dépôt Reader](https://github.com/simplon-alt-dist-p7/wn-rajar-ms_reader)), avec laquelle nous collaborons sur les choix structurants.


---

## Découpage global du prototype

### Architecture cible

Le prototype repose sur les principes suivants :

* **Un microservice frontend**
* **Un microservice backend**
* **Séparation claire des responsabilités** 
* **Accès à la base de données PostgreSQL**

### Répartition des équipes

* **Équipe Writer (3 personnes)** – *ce dépôt*

  * Microfrontend Writer (React)
  * Microservice Writer (Node.js / Express)
  * Gestion des articles et des catégories

* **Équipe Reader (2 personnes)** – *dépôt séparé*

  * Recherche et lecture des articles

Chaque équipe est autonome sur son périmètre tout en respectant une cohérence d’ensemble.  
Une rotation des équipes à mi-parcours permet à chaque groupe de prendre connaissance du travail de l’autre et de garantir une vision globale de l’architecture.

---

## Structure du dépôt

Ce dépôt regroupe **le front et le back de la partie Writer**

```text
writer/
├── back/               # Microservice Writer
│   ├── src/
│   ├── package.json
│   └── README.md       # Documentation backend détaillée
│
├── front/              # Microfrontend Writer
│   ├── src/
│   ├── package.json
│   └── README.md       # Documentation frontend détaillée
│
├── README.md           # Documentation générale (ce fichier)
└── .gitignore
```

Chaque sous-partie dispose de son **README dédié** expliquant plus en détail l’architecture, les choix techniques et le fonctionnement.

---

## Initialisation du projet

### Pré-requis

Pour travailler sur le projet, il est nécessaire d’avoir :

* **Node.js**
* **npm** 
* **PostgreSQL** 

---

## ⚙️ Installation et lancement

### 1️⃣ Cloner le dépôt

```bash
git clone <url-du-repo>
cd WM-RAJAR-MS_WRITER
```

### 2️⃣ Installation du backend

```bash
cd BACK
npm install
```

Configurer les variables d’environnement :

```env
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/world_news_writer
```

Lancer le serveur backend :

```bash
npm run dev
```

Le microservice Writer expose une API REST utilisée par le microfrontend Writer.

---

### 3️⃣ Installation du frontend

Dans un autre terminal :

```bash
cd FRONT
npm install
npm run dev
```

Le microfrontend Writer permet aux journalistes de :

* Créer un article
* Modifier un article existant
* Consulter les articles
* Associer un article à une catégorie

---

## Gestion de projet

Conformément aux consignes :

* Le dépôt est associé à **deux tableaux Kanban GitHub** :

  * **Tickets fonctionnels** (alimentés par les formateurs / PO)
  * **Tâches techniques** (conception & développement, gérées par l’équipe)

* Workflow simple : `Todo` → `In progress` → `Done`

* Les tickets sont :

  * Assignés à un ou plusieurs développeurs
  * Estimés collectivement après échange avec le PO

---

## Bonnes pratiques appliquées

* Séparation claire **front / back**
* API REST documentée et stable
* Utilisation de **PostgreSQL** comme base de données
* Gestion des **variables d’environnement** 
* Commits :

  * Réguliers
  * Explicites faisant le lien avec les tickets

---

## Objectifs pédagogiques

Ce prototype vise à démontrer :

* La compréhension des limites d’une architecture monolithique
* La capacité à concevoir une solution modulaire orientée métier
* La mise en œuvre d’une architecture microfrontends / microservices
* La collaboration entre équipes dans un contexte proche du réel

---

## Équipe Writer

* Équipe composée de **3 développeurs fullstack**
* Responsables de l’ensemble du périmètre Writer (conception, architecture, développement)

---

## Remarques

Ce projet est un **prototype fonctionnel**, non destiné à une mise en production, mais suffisamment abouti pour illustrer les bénéfices et les contraintes de l’architecture proposée.

Pour plus de détails, se référer aux README spécifiques du [frontend](https://github.com/simplon-alt-dist-p7/wm-rajar-ms_writer/blob/dev/FRONT/README.md) et du [backend](https://github.com/simplon-alt-dist-p7/wm-rajar-ms_writer/blob/dev/BACK/README.md).
