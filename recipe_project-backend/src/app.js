const express = require('express');
const bodyParser = require('body-parser');
const recipeRouter = require('./router/recipe.router');

const app = express();

app.use(bodyParser.json())

//Cargar rutas
app.use('/recipes', recipeRouter);

module.exports = app;
