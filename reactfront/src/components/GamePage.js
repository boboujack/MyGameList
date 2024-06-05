import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import NavBar from './NavBar';
import UpdateOnList from './UpdateOnList';
import './Components.css'

const endpoint = 'https://demolaravel.ddns.net/api';

const GamePage = ({ accessToken, setAccessToken, userID, setUserID, setUserName, userRole, setUserRole } ) => {
  /*Obtenemos el id de App.js cuando se ejecuta
  "<Route path="/game/:id" element={ <GamePage/> }/>"*/
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [categories, setCategories] = useState([])
  const isAdmin = userRole === 'admin';

  useEffect(() => {
    getGame();
    getAllCategories();
  }, [id]);//Cada vez que el id cambien se ejecuta de nuevo el useEffect

  const getGame = async () => {
    const response = await axios.get(`${endpoint}/games/${id}`);
    setGame(response.data);
    // console.log('Datos del juego recibidos:', response.data);
  };

  const getAllCategories = async () => {
    const response = await axios.get(`${endpoint}/categoriesWithGames`);
    setCategories(response.data)
  }

  /*Hay que parsear id, porque useParams devuelve un string*/
  const parsedId = parseInt(id, 10);
  
  //Filtramos las categorías que tiene el juego
  const onCategory = categories.filter(game => game.game_id === parsedId && game.onCategory === 1);
  console.log('id Param: ', id);
  console.log('Categorias: ', onCategory);

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
        <br/><br/>
        {isAdmin && (
            <>
            <Link to={`/update/${game.game.id}`} className='mgl-button-yellow'>Modificar juego</Link>
            <br/><br/>
            </>
        )}
      <h3 style={{ color: '#2a5285' }} >Categorías</h3>
      <div className='mgl-categoryCard'>
        {onCategory.map(category => (
          <article key={category.category_id}>
            <strong>{category.category}</strong>
          </article>
        ))}
      </div>
      </div>
    )}
  </>
  );
}

export default GamePage;