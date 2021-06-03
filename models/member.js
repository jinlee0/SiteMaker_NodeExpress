const Sequelize = require('sequelize');

module.exports = class Member extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      name: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      position: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING(45),
        allowNull: true,
      },
      message: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Member',
      tableName: 'members',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    db.Member.belongsToMany(db.Team, {through: 'TeamMember'});
    db.Member.hasMany(db.Team, {foreignKey: 'teamLeader', sourceKey: 'id'});
  }
};
