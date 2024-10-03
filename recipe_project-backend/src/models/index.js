const Sequelize = require('sequelize');
const config = require('../config/config.json');
const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    host: config.development.host,
    dialect: config.development.dialect,
  }
);

const db = {};
db.ORM = Sequelize;
db.connection = sequelize;

// Importar modelos
db.Person = require('./person.model')(sequelize, Sequelize);
db.Recipe = require('./recipe.model')(sequelize, Sequelize);
db.Ingredient = require('./ingredient.model')(sequelize, Sequelize);
db.RecipeIngredient = require('./recipe_ingredient.model')(sequelize, Sequelize);
db.Difficulty = require('./difficulty.model')(sequelize, Sequelize);
db.Nationality = require('./nationality.model')(sequelize, Sequelize);
db.Specialty = require('./specialty.model')(sequelize, Sequelize);
db.CategoryRecipe = require('./category_recipe.model')(sequelize, Sequelize);

module.exports = db;
