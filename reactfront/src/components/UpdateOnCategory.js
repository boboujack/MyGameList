import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Components.css';

const endpoint = 'https://demolaravel.ddns.net/api';

const UpdateOnCategory = ({ gameID, categoryID, accessToken, refreshCategories }) => {
  const [onCategory, setOnCategory] = useState(false);
  const [loading, setLoading] = useState(true);

  // Sacamos el estado onCategory del juego gameID, de la categoria categoryID
  useEffect(() => {
    const fetchCategoryDetails = async () => {
      try {
        const response = await axios.get(`${endpoint}/games/${gameID}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });

        const game = response.data.game;
        const gameData = game.categories.find(category => category.id === categoryID);

        if (gameData) {
          console.log('Hay gameData');
          setOnCategory(gameData.pivot.onCategory);
        }
          
      } catch (error) {
        console.error('Error fetching category details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryDetails();
  }, [gameID, categoryID, accessToken]);

  //OLD
  // useEffect(() => {
  //   const fetchCategoryDetails  = async () => {
  //     try {
  //       const response = await axios.get(`${endpoint}/gamesCategories/${categoryID}`, {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`
  //         }
  //       });

  //       const category = response.data;
  //       const gameData = category.games.find(game => game.id === gameID);
        
  //       if (gameData) {
  //         setOnCategory(gameData.onCategory);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching category details:', error);
  //     }
  //   };

  //   fetchCategoryDetails ();
  // }, [gameID, categoryID, accessToken]);


  // Alternamos el valor de onCategory
  const handleToggleOnCategory = async () => {
    try {
      const response = await axios.put(`${endpoint}/games/onCategory/${gameID}`, {
        category_id: categoryID,
        onCategory: !onCategory
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      if (response.status === 200) {
        setOnCategory(!onCategory);
        // Actualizar la lista de categorías en el componente que nos llame
        refreshCategories();
        console.log(`¡Categoría modificada con éxito!`);
      } else {
        alert('Hubo un problema');
      }
    } catch (error) {
      console.log('Error al actualizar la categoría:', error);
      alert('Hubo un problema al actualizar la categoría. Intenta nuevamente más tarde.');
    }
  };

  if (loading) {
    return <span>Cargando...</span>;
  }

  return (
    <label>
      <input
        type="checkbox"
        checked={onCategory}
        onChange={handleToggleOnCategory}
      />
    </label>
  );
};

export default UpdateOnCategory;
