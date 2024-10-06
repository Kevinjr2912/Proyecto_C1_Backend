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

    Nationality.associate = ( models ) => {
        Nationality.hasMany( models.Person , {
            foreignKey: 'id_nationality',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
    };

    return Nationality;
}