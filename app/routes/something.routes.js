module.exports = (app) => {
    const users = require('../controllers/something.controller.js');

    // Create a new user
    app.post('/something', users.create);

    // Retrieve all user
    app.get('/something', users.findAll);

    // Retrieve a single user
    app.get('/something/:users', users.findOne);

    // Update a user
    app.put('/something/:users', users.update);

    // Delete a user
    app.delete('/something/:users', users.delete);
}
