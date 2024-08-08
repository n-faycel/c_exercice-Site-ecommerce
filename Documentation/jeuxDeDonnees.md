- La table Clients a une relation un-à-plusieurs avec la table Adresses (un client peut avoir plusieurs adresses).
- La table Clients a une relation un-à-plusieurs avec la table Achats (un client peut faire plusieurs achats).
- La table Achats a une relation plusieurs-à-un avec la table Produits (un achat peut concerner plusieurs produits).

Table Client

| ClientID | Prenom | Nom         | Email                   | Telephone        | DateCreation |
|----------|--------|-------------|-------------------------|------------------|--------------|
| C001     | Alice  | Dupont      | alice.dupont@example.com| +33 6 12 34 56 78| 2022-01-15   |
| C002     | Bruno  | Martin      | bruno.martin@example.com| +33 6 98 76 54 32| 2021-11-05   |
| C003     | Claire | Lefèvre     | claire.lefevre@example.com| +33 6 55 44 33 22| 2022-03-25 |

Table Adresse

| AdresseID | ClientID | Rue                        | Ville   | CodePostal | Pays  |
|-----------|----------|----------------------------|---------|------------|-------|
| A001      | C001     | 123 Rue de la République   | Paris   | 75001      | France|
| A002      | C002     | 456 Avenue de la Liberté   | Lyon    | 69002      | France|
| A003      | C003     | 789 Boulevard des Champs   | Marseille| 13001     | France|


Table Produit 

| ProduitID | NomProduit           | Categorie      | Prix  |
|-----------|----------------------|----------------|-------|
| P001      | Casque Audio         | Electronique   | 59.99 |
| P002      | Montre Connectée     | Accessoires    | 120.00|
| P003      | Enceinte Bluetooth   | Electronique   | 45.50 |
| P004      | Lunettes de Soleil   | Accessoires    | 75.00 |
| P005      | Étui pour Téléphone  | Accessoires    | 30.00 |
| P006      | T-shirt              | Vêtements      | 25.00 |
| P007      | Chaussures de Sport  | Vêtements      | 60.00 |
| P008      | Sac à Dos            | Accessoires    | 100.00|
| P009      | Veste en Cuir        | Vêtements      | 200.00|
| P010      | Tablette             | Electronique   | 80.00 |
| P011      | Clavier sans Fil     | Electronique   | 35.00 |
| P012      | Souris Ergonomique   | Electronique   | 55.00 |
| P013      | Tapis de Souris      | Electronique   | 20.00 |
| P014      | Imprimante           | Electronique   | 150.00|


Table Achats 

| AchatID | ClientID | DateAchat  | Montant | ProduitID |
|---------|----------|------------|---------|-----------|
| T001    | C001     | 2023-02-01 | 59.99   | P001      |
| T002    | C001     | 2023-03-15 | 120.00  | P002      |
| T003    | C001     | 2023-05-20 | 45.50   | P003      |
| T004    | C001     | 2023-06-25 | 75.00   | P004      |
| T005    | C001     | 2023-08-10 | 30.00   | P005      |
| T006    | C002     | 2023-01-18 | 25.00   | P006      |
| T007    | C002     | 2023-03-22 | 60.00   | P007      |
| T008    | C002     | 2023-05-15 | 100.00  | P008      |
| T009    | C002     | 2023-07-05 | 150.00  | P009      |
| T010    | C002     | 2023-09-10 | 200.00  | P009      |
| T011    | C003     | 2023-01-30 | 80.00   | P010      |
| T012    | C003     | 2023-02-14 | 35.00   | P011      |
| T013    | C003     | 2023-04-25 | 55.00   | P012      |
| T014    | C003     | 2023-06-18 | 20.00   | P013      |
| T015    | C003     | 2023-08-29 | 150.00  | P014      |


Justification de la Structure Choisie pour Chaque Table : 

- Table Clients : Cette table contient les informations personnelles du client, ce qui permet de les identifier de manière unique.
- Table Adresses : Les clients peuvent avoir plusieurs adresses, par exemple une adresse de facturation et une adresse de livraison. En séparant les adresses dans une table distincte avec une clé étrangère vers la table Clients, nous évitons la redondance des informations.
- Table Achats : Cette table enregistre chaque transaction d'achat. En incluant le ClientID, nous pouvons relier chaque achat à un client spécifique. Le ProduitID nous permet de lier les achats aux produits.
- Table Produits : Permet de bien gérer les produits avec un prix, etc.


Avantages Obtenus :

- Cohérence

En séparant les données en tables logiques, nous assurons que chaque type d'information est stocké de manière cohérente. Par exemple, les informations de contact des clients ne sont stockées qu'une seule fois dans la table Clients.
Les relations entre les tables (via les clés étrangères) garantissent l'intégrité référentielle, ce qui permet de maintenir la cohérence des données lorsque des enregistrements sont ajoutés, modifiés ou supprimés.

- Réduction de la Redondance

La normalisation minimise la redondance en évitant la duplication des données. Par exemple, les informations sur les produits ne sont stockées qu'une seule fois dans la table Produits, même si un produit est acheté plusieurs fois.
En éliminant la redondance, nous réduisons la taille de la base de données et améliorons les performances des opérations de mise à jour et de recherche.

- Facilité de Maintenance

Les mises à jour des informations sont simplifiées. Par exemple, si l'adresse d'un client change, il suffit de mettre à jour l'enregistrement correspondant dans la table Adresses, sans affecter les autres données.
La maintenance des données devient plus facile et moins sujette aux erreurs, car chaque type d'information est centralisé dans une table unique