# Guide des tests — Writer & Reader

## Architecture du projet

Ce projet est composé de deux microservices indépendants :

- **Writer** (`wm-rajar-ms_writer/`) — application de rédaction d'articles (backend TypeScript + frontend React)
- **Reader** (`wn-rajar-ms_reader/`) — application de lecture et commentaires (backend JavaScript + frontend React)

---

## Prérequis

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installé et lancé
- [Node.js 20+](https://nodejs.org/) installé
- Fichier `.env` à la racine (copier `.env.example` et remplir les valeurs)

---

## Lancer le projet avec Docker

### 1. Démarrer tous les services

```bash
docker compose up --build
```

Cela démarre :

| Service        | URL                   | Description                             |
| -------------- | --------------------- | --------------------------------------- |
| `reader-front` | http://localhost:5173 | Frontend Reader (lecture d'articles)    |
| `writer-front` | http://localhost:5174 | Frontend Writer (rédaction d'articles)  |
| `reader-back`  | http://localhost:3000 | API Reader                              |
| `writer-back`  | http://localhost:3001 | API Writer                              |
| `db`           | port 5432             | Base de données principale (PostgreSQL) |
| `db-test`      | port 5433             | Base de données de test (PostgreSQL)    |

### 2. Arrêter les services

```bash
docker compose down
```

---

## Lancer les tests

> Les tests Backend d'intégration nécessitent que le service `db-test` soit lancé (`docker compose up db-test`).

### Tous les tests unitaires et d'intégration

```bash
# Writer Backend (TypeScript — Vitest)
npm test --prefix wm-rajar-ms_writer/BACK

# Writer Frontend (React — Vitest + Testing Library)
npm test --prefix wm-rajar-ms_writer/FRONT

# Reader Backend (JavaScript — Vitest)
npm test --prefix wn-rajar-ms_reader/Backend

# Reader Frontend (React — Vitest + Testing Library)
npm test --prefix wn-rajar-ms_reader/Frontend
```

### Tests E2E (Playwright)

> Nécessite que **toute l'application tourne** (`docker compose up --build`).

```bash
# Mode headless (CI)
npx playwright test

# Mode avec navigateur visible
npx playwright test --headed

# Mode pas à pas (debug)
npx playwright test --headed --debug
```

---

## Description de chaque fichier de test

### Writer Backend

#### `wm-rajar-ms_writer/BACK/src/services/article.service.test.ts`

**Type : tests unitaires de validation**

Teste la logique métier du service `articleService` sans passer par la base de données.

| Test                   | Ce qu'il vérifie                                                |
| ---------------------- | --------------------------------------------------------------- |
| titre vide             | Lance une erreur "Le titre est requis"                          |
| titre > 300 caractères | Lance une erreur "Le titre ne peut pas dépasser 300 caractères" |
| contenu vide           | Lance une erreur "Le contenu est requis"                        |

#### `wm-rajar-ms_writer/BACK/src/tests/api.integration.test.ts`

**Type : tests d'intégration API — se connecte à `worldnews_test` (port 5433)**

Teste les routes HTTP réelles de l'API Writer avec une vraie base de données de test. Utilise `supertest` pour simuler des requêtes HTTP sans ouvrir de port réseau.

| Test                         | Ce qu'il vérifie                                     |
| ---------------------------- | ---------------------------------------------------- |
| GET /health                  | Retourne 200 avec `{ status: "ok" }`                 |
| GET /api/articles            | Retourne 200 avec `{ articles: [], pagination: {} }` |
| GET /api/articles — champs   | Les articles ont `title`, `subtitle`, `body`         |
| GET /api/articles/99999      | Retourne 404 avec `{ error: "..." }`                 |
| GET /api/articles/abc        | Retourne 400 avec `{ error: "..." }` (ID invalide)   |
| POST /api/articles sans body | Retourne 400 avec `{ error: "..." }`                 |

---

### Writer Frontend

#### `wm-rajar-ms_writer/FRONT/src/components/ArticleList/ArticleCard.test.tsx`

**Type : tests de composant React**

Teste le rendu du composant `ArticleCard` dans un navigateur simulé (jsdom). Vérifie que les informations d'un article s'affichent correctement.

| Test                 | Ce qu'il vérifie                           |
| -------------------- | ------------------------------------------ |
| Titre affiché        | Le titre de l'article est visible          |
| Catégorie affichée   | La catégorie est visible                   |
| Sous-titre affiché   | Le sous-titre est visible                  |
| Pas de "Modifié le"  | Absent si pas de date de modification      |
| "Modifié le" présent | Affiché si une date de modification existe |

#### `wm-rajar-ms_writer/FRONT/src/components/ArticleList/StatusToggle.test.tsx`

**Type : tests de composant React**

Teste le composant `StatusToggle` qui permet d'activer ou désactiver un article. Le service `articleService` est mocké car le composant appelle `deleteArticle`/`restoreArticle`.

| Test                         | Ce qu'il vérifie                                                          |
| ---------------------------- | ------------------------------------------------------------------------- |
| Affiche "Actif"              | Le label et `aria-checked="true"` sont présents quand l'article est actif |
| Affiche "Inactif"            | Le label et `aria-checked="false"` sont présents quand inactif            |
| Clic actif → inactif         | Appelle `onStatusChange(id, false)` après le clic                         |
| Clic inactif → actif         | Appelle `onStatusChange(id, true)` après le clic                          |
| Désactivé pendant chargement | Le bouton est `disabled` pendant l'appel API                              |

#### `wm-rajar-ms_writer/FRONT/src/components/ArticleList/SearchBar.test.tsx`

**Type : tests de composant React**

Teste le rendu, les états et les interactions du composant `SearchBar`.

| Test                          | Ce qu'il vérifie                                         |
| ----------------------------- | -------------------------------------------------------- |
| Placeholder                   | Affiche "Rechercher un article..."                       |
| Bouton recherche              | Affiche le bouton "Rechercher"                           |
| Bouton effacer visible        | Présent quand la recherche contient du texte             |
| Bouton effacer absent         | Absent quand la recherche est vide                       |
| Frappe dans le champ          | Appelle `onQueryChange` avec la valeur saisie            |
| Clic sur "Rechercher"         | Appelle `onSearch`                                       |
| Clic sur "Effacer"            | Appelle `onQueryChange("")` puis `onSearch`              |

---

### Reader Backend

#### `wn-rajar-ms_reader/Backend/src/services/comments.test.js`

**Type : tests unitaires de validation**

Teste la logique métier du service `CommentsService`.

| Test                      | Ce qu'il vérifie                                           |
| ------------------------- | ---------------------------------------------------------- |
| contenu vide              | Lance une erreur "Contenu obligatoire"                     |
| contenu > 1000 caractères | Lance une erreur "Contenu trop long (max 1000 caractères)" |
| contenu manquant          | Lance une erreur "Contenu obligatoire"                     |

#### `wn-rajar-ms_reader/Backend/src/tests/api.integration.test.js`

**Type : tests d'intégration API — se connecte à `worldnews_test` (port 5433)**

Teste les routes HTTP réelles de l'API Reader. Charge `.env.test` en priorité pour pointer vers la base de données de test.

| Test                                   | Ce qu'il vérifie                                     |
| -------------------------------------- | ---------------------------------------------------- |
| GET /articles                          | Retourne 200 avec `{ articles: [], pagination: {} }` |
| GET /articles — champs                 | Les articles ont `title`, `subtitle`, `body`         |
| GET /articles/99999                    | Retourne 404 avec `{ error: "..." }`                 |
| GET /articles/abc                      | Retourne 400 (ID invalide)                           |
| GET /articles/favorites                | Retourne 200 avec un tableau                         |
| POST /articles/1/comments sans contenu | Retourne 400 avec `{ error: "..." }`                 |

---

### Reader Frontend

#### `wn-rajar-ms_reader/Frontend/src/components/Footer/Footer.test.jsx`

**Type : tests de composant React**

Teste les composants `FavoriteButton` et `Comments`. `fetch` est mocké car ces composants appellent l'API au montage.

**FavoriteButton :**

| Test                    | Ce qu'il vérifie                                                    |
| ----------------------- | ------------------------------------------------------------------- |
| Article non favori      | Affiche "Ajouter aux favoris"                                       |
| Article déjà favori     | Affiche "Retirer des favoris"                                       |
| Clic bascule l'état     | Passe de "Ajouter aux favoris" à "Retirer des favoris" après le clic |

**Comments :**

| Test                        | Ce qu'il vérifie                                      |
| --------------------------- | ----------------------------------------------------- |
| Liste vide                  | Affiche "Aucun commentaire pour le moment"            |
| Formulaire présent          | Affiche le textarea et le bouton "Publier"            |
| Commentaire existant affiché | Affiche le contenu d'un commentaire chargé depuis l'API |

#### `wn-rajar-ms_reader/Frontend/src/components/CommentCount/CommentCount.test.jsx`

**Type : tests de composant React**

Teste le composant d'affichage du nombre de commentaires avec gestion du singulier/pluriel.

| Test           | Ce qu'il vérifie                        |
| -------------- | --------------------------------------- |
| Nombre affiché | Affiche le chiffre passé en prop        |
| Singulier      | Affiche "commentaire" pour 1            |
| Pluriel        | Affiche "commentaires" pour 3+          |
| `hideText`     | Masque le texte quand `hideText={true}` |

---

### Tests E2E

#### `e2e/writer.spec.js`

**Type : tests end-to-end — nécessite Docker**

Simule un utilisateur réel dans un vrai navigateur Chromium sur le Writer (http://localhost:5174).

| Test               | Ce qu'il vérifie                                                                                                                                                                                                                                                   |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Page d'accueil     | La page s'affiche sans erreur et contient du contenu                                                                                                                                                                                                               |
| Création d'article | Navigue vers le formulaire, remplit tous les champs (avec timestamp unique pour éviter les doublons), sélectionne une catégorie, soumet, ferme la modal de confirmation "Compris", vérifie la redirection vers `/articles` et que l'article apparaît dans la liste |

#### `e2e/reader.spec.js`

**Type : tests end-to-end — nécessite Docker**

Simule un utilisateur réel dans un vrai navigateur Chromium sur le Reader (http://localhost:5173).

| Test           | Ce qu'il vérifie                                                                                                                              |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Page d'accueil | La page s'affiche avec au moins un article                                                                                                    |
| Favoris        | Clique sur un bouton favori et attend la confirmation                                                                                         |
| Commentaire    | Clique sur un article, attend la navigation vers la page de détail, remplit le champ commentaire, soumet, vérifie que le commentaire apparaît |

---

## Automatisation

### Git hooks (Husky)

Deux hooks s'exécutent automatiquement lors des opérations Git :

#### `.husky/pre-commit`

Exécuté à chaque `git commit`. Lance le linter ESLint sur les deux frontends. Si une erreur de lint est détectée, le commit est bloqué.

```
npm run lint --prefix wm-rajar-ms_writer/FRONT
npm run lint --prefix wn-rajar-ms_reader/Frontend
```

#### `.husky/pre-push`

Exécuté à chaque `git push`. Lance tous les tests unitaires et de composants. Si un test échoue, le push est bloqué.

```
npm run test --prefix wm-rajar-ms_writer/FRONT
npm run test --prefix wm-rajar-ms_writer/BACK
npm run test --prefix wn-rajar-ms_reader/Backend
npm run test --prefix wn-rajar-ms_reader/Frontend
```

> Les tests d'intégration Backend nécessitent `db-test` (Docker). Assurez-vous qu'il tourne avant un `git push`.

### GitHub Actions (CI)

#### `.github/workflows/ci.yml`

Pipeline automatique déclenché à chaque `push` ou `pull_request` sur la branche `main`. Tourne sur un runner `ubuntu-latest` avec Node.js 20.

Étapes :

1. Checkout du code
2. Installation de Node.js 20
3. Installation des dépendances des 4 sous-projets
4. Lint Writer Frontend
5. Lint Reader Frontend
6. Tests Writer Backend
7. Tests Writer Frontend
8. Tests Reader Backend
9. Tests Reader Frontend

> Le CI ne lance pas encore les tests d'intégration qui nécessitent PostgreSQL ni les tests E2E.

---

## Base de données de test

La base `worldnews_test` est un service Docker dédié (`db-test`) isolé de la base principale. Elle est initialisée avec les mêmes schémas et données de seed que la base principale, mais sur le port **5433** au lieu de 5432.

|                | Base principale                | Base de test            |
| -------------- | ------------------------------ | ----------------------- |
| Service Docker | `db`                           | `db-test`               |
| Port           | 5432 (configurable via `.env`) | 5433                    |
| Nom            | configurable via `.env`        | `worldnews_test`        |
| Utilisée par   | l'application en production    | les tests d'intégration |

La connexion à la base de test est configurée :

- **Writer Backend** : variables d'environnement forcées dans le fichier de test (`DB_PORT=5433`, `DB_NAME=worldnews_test`)
- **Reader Backend** : fichier `wn-rajar-ms_reader/Backend/.env.test` chargé avec `override: true` au démarrage des tests
