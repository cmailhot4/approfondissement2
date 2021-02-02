var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next){
    res.send("Le test API fonctionne correctement.");
});

module.exports = router;