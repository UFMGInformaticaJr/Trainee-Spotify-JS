/* eslint-disable max-len */
const router = require('express').Router();
const UserService = require('../services/UserService');
const {loginMiddleware,
  jwtMiddleware,
  checkRole,
  notLoggedIn} = require('../../../middlewares/auth-middlewares.js');
const userRoles = require('../../../../constants/userRoles.js');
const statusCodes = require('../../../../constants/statusCodes.js');

router.post('/login', notLoggedIn(), loginMiddleware);

router.get('/logout',
  jwtMiddleware,
  async (req, res, next) => {
    try {

      req.logout();
      res.clearCookie('jwt');
      res.status(statusCodes.noContent).end();
    } catch (error) {
      next(error);
    }
  },
);

router.post('/',
  jwtMiddleware,
  checkRole([userRoles.admin]),
  async (req, res, next) => {
    try {
      await UserService.create(req.body);
      res.status(statusCodes.noContent).end();
    } catch (error) {
      next(error);
    }
  },
);



router.get('/',
  jwtMiddleware,
  async (req, res, next) => {
    try {
      const users = await UserService.getAll();
      res.status(statusCodes.success).json(users);
    } catch(error){
      next(error);
    }
  },
);


router.get('/user',
  jwtMiddleware,
  async (req, res, next) => {
    try {
      if (req.user) {
        const user = await UserService.getById(req.user.id);
        res.status(statusCodes.success).json(user);
      }
    } catch (error) {
      next(error);
    }
  },
);


router.get('/user/:id',
  jwtMiddleware,
  checkRole([userRoles.admin]),
  async (req, res, next) => {
    try {
      const user = await UserService.getById(req.params.id);

      res.status(statusCodes.success).json(user);
    } catch (error) {
      next(error);
    }
  },
);


router.put('/user/:id',
  jwtMiddleware,
  async (req, res, next) => {
    try {
      await UserService.update(req.params.id, req.body, req.user);
      res.status(statusCodes.noContent).end();
    } catch (error) {
      next(error);
    }
  },
);

router.delete('/',
  jwtMiddleware,
  checkRole([userRoles.admin]),
  async (req, res, next) => {
    try {
      const userId = req.body.id;
      await UserService.delete(userId, req.user);
      res.sendStatus(statusCodes.noContent);
    } catch (err) {
      next(err);
    }
  });

module.exports = router;
