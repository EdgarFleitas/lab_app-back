const { sequelize } = require("./bd.service");
const { turnoModel } = require("../models/turnos.model");
const { QueryTypes } = require("sequelize");

const list = async (query, pageStar = 1, pageLimit = 10) => {
  let turnoModelResult = await sequelize.query(
    `
    SELECT * FROM turnos as t   inner join laboratorios as l 
									   on l.lab_id = t.turnos_lab 
    
    `,
    {
      replacements: {},
      //type: QueryTypes.SELECT
    }
  );

  console.log("turnosResult", turnoModelResult);

  turnoModelResult =
    turnoModelResult && turnoModelResult[0] ? turnoModelResult[0] : [];
  return turnoModelResult;
};

const listFilter = async (query, pageStar = 1, pageLimit = 10) => {
  //const ultresultModelResult = await ultresultModel.findAll ();
  let turnosResult = await sequelize.query(
    `
    SELECT * FROM turnos as t   inner join laboratorios as l 
									   on l.lab_id = t.turnos_lab 
									   WHERE concat(UPPER(l.lab_nombre),'', t.turnos_fecha::text)
								  LIKE  :q 
    
    `,
    {
      replacements: {
        q: `%${query.toUpperCase()}%`,
      },
      //type: QueryTypes.SELECT
    }
  );
  turnosResult = turnosResult && turnosResult[0] ? turnosResult[0] : [];

  console.log("turnosResult", turnosResult);

  return turnosResult;
};

const getById = async (codigo) => {
  //Buscar en la base de datos por codigo
  const turnoModelResult = await turnoModel.findByPk(codigo);
  //console.log('find codigo', codigo)
  if (turnoModelResult) {
    return turnoModelResult.dataValues;
  } else {
    return null;
  }
};

const create = async (data) => {
  //Guardar en la base de datos por codigo
  console.log("create data", data);
  const turnoModelResult = await turnoModel.create(data);
  return turnoModelResult.dataValues;
  // if(turnoModelResult){
  //     return turnoModelResult.dataValues;
  // }else{
  //     return null;
  // }
};

const update = async (data, id) => {
  //Actualizar en la base de datos
  console.log("update data", data);
  const turnosModelCount = await turnoModel.update(data, {
    where: {
      turnos_id: id,
    },
  });
  console.log("update data", turnosModelCount.dataValues);
  return data;
  // if(turnosModelCount > 0){
  //     const turnoModelResult = await turnoModel.findByPk(data.codigo);
  //     return turnoModelResult.dataValues;
  // }else{
  //     return null;
  // }
};

const remove = async (turnos_id) => {
  //Eliminar en la base de datos
  console.log(" borrar codigo", turnos_id);
  const turnosModelCount = await turnoModel.destroy({
    where: {
      turnos_id,
    },
  });
  if (turnosModelCount > 0) {
    return true;
  } else {
    return false;
  }
};

module.exports = {
  list,
  listFilter,
  getById,
  create,
  update,
  remove,
};
