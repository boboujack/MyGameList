import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Components.css';

const endpoint = 'https://demolaravel.ddns.net/api';

const UpdateStatusCompleted = ({ gameID, userID, accessToken, refreshGames }) => {
  const [statusCompleted, setStatusCompleted] = useState(false);

  //Sacamos el estado de statusCompleted del juego gameID, para userID
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
        
        console.log('User data:', userGameData);
        
        if (userGameData) {
          setStatusCompleted(userGameData.pivot.statusCompleted);
        }
      } catch (error) {
        console.error('Error fetching game details:', error);
      }
    };

    fetchGameDetails();
  }, [gameID, userID, accessToken]);

  //Alternamos el valor de statusCompleted
  const handleToggleStatusCompleted = async () => {
    try {
      const response = await axios.put(`${endpoint}/games/statusCompleted/${gameID}`, {
        user_id: userID,
        statusCompleted: !statusCompleted
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      if (response.status === 200) {
        setStatusCompleted(!statusCompleted);
        // alert(`¡Juego ${!statusCompleted ? 'compleado' : 'pendiente'} tu lista con éxito!`);
        refreshGames(); // Actualizar la lista de juegos en UserProfile.js
      } else {
        alert('Hubo un problema al actualizar tu lista. Intenta nuevamente más tarde.');
      }
    } catch (error) {
      console.error('Error al actualizar la lista:', error);
      alert('Hubo un problema al actualizar tu lista. Intenta nuevamente más tarde.');
    }
  };

  return (
    <label>
      <input
        type="checkbox"
        checked={statusCompleted}
        onChange={handleToggleStatusCompleted}
      />
    </label>
  );
};

export default UpdateStatusCompleted;
