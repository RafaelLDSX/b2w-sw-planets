const mongoose = require('mongoose');

const PlanetaSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
    clima: {
        type: String,
        required: true,
    },
    terreno: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Planetas', PlanetaSchema);