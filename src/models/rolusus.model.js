const { DataTypes } = require("sequelize");
const { sequelize } = require("../service/bd.service");

const rolusuModel = sequelize.define(
  "rolusus",
  {
    // Model attributes are defined here

    rol_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    rol_fecha: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    rol_descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rol_usu: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    // Other model options go here
    tableName: "rolusus",
    timestamps: false,
  }
);

module.exports = {
  rolusuModel,
};
