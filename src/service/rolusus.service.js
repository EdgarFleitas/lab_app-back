const { sequelize } = require("./bd.service");
const { rolusuModel } = require("../models/rolusus.model");
const { QueryTypes } = require("sequelize");

const list = async (query, pageStar = 1, pageLimit = 10) => {
  let rolususModelResult = await sequelize.query(
    `
    SELECT * FROM rolusus
    `,
    {
      replacements: {},
    }
  );

  console.log("rolususResult", rolususModelResult);

  rolususModelResult =
    rolususModelResult && rolususModelResult[0] ? rolususModelResult[0] : [];
  return rolususModelResult;
};

const listFilter = async (query, pageStar = 1, pageLimit = 10) => {
  let rolususResult = await sequelize.query(
    `
    SELECT * FROM rolusus
								WHERE concat(
                                        UPPER(rol_id),'',
                                        UPPER(rol_fecha),'',
                                        UPPER(rol_descripcion::text),'')
								  LIKE  :q 
    
    `,
    {
      replacements: {
        q: `%${query.toUpperCase()}%`,
      },
    }
  );
  rolususResult = rolususResult && rolususResult[0] ? rolususResult[0] : [];

  console.log("rolususResult", rolususResult);

  return rolususResult;
};

const getById = async (codigo) => {
  //Buscar en la base de datos por codigo
  const rolususModelResult = await rolusuModel.findByPk(codigo);
  if (rolususModelResult) {
    return rolususModelResult.dataValues;
  } else {
    return null;
  }
};

const create = async (data) => {
  //Guardar en la base de datos por codigo
  console.log("create data", data);
  const rolususModelResult = await rolusuModel.create(data);
  return rolususModelResult.dataValues;
};

const update = async (data, id) => {
  //Actualizar en la base de datos
  console.log("update data", data);
  const rolususModelCount = await rolusuModel.update(data, {
    where: {
      rol_id: id,
    },
  });
  console.log("update data", rolususModelCount.dataValues);
  return data;
};

const remove = async (rol_id) => {
  //Eliminar en la base de datos
  console.log(" borrar codigo", rol_id);
  const rolususModelCount = await rolusuModel.destroy({
    where: {
      rol_id,
    },
  });
  if (rolususModelCount > 0) {
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
