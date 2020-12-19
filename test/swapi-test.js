const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const expect = chai.expect;
const should = chai.should();
const swapi = require('../services/swapi-service');

chai.use(chaiHttp);

describe('SWAPI', function() {
    this.timeout(5000); //SWAPI demorando 2segs
    describe('/GET filmes de um planeta', () => {
        it('Deve obter a quantidade de filmes de um planeta corretamente', async () => {
            const filmes = await swapi.getNumeroDeAparicoes('Tatooine');
            filmes.should.be.a('Number');
            expect(filmes).to.equal(5);
        })   
    })

    describe('/GET filmes de um planeta', () => {
        it('Não deve retornar quantidade de filmes de um planeta inexistente', async () => {
            const filmes = await swapi.getNumeroDeAparicoes('planeta-teste');
            expect(filmes).to.be.undefined;
        })
    })
})