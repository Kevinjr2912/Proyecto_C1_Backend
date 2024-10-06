module.exports = (sequelize, DataTypes) => {
    const Ingredient = sequelize.define('Ingredient', {
        id_ingredient: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name_ingredient: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, { timestamps: false });

    // Definir asociaciones
    Ingredient.associate = (models) => {
        Ingredient.belongsToMany(models.Recipe, {
            through: models.RecipeIngredient,
            foreignKey: 'id_ingredient',
            otherKey: 'id_recipe',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
    };    

    return Ingredient;
};
