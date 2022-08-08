const Song = require('../models/Song.js');
const QueryError = require('../../../../errors/QueryError.js');

class SongService {
  async create(body) {
    const song = {
      title: body.title,
      cover_image: body.cover_image,
      artist: body.artist,
      genre: body.genre,
    };

    await Song.create(song);
  }

  async getAll() {
    const songs = await Song.findAll();

    if (!songs) {
      throw new QueryError('Não há nenhuma música cadastrada');
    }

    return songs;
  }

  async getById(id) {
    const song = await Song.findByPk(id);

    if (!song) {
      throw new QueryError(`Não há uma música com o ID ${song.id}!`);
    }

    return song;
  }

  async updateSongInfo(id, body) {
    const song = await Song.findByPk(id);
    if (!song) {
      throw new QueryError(`Não há uma música com o ID ${song.id}!`);
    }

    await song.update(body);
  }

  async delete(id) {
    const song = await Song.findByPk(id);
    if (!song) {
      throw new QueryError(`Não há uma música com o ID ${song.id}!`);
    }

    await song.destroy();
  }
}

module.exports = new SongService;
