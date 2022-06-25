const rolususControllers = require('../controllers/rolusus.controllers');

module.exports = (app) =>{

    app.get('/rolusus', rolususControllers.list);

    app.get('/rolusus-filter/:q', rolususControllers.listFilter);
 
    app.get('/rolusus/find/:id', rolususControllers.getById);
    
    app.post('/rolusus/create', rolususControllers.create);

    app.put('/rolusus/update/:id', rolususControllers.update);

    app.delete('/rolusus/remove/:id', rolususControllers.remove);
}