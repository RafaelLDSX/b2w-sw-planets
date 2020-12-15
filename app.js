const express = require('express');
const port = 3000;
const db = require('./database/config');

class App {
    constructor() {
        this.app = express();

        this.database();
        this.middlewares();
        this.models();
        this.routes();

        this.app.listen(port, () => 
            console.log(`Escutando na porta http://localhost:${port}`));
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




