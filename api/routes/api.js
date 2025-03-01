var express = require("express");
var dbConfig = require('../config/db.config');
var mysql = require("mysql");
var router = express.Router();

// Fonction pour créer une connexion à la BD
function connect() {
    // Pour se connecter à la BD
    var connection = mysql.createConnection({
        host: dbConfig.HOST,
        user: dbConfig.USER,
        password: dbConfig.PASSWORD,
        database: dbConfig.DB
    });

    // Vérifie si la connexion a réussie
    connection.connect(function(err) {
        if (err) throw err;
    });

    // Retourne la connexion
    return connection;
}

// Get toutes les séries
router.get("/", function(req, res, next){
    console.log("Recherche de toutes les séries");

    // Connexion à la BD
    var connection = connect();

    // Préparation de la requête
    var request = "SELECT * FROM projet2.series;";

    // Requête
    connection.query(request, function(err, result, fields) {
        // Envoi de la réponse json
        if (err) {
            // S'il y a eu une erreur
            res.send({"success": false, "msg": "Erreur lors de la recherche des séries. (code 1)"})
        } else {
            // Si la requête a fonctionnée
            res.send({"success": true, "data": result});
        }
    });

    // Ferme la connection à la BD
    connection.end();
});

// Ajout d'une série
router.post("/", function(req, res, next) {
    console.log("Ajout d'une série");

    var serie = req.body;

    // Vérifications des champs
    var validation = verificationData(serie);

    // Si les champs sont valides
    if(validation) {
        // Connection à la BD
        var connection = connect();

        // Préparation de la requête
        var values = [serie.nom, serie.cote, serie.nbSaisons, serie.description, serie.plateforme];
        var request = 'INSERT INTO projet2.series (nom, cote, nbSaisons, description, plateforme) VALUES (?, ?, ?, ?, ?);';

        // Requête
        connection.query(request, values, function(err, result, fields) {
            // Envoi de la réponse json
            if (err){
                // S'il y a eu une erreur
                res.send({"success": false, "msg": "Erreur lors de l'ajout de la série. (code 2)", "error": err});
            } else {
                // Si la requête a fonctionnée
                res.send({"success": true, "affectedRows": res.affectedRows});
            }
        });

        // Ferme la connection à la BD
        connection.end();
    } else {
        // Si un ou des champs ne sont pas valides
        res.send({"success": false, "msg": "Erreur lors de l'ajout de la série. (code 2.1)"});
    }
    
});

// Modification d'une série
router.put("/:idSerie", function(req, res, next) {
    console.log("Modification d'une série");

    var serie = req.body;
    var id = req.params.idSerie;

    // Vérifications des valeurs des champs
    var validation = verificationData(serie);

    // Si les champs sont valides
    if(validation) {
        // Connexion à la BD
        var connection = connect();

        // Préparation de la requête
        var values = [serie.nom, serie.cote, serie.nbSaisons, serie.description, serie.plateforme, id];
        var request = "UPDATE projet2.series SET nom = ?, cote = ?, nbSaisons = ?, description = ?, plateforme = ? WHERE id = ?;"

        // Requête
        connection.query(request, values, function(err, result, fields) {
            // Envoie de la réponse json
            if (err) {
                // S'il y a une erreur
                res.send({"success": false, "msg": "Erreur lors de la modification de la série. (code 3)"});
            } else {
                // Si la requête a fonctionnée
                res.send({"success": true, "affectedRows": result.affectedRows});
            }
        });

        // Ferme la connection à la BD
        connection.end();
    } else {
        // Si un ou des champs ne sont pas valides
        res.send({"success": false, "msg": "Erreur lors de la modification de la série. (code 3.1)"})
    }
    
    
});

// Recherche d'une série à l'aide d'un id
router.get("/:idSerie", function(req, res, next) {
    console.log("Recherche d'une série avec un id");
    var id = req.params.idSerie;

    // Connexion à la BD
    var connection = connect();

    // Préparation de la requête
    var request = "SELECT * FROM projet2.series WHERE id = ?;"

    // Requête
    connection.query(request, id, function(err, result, fields) {
        // Envoi de la réponse json
        if (err){
            // S'il y a eu une erreur
            res.send({"success": false, "msg": "Erreur lors de la recherche de cette série. (code 4)"});
        } else {
            // Si la requête a fonctionnée
            res.send({"success": true, "data": result});
        }
    });

    // Ferme la connection à la BD
    connection.end();
});

// Supprimer une série à l'aide de son id
router.delete("/:idSerie", function(req, res, next) {
    console.log("Suppression d'une série avec son id");

    // Connection à la BD
    var connection = connect();

    // Préparation de la requête
    var id = req.params.idSerie;
    var request = "DELETE FROM projet2.series WHERE id = ?;";

    // Requête
    connection.query(request, id, function(err, result, fields) {
        // Envoi de la réponse json
        if (err) {
            // S'il y a eu une erreur
            res.send({"success": false, "msg": "Erreur lors de la suppression de la série. (code 5)"});
        } else {
            // Si la requête a fonctionnée
            res.send({"success": true, "affectedRows": result.affectedRows});
        }
    });

    // Ferme la connection à la BD
    connection.end();
});

function verificationData(data) {
    // Vérification du nom
    if(!data.nom) {
        // si le nom est vide
        return false;
      } else {
        if(data.nom.length > 100) {
          // si le nom est trop long
          return false;
        }
      }
  
      // Vérification de la cote
      if(!data.cote) {
        // si la cote est vide
        return false;
      } else {
        if(data.cote > 10 || data.cote < 0) {
          // si la cote est plus grande que 10.0 ou plus petite que 0
          return false;
        }
      }
  
      // Vérification du nombre de saisons
      if(!data.nbSaisons) {
        // si le nombre de saisons est vide
        return false;
      } else {
        if(data.nbSaisons > 30 || data.nbSaisons < 1) {
          // si le nombre de saisons est négatif ou plus grand que 30
          return false;
        }
      }
  
      // Vérification de la plateforme
      if(data.plateforme.length > 255) {
        // si la longueur de la plateforme est plus grande que 255
        return false;
      }
  
      // Vérification de la description
      if(data.description.length > 16777215) {
        // si la description est plus grande que le max accordé par un mediumtext
        return false;
      }
  
      // si tous les champs sont valides
      return true;
}

module.exports = router;