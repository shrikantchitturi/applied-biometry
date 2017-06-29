var express = require('express');
var router = express.Router();


var db = require('../db.js');
var middleware = require('../middleware')(db);

var ctrlAuth = require('../controllers/authentication');
var snpediaCtrl = require('../controllers/snpediaCtrl');

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

//Snpedia Data
router.get('/snpediaWiki', snpediaCtrl.getWikiText);
router.get('/snpediaWikiTags', snpediaCtrl.getWikiTags);

module.exports = router;
