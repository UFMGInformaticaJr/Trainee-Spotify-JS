const sequelize = require('../../../../database');
const {DataTypes} = require('sequelize');

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
  },
  artist: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  genre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
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
