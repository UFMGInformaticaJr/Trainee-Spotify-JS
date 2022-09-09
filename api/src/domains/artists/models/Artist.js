const sequelize = require('../../../../database');
const {DataTypes} = require('sequelize');
const defaultImage = require('../constants/defaultImage');

const Artist = sequelize.define('Artist', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nationality: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: defaultImage,
  }
});

Artist.sync({alter: false, force: false})
  .then(() => {
    console.log('Artist table was (re)created');
  })
  .catch((err) => console.log(err));

module.exports = Artist;