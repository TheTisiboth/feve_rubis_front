import React, { useEffect, useState } from 'react';
import './App.css';

import axios from 'axios';

function App() {

  return (
    <div className="App">
     <Albums />
    </div>
  );
}

const Albums = () => {
  const [state,setState] = useState<{albums:any[],error:any}>({albums:[],error:null});

  useEffect( () => {
    async function fetchData(){
      try {
        const response = await axios.get('http://localhost:1337/albums');
        console.log(response);
        setState({...state, albums: response.data });
      } catch (error) {
        setState({ ...state, error });
      }
    }
  fetchData();
  },[]);

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

const Album = ({album}:{album:any}) => {

  return (
    <>
    <li>{album.Titre}</li>
    <ul>{album.musiques.map((musique:any) => (
      <Musique key={musique.id} musique={musique}/>
    ))}</ul>
    </>
  );

}

const Musique = ({musique}:{musique:any}) => {
  return (
    <li>{musique.Titre}</li>
  );
}
export default App;