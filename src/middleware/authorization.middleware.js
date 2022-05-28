// const { UsuarioModel } = require("../models/usuarios.model");
const { sequelize } = require("../service/bd.service");
 const { QueryTypes } = require("sequelize");


const authorization = async (request, response, next) => {
  const token = request.headers['authorization'];
  console.log("Header Auth", request.headers['authorization']);
 // 1virificar si el token existe en la bd

 let usuariosResults = await sequelize.query(
                                           `SELECT usu_codigo, usu_nombre, token
                                           FROM usuarios
                                           WHERE token = :t  `,
{
replacements: {
t : token,
},
type: QueryTypes.SELECT,
});

if (usuariosResults && usuariosResults.length > 0) {
request.usuarioId = usuariosResults[0].usu_codigo;
  next();

} else {
//throw new Error ("No se encontro el usuario");
response.send({
  success: false,
  error :'no se pudo autenticar'
});
}



}
  
  module.exports = {
      authorization
    };