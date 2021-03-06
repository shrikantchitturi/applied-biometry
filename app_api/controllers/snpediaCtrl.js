var db = require('../db.js');
var _ = require('underscore');


module.exports.getWikiText = function(req, res) {
    var limit = Number(req.query.limit) || 10;
    var page = Number(req.query.page) || 1;
    var offset = (page - 1 ) * limit ;
    db.wikiText.findAll({
        offset: offset,
        limit:limit,
        attributes : ['title', 'wikiTxt']
    }).then(function(wiki){
         if(wiki){
             res.json(wiki);
         }
         else{
             res.json("No wiki in DB");
         }
     });
};

module.exports.getWikiTags = function(req, res) {
    var offset = req.query.offset || 0;
    var limit = req.query.limit || 10;
    db.wikiTags.findAll({
        offset: offset,
        limit:limit,
        attributes : ['title', 'wikiTag']
    }).then(function(wiki){
         if(wiki){
             res.json(wiki);
         }
         else{
             res.json("No wiki in DB");
         }
     });
};

