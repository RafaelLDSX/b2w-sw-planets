const mongoose = require('mongoose');
const Planeta = mongoose.model('Planetas');

class PlanetaRepository {
    async listarPlanetas(){
        const data = await Planeta.find({});
        return data;
    }
}

module.exports = new PlanetaRepository();