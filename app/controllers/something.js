const something = require('../models/something');

// Create and Save a new somethings
exports.create = (req, res) => {
    // Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "something content can not be empty"
        });
    }

    // Create a something
    const something = new something({
        title: req.body.title || "something created",
        content: req.body.content
    });

    // Save something
    something.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the something."
        });
    });
};

// Retrieve and return all somethings from the database.
exports.findAll = (req, res) => {
    something.find()
    .then(somethings => {
        res.send(somethings);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving somethings."
        });
    });
};

// Find a single something with a somethingId
exports.findOne = (req, res) => {
    something.findById(req.params.somethingId)
    .then(something => {
        if(!something) {
            return res.status(404).send({
                message: "something not found with id " + req.params.somethingId
            });
        }
        res.send(something);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "something not found with id " + req.params.somethingId
            });
        }
        return res.status(500).send({
            message: "Error retrieving something with id " + req.params.somethingId
        });
    });
};

// Update an something identified by the somethingId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "something content can not be empty"
        });
    }

    // Find something and update it with the request body
    something.findByIdAndUpdate(req.params.somethingId, {
        title: req.body.title || "Untitled something",
        content: req.body.content
    }, {new: true})
    .then(something => {
        if(!something) {
            return res.status(404).send({
                message: "something not found with id " + req.params.somethingId
            });
        }
        res.send(something);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "something not found with id " + req.params.somethingId
            });
        }
        return res.status(500).send({
            message: "Error updating something with id " + req.params.somethingId
        });
    });
};

// Delete a something with the specified somethingId in the request
exports.delete = (req, res) => {
    something.findByIdAndRemove(req.params.somethingId)
    .then(something => {
        if(!something) {
            return res.status(404).send({
                message: "something not found with id " + req.params.somethingId
            });
        }
        res.send({message: "something deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "something not found with id " + req.params.somethingId
            });
        }
        return res.status(500).send({
            message: "Could not delete something with id " + req.params.somethingId
        });
    });
};
