module.exports = (sequelize, DataTypes) => {
    const Recipe = sequelize.define('Recipe', {
        id_recipe: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_person: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'People',
                key: 'id_person'
            }
        },
        id_category_recipe: { 
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'CategoryRecipes',
                key: 'id_category_recipe' 
            }
        },
        id_difficulty: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'TypeDifficulties',
                key: 'id_difficulty'
            }
        },
        name_recipe: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        preparation: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        time_duration: {
            type: DataTypes.TIME,
            allowNull: false
        }
    }, { timestamps: false });

    // Definir asociaciones
    Recipe.associate = (models) => {
        Recipe.belongsTo(models.Person, {
            foreignKey: 'id_person',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });

        Recipe.belongsTo(models.CategoryRecipe, {
            foreignKey: 'id_category_recipe',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });

        Recipe.belongsTo(models.TypeDifficulty, {
            foreignKey: 'id_difficulty',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });

        Recipe.belongsToMany(models.Ingredient, {
            through: models.RecipeIngredient,
            foreignKey: 'id_recipe',  
            otherKey: 'id_ingredient',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });        
    }

    return Recipe;
};
