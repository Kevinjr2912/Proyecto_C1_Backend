module.exports = (sequelize, DataTypes) => {
    const TypeDifficulty = sequelize.define('TypeDifficulty', {
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

    TypeDifficulty.associate = ( models ) => {
        TypeDifficulty.hasMany( models.Recipe, {
            foreignKey: 'id_difficulty',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
    }

    return TypeDifficulty;
}