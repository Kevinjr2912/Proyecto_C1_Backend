const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipe.controller');

// Ruta para crear una receta
router.post('/createRecipe', recipeController.createRecipe);

// Ruta para obtener todos las recetas de una persona en específico
router.post('/getRecipe/:idPerson', recipeController.getAllRecipesPerson);

// Ruta para actualizar ciertos datos de una receta
router.put('/updateRecipe/:idRecipe', recipeController.updateRecipe);

// Ruta para eliminar una receta
router.delete('/deleteRecipe/:idRecipe', recipeController.deleteRecipe);

module.exports = router;
