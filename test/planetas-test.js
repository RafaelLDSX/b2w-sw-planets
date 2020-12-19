const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const should = chai.should();
const Planeta = require('../models/planeta');

chai.use(chaiHttp);

describe('Planetas', () => {
    before((done) => {
        Planeta.deleteMany({}, (err) => {
            done();
        })
    })

    describe('/GET planetas', () => {
        it('Deve obter todos os planetas', (done) => {
            chai.request(app)
                .get('/planetas')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                })
        })
    })

    describe('/POST planetas', () => {
        it('Não deve criar planeta sem nome', (done) => {
            chai.request(app)
                .post('/planetas')
                .send({
                    'clima': 'clima-teste', 
                    'terreno': 'terreno-teste'
                })
                .end((err, res) => {
                    res.should.have.status(422);
                    res.body.should.have.property('mensagem').contains('Nome do planeta é obrigatório')
                    done();
                })

        })
    })

    describe('/POST planetas', () => {
        it('Deve criar planeta corretamente', (done) => {
            chai.request(app)
                .post('/planetas')
                .send({
                    'nome': 'planeta-teste',
                    'clima': 'clima-teste', 
                    'terreno': 'terreno-teste'
                })
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('nome').eql('planeta-teste');
                    res.body.should.have.property('clima').eql('clima-teste');
                    res.body.should.have.property('terreno').eql('terreno-teste');
                    done();
                })

        })
    })

    describe('/GET planeta por nome', function() {
        this.timeout(5000); //SWAPI demorando 2segs
        it('Deve buscar planeta pelo nome', (done) => {
            chai.request(app)
                .get('/planetas?nome=planeta-teste')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body[0].should.have.property('nome').eql('planeta-teste');
                    res.body[0].should.have.property('clima').eql('clima-teste');
                    res.body[0].should.have.property('terreno').eql('terreno-teste');
                    done();
                })
        })
    })

    describe('/DELETE planetas', () => {
        it('Deve excluir planeta corretamente', (done) => {
            chai.request(app)
                .post('/planetas')
                .send({
                    'nome': 'planeta-teste',
                    'clima': 'clima-teste', 
                    'terreno': 'terreno-teste'
                })
                .end((err, res) => {
                    chai.request(app)
                    .delete(`/planetas/${res.body._id}`)
                    .end((err, result) => {
                        result.should.have.status(204);
                    })
                    done();
                })
        })
    })
})