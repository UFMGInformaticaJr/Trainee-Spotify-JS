const router = require('express').Router();
const ArtistService = require('../services/ArtistService.js');
const {jwtMiddleware, checkRole } = require('../../../middlewares/auth-middlewares.js');
const {userRoles} = require('../../../../constants/userRoles.js');

/* rota usada para criar um novo artista, recebe um corpo e passa para o service
e la cria-se um novo Artista*/
router.post('/',
  jwtMiddleware,
  checkRole(userRoles.admin),
  async (req, res, next) => {
    try {
      await ArtistService.create(req.body);
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  },
);

/* rota usada para puxar todos os Artistas cadastrados no banco de dados */
router.get('/',
  jwtMiddleware,
  async (req, res, next) => {
    try{
      const artists = await ArtistService.getAll();
      res.status(200).json(artists);
    }catch (error ){
      next(error);
    }
  },
);

/* rota usada para puxar um artista em especifico do Banco de dados, através da sua ID
que é recebida através do parametro da requisição */
router.get('/artists/:id',
  jwtMiddleware,
  checkRole(userRoles.admin),
  async (req, res, next) => {
    try {
      const artist = await ArtistService.getById(req.params.id);

      res.status(200).json(artist);
    } catch (error) {
      next(error);
    }
  },
);

/* rota usada para atualizar um artista especifico cadastrado no banco de dados,
recebe-se a id pelo parametro e um corpo com o conteúdo a ser atualizado */
router.put('/artists/:id',
  jwtMiddleware,
  checkRole(userRoles.admin),
  async (req, res, next) => {
    try {

      await ArtistService.updateInfo(req.params.id, req.body);
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  },
);

/* rota usada para deletar um Artista em específico do Banco de dados, sua ID é passada
através do parametro da requisição */
router.delete('/artists/:id',
  jwtMiddleware,
  checkRole(userRoles.admin),
  async (req, res, next) => {
    try {
      await ArtistService.delete(req.params.id);
      res.sendStatus(200);
    } catch (err) {
      next(err);
    }
  });





