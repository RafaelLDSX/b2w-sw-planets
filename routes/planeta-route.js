const express = require('express');
const router = express.Router();
const repository = require('../repositories/planeta-repository');

router.get('/', (req, res) => {
    try {
        const planetas = repository.listarPlanetas();
        res.status(200).send(planetas);
    } catch (e) {
        console.error(e);
    }
})
router.post('/', (req, res) => {
    console.log(req.body);
})

module.exports = router;