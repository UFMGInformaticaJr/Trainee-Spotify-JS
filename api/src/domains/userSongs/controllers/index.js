const router = require('express').Router();
const UserSongService = require('../services/UserSongService.js');
const {jwtMiddleware} = require('../../../middlewares/auth-middlewares');
const statusCodes = require('../../../../constants/statusCodes.js');

router.post('/:id',
  jwtMiddleware,
  async (req, res, next) => {
    try {
      await UserSongService.create(req.user.id, req.params.id);
      res.status(statusCodes.created).end();
    } catch (error) {
      next(error);
    }
  },
);

router.get('/users/:id',
  jwtMiddleware,
  async (req, res, next) => {
    try{
      const songs = await UserSongService.getAllSongsByUser(req.params.id);
      res.status(statusCodes.success).json(songs);
    }catch (error){
      next(error);
    }
  },
);

router.get('/songs/:id',
  jwtMiddleware,
  async (req, res, next) => {
    try {
      const users = await UserSongService.getAllUsersBySong(req.params.id);
      res.status(statusCodes.success).json(users);
    } catch (error) {
      next(error);
    }
  },
);

router.delete('/songs/:id',
  jwtMiddleware,
  async (req, res, next) => {
    try {
      await SongService.delete(req.params.id);
      res.status(statusCodes.noContent).end();
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
