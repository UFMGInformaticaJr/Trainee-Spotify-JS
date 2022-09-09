const router = require('express').Router();
const SongService = require('../services/SongService');
const {jwtMiddleware, checkRole } = require('../../../middlewares/auth-middlewares');
const statusCodes = require('../../../../constants/statusCodes.js');
const userRoles = require('../../../../constants/userRoles.js');

router.post('/',
  jwtMiddleware,
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
      res.status(statusCodes.success).json(songs);
    }catch (error){
      next(error);
    }
  },
);

router.get('/:id',
  jwtMiddleware,
  async (req, res, next) => {
    try {
      const song = await SongService.getById(req.params.id);
      res.status(statusCodes.success).json(song);
    } catch (error) {
      next(error);
    }
  },
);

router.get('/song/random',
  jwtMiddleware,
  async (req, res, next) => {
    try{
      const song = await SongService.getRandomSong();
      res.status(statusCodes.success).json(song);
    }catch (error){
      next(error);
    }
  },
);

router.get('/artist/:id',
  jwtMiddleware,
  async (req, res, next) => {
    try{
      const song = await SongService.getSongsByArtist(req.params.id);
      res.status(statusCodes.success).json(song);
    }catch (error){
      next(error);
    }
  },
);

router.put('/:id',
  jwtMiddleware,
  checkRole([userRoles.admin]),
  async (req, res, next) => {
    try {
      await SongService.update(req.params.id, req.body);
      res.status(statusCodes.noContent).end();
    } catch (error) {
      next(error);
    }
  },
);

router.delete('/:id',
  jwtMiddleware,
  checkRole([userRoles.admin]),
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
