import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Components.css';

const endpoint = 'https://demolaravel.ddns.net/api';

const UpdateOnList = ({ gameID, userID, accessToken, refreshGames }) => {
  const [onList, setOnList] = useState(false);

  //Sacamos el estado de onList del juego gameID, para userID
  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const response = await axios.get(`${endpoint}/games/${gameID}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });

        const game = response.data.game;
        const userGameData = game.users.find(user => user.id === userID);
        
        if (userGameData) {
          setOnList(userGameData.pivot.onList);
        }
      } catch (error) {
        console.error('Error fetching game details:', error);
      }
    };

    fetchGameDetails();
  }, [gameID, userID, accessToken]);

  //Alternamos el valor de onList
  const handleToggleOnList = async () => {
    try {
      const response = await axios.put(`${endpoint}/games/onList/${gameID}`, {
        user_id: userID,
        onList: !onList
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      if (response.status === 200) {
        setOnList(!onList);
        if (refreshGames) {
          refreshGames(); // Actualizar la lista de juegos en UserProfile.js
        }
      } else {
        alert('Hubo un problema al actualizar tu lista. Intenta nuevamente más tarde.');
      }
      if (!onList){
        console.log('Juego añadido a la lista');
      }else{
        console.log('Juego eliminado de la lista');
      }
    } catch (error) {
      console.error('Error al actualizar la lista:', error);
      alert('Hubo un problema al actualizar tu lista. Intenta nuevamente más tarde.');
    }
  };

  return (
    <button onClick={handleToggleOnList} className={`${onList ? 'mgl-button-delete' : 'mgl-button-blue'}`}>
      {onList ? 'Eliminar de mi Lista' : 'Añadir a mi Lista'}
    </button>
  );
};

export default UpdateOnList;
