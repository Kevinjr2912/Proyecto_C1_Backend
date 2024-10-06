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

    // DEFINIMOS LAS ASOCIACIONES DE SPECIALTIES
    Specialty.associate = ( models ) => {
        Specialty.hasMany( models.Person, {
            foreignKey: 'id_specialty',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
    }

    return Specialty;
}