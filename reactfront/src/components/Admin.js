import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Components.css'
import { Link, useNavigate } from 'react-router-dom'
import NavBar from './NavBar';

const endpoint = 'https://demolaravel.ddns.net/api'

const Admin = ({ accessToken, setAccessToken, userID, setUserID, userName, setUserName } ) => {
    const [games, setGames] = useState([])
    const [users, setUsers] = useState([])
    const navigate = useNavigate();
    const isAdmin = userID === 8;

    useEffect(() => {
        if (!isAdmin) {
            navigate('/'); // Redirige a HomePage si no es administrador
        } else {
            getAllGames();
            getAllUsers();
        }
    }, [isAdmin, navigate]);

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

    const deleteGame = async (id) => {
        await axios.delete(`${endpoint}/games/${id}`)
        getAllGames() // Llama a getAllGames nuevamente después de eliminar el juego
    }

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
            <button onClick={() => deleteGame(game.id)} >Delete</button>
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
    </>
  )
}

export default Admin
