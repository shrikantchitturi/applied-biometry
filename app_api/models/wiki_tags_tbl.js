module.exports = function(sequelize,DataTypes){
    return sequelize.define('wiki_tags_tbl',{
    title:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    wikiTag:{
        type:DataTypes.STRING,
        allowNull:false, 
    }
    },{
        freezeTableName: true,
        tableName: 'wiki_tags_tbl',
    });
}