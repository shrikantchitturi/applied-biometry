var db = require('../db.js');
var _ = require('underscore');

//Get the pharmacogenomic summary report:
module.exports.getPharmacogenomicReport = function (req, res) {
    //Get the profile id of the user
    var profile_id = req.query.profile_id;
    var pharmaReport = [];
    var annotations = [];
    if (!profile_id) {
        return res.status(400).send();
    }
    //Using profile_id (of 23andmeapi ) fetch all the markers of the user present in the DB.
    db.markers.findAll({
        where: {
            profile_id: profile_id
        },
        attributes: ['id', 'allele_1', 'allele_2']
    }).then(function (markers_data) {
        if (markers_data) {
            var markersArray = [];
            markers_data.forEach(function (rs_id) {
                markersArray.push(rs_id.id)
            });
            //Fetch all the annotations present in the DB.
            db.annotations.findAll({
                where: {
                    rs_number: markersArray
                },
                attributes: ['rs_number', 'allele1', 'allele2', 'annotation']
            }).then(function (annotations_data) {
                annotations = annotations_data;
                //For every rs_id fetch the details from rs_num table.
                db.rsnum.findAll({
                    where: {
                        title: markersArray
                    },
                    attributes: ['Gene', 'title', 'Summary', 'MissenseAllele', 'ReferenceAllele', 'StabilizedOrientation']
                }).then(function (rs_data) {
                    if (rs_data) {
                        rs_data.forEach(function (data) {
                            var pharma_report = {};
                            pharma_report.rs = data.title;
                            pharma_report.gene = data.Gene || '';
                            pharma_report.summary = data.Summary || '';
                            var alleles = _.findWhere(markers_data, { id: data.title });
                            //If stablilized orientation is a plus just use the alleles.
                            if (data.StabilizedOrientation == 'plus') {
                                pharma_report.variant = alleles.allele_1 + alleles.allele_2;
                            }
                            //otherwise flip the alleles.
                            else if (data.StabilizedOrientation == 'minus') {
                                pharma_report.variant = flipAlleles(alleles.allele_1) + flipAlleles(alleles.allele_2);
                            }
                            if (data.MissenseAllele && data.ReferenceAllele) {
                                pharma_report.missens = data.MissenseAllele + '/' + data.ReferenceAllele;
                            }
                            else {
                                pharma_report.missens = '';
                            }
                            //Find the annotation data for this specific rs_number
                            var annotationData = _.findWhere(annotations, { rs_number: data.title });
                            annotationData ? pharma_report.annotation = annotationData.annotation : pharma_report.annotation = "";
                            pharmaReport.push(pharma_report);
                        });
                        res.json(pharmaReport);
                    }
                    else {
                        res.json("No rs data found");
                    }
                }, function (e) {
                    res.status(400).json('Error in fetching rs data :', e);
                });
            });
        }
        else {
            res.json("No wiki in DB");
        }
    });
};

//Get Pharmacogenomics Snpedia details
module.exports.getPharmacogenomicDetails = function (req, res) {
    var profile_id = req.query.profile_id;
    var wiki_txt = [];
    var pharmgkb = [];
    var snpediaDetails = [];
    var markersArray = [];
    if (!profile_id) {
        return res.status(400).send();
    }
    //Using profile_id (of 23andmeapi ) fetch all the markers of the user present in the DB.
    db.markers.findAll({
        where: {
            profile_id: profile_id
        },
        attributes: ['id']
    }).then(function (markers_data) {
        if (markers_data) {
            markers_data.forEach(function (rs_id) {
                markersArray.push(rs_id.id);
            });
            //Fetch the wiki_txt_tbl with these relevant rs ids.
            db.wikiText.findAll({
                where: {
                    title: markersArray
                },
                attributes: ['title', 'wikiTxt']
            }).then(function (wiki) {
                if (wiki) {
                    wiki_txt = wiki;
                    //Fetch the pharmgkb with these rs_ids.
                    db.pharmgkb.findAll({
                        where: {
                            title: markersArray
                        },
                        attributes: ['title', 'Annotation']
                    }).then(function (pharmgkb_data) {
                        pharmgkb = pharmgkb_data;
                        //Loop through all the rs ids filter the
                        //necessary items and send the final response
                        markersArray.forEach(function (rsid) {
                            var snpedia_details = {};
                            snpedia_details.rsid = rsid;
                            wiki_text = _.findWhere(wiki_txt, { title: rsid });
                            if (wiki_text) {
                                snpedia_details.snpedia = wiki_text.wikiTxt || " ";
                            }
                            else {
                                snpedia_details.snpedia = " ";
                            }
                            pharma_text = _.findWhere(pharmgkb, { title: rsid });
                            if (pharma_text) {
                                snpedia_details.pharmGKB = pharma_text.Annotation || " ";
                            }
                            else {
                                snpedia_details.pharmGKB = " ";
                            }
                            snpediaDetails.push(snpedia_details);
                        });
                        res.json(snpediaDetails);
                    }, function (e) {
                        res.status(400).json(e);
                    });
                }
            });
        }
    });
};


function flipAlleles(allele) {
    var flippedAllele = '';
    if (allele == 'A') {
        flippedAllele = 'T';
    }
    else if (allele == 'T') {
        flippedAllele = 'A';
    }
    else if (allele == 'C') {
        flippedAllele = 'G';
    }
    else if (allele == 'G') {
        flippedAllele = 'C';
    }
    return flippedAllele;
}