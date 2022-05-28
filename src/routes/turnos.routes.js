const turnosControllers = require('../controllers/turnos.controllers');

module.exports = (app) =>{

    app.get('/turnos', turnosControllers.list);

    app.get('/turnos-filter/:q', turnosControllers.listFilter);
 
    app.get('/turno/find/:id', turnosControllers.getById);
    
    app.post('/turno/create', turnosControllers.create);

    app.put('/turno/update/:id', turnosControllers.update);

    app.delete('/turno/remove/:id', turnosControllers.remove);
}