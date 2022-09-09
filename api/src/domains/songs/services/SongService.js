const Song = require('../models/Song.js');
const QueryError = require('../../../../errors/QueryError.js');

class SongService {
  async create(body) {
    const song = {
      title: body.title,
      cover_image: body.cover_image,
      artist_id: body.artist_id,
      genre: body.genre
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
      throw new QueryError(`Não há uma música com o ID ${id}!`);
    }

    return song;
  }

  async getRandomSong() {
    const songs = await this.getAll();
    const randomIndex = Math.floor(Math.random() * songs.length);
    const song = songs[randomIndex];

    return song;
  }

  async getSongsByArtist(artistId) {
    const songs = await Song.findAll({
      where: {
        artist_id: artistId
      }
    });

    if (!songs) {
      throw new QueryError(`Não há nenhuma música do artista com o ID ${artistId}!`);
    }

    return songs;
  }

  async update(id, body) {
    const song = await this.getById(id);
    await song.update(body);
  }

  async delete(id) {
    const song = await this.getById(id);
    await song.destroy();
  }
}

module.exports = new SongService;
