import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Components.css'
import { Link, useNavigate } from 'react-router-dom'
import NavBar from './NavBar';

const endpoint = 'https://demolaravel.ddns.net/api'

const Admin = ({ accessToken, setAccessToken, userID, setUserID, userName, setUserName, userRole, setUserRole } ) => {
    const [games, setGames] = useState([])
    // const [users, setUsers] = useState([])
    const navigate = useNavigate();
    const isAdmin = userRole === 'admin';

    useEffect(() => {
        if (!isAdmin) {
            navigate('/'); // Redirige a HomePage si no es administrador
        } else {
            getAllGames();
            console.log(' User ID: ', userID, ' Role: ', userRole)
            // getAllUsers();
        }
    }, [isAdmin, navigate]);

    const getAllGames = async () => {
      const response = await axios.get(`${endpoint}/allgames`);
        setGames(response.data)
    }
    // const getAllUsers = async () => {
    //   const response = await axios.get(`${endpoint}/allUsers`);
    //   setUsers(response.data)
    // }

    const deleteGame = async (id) => {
      const confirmed = window.confirm("¿Está seguro de que desea eliminar este juego?");
      if (confirmed) {
          await axios.delete(`${endpoint}/games/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        getAllGames() // Llama a getAllGames nuevamente después de eliminar el juego
      }
  }

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

    {!games.length ? (
      <div className='mgl-divBellowNav'>Cargando...</div>
    ) : (
      <>
      <div className='mgl-divBellowNav'>
        <div className='mgl-grid-container-three-Objects'>
          <Link to={`/store`} className='mgl-button'>Añadir juego</Link>
          <Link to={'/admin/users'} className='mgl-button'>Gestión de usuarios</Link>
          <Link to={'/admin/categories'} className='mgl-button'>Gestión de categorías</Link>
        </div>
      </div>
      
      <div className='mgl-grid-admin-container'>
        <div className='mgl-divBellowNav'>
          <div className='mgl-grid-game-container'>
            {games.map(game => (
              <article className="mgl-gameCard" key={game.id}>
                <header className="mgl-header">
                    <img className= "mgl-covers" src={game.image_url} alt="Imagen del juego"/>
                    <strong>{game.title}</strong>
                    <span>Fecha de salida: {game.releaseDate}</span>
                    <br/>
                </header>
                <aside className="mgl-gameCard-buttons">
                  <Link to={`/update/${game.id}`} className='mgl-button-yellow'>Modificar juego</Link>
                  <button onClick={() => deleteGame(game.id)} className='mgl-button-delete'>Delete</button>
                </aside>
              </article>
            ))}
          </div>
        </div>
      </div>
      </>
    )}
    </>
  )
}

export default Admin
