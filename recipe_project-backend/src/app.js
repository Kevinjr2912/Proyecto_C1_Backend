const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const recipeRouter = require('./router/recipe.router');
const commentRouter = require('./router/comment.router');

// Configurar CORS
app.use(cors({
  origin: 'http://localhost:4200'
}));

app.use(bodyParser.json())

//Cargar rutas
app.use('/recipes', recipeRouter);
app.use('/comments', commentRouter);

module.exports = app;
