const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Recipe",
    {
      id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
     defaultValue:DataTypes.INTEGER,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image:{
      type: DataTypes.STRING,
    },
    summary:{
      type: DataTypes.STRING,
      allowNull: false,
    }, 
    healthScore: {
      type: DataTypes.STRING,
    },
    steps: {
      type: DataTypes.STRING,
    },
    diets: {
      type: DataTypes.STRING,
    },
  },
  {timestamps:false}
  );
};


