import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Components.css'
import { Link } from 'react-router-dom'
import NavBar from './NavBar';
import UpdateOnList from './UpdateOnList';

const endpoint = 'https://demolaravel.ddns.net/api'

const HomePage = ({ accessToken, setAccessToken, userID, setUserID, setUserName, userRole, setUserRole } ) => {
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


  //Filtra la lista de todos los usuarios, menos del que ha hecho login y no sea Admin (ID= 8)
  const otherUsers = users.filter(user => user.id !== userID && user.role !== "admin");

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
              <Link to={`/game/${game.id}`} className='mgl-button-green'>Más información</Link>
              {accessToken && (
                  <UpdateOnList
                    gameID={game.id} 
                    userID={userID} 
                    accessToken={accessToken} 
                    refreshGames={getAllGames}
                  />
              )}
            </aside>
          </article>
        ))}
      </div>
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
      <p>Role: {userRole}</p>
    </div> */}
    </>
  )
}

export default HomePage
