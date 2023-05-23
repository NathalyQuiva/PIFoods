const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define("Diet", {
      id:{
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue:DataTypes.UUID,
      
      },
      
      name: {
        type: DataTypes.STRING,
       
      },
     
    },
    {timestamps:false}
    );
  };