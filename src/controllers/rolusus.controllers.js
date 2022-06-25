const rolususService = require('../service/rolusus.service')

const list = async (req, res) => {
    
    const rolusus = await rolususService.list(req.query.q);
    res.send({
        success: true,
        rolusus
    });
}

const listFilter = async (req, res) => {
    
    const rolusus = await rolususService.listFilter(req.params.q);
    res.send({
        success: true,
        rolusus
    });
}

const getById = async (req, res) => {   
    const rolusus = await rolususService.getById(req.params.id);

    let jsonResultado =  req.query;
    jsonResultado['success'] = true;
    jsonResultado['rolusus'] = rolusus;
    res.status(201).send(jsonResultado);
}

const create = async  (req, res) => {   
    const rolusus= await rolususService.create(req.body);

    res.status(202).send({
        success: true,
        rolusus
    });
}

const update = async (req, res) => {   
    const rolusus = await rolususService.update(req.body, req.params.id);
    console.log('Turno cambiado',rolusus);
    res.status(202).send({
        success: true,
        rolusus
    });
}

const remove = async (req, res) => {   
    const booleanValue = await rolususService.remove(req.params.id);

    res.status(202).send({
        success: booleanValue,
    });
}

module.exports = {
    list, listFilter, getById, create, update, remove
}