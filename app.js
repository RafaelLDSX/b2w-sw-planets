const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv/config');

app.get('/', (req, res) => {
    res.send('Hello World!');
});

mongoose.connect(
    process.env.DB_CONNECTION_STRING, 
    {   
        useNewUrlParser: true 
    },
    () => console.log('conectou no DB!')
);

app.listen(3000);