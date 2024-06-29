const router = require('express').Router();
const UserSongService = require('../services/UserSongService.js');
const {verifyJWT} = require('../../../middlewares/auth-middlewares');
const statusCodes = require('../../../../constants/statusCodes.js');

router.post('/:id',
  verifyJWT,
  async (req, res, next) => {
    try {
      await UserSongService.create(req.user.id, req.params.id);
      res.status(statusCodes.created).end();
    } catch (error) {
      next(error);
    }
  },
);

router.delete('/:id',
  verifyJWT,
  async (req, res, next) => {
	try {
      await UserSongService.delete(req.user.id, req.params.id);
      res.status(statusCodes.noContent).end();
	  } catch (error) {
      next(error);
	}
  },
);

router.get('/users/:id',
  verifyJWT,
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
  verifyJWT,
  async (req, res, next) => {
    try {
      const users = await UserSongService.getAllUsersBySong(req.params.id);
      res.status(statusCodes.success).json(users);
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
