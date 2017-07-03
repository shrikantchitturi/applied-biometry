module.exports = function(sequelize,DataTypes){
    return sequelize.define('annotations',{
    // rsid
    rs_number:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    //Type of the report
    report:{
        type:DataTypes.STRING,
        allowNull:false, 
    },
    allele1:{
        type:DataTypes.STRING,
        allowNull:false, 
    },
    allele2:{
        type:DataTypes.STRING,
        allowNull:false, 
    },
    //Data to be saved or fetched
    annotation:{
        type:DataTypes.STRING,
        allowNull:false, 
    },
    },{
        freezeTableName: true,
        tableName: 'annotations',
    });
}


  
  
  
 
