const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('bd_lab', 'postgres', '12345', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres'
});

const testConection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexion exitosa.');
      } catch (error) {
        console.error('No se ha podido conectar a la Base de datos. Cod:', error);
      }
}

testConection();

const db = {
    Sequelize,
    sequelize
}

module.exports = db;