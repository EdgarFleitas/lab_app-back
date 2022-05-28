const historialService = require('../service/historial.service')

const list = async (req, res) => {
    
    const historial = await historialService.list(req.query.q);
    res.send({
        success: true,
        historial
    });
}



const listFilter = async (req, res) => {
    
    const historial = await historialService.listFilter(req.query.q);
    res.send({
        success: true,
        historial
    });
}

const getById = async (req, res) => {   
    const historial = await historialService.getById(req.params.id);

    let jsonResultado =  req.query;
    jsonResultado['success'] = true;
    jsonResultado['historial'] = historial;
    res.status(201).send(jsonResultado);
}

const create = async  (req, res) => {   
    const historial = await historialService.create(req.body);

    res.status(202).send({
        success: true,
        historial
    });
}

const update = async (req, res) => {   
    const historial = await historialService.update(req.body);

    res.status(202).send({
        success: true,
        historial
    });
}

const remove = async (req, res) => {   
    const booleanValue = await historialService.remove(req.params.id);

    res.status(202).send({
        success: booleanValue,
    });
}

module.exports = {
    list, listFilter, getById, create, update, remove
}