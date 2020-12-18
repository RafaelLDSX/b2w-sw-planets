const mongoose = require('mongoose');
const NaoEncontrado = require('../errors/nao-encontrado');
const Planeta = mongoose.model('Planetas');

class PlanetaRepository {
    async listarPlanetas(){ 
        const planetas = await Planeta.find({});
        return planetas;
    }

    async criarPlaneta(data) {
        const planeta = new Planeta(data);
        await planeta.save();
        return planeta
    }

    async buscarPlanetaPorId(id) {
        const planeta = await Planeta.findById(id);
        if (!planeta) {
            throw new NaoEncontrado(`Planeta com id \'${id}\' não encontrado!`);
        }
        return planeta;
    }

    async buscarPlanetaPorNome(nome) {
        const planeta = await Planeta.find({"nome": nome});
        console.log(planeta);
        if (!planeta || planeta.length < 1) {
            throw new NaoEncontrado(`Planeta com nome \'${nome}\' não encontrado!`);
        }
        return planeta;
    }

    async excluirPlanetaPorId(id) {
        const planeta = await Planeta.findByIdAndDelete(id);
        if( planeta == null) {
            throw new NaoEncontrado(`Planeta com id \'${id}\' não encontrado! (já foi excluído?)`)
        }
    }
}

module.exports = new PlanetaRepository();