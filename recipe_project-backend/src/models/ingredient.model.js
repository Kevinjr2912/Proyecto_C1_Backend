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

    return Ingredient;
}