const express = require('express');
const mongoose = require ('mongoose');
const bodyParser = require('body-parser');
const app=express();
require('dotenv').config()

const mongoRoutes = require('./routes/mongo');

const db = process.env.MONGODB_URI;

app.use(bodyParser.json());

mongoose
    .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
    }) // Adding new mongo url parser
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

    app.use('/', mongoRoutes);

app.listen(process.env.PORT, () => console.log(`Server started on PORT ${process.env.PORT}`));
