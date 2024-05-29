import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Components.css';

const DeleteAccount = ({ accessToken, userID, navigate, onAccountDeleted }) => {
  const [loading, setLoading] = useState(false);
  const defaultNavigate = useNavigate();

  const handleDeleteAccount = async () => {
    setLoading(true);
    const confirmed = window.confirm("¿Está seguro de que desea eliminar esta cuenta?");
    if (confirmed) {
      try {
        const response = await axios.delete(`https://demolaravel.ddns.net/api/user/${userID}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        
        console.log('Delete account response:', response.data);
        /* Función para restablecer a null los props, cuando borremos una cuenta, 
        si lo hacemos desde el panel de administrador no enviamos este parámetro*/
        if (onAccountDeleted){
          onAccountDeleted();
        }
        alert('¡Cuenta eliminada con éxito!');
        if (navigate){
          navigate('/');
        }else{
          defaultNavigate('/admin');
        }
      } catch (error) {
        console.error('Error al eliminar la cuenta:', error);
        alert('Se ha producido un error al eliminar la cuenta. Por favor, intenta nuevamente más tarde.');
      }
    }
      setLoading(false);
  };
  
  return (
    <div>
      <button onClick={handleDeleteAccount} disabled={loading} className='mgl-button-delete'>Eliminar cuenta</button>
    </div>
  );
};

export default DeleteAccount;
