const resultadoController = require('../controllers/resultados.controllers');
 
module.exports = (app) =>{

    app.get('/resultados', resultadoController.list);

    app.get('/resultados-filter', resultadoController.listFilter);
    
    app.get('/resultado/find/:id', resultadoController.getById );
    
    app.post('/resultado/create', resultadoController.create);
    
    app.put('/resultado/update', resultadoController.update);

    app.delete('/resultado/remove/:id', resultadoController.remove)

}