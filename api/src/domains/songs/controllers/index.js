const router = require('express').Router();
const SongService = require('../services/SongService');
const {jwtMiddleware, checkRole } = require('../../../middlewares/auth-middlewares');
const statusCodes = require('../../../../constants/statusCodes.js');
const userRoles = require('../../../../constants/userRoles.js');

router.post('/',
  jwtMiddleware,
  checkRole(userRoles.admin),
  async (req, res, next) => {
    try {
      await SongService.create(req.body);
      res.status(statusCodes.created).end();
    } catch (error) {
      next(error);
    }
  },
);

router.get('/',
  jwtMiddleware,
  async (req, res, next) => {
    try{
      const songs = await SongService.getAll();
      res.status(statusCodes.accepted).json(songs);
    }catch (error ){
      next(error);
    }
  },
);

router.get('/songs/:id',
  jwtMiddleware,
  async (req, res, next) => {
    try {
      const song = await SongService.getById(req.params.id);
      res.status(statusCodes.accepted).json(song);
    } catch (error) {
      next(error);
    }
  },
);

router.put('/songs/:id',
  jwtMiddleware,
  checkRole(userRoles.admin),
  async (req, res, next) => {
    try {
      await SongService.updateInfo(req.params.id, req.body);
      res.status(statusCodes.noContent).end();
    } catch (error) {
      next(error);
    }
  },
);

router.delete('/songs/:id',
  jwtMiddleware,
  checkRole(userRoles.admin),
  async (req, res, next) => {
    try {
      await SongService.delete(req.params.id);
      res.sendStatus(statusCodes.noContent);
    } catch (err) {
      next(err);
    }
  });