const sequelize = require('../../../../database');
const {DataTypes} = require('sequelize');

const Song = require('../../songs/models/Song.js');
const User = require('../../users/models/User.js');

const UserSong = sequelize.define('UserSong', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  }
});

Song.belongsToMany(User, {
  through: UserSong,
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE'
});

User.belongsToMany(Song, {
  through: UserSong,
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE'
});

//Super Many-to-Many
Song.hasMany(UserSong);
UserSong.belongsTo(Song);
User.hasMany(UserSong);
UserSong.belongsTo(User);

UserSong.sync({alter: false, force: false})
  .then(() => {
    console.log('UserSong table was (re)created');
  })
  .catch((err) => console.log(err));

module.exports = UserSong;