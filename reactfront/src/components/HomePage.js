import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Components.css'
import { Link } from 'react-router-dom'
import NavBar from './NavBar';
import UpdateOnList from './UpdateOnList';

const endpoint = 'https://demolaravel.ddns.net/api'

const HomePage = ({ accessToken, setAccessToken, userID, setUserID, userName, setUserName } ) => {
    const [games, setGames] = useState([])
    const [users, setUsers] = useState([])

    useEffect(() => {
        getAllGames();
        getAllUsers();
    }, [])

    const getAllGames = async () => {
      const response = await axios.get(`${endpoint}/allgames`);
        setGames(response.data)
    }
    const getAllUsers = async () => {
      const response = await axios.get(`${endpoint}/allUsers`);
      setUsers(response.data)
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

  //Filtra la lista de todos los usuarios, menos del que ha hecho login
  const otherUsers = users.filter(user => user.id !== userID);

  return (
    <>
    <div>
      <NavBar accessToken={accessToken} handleLogout={handleLogout} userID={userID}/>
    </div>

    <div className='mgl-divBellowNav'>
      {games.map(game => (
        <article className="mgl-gameCard" key={game.id}>
          <header className="mgl-header">
            <div className="mgl-gameCard-info">
              <img className= "mgl-covers" src={game.image_url} alt="Imagen del juego"/>
              <strong>{game.title}</strong>
              <span>Fecha de salida: {game.releaseDate}</span>
              <br />
            </div>
          </header>
          <aside className="mgl-div">
            <Link to={`/game/${game.id}`} className='mgl-link'>Más información</Link>
            {accessToken && (
                <UpdateOnList
                  gameID={game.id} 
                  userID={userID} 
                  accessToken={accessToken} 
                />
            )}
          </aside>
        </article>
      ))}
    </div>

    <div className='mgl-divBellowNav'>
      <div>
        <h3 style={{ color: '#2a5285' }}>Otros usuarios:</h3>
        {otherUsers.map(user => (
          <article key={user.id}>
            <Link to={`/id/${user.id}`} className='mgl-link-profile'>{user.name}</Link>
          </article>
        ))}
      </div>
    </div>
    
    {/* <div className='mgl-divBellowNav'>
      <p>Token de acceso: {accessToken}</p>
      <p>ID: {userID}</p>
      <p>Bienvenido: {userName}</p>
    </div> */}
    </>
  )
}

export default HomePage
