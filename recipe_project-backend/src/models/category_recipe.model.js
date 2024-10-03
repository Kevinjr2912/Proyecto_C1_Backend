module.exports = (sequelize, DataTypes) => {
    const CategoryRecipe = sequelize.define('CategoryRecipe', {
        id_category_recipe: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name_type_recipe: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, { timestamps: false });

    return CategoryRecipe;
}