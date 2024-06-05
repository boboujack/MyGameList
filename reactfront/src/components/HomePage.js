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
    const [searchGame, setSearchGame] = useState('');


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

    /*Manejo de cambios en la barra de búsqueda */
    const handleSearchGameChange = (event) => {
      setSearchGame(event.target.value);
    };

    const filteredGames = games.filter((game) =>
      game.title.toLowerCase().includes(searchGame.toLowerCase())
    );
    

    const [isFocused, setIsFocused] = useState(false);

    const handleInputFocus = () => {
      setIsFocused(true);
    };

    const handleInputBlur = () => {
      setIsFocused(false);
    };

  /*Filtra la lista de todos los usuarios, menos del que ha hecho login y no sea Admin 
  y usamos localStorage, porque si abrimos una nueva pestaña los datos del prop se pierden */
  const otherUsers = users.filter(user => user.id !== parseInt(localStorage.getItem('userID')) && user.role !== "admin");
  // console.log('Otros usuarios: ', otherUsers);

  return (
    <>
    <div>
    <NavBar 
          accessToken={localStorage.getItem('accessToken')} 
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
        {/* <input
            type="text"
            placeholder="Buscar juego por título"
            value={searchGame}
            onChange={handleSearchGameChange}
        /><br/> */}
        <div id="search-bar" style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <div className={`mgl-search-box ${isFocused ? 'focused' : ''}`}>
                <input
                  type="text"
                  placeholder="Buscar juego por título"
                  value={searchGame}
                  onChange={handleSearchGameChange}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                />
                <img src="https://demolaravel.ddns.net/images/search.png" alt="Search" className="mgl-search-icon" />
            <br/>
            </div>
          </div>


        <div className='mgl-grid-game-container'>
          {filteredGames.map(game => (
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
      </>
    )}

    {/* <div className='mgl-divBellowNav'>
      <p>Token de acceso: {accessToken}</p>
      <p>ID: {userID}</p>
      <p>Role: {userRole}</p>
    </div> */}
    </>
  )
}

export default HomePage
