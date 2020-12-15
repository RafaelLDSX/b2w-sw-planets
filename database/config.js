const mongoose = require('mongoose');
require('dotenv').config();

const connectionString = process.env.DB_CONNECTION_STRING

class Database {
    constructor() {
        mongoose.connect( connectionString, {   
            useUnifiedTopology: true,
            useFindAndModify: true,
            useNewUrlParser: true,
            useCreateIndex: true }
        );

        this.db = mongoose.connection;
    }

    status() {
        this.db.on('connected', () => {
            console.log('Mongoose: conexão aberta!');
        });

        this.db.on('error', err => {
            console.log(`Mongoose: erro\n${err}`);
        })
    }
}

module.exports = new Database();