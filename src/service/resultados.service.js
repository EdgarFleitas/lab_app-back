const {resultadosModel }= require('../models/resultados.model');
const { QueryTypes } = require("sequelize");

const list = async (query, pageStar = 1, pageLimit = 10) => {

 const resultadosModelResult = await resultadosModel.findAll ();

 console.log("resultadosResult", resultadosModelResult);
 const resultadosArray = new Array();
 for (let i = 0; i < resultadosModelResult.length; i++) {
   const resultadosResult = resultadosModelResult[i];
   resultadosArray.push(resultadosResult.dataValues);
 }

 return resultadosArray;
}

const listFilter = async (query, pageStar = 1, pageLimit = 10) => {
 let resultadosResult = await sequelize.query(
     `SELECT * 
                                                  FROM resultados
                                                  WHERE UPPER ( result_analisis ) LIKE :q
                                                  OR UPPER (result_res ) LIKE :q
                                                  OR UPPER (result_diagnostico) LIKE :q
                                                  ORDER BY result_analisis`,
{
    replacements: {
        q: query ? "%" + query.toUpperCase() + "%" : "%",
},
    type: QueryTypes.SELECT,
}
);
 
resultadosResult = (resultadosResult && resultadosResult[0]) ? resultadosResult [0] : [];
 console.log("resultadosResult", resultadosResult);
 
 return resultadosResult;
}

const getById = async (codigo) => {
    //Buscar en base de datos
    const resultadosModelResult = await resultadosModel.findByPk (codigo);
    //console.log("find  codigo", codigo);
    if (resultadosModelResult){

        return resultadosModelResult.dataValues;
    }else {
        return null;
    }
    
}

const create = async (data) => {
    //Guardar en base de datos
    console.log("create data", data);
    const resultadosModelResult = await resultadosModel.create (data);
    if (resultadosModelResult){

        return resultadosModelResult.dataValues;
    }else {
        return null;
    }
}

const update  = async (data) => {
    //Actualizar en base de datos
    console.log("update data", data);
    const resultadosModelCount= await resultadosModel.update (data,{
 
         where :{
            codigo: data.codigo
        }
    });

    if (resultadosModelCount > 0){
      const resultadosModelResult = await resultadosModel.findByPk(data.codigo);
    return resultadosModelResult.dataValues;
    }else {
        return null;
    }
}

const remove = async (codigo) => {
    //Eliminar en base de datos
    console.log("borrar codigo", codigo);
    const resultadosModelCount = await resultadosModel.destroy({
        where :{
            codigo
        }
    })
    //eliminar el data en la bd
    if(resultadosModelCount > 0){
        return true;
    }else{
        return false;
    }
    
}
module.exports = {
    list, listFilter, getById, create, update, remove 
    }