module.exports = (app) => {
    const notes = require('../controllers/note.controller.js');

    // Create a new user
    app.post('/users', users.create);

    // Retrieve all user
    app.get('/users', users.findAll);

    // Retrieve a single user
    app.get('/users/:users', users.findOne);

    // Update a user
    app.put('/users/:users', users.update);

    // Delete a user
    app.delete('/users/:users', users.delete);
}
