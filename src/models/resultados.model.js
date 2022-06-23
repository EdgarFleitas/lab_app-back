const { DataTypes } = require('sequelize');
const { sequelize } = require ("../service/bd.service");

const resultadosModel = sequelize.define('resultados', {
  // Model attributes are defined 
  
  result_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  result_usu: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  result_analisis: {
    type: DataTypes.STRING,
    allowNull: false
  },
  result_res: {
    type: DataTypes.STRING,
    allowNull: false
  },
  result_diagnostico: {
    type: DataTypes.STRING,
    allowNull: false
  },
  result_informe: {
    type: DataTypes.STRING,
    allowNull: false
  },
  result_lab: {
   type: DataTypes.STRING,
   allowNull: false
 }
}, {
  tableName: 'resultados',
  timestamps: false
});
module.exports = {
  resultadosModel
}
;