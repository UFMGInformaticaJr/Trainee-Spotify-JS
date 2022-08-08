const passport = require('passport');
const {JsonWebTokenError} = require('jsonwebtoken');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const bcrypt = require('bcrypt');
const User = require('../users/models/User');
const NotAuthorizedError = require('../errors/NotAuthorizedError');

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      session: false,
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const user = await User.findOne({
          where: {email: email},
          paranoid: true,
        });

        if (!user) {
          throw new NotAuthorizedError('E-mail e/ou senha incorretos!');
        }

        const matchingPassword = await bcrypt.compare(password, user.password);
        if (!matchingPassword) {
          throw new NotAuthorizedError('E-mail e/ou senha incorretos!');
        }

        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    },
  ),
);

const cookieExtractor = (req) => {
  let token = null;

  if (req && req.cookies) {
    token = req.cookies['jwt'];
  }

  return token;
};

passport.use(
  new JwtStrategy(
    {
      secretOrKey: process.env.SECRET_KEY,
      jwtFromRequest: cookieExtractor,
      passReqToCallback: true,
    },
    async (req, jwtPayload, done) => {
      try {
        return done(null, jwtPayload.user);
      } catch (error) {
        return done(error, false);
      }
    },
  ),
);
