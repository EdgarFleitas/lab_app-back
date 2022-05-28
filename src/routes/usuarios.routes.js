const usuariosController = require('../controllers/usuarios.controllers');
const authorizationMiddleware = require("../middleware/authorization.middleware");
 
module.exports = (app) =>{

    
    app.get("/usuarios", authorizationMiddleware.authorization, usuariosController.list);

    app.get('/usuarios-filter',authorizationMiddleware.authorization, usuariosController.listFilter);
    
    app.get('/usuario/find/:id', authorizationMiddleware.authorization, usuariosController.getById );
    
    app.post('/usuario/create',authorizationMiddleware.authorization, usuariosController.create);
    
    app.put('/usuario/update',authorizationMiddleware.authorization, usuariosController.update);

    app.delete('/usuario/remove/:id',authorizationMiddleware.authorization, usuariosController.remove)
    app.post('/usuario/login',usuariosController.login);
    app.post('/usuario/logout', authorizationMiddleware.authorization, usuariosController.logout);
}