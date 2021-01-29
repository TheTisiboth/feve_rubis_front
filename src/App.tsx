import React, { useEffect, useState } from 'react';
import './App.css';

import axios from 'axios';
import API_URL from './config/env';

function App() {

  return (
    <div className="App">
     <Albums />
    </div>
  );
}

type MusiqueType = {
  id: number;
  Titre: string;
  albums: AlbumType[];
  Fichier: File[];
  Image: File[];
}

type AlbumType = {
  id: number;
  Titre: string;
  musiques: MusiqueType[];
  Image: File[];
}

const Albums = () => {
  const [state, setState] = useState<{ albums: AlbumType[], error: any }>({ albums: [], error: null });

  const fetchAlbums = () => {
    axios.get(API_URL + 'albums')
      .then(response => {
          setState({...state, albums: response.data });
      })
      .catch(error => {
          setState({ ...state, error });
      })
  }

  useEffect(() => {
    fetchAlbums();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (state.error) {
    return <div>An error occured: {state.error.message}</div>;
  }
  return (
    <ul>
          {state.albums.map(album => (
            <Album key={album.id} album={album}/>
          ))}
        </ul>
  );
}

const Album = ({ album }: { album: AlbumType }) => {

  return (
    <>
    <li>{album.Titre}</li>
      <ul>{album.musiques.map((musique: MusiqueType) => (
      <Musique key={musique.id} musique={musique}/>
    ))}</ul>
    </>
  );

}

const Musique = ({ musique }: { musique: MusiqueType }) => {
  return (
    <li>{musique.Titre}</li>
  );
}
export default App;
