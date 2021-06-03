const Sequelize = require('sequelize');

module.exports = class Project extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      name: {
        type: Sequelize.STRING(45),
        allowNull: true,
      },
      deadline: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      complete: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Project',
      tableName: 'projects',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    db.Project.belongsTo(db.User);
    db.Project.belongsTo(db.Team);
  }
};
