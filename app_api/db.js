

var Sequelize = require('sequelize');


//postgres://YourUserName:YourPassword@localhost:5432/YourDatabase
var postgresUrl = "postgres://appliedbio:appliedbio@appliedbio.c5mv4lvokrd2.us-east-2.rds.amazonaws.com:5432/appliedbio";
//var postgresUrl = "postgres://snpreq:snpreq@104.236.72.76:5432/snpreq";

var sequelize = new Sequelize(postgresUrl,{
     'dialect':'postgres',
});

// var sequelize = new Sequelize(undefined,undefined,undefined,{
//     'dialect':'sqlite',
//     'storage':__dirname+'/data/basic-sqlite-database.sqlite'
// });

var db = {};

//db.todo = sequelize.import(__dirname+'/models/todo.js');
db.user = sequelize.import(__dirname+'/models/user.js');
db.wikiText = sequelize.import(__dirname+'/models/wiki_txt_tbl.js');
db.wikiTags = sequelize.import(__dirname+'/models/wiki_tags_tbl.js');


db.sequelize = sequelize;
db.Sequelize = Sequelize;



module.exports = db;