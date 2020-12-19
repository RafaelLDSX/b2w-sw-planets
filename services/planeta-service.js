const repository = require('../repositories/planeta-repository');
const swapi = require('./swapi-service')

async function anexarContagemDeFilmes(planeta) {
    return {
        '_id': planeta._id,
        'nome': planeta.nome,
        'clima': planeta.clima,
        'terreno': planeta.terreno,
        filmes: await swapi.getNumeroDeAparicoes(planeta.nome)
    };
}

async function listarPlanetas() {
    const planetas = await repository.listarPlanetas();
    return Promise.all(planetas.map(anexarContagemDeFilmes));
}

async function criarPlaneta(planeta) {
    return await repository.criarPlaneta(planeta);
}

async function buscarPlanetaPorId(id) {
    const planeta = await repository.buscarPlanetaPorId(id);
    return anexarContagemDeFilmes(planeta);
}

async function buscarPlanetaPorNome(nome) {
    const planetas = await repository.buscarPlanetaPorNome(nome);
    return Promise.all(planetas.map(anexarContagemDeFilmes));
}

async function excluirPlanetaPorId(id) {
    await repository.excluirPlanetaPorId(id);
}

module.exports = { listarPlanetas, criarPlaneta, buscarPlanetaPorId, buscarPlanetaPorNome, excluirPlanetaPorId }