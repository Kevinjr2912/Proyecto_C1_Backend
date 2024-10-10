const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const recipeRouter = require('./router/recipe.router');

// Configurar CORS
app.use(cors({
  origin: 'http://localhost:4200' // Permitir solicitudes desde esta URL
}));

// O permitir solicitudes desde cualquier origen (menos recomendado para producción)
app.use(cors());

app.use(bodyParser.json())

//Cargar rutas
app.use('/recipes', recipeRouter);

module.exports = app;
