const Sequelize = require('sequelize');

module.exports = class Project extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      projectName:{
        type: Sequelize.STRING(45),
        allowNull: true,
        defaultValue: '_noname',
      },
      requestName:{
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      requestPhone:{
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      requestEmail:{
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      requestJob: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      type: {
        type: Sequelize.STRING(45),
        allowNull: true,
      },
      deadline: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      estimate: {
        type: Sequelize.STRING(45),
        allowNull: true,
      },
      urlSamples:{
        type: Sequelize.TEXT,
        allowNull: true,
      },
      etcRequirements:{
        type: Sequelize.TEXT,
        allownull: true,
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
