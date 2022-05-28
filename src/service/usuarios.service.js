const {sequelize} = require("../service/bd.service");
const {usuariosModel }= require('../models/usuarios.model');
const { QueryTypes } = require("sequelize");
const  jwt = require('jsonwebtoken');
const list = async (query, pageStar = 1, pageLimit = 10) => {

 const usuariosModelResult = await usuariosModel.findAll ();

 console.log("usuariosResult", usuariosModelResult);
 const usuariosArray = new Array();
 for (let i = 0; i < usuariosModelResult.length; i++) {
   const usuariosResult = usuariosModelResult[i];
   usuariosArray.push(usuariosResult.dataValues);
 }

 return usuariosArray;
}



const listFilter = async (query, pageStar = 1, pageLimit = 10) => {

 //const cargasModelResult = await cargasModel.findAll ();
 let usuariosResult = await sequelize.query(`SELECT * 
                                              FROM USUARIOS
                                             WHERE (UPPER (nombre_apellido) LIKE :q
                                             OR UPPER (telefono) LIKE :q)
                                             ORDER BY codigo`, {
                                                 replacements: { q:(query ? '%' + query.toUpperCase() + '%' : '%') 
                                                },
                                                // type: QueryTypes.SELECT
                                             });

 
usuariosResult = (usuariosResult && usuariosResult[0]) ? usuariosResult [0] : [];
 console.log("usuariosResult", usuariosResult);
 
 return usuariosResult;
}

const getById = async (codigo) => {
    //Buscar en base de datos
    const usuariosModelResult = await usuariosModel.findByPk (codigo);
    //console.log("find  codigo", codigo);
    if (usuariosModelResult){

        return usuariosModelResult.dataValues;
    }else {
        return null;
    }
    
    
}

const create = async (data) => {
    //Guardar en base de datos
    console.log("create data", data);
    const usuariosModelResult = await usuariosModel.create (data);
    if (usuariosModelResult){

        return usuariosModelResult.dataValues;
    }else {
        return null;
    }
    
}

const update  = async (data) => {
    //Actualizar en base de datos
    console.log("update data", data);
    const usuariosModelCount= await usuariosModel.update (data,{
 
         where :{
            codigo: data.codigo
        }
    });

    if (usuariosModelCount > 0){
      const usuariosModelResult = await usuariosModel.findByPk(data.codigo);
    return usuariosModelResult.dataValues;
    }else {
        return null;
    }
     
}

const remove = async (codigo) => {
    //Eliminar en base de datos
    console.log("borrar codigo", codigo);
    const usuariosModelCount = await usuariosModel.destroy({
        
        where :{
            codigo
        }
    })
    //eliminar el data en la bd
    if(usuariosModelCount > 0){
        return true;
    }else{
        return false;
    }
    
}
const login = async (data) => {
    console.log("login data", data);
    //buscar al usuario por nombre y contrasenha
    let usuariosResults = await sequelize.query(
                                             `SELECT usu_codigo, usu_nombre, token
                                              FROM usuarios
                                              WHERE usu_nombre = :n
                                              AND usu_contrasenha = :p LIMIT 1 `,
      {
        replacements: {
          n: data.usu_nombre,
          p: data.usu_contrasenha,
        },
        type: QueryTypes.SELECT,
      });
  
    if (usuariosResults && usuariosResults.length > 0) {
      if(usuariosResults[0].token && usuariosResults[0].usu_codigo != ''){
        return {
          token : usuariosResults[0].token
        };
      }else{
        const payload = {
          usu_nombre: data.usu_nombre,
          usu_codigo: usuariosResults[0].usu_codigo,
        };
    
        var token = jwt.sign(payload, "1234");
    
        let updateTokenUsuarioResults = await sequelize.query(
                                               `UPDATE usuarios
                                                SET token = :t
                                                WHERE usu_codigo = :i`,
          {
            replacements: {
              // t: token,
              t: null,
              i: usuariosResults[0].usu_codigo
            },
            type: QueryTypes.UPDATE,
          });
    
        return {
          token,
        };
      }
     
    } else {
      throw new Error(" Datos de nombre y contrasenha invalidados");
    }
  
  };
  const logout = async (usuarioId) => {

  
    let updateTokenUsuarioResults = await sequelize.query(
                                                       `UPDATE usuarios
                                                       SET token = null
                                                       WHERE usu_codigo = :i`,
  {
           replacements: {
           i: usuarioId
  },
         type: QueryTypes.UPDATE,
  
  });
  return ;
  }
module.exports = {
    list, listFilter, getById, create, update, remove, login, logout
    }