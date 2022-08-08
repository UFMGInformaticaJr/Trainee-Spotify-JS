const sequelize = require('../../database');
const {DataTypes} = require('sequelize');
const funcaoUsuario = require('../../constantes/user/funcaoUsuario');

const User = sequelize.define('Users', {
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
  cpf: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM,
    values: [funcaoUsuario.ADMIN, funcaoUsuario.COLAB_EDITOR, funcaoUsuario.COLAB_READ],
    allowNull: false,
  },
  resetPassword: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

/*
Comando para criar/alterar as
colunas da tabela caso necessário
 */
User.sync({alter: false, force: false})
  .then(() => {
    console.log('User table was (re)created');
  })
  .catch((err) => console.log(err));

module.exports = User;
