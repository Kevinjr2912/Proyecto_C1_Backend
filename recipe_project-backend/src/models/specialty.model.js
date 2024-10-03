module.exports = (sequelize, DataTypes) => {
    const Specialty = sequelize.define('Specialty', {
        id_specialty: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name_type_specialty: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, { timestamps: false });

    return Specialty;
}