const { Recipe, Ingredient, RecipeIngredient, Nationality, Specialty, Person, TypeDifficulty, CategoryRecipe } = require('../models');

const createRecipe = async (req, res) => {
    // Desestructurmos el idPerson que recibimos como parametro
    const { id_person } = req.params;

    // Desestructuramos el cuerpo que recibimos en la solicitud
    const {
        name_recipe,
        description,
        time_duration,
        id_difficulty,
        number_portion,
        id_category_recipe,
        ingredients,
        preparation
    } = req.body;


    try {

        // Creamos la receta
        const recipe = await Recipe.create({
            id_person,
            name_recipe,
            description,
            time_duration,
            id_difficulty,
            number_portion,
            id_category_recipe,
            ingredients,
            preparation
        });

        // Iteramos sobre el arreglo de ingredientes
        const recipeIngredientsPromises = ingredients.map(async ({ name_ingredient, count_ingredient, unit_measurement }) => {

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
                id_ingredient: ingredient.id_ingredient,
                count_ingredient: count_ingredient,
                unit_measurement: unit_measurement
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

// Controlador para obtener la información específica de una receta
const getInformationRecipe = async (req, res) => {
    const { id_recipe } = req.params;

    try {
        const infoRecipe = await Recipe.findByPk(id_recipe, {
            attributes: [
                'name_recipe',
                'description',
                'preparation',
                'time_duration',
                'number_portion'
            ],
            include: [
                {
                    model: TypeDifficulty,
                    attributes: ['name_type_difficulty']
                },
                {
                    model: CategoryRecipe,
                    attributes: ['name_type_recipe']
                },
                {
                    model: Ingredient,
                    through: {
                        model: RecipeIngredient,
                        attributes: [
                            'id_recipe_ingredient',
                            'count_ingredient',
                            'unit_measurement'
                        ]
                    },
                    attributes: ['name_ingredient']
                }
            ]
        });

        res.status(200).json(infoRecipe);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

// Controlador para obtener el nombre de las recetas de una persona
const getRecipePublished = async (req, res) => {
    const { idPerson } = req.params;

    try {
        const personWithRecipes = await Recipe.findAll({
            where: { 'id_person': idPerson },
            attributes: [
                'id_recipe',
                'name_recipe',
            ],
            include: [
                {
                    model: CategoryRecipe,
                    attributes: ['name_type_recipe']
                }
            ]
        });

        res.status(200).json(personWithRecipes);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//Controlador para obtener la información
const getInformationPersonAndRecipe = async (req, res) => {
    const { idPerson, idRecipe } = req.params;
    console.log("Esto es lo que recibe la ruta: " + req.params.idPeconsrson)

    try {
        const personWithRecipe = await Person.findByPk(idPerson, {
            attributes: [
                'first_name_person',
                'middle_name_person',
                'first_surname_person',
                'middle_surname_person'
            ],
            include: [
                {
                    model: Nationality,
                    attributes: [
                        'name_nationality'
                    ]
                },
                {
                    model: Specialty,
                    attributes: [
                        'name_type_specialty'
                    ]
                },
                {
                    model: Recipe,
                    attributes: [
                        'name_recipe',
                        'description',
                        'preparation',
                        'time_duration',
                        'number_portion'
                    ],
                    include: [
                        {
                            model: TypeDifficulty,
                            attributes: ['name_type_difficulty']
                        },
                        {
                            model: CategoryRecipe,
                            attributes: ['name_type_recipe']
                        },
                        {
                            model: Ingredient,
                            through: {
                                model: RecipeIngredient,
                                attributes: ['count_ingredient', 'unit_measurement']
                            },
                            attributes: ['name_ingredient']
                        }
                    ],
                    where: {
                        'id_recipe': idRecipe
                    }
                }
            ]
        });

        res.status(200).json(personWithRecipe);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


// Controlador para actualizar una receta
const updateRecipe = async (req, res) => {
    const { id_recipe } = req.params;

    const {
        name_recipe,
        description,
        time_duration,
        id_difficulty,
        number_portion,
        id_category_recipe,
        ingredients,
        preparation
    } = req.body;

    try {

        const recipeupdate = await Recipe.update(
            {
                id_difficulty: id_difficulty,
                id_category_recipe: id_category_recipe,
                name_recipe: name_recipe,
                description: description,
                preparation: preparation,
                time_duration: time_duration,
                number_portion: number_portion
            },
            {
                where: {
                    id_recipe: id_recipe
                }
            }
        );

        const recipe = await Recipe.findByPk(id_recipe, {
            attributes: [],
            include: [
                {
                    model: Ingredient,
                    through: {
                        model: RecipeIngredient,
                        attributes: [
                            'id_recipe_ingredient',
                            'count_ingredient',
                            'unit_measurement'
                        ]
                    },
                    attributes: ['name_ingredient']
                }
            ]
        });

        if (!recipe) {
            return res.status(404).json({ error: "Receta no encontrada" });
        }

        await Promise.all(ingredients.map(async (ingredient) => {
            const existingIngredient = recipe.Ingredients.find(
                ing => ing.name_ingredient === ingredient.name_ingredient
            );

            if (existingIngredient) {
                const recipeIngredient = existingIngredient.RecipeIngredient;
                if (
                    recipeIngredient.count_ingredient !== ingredient.count_ingredient ||
                    recipeIngredient.unit_measurement !== ingredient.unit_measurement
                ) {
                    await RecipeIngredient.update(
                        {
                            count_ingredient: ingredient.count_ingredient,
                            unit_measurement: ingredient.unit_measurement
                        },
                        { where: { id_recipe_ingredient: recipeIngredient.id_recipe_ingredient } }
                    );
                }
            } else {
                // Cambiar el nombre de la variable para evitar conflictos
                let foundIngredient = await Ingredient.findOne({
                    where: { name_ingredient: ingredient.name_ingredient }
                });

                if (!foundIngredient) {
                    foundIngredient = await Ingredient.create({ name_ingredient: ingredient.name_ingredient });
                }

                await RecipeIngredient.create({
                    id_recipe: id_recipe,
                    id_ingredient: foundIngredient.id_ingredient,
                    count_ingredient: ingredient.count_ingredient,
                    unit_measurement: ingredient.unit_measurement
                });
            }
        }));

        res.status(200).json({
            "message": "Receta actualizada"
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


const deleteRecipe = async (req, res) => {
    const { id_recipe } = req.params;

    try {
        await Recipe.destroy({
            where: {
                id_recipe: id_recipe
            }
        });

        res.status(200).json({
            status: 200,
            ok: true,
            message: "Receta eliminada"
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createRecipe,
    getInformationRecipe,
    getInformationPersonAndRecipe,
    getRecipePublished,
    updateRecipe,
    deleteRecipe
};
