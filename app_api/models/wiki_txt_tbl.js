module.exports = function(sequelize,DataTypes){
    return sequelize.define('wiki_txt_tbl',{
    title:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    wikiTxt:{
        type:DataTypes.STRING,
        allowNull:false, 
    }
    },{
        freezeTableName: true,
        tableName: 'wiki_txt_tbl',
    });
}