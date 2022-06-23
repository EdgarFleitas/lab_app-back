const resultadosController = require('../controllers/resultados.controllers');
 
module.exports = (app) =>{

    app.get('/resultados', resultadosController.list);

    app.get('/resultados-filter/:q', resultadosController.listFilter);
    
    app.get('/resultado/find/:id', resultadosController.getById );
    
    app.post('/resultado/create', resultadosController.create);
    
    app.put('/resultado/update', resultadosController.update);

    app.delete('/resultado/remove/:id', resultadosController.remove)

}