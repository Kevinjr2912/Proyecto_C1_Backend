module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        id_comment: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_recipe: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Recipes',
                key: 'id_recipe'
            }
        },
        id_person: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'People',
                key: 'id_person'
            }
        },
        response: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, { timestamps: false });

    Comment.associate = (models) => {
        Comment.belongsTo(models.Person, {
            foreignKey: 'id_person',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });

        Comment.belongsTo(models.Recipe, {
            foreignKey: 'id_recipe',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
    }

    return Comment;
}