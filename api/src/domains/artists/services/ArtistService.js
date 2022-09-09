const Artist = require('../models/Artist.js');
const QueryError = require('../../../../errors/QueryError.js');

class ArtistService {
  async create(body){
    const artist = {
      name: body.name,
      nationality: body.nationality,
      image: body.image,
    };
    await Artist.create(artist);
  }

  async getAll(){
    const artists = await Artist.findAll();

    if(!artists){
      throw new QueryError('Não há nenhum artista cadastrado');
    }

    return artists;
  }

  async getById(id){
    const artist = await Artist.findByPk(id);

    if(!artist){
      throw new QueryError(`Não há um artista com o ID ${id}!`);
    }

    return artist;
  }

  async update(id, body){
    const artist = await this.getById(id);
    await artist.update(body);
  }

  async delete(id){
    const artist = await this.getById(id);
    await artist.destroy();
  }

}

module.exports = new ArtistService;