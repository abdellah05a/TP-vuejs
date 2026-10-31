# TP Jobs App — Solution et guide

## Démarrer sous Windows

1. Extraire Jobs_app_corrige.zip.
2. Ouvrir le dossier extrait dans Visual Studio Code.
3. Ouvrir Terminal > Nouveau terminal.
4. Exécuter `dir package.json`. Le fichier doit apparaître. Sinon, entrer dans le sous-dossier qui contient package.json avant de continuer.
5. Exécuter une seule fois :

```powershell
npm.cmd install
```

6. Démarrer l’application :

```powershell
npm.cmd run dev
```

7. Ouvrir http://127.0.0.1:5174 dans le navigateur. Garder le terminal ouvert.

Cette commande démarre à la fois Vue/Vite sur le port 5174 et JSON Server sur le port 3001. Le port 5174 évite un conflit avec le TP précédent. Ctrl+C arrête les serveurs.

Si le terminal indique « port already in use », arrêter l’ancienne instance dans son terminal avec Ctrl+C avant de relancer. Si npm n’est pas reconnu, installer Node.js avec npm puis rouvrir VS Code. Si l’installation signale UNABLE_TO_VERIFY_LEAF_SIGNATURE, avec Node.js 24 installé sur cette machine, exécuter `$env:NODE_OPTIONS="--use-system-ca"` puis relancer `npm.cmd install` ; cette option utilise les certificats du système sans désactiver leur vérification.

## Tester les fonctionnalités

1. Accueil : vérifier les trois offres initiales.
2. Rechercher « Vue » ou « Safi ». Choisir le filtre débutant, puis toutes les offres.
3. Cliquer sur « Ajouter une offre ». Remplir titre, entreprise, ville, description, salaire, expérience et date.
4. Valider : la page de détail de la nouvelle offre s’ouvre.
5. Recharger la page : les données restent présentes, car JSON Server les sauvegarde dans db.json.
6. Cliquer sur « Modifier l’offre » : les champs sont préremplis. Modifier le salaire et enregistrer.
7. Cliquer sur « Supprimer l’offre », annuler une première fois et vérifier que l’offre reste présente.
8. Recommencer et confirmer : l’offre disparaît et l’accueil s’affiche.
9. Ouvrir /jobs/99999 : un message d’offre introuvable apparaît.
10. Ouvrir /page-inconnue : la page 404 s’affiche.

Les salaires de démonstration sont mensuels et en MAD. Les offres et entreprises sont fictives.

## Correspondance avec l’énoncé

| Fichier | Rôle |
| --- | --- |
| src/App.vue | Navigation et emplacement de la vue courante |
| src/router/index.js | Routes /, /add, /jobs/:id, /jobs/:id/edit et 404 |
| src/views/Home.vue | Chargement et liste des emplois |
| src/components/FilterNav.vue | Recherche et filtre d’expérience |
| src/views/JobDetail.vue | Détail, modification, suppression confirmée |
| src/views/AddJob.vue | Création d’une offre |
| src/views/EditJob.vue | Chargement et édition d’une offre |
| src/components/JobForm.vue | Formulaire partagé et validation |
| src/services/jobs.js | Appels HTTP vers JSON Server |
| db.json | Données persistées par JSON Server |

## Comprendre les opérations HTTP

- GET /jobs : lire toutes les offres.
- GET /jobs/:id : lire une offre.
- POST /jobs : créer une offre ; JSON Server attribue l’identifiant.
- PATCH /jobs/:id : modifier les champs d’une offre existante.
- DELETE /jobs/:id : supprimer l’offre après confirmation.

`JSON.stringify()` transforme les données du formulaire en corps JSON pour POST et PATCH. Chaque appel vérifie `response.ok`. La navigation et la mise à jour de l’interface ont lieu après la réussite de la requête. En cas d’échec, le formulaire conserve les données saisies et affiche un message.

Vue Router gère la navigation sans rechargement complet. `ref` gère les états locaux, `computed` calcule la liste filtrée et `onMounted` charge les données. JobForm utilise des props pour recevoir les valeurs initiales et émet `save` vers la vue qui effectue la requête.

## Choix et limites du TP

Le JSON fourni dans l’archive d’origine contient des tâches (courses, sport, révisions), sans salaire ni expérience. Il est conservé dans references/donnees-originales.json. Le fichier db.json utilise une collection `jobs` avec les champs demandés.

JSON Server 0.17.4 est fixé dans package.json pour utiliser la syntaxe `--watch` du support. Il est installé localement au projet, sans installation globale.

Les actions de gestion sont accessibles dans cette démonstration. L’énoncé ne définit pas de connexion ni de gestion des comptes : aucune authentification administrateur n’est implémentée. JSON Server est un serveur de démonstration local ; une mise en production nécessiterait notamment une authentification et une validation côté serveur.

## Compilation et remise

```powershell
npm.cmd run build
```

Le résultat est créé dans dist. Pour prévisualiser cette compilation, lancer `npm.cmd run server` dans un terminal et `npm.cmd run preview` dans un second. Ouvrir l’adresse affichée par preview.

Pour remettre le TP, transmettre les sources, db.json et package-lock.json. Exclure node_modules et dist. Lire ce guide pour pouvoir expliquer les routes, les props/événements et les quatre méthodes HTTP. Si des captures sont demandées, prendre l’accueil, le détail, le formulaire prérempli et la confirmation de suppression.

## Vérifications réalisées

Compilation réussie. Tests dans Chrome réussis : liste, recherche, filtre, champs requis, création, persistance après rechargement, préremplissage, modification, suppression annulée puis confirmée, offre absente, route 404, erreur réseau et réessai. Affichage contrôlé sur ordinateur et mobile. Aucune erreur JavaScript pendant ce parcours. Les données de test ont été supprimées.
