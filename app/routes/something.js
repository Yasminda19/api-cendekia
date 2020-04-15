const soemthing = require('../controllers/something');

module.exports = (app) => {

    // Create a new user
    app.post('/something', soemthing.create);

    // Retrieve all user
    app.get('/something', soemthing.findAll);

    // Retrieve a single user
    app.get('/something/:users', soemthing.findOne);

    // Update a user
    app.put('/something/:users', soemthing.update);

    // Delete a user
    app.delete('/something/:users', soemthing.delete);
}
