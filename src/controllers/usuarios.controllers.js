const usuarioService = require('../service/usuarios.service')

const list =async (req,res) => {
    console.log("El id del usuario que invoco es", req.usuarioId);
    const usuarios = await usuarioService.list(req.query.q);
    res.send({
        success: true,
        usuarios
    });

;}
const listFilter =async (req,res) => {
    
    const usuarios = await usuarioService.listFilter(req.query.q);
    res.send({
        success: true,
        usuarios
    });

;}

const getById = async (req, res) => {   
    const usuarios = await usuarioService.getById(req.params.id);
    
    let jsonResultado =  req.query;
    jsonResultado['success'] = true;
    jsonResultado['usuarios'] = usuarios;


    res.status(201).send(jsonResultado);
}


const create = async  (req, res) => {   
    const usuarios = await usuarioService.create(req.body);

    res.status(202).send({
        success: true,
        usuarios
    });
}

const update = async (req, res) => {   
    const usuarios = await usuarioService.update(req.body);
    res.status(202).send({
        success: true,
        usuarios
    });
}

const remove = async (req, res) => {   
    const booleanValue = await usuarioService.remove(req.params.id);
    res.status(202).send({
        success: booleanValue,
        
    });
}

const login = async  (req, res) => {   
    try {
        
    const usuarios = await usuarioService.login(req.body);
 
    res.status(200).send({
        success: true,
        //usuarios
        token : usuarios.token
    });
    } catch (error) {
        res.status(200).send({
            success: false,
            error : error.message
        });
    }
}
const logout = async  (req, res) => {   
    const usuarios = await usuarioService.logout(req.usuarioId);

    res.status(200).send({
        success: true
    });
}
module.exports = {
list, listFilter, getById, create, update, remove,login,logout
}