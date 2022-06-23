const resultadoService = require('../service/resultados.service')

const list =async (req,res) => {
    
    const resultados= await resultadoService.list(req.query.q);
    res.send({
        success: true,
         resultados
    });

;}
const listFilter =async (req, res) => {
    
    const resultados = await resultadoService.listFilter(req.params.q);
    res.send({
        success: true,
        resultados
    });
;}

const getById = async (req, res) => {   
    const resultados = await resultadoService.getById(req.params.id);
    
    let jsonResultado =  req.query;
    jsonResultado['success'] = true;
    jsonResultado['resultados'] = resultados;
    res.status(201).send(jsonResultado);
}

const create = async  (req, res) => {   
    const resultados = await resultadoService.create(req.body);

    res.status(202).send({
        success: true,
        resultados
    });
}

const update = async (req, res) => {   
    const resultados= await resultadoService.update(req.body, req.params.id);
    console.log('Resultados cambiados',resultados);
    res.status(202).send({
        success: true,
        resultados
    });
}

const remove = async (req, res) => {   
    const booleanValue = await resultadoService.remove(req.params.id);
    res.status(202).send({
        success: booleanValue,
        
    });
}

module.exports = {
    list, listFilter, getById, create, update, remove
}