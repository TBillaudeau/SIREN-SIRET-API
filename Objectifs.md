# Objectifs

- 🟩 Récupérer les données depuis Teams
- 🟩 Ajouter les données sur la BDD (PostGreSQL)
- Créer une API qui permet de:
    - 🟩 Etre en REST
    - 🟩 GET query sur le SIRET : Renvoi la ligne avec ce SIRET sous format JSON
    - 🟩 DELETE query sur le SIRET : Supprime ce SIRET dans la BDD
    - 🟩 Log les actions dans un fichier
- 🟥 Faire le rapport avec toute la documentation ENGLISH PLEASE

> Bonus
- 🟥 Permettre à l'app de modifier les données (insérer et ajouter) en REST syntax
- 🟥 Ajouter un packaging automatique avec un outil Devops (Travis Cl par exemple)
- 🟥 Créer une interface graphique pour l'app




Idée pour optimiser les requetes : 


-- Création d'un index sur la colonne "siret" pour optimisation
CREATE INDEX idx_siret ON dataset_first_version(siret);

-- Requête optimisée en sélectionnant des colonnes spécifiques
SELECT col1, col2, col3  -- Remplacez col1, col2, col3 par les noms réels des colonnes nécessaires
FROM dataset_first_version
WHERE siret = $1;
