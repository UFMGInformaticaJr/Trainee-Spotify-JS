const bcrypt = require('bcrypt');
const User = require('../models/User');
const PermissionError = require('../../errors/PermissionError');
const InvalidRouteError = require('../../errors/InvalidRouteError');
const QueryError = require('../../errors/QueryError');

class UserCrud {
  async createUser(body) {
    const saltRounds = 10;
    const user = {
      name: body.name,
      cpf: body.cpf,
      telefone: body.telefone,
      email: body.email,
      password: body.password,
      role: body.role,
    };
    user.password = await bcrypt.hash(user.password, saltRounds);

    await User.create(user);
  }

  async updateUserInfo(id, body) {
    const user = await User.findByPk(id);
    if (user !== null) {
      await user.update(body);
    } else {
      throw new QueryError(`Não há um usuário com o ID ${user.id}!`);
    }
  }

  async updateUserPassword(reqUser, body) {
    if (reqUser.resetPassword) {
      const user = await User.findByPk(reqUser.id);

      if (body.novaSenha === body.confirmacaoNovaSenha) {
        const saltRounds = 10;

        const hashedNewPassword = await bcrypt.hash(body.novaSenha, saltRounds);

        await user.update({resetPassword: false, password: hashedNewPassword});
      } else throw new Error('Senhas não coincidem.');
    } else throw new InvalidRouteError('Voce deve resetar sua senha antes');
  }

  async resetUserPassword(body) {
    const user = await User.findByPk(body.targetId);

    const saltRounds = 10;
    const hashedNewPassword = await bcrypt.hash(body.newPassword, saltRounds);

    await user.update({resetPassword: true, password: hashedNewPassword});
  }

  async deactivateUser(reqUser, email) {
    if (email === reqUser.email) {
      throw new PermissionError('Você não pode desativar a si mesmo!');
    }
    const user = await User.findOne({where: {email}, paranoid: false});

    if (user.deletedAt) {
      throw new PermissionError('Este usuário já está desativado!');
    }

    await user.destroy();
  }

  async activateUser(reqUser, email) {
    if (email === reqUser.email) {
      throw new PermissionError('Você não pode ativar a si mesmo!');
    }
    const user = await User.findOne({where: {email}, paranoid: false});

    if (!user.deletedAt) {
      throw new PermissionError('Este usuário já está ativo!');
    }

    await user.restore();
  }

  async Delete(id, user) {
    // TODO: delete things that are involved with user
    if (id != user.id) {
      // Delete User
      await User.destroy({
        where: {
          'id': id,
        },
      });
    } else throw new PermissionError('Você não pode se deletar!');
  }
}

module.exports = new UserCrud;
