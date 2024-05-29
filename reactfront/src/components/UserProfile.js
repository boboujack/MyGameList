import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Components.css'
import { useParams, Link } from 'react-router-dom';
import NavBar from './NavBar';
import UpdateStatusCompleted from './UpdateStatusCompleted';
import UpdateOnList from './UpdateOnList';

const endpoint = 'https://demolaravel.ddns.net/api'

const UserProfile = ({ accessToken, setAccessToken, userID, setUserID, userName, setUserName, userRole, setUserRole } ) => {
    //Sacamos el id de la URL
    const { id } = useParams();
    const [games, setGames] = useState([]);
    const [profileName, setProfileName] = useState('');
    /*Con esta constante verificamos si el usuario logeado
    es el propietario del perfil */
    const isOwner = parseInt(id) === userID;

    useEffect(() => {
      if (id) {
        getAllGames();
      }
    }, [id]);

    const getAllGames = async () => {
      const response = await axios.get(`${endpoint}/users/${id}`);
        console.log(response.data);
        setGames(response.data)
        setProfileName(response.data[0].name); //Sacamos el nombre del user propietario del perfil
    }

    const completedGames = games.filter(game => game.statusCompleted === 1 && game.onList === 1);
    const pendingGames = games.filter(game => game.statusCompleted === 0 && game.onList === 1);
    const notListed = games.filter(game => game.onList === 0);
      
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
              <div className='mgl-userProfile'>
                <p style={{ fontWeight: 'bold' }}>Perfil de {profileName}</p>
                {isOwner && (
                  <Link to={`/id/${userID}/settings`}>
                    <img className="mgl-icons" src="https://demolaravel.ddns.net/images/settings-blue.png" alt="Logo" />
                  </Link>
                )}
              </div>

              <div className='mgl-userProfile'>
                <div className='mgl-section'>
                    <h2>Completados</h2>
                    {completedGames.length > 0 ? (
                      completedGames.map(game => (
                        <div key={game.id} className='mgl-userProfileGames'>
                          <Link to={`/game/${game.id}`} className='mgl-link-game'>{game.title}</Link>
                          {isOwner && (
                            <UpdateStatusCompleted
                            gameID={game.id} 
                            userID={userID} 
                            accessToken={accessToken} 
                            /*Enviamos la función como prop a UpdateStatusCompleted,
                            para que cuando actualice el status refresque la lista*/
                            refreshGames={getAllGames}
                            />
                          )}
                        </div>
                      ))
                    ) : (
                      <p>Sin juegos completados.</p>
                    )}
                </div>
                
                <div className='mgl-section'>
                    <h2>Pendientes</h2>
                    {pendingGames.length > 0 ? (
                      pendingGames.map(game => (
                        <div key={game.id} className='mgl-userProfileGames'>
                          <Link to={`/game/${game.id}`} className='mgl-link-game'>{game.title}</Link>
                          {isOwner && (
                            <UpdateStatusCompleted
                            gameID={game.id} 
                            userID={userID} 
                            accessToken={accessToken} 
                            /*Enviamos la función como prop a UpdateStatusCompleted,
                            para que cuando actualice el status refresque la lista*/
                            refreshGames={getAllGames}
                            />
                          )}
                        </div>
                      ))
                    ) : (
                      <p>Sin juegos pendientes.</p>
                    )}
                </div>
              </div>
            <br/>
            <div>
                {isOwner && (
                <>
                  <h4 style={{ color: '#2a5285' }}>Quizás te gusten:</h4>
                  <div className='mgl-grid-game-container'>
                    {notListed.length > 0 ? (
                      notListed.map(game => (
                        <div key={game.id}>
                          <article className="mgl-gameCard" key={game.id}>
                            <header className="mgl-header">
                                <img className= "mgl-covers" src={game.image_url} alt="Imagen del juego"/>
                                <strong>{game.title}</strong>
                                <span>Fecha de salida: {game.releaseDate}</span>
                                <br/>
                            </header>
                            <aside className="mgl-div">
                              <Link to={`/game/${game.id}`} className='mgl-button-green'>Más información</Link>
                              {accessToken && (
                                  <UpdateOnList
                                    gameID={game.id} 
                                    userID={userID} 
                                    accessToken={accessToken}
                                    /*Enviamos la función como prop a UpdateStatusCompleted,
                                    para que cuando actualice el status refresque la lista*/
                                    refreshGames={getAllGames}
                                  />
                              )}
                            </aside>
                          </article>
                        </div>
                      ))
                    ) : (
                      <p>No hay juegos recomendados.</p>
                    )}
                    
                </div>
              </>
              )}
              </div>
            </div>
          </>
        )}
        </>
      );
    };

export default UserProfile


