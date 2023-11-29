# Objectifs

- ✅ Récupérer les données depuis Teams
- ✅ Ajouter les données sur la BDD (PostGreSQL)
- Créer une API qui permet de:
    - 🟨 Etre en REST
    - 🟥 GET query sur le SIRET : Renvoi la ligne avec ce SIRET sous format JSON
    - 🟥 DELETE query sur le SIRET : Supprime ce SIRET dans la BDD
    - 🟥 Log les actions dans un fichier

> Bonus
- 🟨 Permettre à l'app de modifier les données (insérer et ajouter) en REST syntax
- 🟨 Ajouter un packaging automatique avec un outil Devops (Travis Cl par exemple)