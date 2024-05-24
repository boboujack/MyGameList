import React, { useState } from 'react';
import axios from 'axios';

const DeleteAccount = ({ accessToken, userID, navigate, onAccountDeleted }) => {
  const [loading, setLoading] = useState(false);

  const handleDeleteAccount = async () => {
    setLoading(true);

    try {
      const response = await axios.delete(`https://demolaravel.ddns.net/api/user/${userID}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      
      console.log('Delete account response:', response.data);
      /* Función para restablecer a null los props,
      cuando borremos una cuenta*/
      onAccountDeleted(); 
      alert('¡Cuenta eliminada con éxito!');
      navigate('/');
    } catch (error) {
      console.error('Error al eliminar la cuenta:', error);
      alert('Se ha producido un error al eliminar la cuenta. Por favor, intenta nuevamente más tarde.');
    }

    setLoading(false);
  };

  return (
    <div>
      <button onClick={handleDeleteAccount} disabled={loading}>Eliminar mi cuenta</button>
    </div>
  );
};

export default DeleteAccount;
