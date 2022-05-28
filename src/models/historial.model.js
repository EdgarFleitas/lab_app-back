const { DataTypes } = require('sequelize');
const { sequelize } = require("../service/bd.service")

const historialModel = sequelize.define('historial ', {
  // Model attributes are defined here
  
  codigo: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  analisis: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  diagnostico: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  informe: {
    type: DataTypes.STRING,
    allowNull: false,
  },


}, {
  // Other model options go here
  tableName: 'ultresult',
  timestamps: false
});

module.exports = {
  historialModel
};