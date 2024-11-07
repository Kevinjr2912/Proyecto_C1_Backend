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
        middle_surname_person: {
            type: DataTypes.STRING,
            allowNull: false
        },
        date_birth: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        id_nationality: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Nationalities',
                key: 'id_nationality' 
            }
        },
        id_specialty: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Specialties',
                key: 'id_specialty'
            }
        }
    },{ timestamps: false });

    // DEFINIMOS LAS ASOCIACIONES DE PEOPLE
    Person.associate = ( models ) => {
        Person.belongsTo( models.Nationality, {
            foreignKey: 'id_nationality',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });

        Person.belongsTo( models.Specialty, {
            foreignKey: 'id_specialty',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });

        Person.hasMany( models.Recipe, {
            foreignKey: 'id_person',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });

        Person.hasMany(models.Comment, {
            foreignKey: 'id_person',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
    }

    return Person;
}