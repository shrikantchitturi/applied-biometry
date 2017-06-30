var db = require('../db.js');
var _ = require('underscore');


module.exports.getPharmacogenomicReport = function(req, res) {
    var profile_id = req.query.profile_id;
    if(!profile_id){
        return res.status(400).send();
    }
    db.markers.findAll({
       where:{
        profile_id:profile_id
       },
       attributes : ['id']
    }).then(function(markers_data){
         if(markers_data){
             //res.json(markers_data);
             var markersArray = [];
             markers_data.forEach(function(rs_id){
                markersArray.push(rs_id.id)
             });
             db.rsnum.findAll({
                 where:{
                     title: markersArray
                 },
                 attributes : ['Gene','title','Summary','MissenseAllele','ReferenceAllele','StabilizedOrientation']
             }).then(function(rs_data){
                 if(rs_data){
                     var pharmaReport = [];
                     rs_data.forEach(function(data){
                        var pharma_report = {};
                        pharma_report.rs = data.title;
                        pharma_report.gene = data.Gene;
                        pharma_report.summary = data.Summary || '';
                        if(data.MissenseAllele && data.ReferenceAllele){
                            pharma_report.missens = data.MissenseAllele +'/'+data.ReferenceAllele ;
                        }
                        else{
                            pharma_report.missens = '';
                        }
                        pharma_report.variant = '';
                        pharma_report.annotation = '';
                        pharmaReport.push(pharma_report);
                     });
                     res.json(pharmaReport);
                 }
                 else{
                     res.json("No rs data found");
                 }
             },function(e){
                 res.status(400).json('Error in fetching rs data :',e);
             });
         }
         else{
             res.json("No wiki in DB");
         }
     });
};



