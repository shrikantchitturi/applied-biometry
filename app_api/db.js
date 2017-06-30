

var Sequelize = require('sequelize');
var config = require('./config.json');

//postgres://YourUserName:YourPassword@localhost:5432/YourDatabase
//var postgresUrl = "postgres://appliedbio:appliedbio@appliedbio.c5mv4lvokrd2.us-east-2.rds.amazonaws.com:5432/appliedbio";
//var postgresUrl = "postgres://snpreq:snpreq@104.236.72.76:5432/snpreq";



// var sequelize = new Sequelize(postgresUrl,{
//      'dialect':'postgres',
// });

// var sequelize = new Sequelize(undefined,undefined,undefined,{
//     'dialect':'sqlite',
//     'storage':__dirname+'/data/basic-sqlite-database.sqlite'
// });

var db = {};

var databases = Object.keys(config.databases);
for(var i = 0; i < databases.length; ++i) {
    var database = databases[i];
    var dbPath = config.databases[database];
    db[database] = new Sequelize( dbPath.path,{
        'dialect':'postgres'
    } );
}


//db.todo = sequelize.import(__dirname+'/models/todo.js');
db.user = db.userdb.import(__dirname+'/models/user.js');
db.wikiText = db.snpreq.import(__dirname+'/models/wiki_txt_tbl.js');
db.wikiTags = db.snpreq.import(__dirname+'/models/wiki_tags_tbl.js');


//db.sequelize = sequelize;
db.Sequelize = Sequelize;



module.exports = db;