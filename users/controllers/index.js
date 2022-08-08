/* eslint-disable max-len */
const router = require('express').Router();
const UserCrud = require('../services/UserCrudService');
const {loginMiddleware,
  jwtMiddleware,
  checkRole,
  notLoggedIn} = require('../../middlewares/auth-middlewares');

/**
 * Realiza o login através do midlleware do Passport
 */
router.post('/login', notLoggedIn(), loginMiddleware);

/**
 * Envia o JWT atual para a blacklist para que ele não seja mais válido.
 */
router.get('/logout',
  jwtMiddleware,
  async (req, res, next) => {
    try {
      const token = req.cookies['jwt'];
      await blacklist.addToken(token);

      req.logout();
      res.clearCookie('jwt');
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  },
);

/**
 * Ver dados de todos os usuários, pega as opções
 * de ordenação, página e número de consultas do body.
 */
router.get('/',
  jwtMiddleware,
  requestFilter('query', opcoesFiltro),
  async (req, res, next) => {
    try {
      const options = req.query;
      const usersAndCount = await GetUser.getAllUsersByPage(options);
      res.status(200).json(usersAndCount);
    } catch (error) {
      next(error);
    }
  },
);

/**
 * Criação de usuário, verifica todos os campos necessários
 * para a criação de um usuário e envia para o banco.
 */
router.post('/',
  jwtMiddleware,
  checkRole(funcaoUsuario.ADMIN),
  createUserValidator(),
  async (req, res, next) => {
    try {
      await UserCrud.createUser(req.body);
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  },
);

/**
 * Página de usuário, envia as informações do usuário atual para o front.
 */
router.get('/user',
  jwtMiddleware,
  async (req, res, next) => {
    try {
      if (req.user) {
        const user = await GetUser.getCurrentUser(req.user.id);
        res.status(200).json(user);
      }
    } catch (error) {
      next(error);
    }
  },
);

/**
 * Editar informções de usuário, recebe e verifica as informações no body
 * para atualizar no banco de dados.
 * Falta realizar a verificação de que os dados forma alterados.
 */
router.put('/user',
  jwtMiddleware,
  requestFilter('body', atributosUsuario),
  updateUserValidator(),
  async (req, res, next) => {
    try {
      await UserCrud.updateUserInfo(req.body, req.user);
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  },
);

/**
 * Recebe o id de um usuário qualquer nos parâmetros,
 * retorna o usuário com esse id.
 */
router.get('/user/:id',
  jwtMiddleware,
  checkRole(funcaoUsuario.ADMIN),
  async (req, res, next) => {
    try {
      const userId = req.params.id;
      const user = await GetUser.getUserById(userId);

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  },
);

/**
 * Editar informações de um usuário a partir de seu ID. Essa rota é única para
 * admins e não deve ser usada para alterar as informações do usuário logado.
 * Implementação muito parecida com a PUT /users/user
 */
router.put('/user/:id',
  jwtMiddleware,
  checkRole(funcaoUsuario.ADMIN),
  updateUserValidator(),
  async (req, res, next) => {
    try {
      const id = req.params.id;

      await UserCrud.updateUserInfo(id, req.body);
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  },
);

/**
 * Editar senha, similar ao editar as outras informações,
 * mas também realiza criptografia da senha.
 */
router.put('/password',
  jwtMiddleware,
  updatePasswordValidator(),
  async (req, res, next) => {
    try {
      await UserCrud.updateUserPassword(req.user, req.body);
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  },
);

/**
 * Editar senha, similar ao editar as outras informações,
 * mas também realiza criptografia da senha,
 * mas como o admin altera para uma padrão
 */
router.put('/passwordAdmin',
  jwtMiddleware,
  checkRole(funcaoUsuario.ADMIN),
  async (req, res, next) => {
    try {
      req.body.newPassword = geraSenhaAleatoria();
      await UserCrud.resetUserPassword(req.body);
      res.status(200).json(req.body);
    } catch (error) {
      next(error);
    }
  },
);

router.put('/deactivate',
  jwtMiddleware,
  checkRole(funcaoUsuario.ADMIN),
  async (req, res, next) => {
    try {
      const email = req.body.email;

      await UserCrud.deactivateUser(req.user, email);

      res.status(204).end();
    } catch (error) {
      next(error);
    }
  },
);

router.put('/activate',
  jwtMiddleware,
  checkRole(funcaoUsuario.ADMIN),
  async (req, res, next) => {
    try {
      const email = req.body.email;

      await UserCrud.activateUser(req.user, email);

      res.status(204).end();
    } catch (error) {
      next(error);
    }
  },
);

router.delete('/',
  jwtMiddleware,
  checkRole(funcaoUsuario.ADMIN),
  async (req, res, next) => {
    try {
      const userId = req.body.id;
      await UserCrud.Delete(userId, req.user);
      res.sendStatus(200);
    } catch (err) {
      next(err);
    }
  });

module.exports = router;
