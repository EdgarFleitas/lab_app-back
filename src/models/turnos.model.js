const { DataTypes } = require('sequelize');
const { sequelize } = require("../service/bd.service")

const turnoModel = sequelize.define('turnos', {
  // Model attributes are defined here
  
  turnos_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  turnos_fecha: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  turnos_hora: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  turnos_usu: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  turnos_lab: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

}, {
  // Other model options go here
  tableName: 'turnos',
  timestamps: false
});

module.exports = {
    turnoModel
};