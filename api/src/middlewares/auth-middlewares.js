const passport = require('passport');
const jwt = require('jsonwebtoken');
const PermissionError = require('../../errors/PermissionError.js');

function loginMiddleware(req, res, next) {
  passport.authenticate(
    'login',
    (err, user) => {
      try {
        if (err) {
          if (err instanceof Error) {
            return next(err);
          } else {
            return res.status(400).json(err);
          }
        }

        req.login(
          user,
          {session: false},
          (error) => {
            if (error) next(error);

            const body = {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            };

            const token = jwt.sign({user: body}, process.env.SECRET_KEY,
              {expiresIn: process.env.JWT_EXPIRATION});

            // Enviando Cookie
            res.cookie('jwt', token, {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
            });
            res.status(204).end();
          },
        );
      } catch (error) {
        next(error);
      }
    },
  )(req, res, next);
}

function jwtMiddleware(req, res, next) {
  passport.authenticate('jwt', {session: false}, (error, user) => {
    try {
      if (error) return next(error);
      if (!user) {
        throw new PermissionError(
          'Você precisa estar logado para realizar essa ação!');
      }
      req.user = user;
      next();
    } catch (error) {
      next(error);
    }
  })(req, res, next);
}

function notLoggedIn(errorMessage) {
  return (req, res, next) => {
    try {
      const token = req.cookies['jwt'];
      if (token) {
        jwt.verify(token, process.env.SECRET_KEY,
          (err) => {
            if (!(err instanceof jwt.TokenExpiredError)) {
              throw new PermissionError(errorMessage ||
                'Você já está logado no sistema!');
            }
          },
        );
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}

const checkRole = (roles) => {
  return (req, res, next) => {
    try {
      ! roles.includes(req.user.role) ? res.json('Você não possui permissão para realizar essa ação') : next();
    } catch(error){
      next(error);
    }

  };
};

module.exports = {
  loginMiddleware,
  jwtMiddleware,
  checkRole,
  notLoggedIn,
};
