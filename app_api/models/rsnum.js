module.exports = function(sequelize,DataTypes){
    return sequelize.define('rsnum',{
 
    title:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    tagType:{
        type:DataTypes.STRING,
        allowNull:false, 
    },
    Assembly:{
        type:DataTypes.STRING,
        allowNull:false, 
    },
    Chromosome:{
        type:DataTypes.STRING,
        allowNull:false, 
    },
    dbSNPBuild:{
        type:DataTypes.STRING,
        allowNull:false, 
    },
    Gene:{
        type:DataTypes.STRING,
        allowNull:false, 
    },
    Gene_s:{
        type:DataTypes.STRING,
        allowNull:false, 
    },
    geno1:{
        type:DataTypes.STRING,
        allowNull:false, 
    },
    geno2:{
        type:DataTypes.STRING,
        allowNull:false, 
    },
    geno3:{
        type:DataTypes.STRING,
        allowNull:false, 
    },
    GenomeBuild:{
        type:DataTypes.STRING,
        allowNull:false, 
    },
    GMAF:{
        type:DataTypes.STRING,
        allowNull:false, 
    },
    MissenseAllele:{
        type:DataTypes.STRING,
        allowNull:false, 
    },
    Orientation:{
        type:DataTypes.STRING,
        allowNull:false, 
    },
    position:{
        type:DataTypes.STRING,
        allowNull:false, 
    },
    ReferenceAllele:{
        type:DataTypes.STRING,
        allowNull:false, 
    },
     rsid:{
        type:DataTypes.STRING,
        allowNull:false, 
    },
     StabilizedOrientation:{
        type:DataTypes.STRING,
        allowNull:false, 
    },
     Summary:{
        type:DataTypes.STRING,
        allowNull:false, 
    },
    },{
        freezeTableName: true,
        tableName: 'rsnum',
    });
}


  
  
  
 
