const express = require('express');
require('dotenv').config();
const db = require('./database/config');

class App {
    constructor() {
        this.app = express();

        this.database();
        this.middlewares();
        this.models();
        this.routes();

        this.app.listen(process.env.PORT, () => 
            console.log(`Escutando na porta http://localhost:${process.env.PORT}`));
    }

    database() {
        db.status();
    }

    middlewares() {
        this.app.use(express.json());
    }

    models() {
        const Planeta = require('./models/planeta');
    }

    routes() {
        const planetasRoute = require('./routes/planeta-route');
        this.app.use('/planetas', planetasRoute);
    }
}

module.exports = new App().app;




