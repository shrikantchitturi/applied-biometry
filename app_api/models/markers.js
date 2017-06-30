module.exports = function(sequelize,DataTypes){
    return sequelize.define('markers',{
    profile_id:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    id:{
        type:DataTypes.STRING,
        allowNull:false, 
    },
    alternate_ids:{
        type:DataTypes.STRING,
        allowNull:false, 
    },
    gene_names:{
        type:DataTypes.STRING,
        allowNull:false, 
    },
    accession_id:{
        type:DataTypes.STRING,
        allowNull:false, 
    },
    start:{
        type:DataTypes.INTEGER,
        allowNull:false, 
    },
    end:{
        type:DataTypes.INTEGER,
        allowNull:false, 
    },
    is_genotyped:{
        type:DataTypes.BOOLEAN,
        allowNull:false, 
    },
    is_assayed:{
        type:DataTypes.BOOLEAN,
        allowNull:false, 
    },
    is_no_call:{
        type:DataTypes.BOOLEAN,
        allowNull:false, 
    },
    platform_labels:{
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
    dosage_1:{
        type:DataTypes.DOUBLE,
        allowNull:false, 
    },
    dosage_2:{
        type:DataTypes.DOUBLE,
        allowNull:false, 
    },
    },{
        freezeTableName: true,
        tableName: 'markers',
    });
}


  
  
  
 
