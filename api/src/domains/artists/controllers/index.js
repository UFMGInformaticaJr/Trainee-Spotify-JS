const router = require('express').Router();
const ArtistService = require('../services/ArtistService.js');
const {jwtMiddleware, checkRole } = require('../../../middlewares/auth-middlewares.js');
const userRoles = require('../../../../constants/userRoles.js');
const statusCodes = require('../../../../constants/statusCodes.js');

router.post('/',
  jwtMiddleware,
  async (req, res, next) => {
    try {
      await ArtistService.create(req.body);
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
      const artists = await ArtistService.getAll();
      res.status(statusCodes.success).json(artists);
    }catch (error ){
      next(error);
    }
  },
);

router.get('/:id',
  jwtMiddleware,
  checkRole([userRoles.admin]),
  async (req, res, next) => {
    try {
      const artist = await ArtistService.getById(req.params.id);

      res.status(statusCodes.success).json(artist);
    } catch (error) {
      next(error);
    }
  },
);

router.put('/:id',
  jwtMiddleware,
  checkRole([userRoles.admin]),
  async (req, res, next) => {
    try {
      await ArtistService.update(req.params.id, req.body);

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
      await ArtistService.delete(req.params.id);

      res.status(statusCodes.success).end();
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;