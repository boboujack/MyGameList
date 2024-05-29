import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import NavBar from './NavBar';
import UpdateOnList from './UpdateOnList';

const endpoint = 'https://demolaravel.ddns.net/api';

const GamePage = ({ accessToken, setAccessToken, userID, setUserID, setUserName, userRole, setUserRole } ) => {
  /*Obtenemos el id de App.js cuando se ejecuta
  "<Route path="/game/:id" element={ <GamePage/> }/>"*/
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const isAdmin = userRole === 'admin';

  useEffect(() => {
    const getGame = async () => {
      const response = await axios.get(`${endpoint}/games/${id}`);
      setGame(response.data);
      // console.log('Datos del juego recibidos:', response.data);
    };
    getGame();
  }, [id]);//Cada vez que el id cambien se ejecuta de nuevo el useEffect

return (
  <>
  <div>
    <NavBar 
          accessToken={accessToken} 
          setAccessToken={setAccessToken} 
          setUserID={setUserID} 
          setUserName={setUserName} 
          setUserRole={setUserRole} 
          userID={userID} 
          userRole={userRole} 
    />
    </div>
    {!game ? (
        <div className='mgl-divBellowNav'>Cargando...</div>
      ) : (
      <div className='mgl-divBellowNav'>
        {/* Es necesario usar game.game, por la estructura del JS */}
        <img src={game.game.image_url} alt="Imagen del juego"/>
        <h2>{game.game.title}</h2>
        <p>Fecha de salida: {game.game.releaseDate}</p>
        <p style={{ maxWidth: '900px' }}>Acerca de: {game.game.synopsis}</p>
        <br/>
        {/* Si tengo accessToken puedo añadirlo o quitarlo de mi lista */}
        {accessToken && (
          <UpdateOnList
            gameID={game.game.id} 
            userID={userID} 
            accessToken={accessToken}
          />
        )}
        <br/>
        <br/>
        {isAdmin && (
            <Link to={`/update/${game.game.id}`} className='mgl-button-yellow'>Modificar juego</Link>
        )}
      </div>
    )}
  </>
  );
}

export default GamePage;