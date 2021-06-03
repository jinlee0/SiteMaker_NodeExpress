const Sequelize = require('sequelize');
const User = require('./user');
const Member = require('./member');
const Team = require('./team');
const Project = require('./project');

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;

db.User = User;
db.Member = Member;
db.Team = Team;
db.Project = Project;

User.init(sequelize);
Member.init(sequelize);
Team.init(sequelize);
Project.init(sequelize);

User.associate(db);
Member.associate(db);
Team.associate(db);
Project.associate(db);

module.exports = db;
