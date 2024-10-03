module.exports = (sequelize, DataTypes) => {
    const Nationality = sequelize.define('Nationality', {
        id_nationality: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name_nationality: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, { timestamps: false });

    return Nationality;
}