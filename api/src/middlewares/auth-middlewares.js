const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../domains/users/models/User.js');
const PermissionError = require('../../errors/PermissionError.js');
const statusCodes = require('../../constants/statusCodes.js');

function generateJWT(user, res) {
  const body = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const token = jwt.sign({ user: body }, process.env.SECRET_KEY,
    { expiresIn: process.env.JWT_EXPIRATION });

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
  });
}

function cookieExtractor(req) {
  let token = null;

  if (req && req.cookies) {
    token = req.cookies['jwt'];
  }

  return token;
}

async function loginMiddleware(req, res, next) {
  try {
    const user = await User.findOne({where: {email: req.body.email}});
    if (!user) {
      throw new PermissionError('E-mail e/ou senha incorretos!');
    } else {
      const matchingPassword = await bcrypt.compare(req.body.password, user.password);
      if (!matchingPassword) {
        throw new PermissionError('E-mail e/ou senha incorretos!');
      }
    }

    generateJWT(user, res);

    res.status(statusCodes.noContent).end();
  } catch (error) {
    next(error);
  }
}

function notLoggedIn(req, res, next) {
  try {
    const token = cookieExtractor(req);

    if (token) {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      if (decoded) {
        throw new PermissionError('Você já está logado no sistema!');
      }
    }
    next();
  } catch (error) {
    next(error);
  }
}

function verifyJWT(req, res, next) {
  try {
    const token = cookieExtractor(req);
    if (token) {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.user = decoded.user;
    }

    if (!req.user) {
      throw new PermissionError(
        'Você precisa estar logado para realizar essa ação!');
    }
    next();
  } catch (error) {
    next(error);
  }
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
  notLoggedIn,
  verifyJWT,
  checkRole,
};
