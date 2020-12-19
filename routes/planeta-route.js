const express = require('express');
const router = express.Router();
const service = require('../services/planeta-service');
const ApiError = require('../errors/api-error');
const Mongoose = require('mongoose');
const swapi = require('../services/swapi-service');

function errorHandler(err, res) {
    if(err instanceof ApiError) {
        res.status(err.statusCode).send({mensagem: err.message});
    }
    else if(err instanceof Mongoose.Error.ValidationError){
        res.status(422).send({mensagem: err.message})
    }
    else{
        res.status(500).send({mensagem: err.message})
    }
}

router.get('/', async (req, res) => {
    try {
        const nome = req.query.nome;
        if(nome != null) {
            const planeta = await service.buscarPlanetaPorNome(nome);
            res.status(200).send(planeta);
        }
        else {
            const planetas = await service.listarPlanetas();
            res.status(200).send(planetas);
        }
    } catch (err) {
        errorHandler(err, res);
    }
})
router.get('/:id', async (req, res) => {
    try {
        const planeta = await service.buscarPlanetaPorId(req.params.id);
        res.status(200).send(planeta);
    } catch (err) {
        errorHandler(err, res);
    }
})
router.post('/', async (req, res) => {
    try {
        const planeta = await service.criarPlaneta(req.body);
        res.status(201).send(planeta);
    } catch (err) {
        errorHandler(err, res);
    }
})
router.delete('/:id', async (req, res) => {
    try {
        await service.excluirPlanetaPorId(req.params.id);
        res.status(204).send();
    } catch (err) {
        errorHandler(err, res);
    }
})

module.exports = router;