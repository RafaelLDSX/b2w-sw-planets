require('dotenv').config();
const fetch = require('node-fetch')

async function getNumeroDeAparicoes(nome) {
    const request = await fetch(`${process.env.SWAPI_URL}/planets?search=${nome}`);

    const response = await request.json();

    if(!response.results[0]) {
        return undefined;
    }

    return response.results[0].films.length;
}

module.exports = { getNumeroDeAparicoes }