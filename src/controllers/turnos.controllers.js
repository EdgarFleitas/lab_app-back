const turnoService = require('../service/turnos.service')

const list = async (req, res) => {
    
    const turnos = await turnoService.list(req.query.q);
    res.send({
        success: true,
        turnos
    });
}

const listFilter = async (req, res) => {
    
    const turnos = await turnoService.listFilter(req.params.q);
    res.send({
        success: true,
        turnos
    });
}

const getById = async (req, res) => {   
    const turnos = await turnoService.getById(req.params.id);

    let jsonResultado =  req.query;
    jsonResultado['success'] = true;
    jsonResultado['turnos'] = turnos;
    res.status(201).send(jsonResultado);
}

const create = async  (req, res) => {   
    const turnos= await turnoService.create(req.body);

    res.status(202).send({
        success: true,
        turnos
    });
}

const update = async (req, res) => {   
    const turnos = await turnoService.update(req.body, req.params.id);
    console.log('Turno cambiado',turnos);
    res.status(202).send({
        success: true,
        turnos
    });
}

const remove = async (req, res) => {   
    const booleanValue = await turnoService.remove(req.params.id);

    res.status(202).send({
        success: booleanValue,
    });
}

module.exports = {
    list, listFilter, getById, create, update, remove
}