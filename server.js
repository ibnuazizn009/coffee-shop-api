const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const createHttpError = require('http-errors');
const { sequelize } = require('./models');
const categoryRoute = require('./routes/category-routes');

const app = express();
const http = require('http').Server(app);
require('dotenv').config();

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/api', categoryRoute.routes);

app.use((req, res, next) => {
    next(new createHttpError.NotFound())
})

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        status: err.status || 500,
        message: err.message
    })
})

http.listen(process.env.PORT, async() => {
    console.log(`Server running http://localhost:${process.env.PORT}`);
    await sequelize.authenticate();
    console.log('Connected to Database');
});
