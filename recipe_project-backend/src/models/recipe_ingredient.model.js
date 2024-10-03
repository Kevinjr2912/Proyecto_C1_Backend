module.exports = (sequelize, DataTypes) => {
    const RecipeIngredient = sequelize.define('RecipeIngredient', {
        id_recipe_ingredient: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_recipe: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Recipes',
                key: 'id_recipe'
            }
        },
        id_ingredient: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Ingredients',
                key: 'id_ingredient'
            }
        },
        name_unit_measure: {
            type: DataTypes.STRING,
            allowNull: false
        },
        portion: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, { timestamps: false });

    return RecipeIngredient;
}