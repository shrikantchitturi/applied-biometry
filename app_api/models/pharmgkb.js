module.exports = function(sequelize,DataTypes){
    return sequelize.define('pharmgkb',{
    title:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    //Type of the report
    tagType:{
        type:DataTypes.STRING,
        allowNull:false, 
    },
    Annotation:{
        type:DataTypes.STRING,
        allowNull:false, 
    },
    Curation:{
        type:DataTypes.STRING,
        allowNull:false, 
    },
    //Data to be saved or fetched
    Diseases:{
        type:DataTypes.STRING,
        allowNull:false, 
    },
    Drug:{
        type:DataTypes.STRING,
        allowNull:false, 
    },
    Drugs:{
        type:DataTypes.STRING,
        allowNull:false, 
    },
    Evidence:{
        type:DataTypes.STRING,
        allowNull:false, 
    },
    Feature:{
        type:DataTypes.STRING,
        allowNull:false, 
    },
    Gene_s:{
        type:DataTypes.STRING,
        allowNull:false, 
    },
    Name_s:{
        type:DataTypes.STRING,
        allowNull:false, 
    },
    PharmGKB:{
        type:DataTypes.STRING,
        allowNull:false, 
    },
    RSID:{
        type:DataTypes.STRING,
        allowNull:false, 
    }
    },{
        freezeTableName: true,
        tableName: 'pharmgkb',
    });
}


  
  
  
 
