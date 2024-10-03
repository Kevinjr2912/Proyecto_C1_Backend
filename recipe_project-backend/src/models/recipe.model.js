module.exports = (sequelize, DataTypes) => {
    const Recipe = sequelize.define('Recipe', {
        id_recipe: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_person: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'People',
                key: 'id_person'
            }
        },
        id_type_recipe: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'CategoryRecipes',
                key: 'id_category_recipe'
            }
        },
        id_difficulty: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'TypeDifficulties',
                key: 'id_difficulty'
            }
        },
        name_recipe: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        preparation: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        time_duration: {
            type: DataTypes.TIME,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
        },
        publication_date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        }

    }, { timestamps: false });

    return Recipe;
}