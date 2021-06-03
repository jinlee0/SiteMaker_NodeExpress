const Sequelize = require('sequelize');

module.exports = class Team extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      name: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Team',
      tableName: 'teams',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    db.Team.hasMany(db.Project);
    db.Team.belongsTo(db.Member, {foreignKey: 'teamLeader', targetKey: 'id'});
    db.Team.belongsToMany(db.Member, {through: 'TeamMember'});
  }
};
