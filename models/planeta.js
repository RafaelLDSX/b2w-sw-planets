const mongoose = require('mongoose');

const PlanetaSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: [true, 'Nome do planeta é obrigatório'],
    },
    clima: {
        type: String,
        required: [true, 'Clima do planeta é obrigatório'],
    },
    terreno: {
        type: String,
        required: [true, 'Terreno do planeta é obrigatório'],
    }
});

module.exports = mongoose.model('Planetas', PlanetaSchema);