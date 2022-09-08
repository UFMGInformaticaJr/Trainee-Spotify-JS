const UserSong = require('../models/UserSong.js');
const UserService = require('../../users/services/UserService.js');
const SongService = require('../../songs/services/SongService.js');
const Song = require('../../songs/models/Song.js');
const User = require('../../users/models/User.js');

class UserSongService  {
  async create(userId, songId){
    const user = await UserService.getById(userId);
    const song = await SongService.getById(songId);
    await song.addUser(user.id);
  }

  async getAllSongsByUser(userId){
    const allSongs = await Song.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      include: {
        model: User,
        where: {
          id: userId,
        },

        through: {
          attributes: [],
        },

      }
    });

    return allSongs;
  }

  async getAllUsersBySong(songId){
    const allUsers = await User.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      include: {
        model: Song,

        where: {
          id: songId,
        },
        through: {
          attributes: [],
        },

      },
    });

    return allUsers;
  }

}

module.exports = new UserSongService;