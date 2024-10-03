module.exports = (sequelize, DataTypes) => {
    const Difficulty = sequelize.define('TypeDifficulty', {
        id_difficulty: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name_type_difficulty: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, { timestamps: false });

    return Difficulty;
}