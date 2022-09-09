const sequelize = require('../../../../database');
const {DataTypes} = require('sequelize');
const Artist = require('../../artists/models/Artist');
const defaultImage = require('../constants/defaultImage');

const Song = sequelize.define('Songs', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cover_image: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: defaultImage,
  },
  artist_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  genre: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

Song.belongsTo(Artist, {
  foreignKey: 'artist_id',
});

Artist.hasMany(Song, {
  foreignKey: 'artist_id',
});

/*
Comando para criar/alterar as
colunas da tabela caso necessário
 */
Song.sync({alter: false, force: false})
  .then(() => {
    console.log('Song table was (re)created');
  })
  .catch((err) => console.log(err));

module.exports = Song;
