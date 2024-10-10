module.exports = (sequelize, DataTypes) => {
    const RecipeIngredient = sequelize.define('RecipeIngredient', {
        id_recipe_ingredient: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        count_ingredient: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        unit_measurement: {
            type: DataTypes.STRING,
            allowNull: false
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
        }
    }, { timestamps: false });

    RecipeIngredient.associate = (models) => {
        RecipeIngredient.belongsTo(models.Recipe, {
            foreignKey: 'id_recipe',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
    
        RecipeIngredient.belongsTo(models.Ingredient, {
            foreignKey: 'id_ingredient',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
    };

    return RecipeIngredient;
};
