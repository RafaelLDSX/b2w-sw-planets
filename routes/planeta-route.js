const express = require('express');
const router = express.Router();
const repository = require('../repositories/planeta-repository');
const ApiError = require('../errors/api-error')

function errorHandler(err, res) {
    if(err instanceof ApiError) {
        res.status(err.statusCode).send({mensagem: err.message});
    }
    else
        res.status(500).send({mensagem: `Erro interno do servidor: ${err.message}`})
}

router.get('/', async (req, res) => {
    try {
        const nome = req.query.nome;
        if(nome != null) {
            const planeta = await repository.buscarPlanetaPorNome(nome);
            res.status(200).send(planeta);
        }
        else {
            const planetas = await repository.listarPlanetas();
            res.status(200).send(planetas);
        }
    } catch (err) {
        errorHandler(err, res);
    }
})
router.get('/:id', async (req, res) => {
    try {
        const planeta = await repository.buscarPlanetaPorId(req.params.id);
        res.status(200).send(planeta);
    } catch (err) {
        errorHandler(err, res);
    }
})
router.post('/', async (req, res) => {
    try {
        const planeta = await repository.criarPlaneta(req.body);
        res.status(201).send(planeta);
    } catch (err) {
        errorHandler(err, res);
    }
})
router.delete('/:id', async (req, res) => {
    try {
        await repository.excluirPlanetaPorId(req.params.id);
        res.status(204).send();
    } catch (err) {
        errorHandler(err, res);
    }
})

module.exports = router;