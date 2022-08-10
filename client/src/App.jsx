import React, {useState} from 'react';

import logo from './logo.svg';
import './App.css';

import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3030/',
  withCredentials: true,
});

function App() {
  const spotifyLogo = 'https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Green.png';
  const[img, setImg] = useState(logo);
  // const[genre, setGenre] = useState('');
  const[artist, setArtist] = useState('');
  const[title, setTitle] = useState('');
  const[ouvinte, setOuvinte] = useState('');

  function getRandomMusic() {
    api.get('api/songs/songs/random')
      .then((res) => {
        setImg(res.data.cover_image);
        // setGenrer(res.data.genre);
        setArtist(res.data.artist);
        setTitle(res.data.title);
        setOuvinte(res.data.ouvinte);
      })
      .catch((err) => {
        console.log('Erro: ', err);
      });
  }


  return (
    <div className="App">
      <header className="App-header">
        <img src={spotifyLogo} className="spotify-logo" alt="logo" />
        <img src={img} className="App-logo" alt="capa" />
        {/* <p>
          {genre === ''?
            '' :
            `Gênero: ${genre}`}
        </p> */}
        <p>
          {title === ''?
            '':
           `Título: ${title} `}

        </p>
        <p>
          {artist === ''?
            '':
           `Artista: ${artist} `}

        </p>
        <p>
          {ouvinte === ''?
            '':
           `Ouvinte: ${ouvinte} `}

        </p>
        <button
          className="App-link"
          onClick={getRandomMusic}
          target="_blank"
          rel="noopener noreferrer"
        >
          🔀
        </button>
      </header>
    </div>
  );
}

export default App;
