module.exports = (sequelize, DataTypes) => {
    const Person = sequelize.define('Person', {
        id_person: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        first_name_person: {
            type: DataTypes.STRING,
            allowNull: false
        },
        middle_name_person: {
            type: DataTypes.STRING,
            allowNull: false
        },
        first_surname_person: {
            type: DataTypes.STRING,
            allowNull: false
        },
        date_birth: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        id_specialty: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Specialties',
                key: 'id_specialty'
            }
        },
        id_nacionality: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Nationalities',
                key: 'id_nationality'
            }
        }
    },{ timestamps: false });

    return Person;
}