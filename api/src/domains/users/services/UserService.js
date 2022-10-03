const bcrypt = require('bcrypt');
const User = require('../models/User.js');
const userRoles = require('../constants/userRoles.js');
const NotAuthorizedError = require('../../../../errors/NotAuthorizedError.js');
const PermissionError = require('../../../../errors/PermissionError.js');
const QueryError = require('../../../../errors/QueryError.js');

class UserService {
  async encryptPassword(password) {
    const saltRounds = 10;
    const encryptedPassword = await bcrypt.hash(password, saltRounds);
    return encryptedPassword;
  }

  async create(body) {
    if (body.role == userRoles.admin) {
      throw new PermissionError('Não é possível criar um usuário com cargo de administrador!');
    }

    const user = await User.findOne({where: {email: body.email}});
    if (user) {
      throw new QueryError('E-mail já cadastrado!');
    } else {
      const user = {
        name: body.name,
        email: body.email,
        password: body.password,
        role: body.role,
      };

      user.password = await this.encryptPassword(body.password);

      await User.create(user);
    }
  }

  async getAll() {
    const users = await User.findAll({

      attributes: ['id', 'name', 'email', 'role'],

    });

    if (!users) {
      throw new QueryError('Não há nenhum usuário cadastrado');
    } else {
      return users;
    }
  }

  async getById(id) {
    const user = await User.findByPk(id, {attributes:
      {
        exclude: ['password', 'createdAt', 'updatedAt'],
      }});

    if (user) {
      return user;
    }
    throw new QueryError(`Não há um usuário com o ID ${id}!`);
  }

  async update(id, body, loggedUser){
    const user = await this.getById(id);

    if (loggedUser.role != userRoles.admin && loggedUser.id != id) {
      throw new NotAuthorizedError('Você não tem permissão para editar outro usuário!');
    }

    if (body.role && loggedUser.role != userRoles.admin) {
      throw new NotAuthorizedError('Você não tem permissão para editar seu cargo');
    }

    if (body.password) {
      body.password = await this.encryptPassword(body.password);
    }

    await user.update(body);
  }

  async delete(id, idReqUser) {
    if (idReqUser == id) {
      throw new PermissionError('Não é possível deletar o próprio usuário!');
    } else {
      const user = await this.getById(id);
      await user.destroy();
    }
  }
}

module.exports = new UserService;
