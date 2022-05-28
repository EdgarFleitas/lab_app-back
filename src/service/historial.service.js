const {sequelize} = require("../service/bd.service");
const { historialModel } = require ('../models/historial.model');
const { QueryTypes } = require("sequelize");

const list = async (query,pageStar = 1, pageLimit = 10) => {
    const historialModelResult = await historialModel.findAll ();

    console.log("historialResult", historialModelResult);

    const historialArray = new Array();
    for (let i = 0; i < historialModelResult.length; i++) {
      const historialResult = historialModelResult[i];
        historialArray.push(historialResult.dataValues);
    }
    return historialArray;
   }
   
   const listFilter = async (query,pageStar = 1, pageLimit = 10) => {
    //const ultresultModelResult = await ultresultModel.findAll ();
    let historialResult = await sequelize.query(`SELECT * FROM ultresult 
                                                    WHERE (UPPER(nombre) LIKE :q
                                                    OR UPPER(diagnostico) LIKE :q
                                                    OR UPPER(informe) LIKE :q)
                                                    ORDER BY codigo`,{
                                                        replacements: { 
                                                            q: (query ? '%' + query.toUpperCase() + '%' : '%')
                                                        },
                                                        //type: QueryTypes.SELECT
                                                    });
    historialResult = (historialResult && historialResult[0]) ? historialResult[0] : [];
    console.log("historialResult", historialResult);
   
    return historialResult;
   }

const getById = async (codigo) => {
    //Buscar en la base de datos por codigo
    const historialModelResult = await historialModel.findByPk(codigo);
    //console.log('find codigo', codigo)
    if(historialModelResult){
        return historialModelResult.dataValues;
    }else{
        return null;
    }
}

const create = async (data) => {
    //Guardar en la base de datos por codigo
    console.log(' create data', data);
    const historialModelResult = await historialModel.create (data);
    if(historialModelResult){
        return historialModelResult.dataValues;
    }else{
        return null;
    }
}

const update = async (data) => {
    //Actualizar en la base de datos
    console.log("update data",data);
    const historialModelCount = await historialModel.update (data, {
                                                                    where : {
                                                                        codigo : data.codigo
                                                                    }
    });
    
    if(historialModelCount > 0){
        const historialModelResult = await historialModel.findByPk(data.codigo);
        return historialModelResult.dataValues;
    }else{
        return null;
    }
}

const remove = async (codigo) => {
    //Eliminar en la base de datos
    console.log(" borrar codigo",codigo)
    const historialModelCount = await historialModel.destroy({
                                                                where : {
                                                                    codigo
                                                                }
    });
    if (historialModelCount > 0){
        return true;
    }else{
        return false;
    }
}

module.exports = {
    list, listFilter, getById, create, update, remove
};