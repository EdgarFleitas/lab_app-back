const historialControllers = require('../controllers/historial.controllers');

module.exports = (app) =>{

    //module.exports = function(app){

    app.get('/historial', historialControllers.list);

    app.get('/historial-filter', historialControllers.listFilter);
 
    app.get('/historial/find/:id', historialControllers.getById);
    
    app.post('/historial/create', historialControllers.create);

    app.put('/historial/update', historialControllers.update);

    app.delete('/historial/remove/:id', historialControllers.remove);
}