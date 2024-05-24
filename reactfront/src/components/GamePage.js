import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NavBar from './NavBar';
import UpdateOnList from './UpdateOnList';

const endpoint = 'https://demolaravel.ddns.net/api';

const GamePage = ({ accessToken, setAccessToken, userID, setUserID, setUserName } ) => {
  /*Obtenemos el id de App.js cuando se ejecuta
  "<Route path="/game/:id" element={ <GamePage/> }/>"*/
  const { id } = useParams();
  const [game, setGame] = useState(null);

  useEffect(() => {
    console.log('Efecto useEffect ejecutándose');
    console.log('Obteniendo datos del juego...');
    const getGame = async () => {
      const response = await axios.get(`${endpoint}/games/${id}`);
      setGame(response.data);
      console.log('Datos del juego recibidos:', response.data);
    };
    getGame();
  }, [id]);//Cada vez que el id cambien se ejecuta de nuevo el useEffect

  if (!game) {
    return <div>Cargando...</div>; // Mientras game sea null
  }

  const handleLogout = async () => {
    if (!accessToken) {
      alert('No se encontró el token de acceso.');
      return;
    }

    try {
      const response = await axios.get(`${endpoint}/logout`, {
          headers: {
              Authorization: `Bearer ${accessToken}`
          }
      });
        console.log('Logout response:', response.data);
        // Limpiar el token de acceso en el estado global o local
        setAccessToken(null);
        setUserID(null); 
        setUserName(null); 
        alert('¡Sesión cerrada con éxito!');
    } catch (error) {
        console.error('Error al cerrar sesión:', error);
        alert('Se ha producido un error al cerrar sesión. Por favor, intenta nuevamente más tarde.');
    }
  };

return (
  <>
  <div>
    <NavBar accessToken={accessToken} handleLogout={handleLogout} userID={userID}/>
  </div>
    <div className='mgl-divBellowNav'>
      {/* Es necesario usar game.game, por la estructura del JS */}
      <img src={game.game.image_url} alt="Imagen del juego"/>
      <h2>{game.game.title}</h2>
      <p>Fecha de salida: {game.game.releaseDate}</p>
      <p>Acerca de: {game.game.synopsis}</p>
      <br/>
      {/* Si tengo accessToken puedo añadirlo o quitarlo de mi lista */}
      {accessToken && (
        <UpdateOnList
          gameID={game.game.id} 
          userID={userID} 
          accessToken={accessToken} 
        />
      )}
    </div>
    </>
  );
}

export default GamePage;
