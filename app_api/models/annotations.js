module.exports = function(sequelize,DataTypes){
    return sequelize.define('annotations',{
    // rsid
    id:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    //Type of the report
    report_type:{
        type:DataTypes.STRING,
        allowNull:false, 
    },
    allele_1:{
        type:DataTypes.STRING,
        allowNull:false, 
    },
    allele_2:{
        type:DataTypes.STRING,
        allowNull:false, 
    },
    //Data to be saved or fetched
    description:{
        type:DataTypes.STRING,
        allowNull:false, 
    },
    },{
        freezeTableName: true,
        tableName: 'annotations',
    });
}


  
  
  
 
