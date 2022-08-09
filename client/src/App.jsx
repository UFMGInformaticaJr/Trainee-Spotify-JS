import React, {useState} from 'react';

import logo from './logo.svg';
import './App.css';

import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3030/',
  withCredentials: true,
});

function App() {
  
  const[img, setImg] = useState(logo);
  const[genrer, setGenrer] = useState('');
  const[title, setTitle] = useState('');

  function getRandomMusic() {
    api.get('api/songs/songs/random')
      .then((res) => {
        setImg(res.data.cover_image);
        setGenrer(res.data.genre);
        setTitle(res.data.title);
      })
      .catch((err) => {
        console.log('Erro: ', err);
      });
  }


  return (
    <div className="App">
      <header className="App-header">
        <img src={img} className="App-logo" alt="logo" />
        <p>
          {genrer === ''?
            '' :
            `Gênero: ${genrer}`}
        </p>
        <p>
          {title === ''?
            '':
           `Título: ${title} `}

        </p>
        <button
          className="App-link"
          onClick={getRandomMusic}
          target="_blank"
          rel="noopener noreferrer"
        >
          Nova Música
        </button>
      </header>
    </div>
  );
}

export default App;
