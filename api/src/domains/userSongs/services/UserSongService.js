const UserSong = require('../models/UserSong.js');
const UserService = require('../../users/services/UserService.js');
const SongService = require('../../songs/services/SongService.js');
const Song = require('../../songs/models/Song.js');
const User = require('../../users/models/User.js');
const QueryError = require('../../../../errors/QueryError.js');

class UserSongService  {
  async create(userId, songId){
    const user = await UserService.getById(userId);
    const song = await SongService.getById(songId);
    await song.addUser(user.id);
  }

  async delete(userId, songId){
    const user = await UserService.getById(userId);
    const song = await SongService.getById(songId);

    const userSong = await UserSong.findOne({
      where: {
        UserId: user.id,
        SongId: song.id
      }
	});
  
	if (!userSong) {
      throw new QueryError('O usuário não ouviu essa música!');
	}

	await userSong.destroy();
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