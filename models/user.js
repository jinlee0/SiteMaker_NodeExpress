const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      name: {
        type: Sequelize.STRING(45),
        allowNull: true,
      },
      email: {
        type : Sequelize.STRING(45),
        allowNull: false,
        defaultValue: 'non-login',
        unique: true,
      },
      password: {
        type: Sequelize.STRING(100),
        allowNull: false,
        defaultValue: 'non-login',
      },
      phone: {
        type: Sequelize.STRING(45),
        allowNull: true,
      },
      job: {
        type: Sequelize.STRING(45),
        allowNull: true,
      },
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'User',
      tableName: 'users',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    db.User.hasMany(db.Project);
  }
};
