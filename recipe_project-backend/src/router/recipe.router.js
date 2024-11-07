const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipe.controller');

// Ruta para crear una receta
router.post('/createRecipe/:id_person', recipeController.createRecipe);

// Ruta para obtener información especifíca de una receta
router.post('/getRecipe/:id_recipe', recipeController.getInformationRecipe);

// Ruta para obtener información específica de una receta anexado a la información de una persona
router.post('/getInformationPersonWithRecipe/:idPerson/:idRecipe', recipeController.getInformationPersonAndRecipe);

// Ruta para obtener todas las recetas
router.post('/getRecipesPublished/:idPerson', recipeController.getRecipePublished);

// Ruta para actualizar ciertos datos de una receta
router.put('/updateRecipe/:id_recipe', recipeController.updateRecipe);

// Ruta para eliminar una receta
router.delete('/deleteRecipe/:id_recipe', recipeController.deleteRecipe);

module.exports = router;
