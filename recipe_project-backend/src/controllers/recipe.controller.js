const { where } = require('sequelize');
const { Recipe, Ingredient, RecipeIngredient, Nationality, Specialty, Person } = require('../models');

const createRecipe = async (req, res) => {
    try {
        // Desestructuramos el cuerpo que recibimos en la solicitud
        const {
            id_person,
            id_type_recipe,
            id_difficulty,
            name_recipe,
            description,
            preparation,
            time_duration,
            ingredients
        } = req.body;

        // Creamos la receta
        const recipe = await Recipe.create({
            id_person,
            id_type_recipe,
            id_difficulty,
            name_recipe,
            description,
            preparation,
            time_duration
        });

        // Iteramos sobre el arreglo de ingredientes
        const recipeIngredientsPromises = ingredients.map(async ({ name_ingredient }) => {

            let ingredient = await Ingredient.findOne({
                where: {
                    name_ingredient: name_ingredient
                }
            });

            if (!ingredient) {
                ingredient = await Ingredient.create({
                    name_ingredient: name_ingredient
                });
            }

            // Creamos la relación entre receta e ingrediente
            return RecipeIngredient.create({
                id_recipe: recipe.id_recipe,
                id_ingredient: ingredient.id_ingredient
            });
        });

        // Esperamos a que se creen todos los ingredientes
        await Promise.all(recipeIngredientsPromises);

        res.status(201).json({
            status: 200,
            ok: true,
            message: "Receta agregada exitosamente"
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controlador para obtener todas las recetas de una persona
const getAllRecipesPerson = async (req, res) => {
    const { idPerson } = req.params;  // Obtener id de persona

    try {
        // Buscar la persona con sus recetas y relaciones asociadas
        const personWithRecipes = await Person.findByPk(idPerson, {
            attributes: [
                'first_name_person',
                'middle_name_person',
                'first_surname_person',
                'middle_surname_person'
            ],
            include: [
                {
                    model: Nationality,
                    attributes: ['name_nationality']
                },
                {
                    model: Specialty,
                    attributes: ['name_type_specialty']
                },
                {
                    model: Recipe,
                    attributes: [
                        'name_recipe',
                        'description',
                        'preparation',
                        'time_duration'
                    ],
                    include: {
                        model: Ingredient,
                        through: {
                            model: RecipeIngredient
                        },
                        attributes: ['name_ingredient']
                    }
                }
            ]
        });

        // Verificar si se encontró la persona
        if (!personWithRecipes) {
            return res.status(404).json({ error: 'Persona no encontrada' });
        }

        // Responder con la información de la persona y sus recetas
        res.status(200).json(personWithRecipes);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

// Controlador para actualizar una receta
const updateRecipe = async (req, res) => {
    const { idRecipe } = req.params;
    const { newDataRecipe, newDataIngredients } = req.body;

    try {
        let onlyDataUpdateRecipe = {};
        let onlyDataUpdateIngredients = [];

        // Validar los datos recibidos para la receta
        if (newDataRecipe) {
            Object.keys(newDataRecipe).forEach(key => {
                if (newDataRecipe[key] !== "") {
                    onlyDataUpdateRecipe[key] = newDataRecipe[key];
                }
            });
        }

        // Actualizamos la receta si hay cambios
        if (Object.keys(onlyDataUpdateRecipe).length > 0) {
            await Recipe.update(onlyDataUpdateRecipe, {
                where: { id_recipe: idRecipe }
            });
        }

        // Validar los ingredientes recibidos
        if (newDataIngredients && Array.isArray(newDataIngredients)) {
            newDataIngredients.forEach(ingredient => {
                if (ingredient.name_ingredient !== "") {
                    onlyDataUpdateIngredients.push(ingredient);
                }
            });
        }

        // Si hay ingredientes por procesar
        if (onlyDataUpdateIngredients.length > 0) {
            const recipeIngredientsPromises = onlyDataUpdateIngredients.map(async ({ name_ingredient, nameEdited, previousName }) => {
                
                let ingredient = await Ingredient.findOne({
                    where: { name_ingredient }
                });

                // Si se ha editado el nombre del ingrediente, eliminamos la relación con el anterior ingrediente
                if (nameEdited !== "" && previousName !== "") {
                    const oldIngredient = await Ingredient.findOne({
                        where: { name_ingredient: previousName }
                    });

                    if (oldIngredient) {
                        await RecipeIngredient.destroy({
                            where: {
                                id_recipe: idRecipe,
                                id_ingredient: oldIngredient.id_ingredient
                            }
                        });
                    }

                    // Luego, si el nuevo ingrediente no existe, lo creamos
                    if (!ingredient) {
                        ingredient = await Ingredient.create({ name_ingredient });
                    }

                    // Verificamos si ya existe la nueva relación, si no, la creamos
                    const newRelation = await RecipeIngredient.findOne({
                        where: {
                            id_recipe: idRecipe,
                            id_ingredient: ingredient.id_ingredient
                        }
                    });

                    if (!newRelation) {
                        await RecipeIngredient.create({
                            id_recipe: idRecipe,
                            id_ingredient: ingredient.id_ingredient
                        });
                    }
                } else {
                    // Si el ingrediente no fue editado, lo buscamos o lo creamos
                    if (!ingredient) {
                        ingredient = await Ingredient.create({ name_ingredient });
                    }

                    // Verificamos si ya existe la relación entre la receta y el ingrediente
                    const existingRelation = await RecipeIngredient.findOne({
                        where: {
                            id_recipe: idRecipe,
                            id_ingredient: ingredient.id_ingredient
                        }
                    });

                    // Si no existe, creamos la relación
                    if (!existingRelation) {
                        await RecipeIngredient.create({
                            id_recipe: idRecipe,
                            id_ingredient: ingredient.id_ingredient
                        });
                    }
                }
            });

            // Esperamos a que se procesen todos los ingredientes
            await Promise.all(recipeIngredientsPromises);
        }

        res.status(200).json({
            status: 200,
            ok: true,
            message: 'Receta actualizada correctamente'
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteRecipe = async (req, res) => {
    const { idRecipe } = req.params;
    console.log(idRecipe)

    try {
        await Recipe.destroy({
            where: {
                id_recipe: idRecipe
            }
        });

        res.status(200).json({
            status: 200,
            ok: true,
            message: "Receta eliminada"
        });

    } catch( error ) {
        res.status(500).json({ error: error.message });
    }
}


module.exports = {
    createRecipe,
    getAllRecipesPerson,
    updateRecipe,
    deleteRecipe
};
